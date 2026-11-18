"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import CVModal from "@/components/ui/CVModal";
import { OWNER_INFO } from "@/data/portfolio";
import { formatRepoDownloads, useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

const PaperKineticSculpture = dynamic(
  () => import("@/components/3d/PaperKineticSculpture"),
  {
    ssr: false,
    loading: () => (
      <div className="paper-well flex min-h-[430px] items-center justify-center rounded-[4px] p-6">
        <div className="h-32 w-32 rounded-full border-8 border-[var(--accent-vermilion)]/75" />
      </div>
    ),
  }
);

export default function HeroSection() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const { language, dictionary } = useLanguage();
  const { smoothScrollRepo, loading: statsLoading } = useGitHubRepos();
  const { hero } = dictionary;
  const ownerName = language === "vi" ? OWNER_INFO.nameVi : OWNER_INFO.nameEn;
  const liveDownloads = formatRepoDownloads(smoothScrollRepo, language);

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-4.125rem)] flex-col justify-between border-b border-[var(--rule-cut)] py-8 md:py-12"
    >
      <div className="site-container flex flex-1 flex-col justify-between gap-8">
        {/* Top Archival Registration Strip */}
        <div className="hero-meta-enter flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-[var(--rule-cut)] pb-3.5 font-mono text-xs text-[var(--ink-secondary)]">
          <p className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-[var(--ink-primary)]">{ownerName}</span>
            <span className="text-[var(--accent-vermilion)]" aria-hidden="true">
              /
            </span>
            <span>{hero.role}</span>
          </p>
          <p className="inline-flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-[var(--accent-patina)]"
              aria-hidden="true"
            />
            <span>{hero.location}</span>
          </p>
        </div>

        {/* Main Asymmetric 12-Column Atelier Spread */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div className="hero-lead-enter">
              <h1 className="display-hero max-w-[16ch] whitespace-pre-line text-[var(--ink-primary)]">
                {hero.headline}
              </h1>
            </div>

            <div className="hero-support-enter mt-6">
              <p className="max-w-[54ch] text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg">
                {hero.bio}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href="#projects"
                  className="inline-flex min-h-12 items-center gap-2 rounded-[3px] border border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] px-5 font-sans text-sm font-medium text-[var(--bg-sheet-top)] transition-[background-color,border-color,transform] duration-150 ease-out hover:border-[var(--accent-vermilion-hover)] hover:bg-[var(--accent-vermilion-hover)] active:scale-[0.97]"
                >
                  <span>{hero.viewProjects}</span>
                  <ArrowDownRight size={17} aria-hidden="true" />
                </a>

                <Button
                  variant="paper"
                  icon={FileText}
                  onClick={() => setIsCVOpen(true)}
                >
                  {hero.viewCV}
                </Button>
              </div>

              {/* Tactile Die-Cut Proof Seal for SmoothScroll */}
              <div className="paper-stack paper-chamfer mt-9 max-w-xl p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-xs text-[var(--ink-tertiary)]">
                      {`${hero.proofLabel} / SmoothScroll`}
                      {smoothScrollRepo?.latest_release
                        ? ` · ${smoothScrollRepo.latest_release}`
                        : ""}
                    </p>
                    <p
                      aria-live="polite"
                      className="mt-1.5 min-h-[2.5rem] font-serif text-4xl font-semibold leading-none tracking-[-0.03em] text-[var(--accent-vermilion)] tabular-nums sm:min-h-[3rem] sm:text-5xl"
                    >
                      {liveDownloads ? (
                        <span className="inline-block animate-[quietFade_320ms_ease-out_both]">
                          {liveDownloads}
                        </span>
                      ) : statsLoading ? (
                        <span
                          className="inline-block h-9 w-36 animate-pulse rounded-[3px] bg-[var(--bg-sheet-mid)] align-middle sm:h-11 sm:w-44"
                          aria-hidden="true"
                        />
                      ) : (
                        "—"
                      )}
                    </p>
                    <p className="mt-1.5 font-mono text-xs text-[var(--ink-secondary)]">
                      {`${hero.proofCaption} / Rust & Tauri 2`}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-3">
                    <Link
                      href="/projects/smoothscroll"
                      transitionTypes={["folio-forward"]}
                      data-cursor="open"
                      className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-canvas)] px-3.5 font-mono text-xs font-medium text-[var(--ink-primary)] transition-[background-color,border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
                    >
                      <span>{hero.viewProject}</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Paper-Rotor & Stratum Diorama */}
          <div className="hero-stage-enter lg:col-span-5">
            <PaperKineticSculpture
              stageLabel={hero.stageLabel}
              explodeLabel={hero.explodeStrata}
              assembleLabel={hero.assembleStrata}
              pulseLabel={hero.pulseRotor}
              strataHint={hero.strataHint}
              layers={hero.layers}
            />
          </div>
        </div>
      </div>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </section>
  );
}
