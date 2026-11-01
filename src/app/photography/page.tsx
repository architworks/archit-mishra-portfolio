import GoogleDriveGallery from "@/components/GoogleDriveGallery";

export const metadata = { title: "Photography" };

export default function PhotographyPage() {
  return (
    <div className="am-wrap am-page">
      <div className="am-gallery-head">
        <h1 className="am-h2">From My <em className="am-accent">Lens</em></h1>
        <p>Every frame with its exposure, the same way the work on this site carries its results.</p>
      </div>
      <GoogleDriveGallery />
    </div>
  );
}
