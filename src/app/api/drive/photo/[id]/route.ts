import { driveErrorResponse, fetchDrivePhoto } from "@/lib/google-drive";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const upstream = await fetchDrivePhoto(id);
    const headers = new Headers();
    const contentType = upstream.headers.get("content-type");
    const contentLength = upstream.headers.get("content-length");

    headers.set("Content-Type", contentType || "image/jpeg");
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
    if (contentLength) headers.set("Content-Length", contentLength);

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    return driveErrorResponse(error);
  }
}
