export type DrivePhoto = {
  id: string;
  name: string;
  mimeType: string;
  imageUrl: string;
  thumbnailUrl: string;
  width?: number;
  height?: number;
  exposure: string[];
};

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  imageMediaMetadata?: {
    width?: number;
    height?: number;
    cameraModel?: string;
    focalLength?: number;
    aperture?: number;
    exposureTime?: number;
    isoSpeed?: number;
  };
};

type DriveFilesResponse = {
  files?: DriveFile[];
  nextPageToken?: string;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

export class DriveGalleryError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status = 500) {
    super(message);
    this.name = "DriveGalleryError";
    this.code = code;
    this.status = status;
  }
}

function getDriveApiKey(): string {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY?.trim();
  if (!apiKey) {
    throw new DriveGalleryError(
      "missing_api_key",
      "Google Drive gallery is not configured. Add GOOGLE_DRIVE_API_KEY to the environment.",
      503
    );
  }
  return apiKey;
}

export function extractDriveFolderId(input: string | undefined): string {
  const value = input?.trim();
  if (!value) {
    throw new DriveGalleryError(
      "missing_folder",
      "Google Drive gallery is not configured. Add GOOGLE_DRIVE_FOLDER to the environment.",
      503
    );
  }

  if (/^[a-zA-Z0-9_-]{10,}$/.test(value)) return value;

  try {
    const url = new URL(value);
    const folderMatch = url.pathname.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (folderMatch?.[1]) return folderMatch[1];

    const id = url.searchParams.get("id");
    if (id && /^[a-zA-Z0-9_-]{10,}$/.test(id)) return id;
  } catch {
    // Fall through to the final validation error.
  }

  throw new DriveGalleryError(
    "invalid_folder",
    "GOOGLE_DRIVE_FOLDER must be a Google Drive folder link or folder ID.",
    400
  );
}

function buildFolderQuery(folderId: string): string {
  const escapedFolderId = folderId.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  return `'${escapedFolderId}' in parents and trashed = false and mimeType contains 'image/'`;
}

function formatExposure(meta: DriveFile["imageMediaMetadata"]): string[] {
  if (!meta) return [];
  const { cameraModel, focalLength, aperture, exposureTime, isoSpeed } = meta;
  const shutter = exposureTime
    ? exposureTime < 1
      ? `1/${Math.round(1 / exposureTime)} s`
      : `${exposureTime} s`
    : undefined;
  return [
    cameraModel,
    focalLength ? `${Math.round(focalLength)} mm` : undefined,
    aperture ? `f/${aperture}` : undefined,
    shutter,
    isoSpeed ? `ISO ${isoSpeed}` : undefined,
  ].filter((value): value is string => Boolean(value));
}

function toPhoto(file: DriveFile): DrivePhoto {
  const encodedId = encodeURIComponent(file.id);
  const imageUrl = `/api/drive/photo/${encodedId}`;

  return {
    id: file.id,
    name: file.name,
    mimeType: file.mimeType,
    imageUrl,
    thumbnailUrl: file.thumbnailLink || imageUrl,
    width: file.imageMediaMetadata?.width,
    height: file.imageMediaMetadata?.height,
    exposure: formatExposure(file.imageMediaMetadata),
  };
}

async function parseDriveResponse(response: Response): Promise<DriveFilesResponse> {
  const data = (await response.json().catch(() => null)) as DriveFilesResponse | null;
  if (!response.ok) {
    throw new DriveGalleryError(
      data?.error?.status || "drive_api_error",
      data?.error?.message || "Google Drive could not load the photography folder.",
      response.status
    );
  }
  return data || {};
}

export async function listDrivePhotos(options: { revalidate?: number } = {}): Promise<DrivePhoto[]> {
  const apiKey = getDriveApiKey();
  const folderId = extractDriveFolderId(process.env.GOOGLE_DRIVE_FOLDER);
  const photos: DrivePhoto[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      key: apiKey,
      q: buildFolderQuery(folderId),
      fields:
        "nextPageToken,files(id,name,mimeType,thumbnailLink,imageMediaMetadata(width,height,cameraModel,focalLength,aperture,exposureTime,isoSpeed))",
      orderBy: "name",
      pageSize: "1000",
      supportsAllDrives: "true",
      includeItemsFromAllDrives: "true",
    });

    if (pageToken) params.set("pageToken", pageToken);

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
      options.revalidate ? { next: { revalidate: options.revalidate } } : { cache: "no-store" }
    );
    const data = await parseDriveResponse(response);

    for (const file of data.files || []) {
      if (file.id && file.mimeType?.startsWith("image/")) {
        photos.push(toPhoto(file));
      }
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return photos;
}

