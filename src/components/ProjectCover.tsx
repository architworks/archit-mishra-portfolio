import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { ProjectMeta } from "@/lib/projects";

type Props = {
  project: ProjectMeta;
  onActivate?: () => void;
};

export default function ProjectCover({ project, onActivate }: Props) {
  return (
    <Link
      className={project.cover ? "am-project-cover" : "am-project-cover am-project-cover--silk"}
      href={`/projects/${project.slug}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      {project.cover && (
        <Image
          src={project.cover}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 767px) 86vw, 640px"
        />
      )}
      <strong translate="no">{project.title}</strong>
      <span><ArrowRight /></span>
    </Link>
  );
}
