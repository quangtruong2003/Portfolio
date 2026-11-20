"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import LocaleHandler from "@/components/layout/LocaleHandler";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectSchematic from "@/components/projects/ProjectSchematic";
import type { ProjectItem } from "@/data/portfolio";
import { formatRepoDownloads, useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

interface ProjectDossierViewProps {
  project: ProjectItem;
  prevProject: ProjectItem;
  nextProject: ProjectItem;
}

export default function ProjectDossierView({
  project,
  prevProject,
  nextProject,
}: ProjectDossierViewProps) {
  const { dictionary, language } = useLanguage();
  const { smoothScrollRepo, loading: statsLoading } = useGitHubRepos();
  const text = dictionary.projects;
  const d = text.dossier;
  const isSmoothScroll = project.slug === "smoothscroll";
  const liveDownloads = isSmoothScroll
    ? formatRepoDownloads(smoothScrollRepo, language)
    : null;
  const badgeValue = isSmoothScroll
    ? liveDownloads
    : project.highlightBadge?.value ?? null;
  const craftNotesText = isSmoothScroll
    ? liveDownloads
      ? project.caseStudy.craftNotes[language].replace("{downloads}", liveDownloads)
      : project.caseStudy.craftNotes[language]
          .replace(" với {downloads} lượt tải trên GitHub Releases", "")
          .replace(" with {downloads} GitHub release downloads", "")
    : project.caseStudy.craftNotes[language];

  return (
    <>
      <LocaleHandler />
      <Navbar />

      <ViewTransition
        key={project.slug}
        enter={{
          "folio-forward": "folio-forward",
          "folio-back": "folio-back",
          default: "none",
        }}
        exit={{
          "folio-forward": "folio-forward",
          "folio-back": "folio-back",
          default: "none",
        }}
        default="none"
      >
        <main id="main-content" className="py-10 md:py-16">
          <div className="site-container">
            {/* Return Navigation Row */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/#projects"
                transitionTypes={["folio-back"]}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 font-sans text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.96]"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                <span>{d.backToWork}</span>
              </Link>

              <span className="font-mono text-xs text-[var(--ink-muted)] tabular-nums">
                {project.period[language]}
              </span>
            </div>

            {/* Main Technical Dossier Surface */}
            <article className="studio-surface p-6 sm:p-10">
              {/* Shared-Element Morph Header */}
              <ViewTransition
                name={`project-header-${project.slug}`}
                share="morph-folio"
                default="none"
              >
                <header className="border-b border-[var(--border-subtle)] pb-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--ink-muted)]">
                    <span className="rounded-md bg-[var(--accent-primary-soft)] px-2.5 py-1 font-medium text-[var(--accent-primary)]">
                      {text.category[project.category]}
                    </span>
                    <span className="font-mono tabular-nums">
                      {project.period[language]}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-8">
                      <h1 className="display-hero text-[var(--ink-primary)]">
                        {project.title}
                      </h1>
                      <p className="mt-3 text-base font-medium text-[var(--accent-primary)]">
                        {project.role[language]}
                      </p>
                    </div>

                    {project.highlightBadge && (
                      <div className="engine-room rounded-xl border border-[var(--engine-border)] p-5 lg:col-span-4">
                        <p className="min-h-[2.5rem] font-display text-3xl font-semibold leading-none text-[var(--signal-on-engine)] tabular-nums sm:text-4xl">
                          {badgeValue ? (
                            badgeValue
                          ) : isSmoothScroll && statsLoading ? (
                            <span
                              className="inline-block h-8 w-32 animate-pulse rounded-md bg-[var(--engine-surface)]"
                              aria-hidden="true"
                            />
                          ) : (
                            "—"
                          )}
                        </p>
                        <p className="mt-1.5 text-xs text-[var(--engine-muted)]">
                          {project.highlightBadge.caption[language]}
                        </p>
                      </div>
                    )}
                  </div>
                </header>
              </ViewTransition>

              {/* Summary, Stack & Verified Links Bar */}
              <div className="mt-8 grid grid-cols-1 gap-8 border-b border-[var(--border-subtle)] pb-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="max-w-[65ch] text-base leading-relaxed text-[var(--ink-primary)] sm:text-lg">
                    {project.summary[language]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-ground)] px-2.5 py-1 font-mono text-xs text-[var(--ink-primary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="studio-inset flex flex-col justify-between gap-4 p-5 lg:col-span-5">
                  <div>
                    <p className="text-xs font-medium text-[var(--ink-muted)]">
                      {d.sourceStatusLabel}
                    </p>
                    <p className="mt-1.5 inline-flex items-start gap-2 text-sm text-[var(--ink-secondary)]">
                      <ShieldCheck
                        size={16}
                        className="mt-0.5 shrink-0 text-[var(--accent-primary)]"
                        aria-hidden="true"
                      />
                      <span>{project.sourceStatus[language]}</span>
                    </p>
                  </div>

                  {(project.href || project.website) && (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 font-sans text-sm font-medium text-[var(--surface-elevated)] transition-[background-color,transform] duration-150 hover:bg-[var(--accent-primary-hover)] active:scale-[0.96]"
                        >
                          <span>{text.viewWebsite}</span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      )}
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            "inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-4 font-sans text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.96] " +
                            (project.website
                              ? "border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--ink-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                              : "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--surface-elevated)] hover:bg-[var(--accent-primary-hover)]")
                          }
                        >
                          <span>{text.viewSource}</span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive System Diagram & 120Hz Simulator */}
              <section className="mt-9 border-b border-[var(--border-subtle)] pb-9">
                <h2 className="mb-5 font-display text-2xl font-semibold tracking-[-0.025em] text-[var(--ink-primary)] sm:text-3xl">
                  {d.interactiveBlueprintHeading}
                </h2>
                <ProjectSchematic project={project} showLiveLab={true} />
              </section>

              {/* Context & Architecture Decisions */}
              <div className="mt-9 grid grid-cols-1 gap-10 lg:grid-cols-12">
                <section className="lg:col-span-5">
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] text-[var(--ink-primary)]">
                    {d.contextHeading}
                  </h2>
                  <p className="mt-4 text-base leading-[1.72] text-[var(--ink-secondary)]">
                    {project.caseStudy.context[language]}
                  </p>

                  <div className="studio-inset mt-6 p-5">
                    <h3 className="text-xs font-semibold text-[var(--accent-primary)]">
                      {d.craftHeading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                      {craftNotesText}
                    </p>
                  </div>
                </section>

                <section className="lg:col-span-7">
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] text-[var(--ink-primary)]">
                    {d.architectureHeading}
                  </h2>
                  <ol className="mt-4 space-y-3.5">
                    {project.caseStudy.architecture.map((decision, idx) => (
                      <li
                        key={decision.en}
                        className="flex items-start gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-ground)] p-4 sm:p-5"
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--accent-primary)] font-mono text-xs font-semibold text-[var(--surface-elevated)] tabular-nums">
                          {`${idx + 1}`}
                        </span>
                        <p className="text-sm leading-relaxed text-[var(--ink-primary)] sm:text-base">
                          {decision[language]}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </article>

            {/* Directional Prev / Next Navigation */}
            <nav
              aria-label="Project pagination"
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Link
                href={`/projects/${prevProject.slug}`}
                prefetch={true}
                transitionTypes={["folio-back"]}
                className="studio-surface surface-lift flex flex-col justify-between p-5"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--ink-muted)]">
                  <ArrowLeft size={14} aria-hidden="true" />
                  <span>{d.prevFolio}</span>
                </span>
                <span className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)] sm:text-2xl">
                  {prevProject.title}
                </span>
              </Link>

              <Link
                href={`/projects/${nextProject.slug}`}
                prefetch={true}
                transitionTypes={["folio-forward"]}
                className="studio-surface surface-lift flex flex-col items-start justify-between p-5 sm:items-end sm:text-right"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--ink-muted)]">
                  <span>{d.nextFolio}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
                <span className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)] sm:text-2xl">
                  {nextProject.title}
                </span>
              </Link>
            </nav>
          </div>
        </main>
      </ViewTransition>

      <Footer />
    </>
  );
}
