import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/constants";
import ProjectCaseStudy from "@/components/sections/ProjectCaseStudy";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Anshul Deewan`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();
  return <ProjectCaseStudy project={project} />;
}
