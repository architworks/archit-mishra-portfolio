import Hero from "@/components/Hero";
import ServicesBand from "@/components/ServicesBand";
import Experience from "@/components/Experience";
import HirePanel from "@/components/HirePanel";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ResultsBand from "@/components/ResultsBand";
import Discuss from "@/components/Discuss";
import Marquee from "@/components/Marquee";
import LensSection from "@/components/LensSection";
import { getFeaturedProjects } from "@/lib/projects";

export const revalidate = 3600;

export default async function Home() {
  const featured = await getFeaturedProjects();
  return (
    <>
      <Hero />
      <ServicesBand />
      <Experience />
      <HirePanel />
      <ProjectsShowcase projects={featured} />
      <ResultsBand />
      <Discuss />
      <Marquee />
      <LensSection />
    </>
  );
}
