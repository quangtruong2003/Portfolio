"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, FileText } from "lucide-react";
import StudioPortraitStage from "@/components/hero/StudioPortraitStage";
import Button from "@/components/ui/Button";
import CVModal from "@/components/ui/CVModal";
import { OWNER_INFO } from "@/data/portfolio";
import { formatRepoDownloads, useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

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
      className="relative flex min-h-[calc(100svh-4.125rem)] flex-col justify-center border-b border-[var(--border-subtle)] py-6 sm:py-10 md:py-14"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-7 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left 7 Columns: Identity, Typographic Statement, Actions & Live SmoothScroll Proof */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div className="hero-meta-enter flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--ink-secondary)] sm:text-sm">
              <span className="font-medium text-[var(--ink-primary)]">{ownerName}</span>
              <span className="text-[var(--border-strong)]" aria-hidden="true">
                /
              </span>
              <span>{hero.role}</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--ink-muted)]">
                <span
                  className="h-2 w-2 rounded-full bg-[var(--accent-primary)]"
                  aria-hidden="true"
                />
                <span>{hero.location}</span>
              </span>
            </div>

            <div className="hero-lead-enter mt-4 sm:mt-6">
              <h1 className="display-hero max-w-[14ch] whitespace-pre-line text-[var(--ink-primary)]">
                {hero.headline}
              </h1>
            </div>

            <div className="hero-support-enter mt-4 sm:mt-6">
              <p className="max-w-[54ch] text-sm leading-[1.65] text-[var(--ink-secondary)] sm:text-lg">
                {hero.bio}
              </p>

              {/* Action Row: Exactly 1 Filled Primary CTA + 1 Neutral Secondary CTA */}
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-3.5">
                <a
                  href="#projects"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 font-sans text-sm font-medium text-[var(--surface-elevated)] shadow-[0_1px_2px_rgba(17,23,20,0.12)] transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:border-[var(--accent-primary-hover)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.96] sm:min-h-12 sm:px-5"
                >
                  <span>{hero.viewProjects}</span>
                  <ArrowDownRight size={16} aria-hidden="true" />
                </a>

                <Button
                  variant="secondary"
                  size="sm"
                  icon={FileText}
                  onClick={() => setIsCVOpen(true)}
                  className="sm:min-h-12 sm:px-5"
                >
                  {hero.viewCV}
                </Button>
              </div>

              {/* Seamless Live Open-Source Proof Strip */}
              <div className="mt-6 flex flex-col gap-2.5 border-t border-[var(--border-subtle)] pt-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p
                    aria-live="polite"
                    className="min-h-[2rem] font-display text-2xl font-semibold leading-none tracking-[-0.03em] text-[var(--signal-rust)] tabular-nums sm:min-h-[2.5rem] sm:text-4xl"
                  >
                    {liveDownloads ? (
                      <span className="inline-block animate-[quietFade_320ms_ease-out_both]">
                        {liveDownloads}
                      </span>
                    ) : statsLoading ? (
                      <span
                        className="inline-block h-7 w-28 animate-pulse rounded-md bg-[var(--surface-muted)] align-middle sm:h-8 sm:w-32"
                        aria-hidden="true"
                      />
                    ) : (
                      "—"
                    )}
                  </p>
                  <p className="text-xs text-[var(--ink-secondary)] sm:text-sm">
                    <span className="font-medium text-[var(--ink-primary)]">
                      {hero.proofLabel}
                    </span>
                    {smoothScrollRepo?.latest_release && (
                      <span className="ml-1.5 rounded bg-[var(--accent-primary-soft)] px-1.5 py-0.5 font-mono text-[11px] font-medium text-[var(--accent-primary)]">
                        {smoothScrollRepo.latest_release}
                      </span>
                    )}
                    {` — ${hero.proofCaption}`}
                  </p>
                </div>

                <Link
                  href="/projects/smoothscroll"
                  transitionTypes={["folio-forward"]}
                  className="link-draw inline-flex min-h-10 shrink-0 items-center gap-1.5 self-start text-xs font-medium text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] sm:min-h-11 sm:self-center sm:text-sm"
                >
                  <span>{hero.viewProject}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Authentic Studio Portrait Stage */}
          <div className="hero-stage-enter lg:col-span-5">
            <StudioPortraitStage language={language} />
          </div>
        </div>
      </div>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </section>
  );
}
