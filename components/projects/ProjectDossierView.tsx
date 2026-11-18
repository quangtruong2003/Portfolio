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
            {/* Top Return Breadcrumb */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/#projects"
                transitionTypes={["folio-back"]}
                className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] px-4 font-mono text-xs font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                <span>{d.backToWork}</span>
              </Link>

              <span className="font-mono text-xs text-[var(--ink-tertiary)] tabular-nums">
                {`${project.figureCode} · ${project.period[language]}`}
              </span>
            </div>

            {/* Main Die-Cut Architectural Dossier Sheet */}
            <article className="paper-stack paper-chamfer p-6 sm:p-10">
              {/* Shared-Element Morph Header */}
              <ViewTransition
                name={`project-header-${project.slug}`}
                share="morph-folio"
                default="none"
              >
                <header className="border-b border-[var(--rule-cut)] pb-7">
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--ink-tertiary)]">
                    <span className="font-semibold text-[var(--accent-vermilion)] tabular-nums">
                      {project.figureCode}
                    </span>
                    <span>
                      {text.category[project.category]} · {project.period[language]}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-8">
                      <h1 className="display-hero text-[var(--ink-primary)]">
                        {project.title}
                      </h1>
                      <p className="mt-3 font-mono text-sm font-medium text-[var(--accent-patina)]">
                        {project.role[language]}
                      </p>
                    </div>

                    {project.highlightBadge && (
                      <div className="paper-well rounded-[4px] p-4 lg:col-span-4">
                        <p className="min-h-[2.25rem] font-serif text-3xl font-semibold leading-none text-[var(--accent-vermilion)] tabular-nums sm:text-4xl">
                          {badgeValue ? (
                            badgeValue
                          ) : isSmoothScroll && statsLoading ? (
                            <span
                              className="inline-block h-8 w-32 animate-pulse rounded-[3px] bg-[var(--bg-sheet-deep)]"
                              aria-hidden="true"
                            />
                          ) : (
                            "—"
                          )}
                        </p>
                        <p className="mt-1.5 font-mono text-xs text-[var(--ink-secondary)]">
                          {project.highlightBadge.caption[language]}
                        </p>
                      </div>
                    )}
                  </div>
                </header>
              </ViewTransition>

              {/* Summary, Stack & Verified Links Bar */}
              <div className="mt-7 grid grid-cols-1 gap-8 border-b border-[var(--rule-cut)] pb-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="text-base leading-relaxed text-[var(--ink-primary)] sm:text-lg">
                    {project.summary[language]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-[2px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-2.5 py-1 font-mono text-xs text-[var(--ink-primary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-[4px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] p-5 lg:col-span-5">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.05em] text-[var(--ink-tertiary)]">
                      {d.sourceStatusLabel}
                    </p>
                    <p className="mt-1.5 inline-flex items-start gap-2 text-sm text-[var(--ink-secondary)]">
                      <ShieldCheck
                        size={16}
                        className="mt-0.5 shrink-0 text-[var(--accent-patina)]"
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
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-[3px] border border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] px-4 font-sans text-xs font-medium text-[var(--bg-sheet-top)] transition-[background-color,transform] duration-150 hover:bg-[var(--accent-vermilion-hover)] active:scale-[0.97]"
                        >
                          <span>{text.viewWebsite}</span>
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      )}
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            "inline-flex min-h-11 items-center gap-1.5 rounded-[3px] border px-4 font-sans text-xs font-medium transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] " +
                            (project.website
                              ? "border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] text-[var(--ink-primary)] hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)]"
                              : "border-[var(--ink-primary)] bg-[var(--ink-primary)] text-[var(--bg-sheet-top)] hover:border-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)]")
                          }
                        >
                          <span>{text.viewSource}</span>
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive System Blueprint & Simulator */}
              <section className="mt-9 border-b border-[var(--rule-cut)] pb-9">
                <h2 className="mb-5 font-serif text-2xl font-medium text-[var(--ink-primary)] sm:text-3xl">
                  {d.interactiveBlueprintHeading}
                </h2>
                <ProjectSchematic project={project} showLiveLab={true} />
              </section>

              {/* Detailed Engineering Case Study Breakdown */}
              <div className="mt-9 grid grid-cols-1 gap-10 lg:grid-cols-12">
                <section className="lg:col-span-5">
                  <h2 className="font-serif text-2xl font-medium text-[var(--ink-primary)]">
                    {d.contextHeading}
                  </h2>
                  <p className="mt-4 text-base leading-[1.75] text-[var(--ink-secondary)]">
                    {project.caseStudy.context[language]}
                  </p>

                  <div className="paper-well mt-6 rounded-[4px] p-5">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.05em] text-[var(--ink-primary)]">
                      {d.craftHeading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                      {craftNotesText}
                    </p>
                  </div>
                </section>

                <section className="lg:col-span-7">
                  <h2 className="font-serif text-2xl font-medium text-[var(--ink-primary)]">
                    {d.architectureHeading}
                  </h2>
                  <ol className="mt-4 space-y-4">
                    {project.caseStudy.architecture.map((decision, idx) => (
                      <li
                        key={decision.en}
                        className="paper-sheet flex items-start gap-4 rounded-[4px] p-4 sm:p-5"
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] bg-[var(--ink-primary)] font-mono text-xs font-semibold text-[var(--bg-sheet-top)] tabular-nums">
                          {`0${idx + 1}`}
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

            {/* Directional Folio Switcher (Prev / Next with ViewTransition Paper Shutter) */}
            <nav
              aria-label="Project folio pagination"
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Link
                href={`/projects/${prevProject.slug}`}
                prefetch={true}
                transitionTypes={["folio-back"]}
                data-cursor="open"
                className="paper-sheet paper-lift flex flex-col justify-between rounded-[4px] p-5"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink-tertiary)]">
                  <ArrowLeft size={14} aria-hidden="true" />
                  <span>{d.prevFolio}</span>
                </span>
                <span className="mt-2 font-serif text-2xl font-medium text-[var(--ink-primary)]">
                  {prevProject.figureCode} · {prevProject.title}
                </span>
              </Link>

              <Link
                href={`/projects/${nextProject.slug}`}
                prefetch={true}
                transitionTypes={["folio-forward"]}
                data-cursor="open"
                className="paper-sheet paper-lift flex flex-col items-start justify-between rounded-[4px] p-5 sm:items-end sm:text-right"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink-tertiary)]">
                  <span>{d.nextFolio}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
                <span className="mt-2 font-serif text-2xl font-medium text-[var(--ink-primary)]">
                  {nextProject.figureCode} · {nextProject.title}
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
