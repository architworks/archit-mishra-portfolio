import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { getAllProjectsMeta, getProjectBySlug } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const all = await getAllProjectsMeta();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <div className="am-wrap am-page">
      <header className="am-project-head">
        <Link className="am-back" href="/projects"><ArrowLeft /> Back to Projects</Link>
        <h1 className="am-h2">{project.title}</h1>
        {project.subtitle && <p>{project.subtitle}</p>}
        {project.tags?.length ? (
          <div className="am-chips">
            {project.tags.map((tag) => <span key={tag} className="am-chip">{tag}</span>)}
          </div>
        ) : null}
        {project.demoUrl || project.repo ? (
          <div className="am-project-head__actions">
            {project.demoUrl && (
              <a className="am-btn am-btn--primary" href={project.demoUrl} target="_blank" rel="noreferrer">
                Open Live Demo <ArrowUpRight />
              </a>
            )}
            {project.repo && (
              <a className="am-btn am-btn--ghost" href={project.repo} target="_blank" rel="noreferrer">
                View Source <ArrowUpRight />
              </a>
            )}
          </div>
        ) : null}
      </header>

      {project.cover && (
        <div className="am-project-hero">
          <div className="am-project-cover" style={{ cursor: "default" }}>
            <Image src={project.cover} alt={`${project.title} screenshot`} fill sizes="(max-width: 1296px) 100vw, 1296px" priority />
          </div>
        </div>
      )}

      <article className="am-prose">{project.content}</article>
    </div>
  );
}
