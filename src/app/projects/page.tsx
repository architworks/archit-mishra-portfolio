import Link from "next/link";
import ProjectCover from "@/components/ProjectCover";
import { ArrowUpRight } from "@/components/icons";
import { getAllProjectsMeta } from "@/lib/projects";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getAllProjectsMeta();
  return (
    <div className="am-wrap am-page">
      <div className="am-gallery-head">
        <h1 className="am-h2">My <em className="am-accent">Projects</em></h1>
        <p>Side projects where I tinker with LangGraph agents, evaluation tooling, and storytelling pipelines outside of client work.</p>
      </div>
      <div className="am-project-grid">
        {projects.map((project) => (
          <article key={project.slug} className="am-project-card">
            <ProjectCover project={project} />
            {project.tags?.length ? (
              <div className="am-chips">
                {project.tags.map((tag) => <span key={tag} className="am-chip">{tag}</span>)}
              </div>
            ) : null}
            <h2>
              {project.subtitle || project.title}
              <Link className="am-arrow am-arrow--sm" href={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}>
                <ArrowUpRight />
              </Link>
            </h2>
            {project.summary && <p>{project.summary}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