export type DriveDocument = {
  previewUrl: string;
  openUrl: string;
};

// Google Docs and uploaded files (PDF, Word) use different viewer URLs.
function toDriveDocument(id: string, mimeType: string): DriveDocument {
  const encodedId = encodeURIComponent(id);
  if (mimeType === "application/vnd.google-apps.document") {
    const doc = `https://docs.google.com/document/d/${encodedId}`;
    return { previewUrl: `${doc}/preview`, openUrl: `${doc}/view` };
  }
  const file = `https://drive.google.com/file/d/${encodedId}`;
  return { previewUrl: `${file}/preview`, openUrl: `${file}/view` };
}

// The most recently changed file in a folder shared with "anyone with the link".
async function findLatestDriveFile(folderId: string, apiKey: string): Promise<DriveFile | undefined> {
  const params = new URLSearchParams({
    key: apiKey,
    q: `'${folderId}' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'`,
    fields: "files(id,name,mimeType)",
    orderBy: "modifiedTime desc",
    pageSize: "1",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
  });
  const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    next: { revalidate: 60 },
  });
  return (await parseDriveResponse(response)).files?.[0];
}

export async function getLatestDriveDocument(folderId: string): Promise<DriveDocument | null> {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY?.trim();
  if (!apiKey) return null;
  try {
    const file = await findLatestDriveFile(folderId, apiKey);
    return file ? toDriveDocument(file.id, file.mimeType) : null;
  } catch {
    return null;
  }
}

// Fetches the newest file's contents. Google Docs export to PDF, and uploaded files come through as they are.
export async function fetchLatestDriveDocument(folderId: string): Promise<{ response: Response; extension: string }> {
  const apiKey = getDriveApiKey();
  const file = await findLatestDriveFile(folderId, apiKey);
  if (!file) {
    throw new DriveGalleryError("no_document", "The Google Drive folder has no document in it.", 404);
  }

  const isGoogleFile = file.mimeType.startsWith("application/vnd.google-apps.");
  const params = new URLSearchParams(
    isGoogleFile
      ? { key: apiKey, mimeType: "application/pdf" }
      : { key: apiKey, alt: "media", supportsAllDrives: "true" }
  );
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(file.id)}${isGoogleFile ? "/export" : ""}?${params.toString()}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new DriveGalleryError("drive_document_error", "Google Drive could not load this document.", response.status);
  }

  const extension = isGoogleFile ? ".pdf" : file.name.match(/\.[a-z0-9]+$/i)?.[0] ?? "";
  return { response, extension };
}

export async function fetchDrivePhoto(fileId: string): Promise<Response> {
  const apiKey = getDriveApiKey();

  if (!/^[a-zA-Z0-9_-]{10,}$/.test(fileId)) {
    throw new DriveGalleryError("invalid_file", "Invalid Google Drive file ID.", 400);
  }

  const params = new URLSearchParams({
    alt: "media",
    key: apiKey,
    supportsAllDrives: "true",
  });

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    let message = "Google Drive could not load this photo.";
    try {
      const data = (await response.json()) as DriveFilesResponse;
      message = data.error?.message || message;
    } catch {
      // Keep the generic message when Drive returns a non-JSON response.
    }
    throw new DriveGalleryError("drive_photo_error", message, response.status);
  }

  return response;
}

export function driveErrorResponse(error: unknown): Response {
  if (error instanceof DriveGalleryError) {
    return Response.json(
      { error: { code: error.code, message: error.message } },
      { status: error.status }
    );
  }

  return Response.json(
    {
      error: {
        code: "unknown_error",
        message: "Google Drive gallery could not be loaded.",
      },
    },
    { status: 500 }
  );
}
