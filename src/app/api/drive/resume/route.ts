import { contact } from "@/data/site";
import { fetchLatestDriveDocument } from "@/lib/google-drive";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { response, extension } = await fetchLatestDriveDocument(contact.resumeFolderId);
    const headers = new Headers();

    headers.set("Content-Type", response.headers.get("content-type") || "application/pdf");
    headers.set("Content-Disposition", `attachment; filename="Archit-Mishra-Resume${extension}"`);
    headers.set("Cache-Control", "no-store");

    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch {
    // The resume page explains the problem and offers email instead.
    return Response.redirect(new URL("/resume", request.url), 302);
  }
}
