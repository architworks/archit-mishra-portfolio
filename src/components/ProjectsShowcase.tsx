"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProjectCover from "@/components/ProjectCover";
import { ArrowUpRight } from "@/components/icons";
import type { ProjectMeta } from "@/lib/projects";

export default function ProjectsShowcase({ projects }: { projects: ProjectMeta[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const project = projects[active];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = rail.firstElementChild as HTMLElement | null;
        if (!card) return;
        const step = card.offsetWidth + parseFloat(getComputedStyle(rail).columnGap || "0");
        const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
        setActive(atEnd && rail.scrollLeft > 0 ? rail.children.length - 1 : Math.round(rail.scrollLeft / step));
      });
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (index: number) => {
    setActive(index);
    const rail = railRef.current;
    const card = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !card) return;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: smooth ? "smooth" : "auto" });
  };

  if (!project) return null;

  return (
    <section className="am-section am-section--flush" id="projects">
      <div className="am-wrap">
        <div className="am-sec-head">
          <h2 className="am-h2">Let’s Have a Look at<br />My <em className="am-accent">Projects</em></h2>
          <Link className="am-btn am-btn--primary am-btn--sm" href="/projects">See All</Link>
        </div>

        <div ref={railRef} className="am-rail" tabIndex={0} role="region" aria-label="Projects">
          {projects.map((item, index) => (
            <ProjectCover key={item.slug} project={item} onActivate={() => setActive(index)} />
          ))}
        </div>

        {projects.length > 1 && (
          <div className="am-dots" role="group" aria-label="Choose a project" style={{ marginTop: 24 }}>
            {projects.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                aria-label={`Show ${item.title}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => goTo(index)}
              >
                <i />
              </button>
            ))}
          </div>
        )}

        <div className="am-project-detail">
          {project.tags?.length ? (
            <div className="am-chips">
              {project.tags.map((tag) => <span key={tag} className="am-chip">{tag}</span>)}
            </div>
          ) : null}
          <h3>
            {project.title}{project.subtitle ? ` – ${project.subtitle}` : ""}
            <Link className="am-arrow am-arrow--sm" href={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}>
              <ArrowUpRight />
            </Link>
          </h3>
          {project.summary && <p>{project.summary}</p>}
        </div>
      </div>
    </section>
  );
}
