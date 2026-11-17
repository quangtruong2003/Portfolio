import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDossierView from "@/components/projects/ProjectDossierView";
import { getProjectBySlug, PROJECTS } from "@/data/portfolio";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Technical Dossier`,
    description: project.summary.en,
    alternates: {
      canonical: `https://quangtruong.dev/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Nguyen Quang Truong`,
      description: project.summary.en,
      url: `https://quangtruong.dev/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((item) => item.slug === slug);
  if (index === -1) {
    notFound();
  }

  const project = PROJECTS[index];
  const prevProject = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <ProjectDossierView
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
