import { driveErrorResponse, listDrivePhotos } from "@/lib/google-drive";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const photos = await listDrivePhotos();
    return Response.json(
      { photos },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    return driveErrorResponse(error);
  }
}
