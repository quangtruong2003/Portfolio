"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, FolderOpen, Lock } from "lucide-react";
import ProjectSchematic from "@/components/projects/ProjectSchematic";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROJECTS, type ProjectItem } from "@/data/portfolio";
import { formatRepoDownloads, useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ProjectsSection() {
  const { dictionary, language } = useLanguage();
  const { smoothScrollRepo } = useGitHubRepos();
  const text = dictionary.projects;
  const liveDownloads = formatRepoDownloads(smoothScrollRepo, language);

  const [smoothScroll, propertyPlatform, ...secondaryProjects] = PROJECTS;

  const renderFeaturedRow = (project: ProjectItem, isFlagship: boolean) => (
    <article
      id={`folio-card-${project.slug}`}
      key={project.slug}
      className="studio-surface p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        {/* Left Narrative Column */}
        <div className="flex h-full flex-col justify-between lg:col-span-5">
          <div>
            <ViewTransition
              name={`project-header-${project.slug}`}
              share="morph-folio"
              default="none"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--ink-muted)]">
                  <span className="rounded-md bg-[var(--accent-primary-soft)] px-2.5 py-1 font-medium text-[var(--accent-primary)]">
                    {text.category[project.category]}
                  </span>
                  <span className="font-mono tabular-nums">
                    {project.period[language]}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--ink-primary)] sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-[var(--accent-primary)]">
                  {project.role[language]}
                </p>
              </div>
            </ViewTransition>

            <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
              {project.summary[language]}
            </p>

            {/* Flagship Live Download Readout or Enterprise Private Status */}
            {isFlagship && liveDownloads && (
              <div className="mt-5 inline-flex items-baseline gap-2.5 rounded-lg border border-[var(--signal-rust)]/20 bg-[var(--signal-rust-soft)] px-3.5 py-2">
                <span className="font-display text-2xl font-semibold leading-none text-[var(--signal-rust)] tabular-nums">
                  {liveDownloads}
                </span>
                <span className="text-xs font-medium text-[var(--ink-secondary)]">
                  {project.highlightBadge?.caption[language]}
                </span>
              </div>
            )}

            {!project.href && (
              <p className="mt-5 inline-flex items-center gap-2 text-xs text-[var(--ink-muted)]">
                <Lock size={14} className="shrink-0 text-[var(--accent-primary)]" aria-hidden="true" />
                <span>{project.sourceStatus[language]}</span>
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-ground)] px-2.5 py-1 font-mono text-xs text-[var(--ink-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {isFlagship && (
              <ul className="mt-6 space-y-2.5 border-t border-[var(--border-subtle)] pt-5">
                {project.caseStudy.architecture.map((point) => (
                  <li
                    key={point.en}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--ink-secondary)]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]"
                      aria-hidden="true"
                    />
                    <span>{point[language]}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-[var(--border-subtle)] pt-5">
            <Link
              href={`/projects/${project.slug}`}
              prefetch={true}
              transitionTypes={["folio-forward"]}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 font-sans text-sm font-medium text-[var(--surface-elevated)] transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:border-[var(--accent-primary-hover)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.96]"
            >
              <FolderOpen size={15} aria-hidden="true" />
              <span>{text.openDossier}</span>
              <span className="sr-only">: {project.title}</span>
            </Link>

            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 font-sans text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.96]"
              >
                <span>{text.viewWebsite}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
                <span className="sr-only">: {project.title}</span>
              </a>
            )}

            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-ground)] px-3.5 font-sans text-sm font-medium text-[var(--ink-secondary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)] active:scale-[0.96]"
              >
                <span>{text.viewSource}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
                <span className="sr-only">: {project.title}</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Interactive Instrument / System Schematic */}
        <div className="lg:col-span-7">
          <ProjectSchematic project={project} showLiveLab={isFlagship} />
        </div>
      </div>
    </article>
  );

  return (
    <section
      id="projects"
      className="relative py-16 md:py-24"
    >
      <div className="site-container">
        <SectionTitle title={text.title} subtitle={text.subtitle}>
          <a
            href="#open-source"
            className="link-draw inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)]"
          >
            <span>{text.seeMore}</span>
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </SectionTitle>

        {/* Tiered Editorial Architecture Showcase (Zero 315vh scroll-jacking) */}
        <div className="space-y-8">
          {/* Tier 1: Flagship Open-Source Windows Utility with Live 120Hz Lab */}
          {renderFeaturedRow(smoothScroll, true)}

          {/* Tier 2: Production Enterprise Backend at C3TEK */}
          {renderFeaturedRow(propertyPlatform, false)}

          {/* Tier 3: Paired Engineering Dossiers (Thesis & Native Android) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {secondaryProjects.map((project) => (
              <article
                id={`folio-card-${project.slug}`}
                key={project.slug}
                className="studio-surface flex flex-col justify-between p-6 sm:p-7"
              >
                <div>
                  <ViewTransition
                    name={`project-header-${project.slug}`}
                    share="morph-folio"
                    default="none"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--ink-muted)]">
                        <span className="rounded-md bg-[var(--surface-subtle)] px-2.5 py-1 font-medium text-[var(--ink-secondary)]">
                          {text.category[project.category]}
                        </span>
                        <span className="font-mono tabular-nums">
                          {project.period[language]}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-2xl font-semibold leading-[1.12] tracking-[-0.028em] text-[var(--ink-primary)] sm:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 text-sm font-medium text-[var(--accent-primary)]">
                        {project.role[language]}
                      </p>
                    </div>
                  </ViewTransition>

                  <p className="mt-3.5 text-sm leading-relaxed text-[var(--ink-secondary)] sm:text-base">
                    {project.summary[language]}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-ground)] px-2.5 py-1 font-mono text-xs text-[var(--ink-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5">
                    <ProjectSchematic project={project} showLiveLab={false} compact={true} />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-[var(--border-subtle)] pt-5">
                  <Link
                    href={`/projects/${project.slug}`}
                    prefetch={true}
                    transitionTypes={["folio-forward"]}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-4 font-sans text-sm font-medium text-[var(--surface-elevated)] transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] active:scale-[0.96]"
                  >
                    <FolderOpen size={15} aria-hidden="true" />
                    <span>{text.openDossier}</span>
                    <span className="sr-only">: {project.title}</span>
                  </Link>

                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 font-sans text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.96]"
                    >
                      <span>{text.viewSource}</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                      <span className="sr-only">: {project.title}</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
