import GoogleDriveGallery from "@/components/GoogleDriveGallery";

export const metadata = { title: "Photography" };

export default function PhotographyPage() {
  return (
    <div className="am-wrap am-page">
      <div className="am-gallery-head">
        <h1 className="am-h2">From My <em className="am-accent">Lens</em></h1>
        <p>Photographs, with the camera settings behind them when the file has them.</p>
      </div>
      <GoogleDriveGallery />
    </div>
  );
}
