"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Readout from "@/components/Readout";
import { ArrowLeft, ArrowRight, Close } from "@/components/icons";
import type { DrivePhoto } from "@/lib/google-drive";

type GalleryResponse = {
  photos?: DrivePhoto[];
};

type GalleryState =
  | { status: "loading"; photos: DrivePhoto[] }
  | { status: "ready"; photos: DrivePhoto[] }
  | { status: "empty"; photos: DrivePhoto[] }
  | { status: "error"; photos: DrivePhoto[] };

function setUrlParam(key: string, value: string | null) {
  const url = new URL(window.location.href);
  if (value) url.searchParams.set(key, value);
  else url.searchParams.delete(key);
  window.history.replaceState(null, "", url);
}

function Lightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: DrivePhoto[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const photo = photos[index];

  const showPrevious = useCallback(
    () => onChange((index - 1 + photos.length) % photos.length),
    [index, onChange, photos.length]
  );
  const showNext = useCallback(
    () => onChange((index + 1) % photos.length),
    [index, onChange, photos.length]
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("button")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && photos.length > 1) showPrevious();
      if (event.key === "ArrowRight" && photos.length > 1) showNext();
      if (event.key !== "Tab") return;

      const buttons = dialogRef.current?.querySelectorAll("button");
      if (!buttons?.length) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, photos.length, showNext, showPrevious]);

  return (
    <div ref={dialogRef} className="am-lightbox am-lightbox--fixed" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <div className="am-lightbox__top">
        <span>{index + 1} of {photos.length}</span>
        <button className="am-icon-btn" type="button" aria-label="Close viewer" onClick={onClose}><Close /></button>
      </div>
      <div className="am-lightbox__stage">
        {photos.length > 1 ? (
          <button className="am-icon-btn" type="button" aria-label="Previous photo" onClick={showPrevious}><ArrowLeft /></button>
        ) : <span />}
        <div className="am-lightbox__frame">
          <Image src={photo.imageUrl} alt={photo.alt} fill sizes="100vw" style={{ objectFit: "contain" }} priority />
        </div>
        {photos.length > 1 ? (
          <button className="am-icon-btn" type="button" aria-label="Next photo" onClick={showNext}><ArrowRight /></button>
        ) : <span />}
      </div>
      <div className="am-lightbox__cap">
        <b>{photo.title}</b>
        <Readout items={photo.exposure} />
      </div>
    </div>
  );
}

export default function GoogleDriveGallery() {
  const [state, setState] = useState<GalleryState>({ status: "loading", photos: [] });
  const [attempt, setAttempt] = useState(0);
  const [album, setAlbum] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPhotos() {
      setState({ status: "loading", photos: [] });
      try {
        const response = await fetch("/api/drive/photos", { cache: "no-store" });
        if (!response.ok) throw new Error(`Gallery request failed with ${response.status}`);
        const data = (await response.json()) as GalleryResponse;
        if (cancelled) return;
        const photos = data.photos || [];
        setState({ status: photos.length ? "ready" : "empty", photos });
      } catch {
        if (!cancelled) setState({ status: "error", photos: [] });
      }
    }

    loadPhotos();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  // Album and open photo live in the URL so a view can be shared.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAlbum(params.get("album"));
    setActiveId(params.get("photo"));
  }, []);

  const albums = useMemo(
    () => [...new Set(state.photos.map((photo) => photo.album).filter((value): value is string => Boolean(value)))],
    [state.photos]
  );
  const visible = useMemo(
    () => (album ? state.photos.filter((photo) => photo.album === album) : state.photos),
    [album, state.photos]
  );
  const activeIndex = visible.findIndex((photo) => photo.id === activeId);

  const openPhoto = useCallback((id: string | null) => {
    setActiveId(id);
    setUrlParam("photo", id);
  }, []);
  const chooseAlbum = (value: string | null) => {
    setAlbum(value);
    setUrlParam("album", value);
  };
  const closeViewer = useCallback(() => openPhoto(null), [openPhoto]);
  const changeViewer = useCallback((index: number) => openPhoto(visible[index].id), [openPhoto, visible]);

  if (state.status === "loading") {
    return (
      <div className="am-gallery-grid" aria-busy="true" aria-label="Loading photos…">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="am-skeleton" aria-hidden="true" />
        ))}
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="am-notice" role="alert">
        <h3>Couldn’t Load These Photos</h3>
        <p>The photo library didn’t respond. Your connection is probably fine, so try again in a moment.</p>
        <button className="am-btn am-btn--ghost am-btn--sm" type="button" onClick={() => setAttempt((value) => value + 1)}>
          Try Again
        </button>
      </div>
    );
  }

  if (state.status === "empty") {
    return (
      <div className="am-notice">
        <h3>No Photos Here Yet</h3>
        <p>New frames are on the way. In the meantime, have a look at the projects.</p>
        <Link className="am-btn am-btn--ghost am-btn--sm" href="/projects">See Projects</Link>
      </div>
    );
  }

  return (
    <>
      {albums.length > 1 && (
        <div className="am-chips" role="group" aria-label="Filter by album" style={{ marginBottom: 32 }}>
          <button className="am-chip" type="button" aria-pressed={!album} onClick={() => chooseAlbum(null)}>All</button>
          {albums.map((name) => (
            <button key={name} className="am-chip" type="button" aria-pressed={album === name} onClick={() => chooseAlbum(name)}>
              {name}
            </button>
          ))}
        </div>
      )}

      {visible.length ? (
        <div className="am-gallery-grid" data-count={visible.length < 3 ? visible.length : undefined}>
          {visible.map((photo, index) => (
            <figure key={photo.id} className={index === 0 && visible.length >= 3 ? "am-span-2" : undefined}>
              <button className="am-gallery-item" type="button" aria-label={`Open ${photo.title}`} onClick={() => openPhoto(photo.id)}>
                <Image
                  src={photo.imageUrl}
                  alt={photo.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 767px) 100vw, 860px" : "(max-width: 767px) 100vw, 420px"}
                  priority={index === 0}
                />
              </button>
              <figcaption>
                <b>{photo.title}</b>
                <Readout items={photo.exposure} />
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="am-notice">
          <h3>No Photos in This Album</h3>
          <p>Nothing here so far. See every photograph instead.</p>
          <button className="am-btn am-btn--ghost am-btn--sm" type="button" onClick={() => chooseAlbum(null)}>Show All Photos</button>
        </div>
      )}

      {activeIndex >= 0 && (
        <Lightbox photos={visible} index={activeIndex} onChange={changeViewer} onClose={closeViewer} />
      )}
    </>
  );
}
