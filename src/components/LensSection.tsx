import Image from "next/image";
import Link from "next/link";
import Readout from "@/components/Readout";
import { ArrowUpRight } from "@/components/icons";
import { listDrivePhotos, type DrivePhoto } from "@/lib/google-drive";

function Tile({ photo, feature }: { photo: DrivePhoto; feature: boolean }) {
  const media = (
    <div className="am-notch">
      <div className="am-notch__media am-tile__media">
        <Image
          src={photo.imageUrl}
          alt={photo.alt}
          fill
          sizes={feature ? "(max-width: 767px) 100vw, 780px" : "(max-width: 639px) 100vw, 420px"}
        />
      </div>
      <Link className="am-arrow" href={`/photography?photo=${photo.id}`} aria-label={`Open ${photo.title}`}>
        <ArrowUpRight />
      </Link>
    </div>
  );
  const copy = (
    <>
      {photo.album && <div className="am-chips"><span className="am-chip">{photo.album}</span></div>}
      <Readout items={photo.exposure} />
      <h3>{photo.title}</h3>
    </>
  );

  return feature ? (
    <article className="am-tile am-tile--feature">
      {media}
      <div className="am-tile__copy">{copy}</div>
    </article>
  ) : (
    <article className="am-tile">
      {media}
      {copy}
    </article>
  );
}

// The section hides itself when the gallery has nothing to show. /photography explains why.
export default async function LensSection() {
  let photos: DrivePhoto[] = [];
  try {
    photos = await listDrivePhotos({ revalidate: 3600 });
  } catch {
    return null;
  }
  if (!photos.length) return null;

  return (
    <section className="am-section" id="photography">
      <div className="am-wrap">
        <div className="am-sec-head">
          <h2 className="am-h2">From My <em className="am-accent">Lens</em></h2>
          <Link className="am-btn am-btn--primary am-btn--sm" href="/photography">See All</Link>
        </div>
        <div className="am-tiles">
          {photos.slice(0, 3).map((photo) => (
            <Tile key={photo.id} photo={photo} feature={photos.length < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
