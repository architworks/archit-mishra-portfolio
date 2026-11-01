import Image from "next/image";
import Link from "next/link";
import Readout from "@/components/Readout";
import { ArrowUpRight } from "@/components/icons";
import { listDrivePhotos, type DrivePhoto } from "@/lib/google-drive";

// The section hides itself when the gallery has nothing to show. /photography explains why.
export default async function LensSection() {
  let photos: DrivePhoto[] = [];
  try {
    photos = await listDrivePhotos({ revalidate: 3600 });
  } catch {
    return null;
  }
  if (!photos.length) return null;
  const shown = photos.slice(0, 3);

  return (
    <section className="am-section" id="photography">
      <div className="am-wrap">
        <div className="am-sec-head">
          <h2 className="am-h2">From My <em className="am-accent">Lens</em></h2>
          <Link className="am-btn am-btn--primary am-btn--sm" href="/photography">See All</Link>
        </div>
        <div className="am-tiles" data-count={shown.length}>
          {shown.map((photo, index) => (
            <article key={photo.id} className="am-tile">
              <div className="am-notch">
                <div className="am-notch__media am-tile__media">
                  <Image
                    src={photo.imageUrl}
                    alt={`Photograph ${index + 1} by Archit Mishra`}
                    fill
                    sizes={shown.length === 1 ? "(max-width: 1296px) 100vw, 1296px" : "(max-width: 639px) 100vw, 640px"}
                  />
                </div>
                <Link className="am-arrow" href={`/photography?photo=${photo.id}`} aria-label={`Open photo ${index + 1}`}>
                  <ArrowUpRight />
                </Link>
              </div>
              <Readout items={photo.exposure} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
