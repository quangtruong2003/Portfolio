"use client";

import { ViewTransition, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, FolderOpen } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import ProjectSchematic from "@/components/projects/ProjectSchematic";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROJECTS } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ProjectsSection() {
  const { dictionary, language } = useLanguage();
  const text = dictionary.projects;

  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDesktopHorizontal, setIsDesktopHorizontal] = useState(false);
  const [maxShift, setMaxShift] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMode = () => {
      setIsDesktopHorizontal(desktopQuery.matches && !reducedQuery.matches);
    };
    syncMode();

    desktopQuery.addEventListener("change", syncMode);
    reducedQuery.addEventListener("change", syncMode);
    return () => {
      desktopQuery.removeEventListener("change", syncMode);
      reducedQuery.removeEventListener("change", syncMode);
    };
  }, []);

  useEffect(() => {
    if (!isDesktopHorizontal) {
      return;
    }

    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return;
      const vw = viewportRef.current.clientWidth;
      const tw = trackRef.current.scrollWidth;
      setMaxShift(Math.max(0, tw - vw));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktopHorizontal, language]);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.45,
  });

  const translateX = useTransform(smoothProgress, (val) =>
    isDesktopHorizontal ? -val * maxShift : 0
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktopHorizontal) return;
    const idx = Math.min(
      PROJECTS.length - 1,
      Math.max(0, Math.round(latest * (PROJECTS.length - 1)))
    );
    setActiveIndex(idx);
  });

  const jumpToFolio = (index: number) => {
    setActiveIndex(index);
    if (!isDesktopHorizontal || !runwayRef.current) {
      const cardEl = document.getElementById(`folio-card-${PROJECTS[index].slug}`);
      cardEl?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const rect = runwayRef.current.getBoundingClientRect();
    const runwayTop = window.scrollY + rect.top;
    const scrollableDistance = Math.max(0, runwayRef.current.offsetHeight - window.innerHeight);
    const ratio = PROJECTS.length > 1 ? index / (PROJECTS.length - 1) : 0;
    window.scrollTo({
      top: runwayTop + scrollableDistance * ratio,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      className="relative border-b border-[var(--rule-cut)] py-16 lg:py-0"
    >
      <div
        ref={runwayRef}
        className={isDesktopHorizontal ? "relative lg:h-[315vh]" : "relative"}
      >
        <div
          className={
            isDesktopHorizontal
              ? "lg:sticky lg:top-16 lg:flex lg:min-h-[calc(100svh-4rem)] lg:flex-col lg:justify-center lg:gap-5 lg:overflow-hidden lg:py-5"
              : ""
          }
        >
          <div className="site-container">
            {isDesktopHorizontal ? (
              <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--rule-cut)] pb-3.5">
                <div>
                  <h2 className="font-serif text-2xl font-medium leading-tight tracking-[-0.028em] text-[var(--ink-primary)] xl:text-3xl">
                    {text.title}
                  </h2>
                </div>

                {/* Interactive Folio Index Strip */}
                <div
                  role="tablist"
                  aria-label={text.title}
                  className="flex flex-wrap items-center gap-1.5"
                >
                  {PROJECTS.map((proj, idx) => {
                    const active = activeIndex === idx;
                    return (
                      <button
                        key={proj.slug}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => jumpToFolio(idx)}
                        className={
                          "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-[3px] border px-3 font-mono text-xs transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] " +
                          (active
                            ? "border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] font-medium text-[var(--bg-sheet-top)]"
                            : "border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] text-[var(--ink-secondary)] hover:border-[var(--rule-strong)] hover:text-[var(--ink-primary)]")
                        }
                      >
                        <span className="tabular-nums">{proj.figureCode}</span>
                        <span className="hidden xl:inline">{proj.title}</span>
                      </button>
                    );
                  })}
                </div>
              </header>
            ) : (
              <SectionTitle
                title={text.title}
                subtitle={text.subtitle}
                asideMeta="FIG. I — IV"
              />
            )}
          </div>

          {/* Unified Single-DOM Folio Track (preserves unique ViewTransition names!) */}
          <div ref={viewportRef} className="site-container overflow-visible">
            <motion.div
              ref={trackRef}
              style={isDesktopHorizontal ? { x: translateX } : undefined}
              className={
                isDesktopHorizontal
                  ? "flex w-max items-stretch gap-7 pr-8 will-change-transform"
                  : "flex flex-col gap-8"
              }
            >
              {PROJECTS.map((project) => (
                <article
                  id={`folio-card-${project.slug}`}
                  key={project.slug}
                  className={
                    "paper-stack paper-chamfer flex flex-col justify-between p-5 sm:p-7 " +
                    (isDesktopHorizontal
                      ? "w-[min(86vw,960px)] shrink-0"
                      : "w-full")
                  }
                >
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
                    {/* Left Folio Metadata & Narrative */}
                    <div className="flex flex-col justify-between lg:col-span-5">
                      <div>
                        {/* Shared-Element Morph Target for Project Header */}
                        <ViewTransition
                          name={`project-header-${project.slug}`}
                          share="morph-folio"
                          default="none"
                        >
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-2.5 font-mono text-xs text-[var(--ink-tertiary)]">
                              <span className="font-semibold text-[var(--accent-vermilion)] tabular-nums">
                                {project.figureCode}
                              </span>
                              <span>
                                {text.category[project.category]} · {project.period[language]}
                              </span>
                            </div>

                            <h3 className="mt-4 font-serif text-3xl font-medium leading-[1.06] tracking-[-0.025em] text-[var(--ink-primary)] sm:text-4xl">
                              {project.title}
                            </h3>
                            <p className="mt-2 font-mono text-xs font-medium text-[var(--accent-patina)]">
                              {project.role[language]}
                            </p>
                          </div>
                        </ViewTransition>

                        <p className="mt-4 text-sm leading-relaxed text-[var(--ink-secondary)] sm:text-base">
                          {project.summary[language]}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-[2px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-2 py-0.5 font-mono text-xs text-[var(--ink-secondary)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Primary Dossier Unfold Action + Verified External Links */}
                      <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-[var(--rule-cut)] pt-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          prefetch={true}
                          transitionTypes={["folio-forward"]}
                          data-cursor="open"
                          className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-4 font-sans text-xs font-medium text-[var(--bg-sheet-top)] transition-[background-color,border-color,transform] duration-150 ease-out hover:border-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)] active:scale-[0.97]"
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
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] px-3.5 font-sans text-xs font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
                          >
                            <span>{text.viewSource}</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                            <span className="sr-only">: {project.title}</span>
                          </a>
                        )}

                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] px-3.5 font-sans text-xs font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
                          >
                            <span>{text.viewWebsite}</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                            <span className="sr-only">: {project.title}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Interactive Architectural Blueprint / Live Lab */}
                    <div className="lg:col-span-7">
                      <ProjectSchematic
                        project={project}
                        showLiveLab={true}
                        compactOnRail={isDesktopHorizontal}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="site-container flex items-center justify-between pt-1">
            <a
              href="#open-source"
              className="link-draw inline-flex min-h-11 items-center gap-2 font-sans text-xs font-medium text-[var(--ink-primary)] hover:text-[var(--accent-vermilion)]"
            >
              <span>{text.seeMore}</span>
              <ArrowDown size={14} aria-hidden="true" />
            </a>

            {isDesktopHorizontal && (
              <span className="font-mono text-xs text-[var(--ink-tertiary)] tabular-nums">
                {`${String(activeIndex + 1).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}`}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
