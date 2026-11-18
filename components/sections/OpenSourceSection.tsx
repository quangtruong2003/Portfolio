"use client";

import { ArrowUpRight, Download, GitFork, RefreshCw, Star, Tag } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { OWNER_INFO } from "@/data/portfolio";
import { formatRepoDownloads, useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

export default function OpenSourceSection() {
  const { smoothScrollRepo, loading, error, retry } = useGitHubRepos();
  const { dictionary, language } = useLanguage();
  const text = dictionary.openSource;
  const numberFormat = new Intl.NumberFormat(language === "vi" ? "vi-VN" : "en-US");
  const downloadsDisplay = formatRepoDownloads(smoothScrollRepo, language);

  return (
    <section id="open-source" className="border-b border-[var(--rule-cut)] py-16 md:py-24">
      <div className="site-container">
        <SectionTitle
          title={text.title}
          subtitle={text.subtitle}
          asideMeta="github.com/quangtruong2003/SmoothScroll"
        >
          <a
            href={OWNER_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] px-4 font-mono text-xs font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
          >
            <span>{text.viewAll}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </SectionTitle>

        {loading && (
          <div
            className="paper-stack paper-chamfer grid grid-cols-1 gap-8 p-6 opacity-80 sm:p-8 lg:grid-cols-12"
            role="status"
          >
            <span className="sr-only">{text.loading}</span>
            <div className="space-y-4 lg:col-span-7">
              <div className="h-4 w-48 animate-pulse rounded-[2px] bg-[var(--bg-sheet-mid)]" />
              <div className="h-10 w-64 animate-pulse rounded-[3px] bg-[var(--bg-sheet-mid)]" />
              <div className="h-16 w-full animate-pulse rounded-[3px] bg-[var(--bg-sheet-mid)]" />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div className="h-10 animate-pulse rounded-[3px] bg-[var(--bg-sheet-mid)]" />
                <div className="h-10 animate-pulse rounded-[3px] bg-[var(--bg-sheet-mid)]" />
              </div>
            </div>
            <div className="paper-well h-56 animate-pulse rounded-[4px] lg:col-span-5" />
          </div>
        )}

        {error && (
          <div
            className="paper-well flex flex-wrap items-center justify-between gap-4 rounded-[4px] p-6"
            role="status"
          >
            <p className="max-w-[54ch] text-sm leading-relaxed text-[var(--ink-secondary)]">
              {text.error}
            </p>
            <button
              type="button"
              onClick={retry}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[3px] border border-[var(--ink-primary)] bg-[var(--bg-sheet-top)] px-4 font-mono text-xs font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
            >
              <RefreshCw size={14} aria-hidden="true" />
              <span>{text.retry}</span>
            </button>
          </div>
        )}

        {!loading && !error && !smoothScrollRepo && (
          <p
            className="paper-well rounded-[4px] p-6 text-sm text-[var(--ink-secondary)]"
            role="status"
          >
            {text.empty}
          </p>
        )}

        {smoothScrollRepo && (
          <article className="paper-stack paper-chamfer p-6 sm:p-8 lg:p-9">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
              {/* Left 7 Columns: Flagship Repository Identity, Highlights & Links */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-3 font-mono text-xs text-[var(--ink-tertiary)]">
                    <span>{text.flagshipLabel}</span>
                    {smoothScrollRepo.language && (
                      <span className="rounded-[2px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-2.5 py-0.5 font-medium text-[var(--ink-primary)]">
                        {smoothScrollRepo.language}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4">
                    <a
                      href={smoothScrollRepo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex min-h-11 items-center gap-2.5 font-serif text-3xl font-medium tracking-[-0.025em] text-[var(--ink-primary)] transition-colors duration-150 hover:text-[var(--accent-vermilion)] sm:text-4xl"
                    >
                      <span>{smoothScrollRepo.name}</span>
                      <ArrowUpRight size={22} aria-hidden="true" />
                    </a>
                  </h3>

                  <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-[var(--ink-secondary)]">
                    {smoothScrollRepo.description}
                  </p>

                  {/* 4 Key System Highlights from README */}
                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {text.highlights.map((item, idx) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-3 py-2 text-xs font-medium text-[var(--ink-primary)] sm:text-sm"
                      >
                        <span className="font-mono text-xs font-semibold text-[var(--accent-vermilion)] tabular-nums">
                          {`0${idx + 1}`}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Repository, Releases & Product Website Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-[var(--rule-cut)] pt-5">
                  <a
                    href={smoothScrollRepo.releases_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] px-4 font-sans text-xs font-medium text-[var(--bg-sheet-top)] transition-[background-color,border-color,transform] duration-150 hover:border-[var(--accent-vermilion-hover)] hover:bg-[var(--accent-vermilion-hover)] active:scale-[0.97]"
                  >
                    <Download size={15} aria-hidden="true" />
                    <span>
                      {text.viewReleases}
                      {smoothScrollRepo.latest_release
                        ? ` (${smoothScrollRepo.latest_release})`
                        : ""}
                    </span>
                  </a>

                  <a
                    href={smoothScrollRepo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] px-4 font-sans text-xs font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
                  >
                    <span>{text.viewRepo}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>

                  <a
                    href={smoothScrollRepo.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-3.5 font-sans text-xs font-medium text-[var(--ink-secondary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--rule-strong)] hover:text-[var(--ink-primary)] active:scale-[0.97]"
                  >
                    <span>{text.viewWebsite}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right 5 Columns: Live GitHub & README Shields Telemetry Ledger */}
              <div className="paper-well relative flex flex-col justify-between rounded-[4px] p-5 sm:p-6 lg:col-span-5">
                <div className="flex items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-3 font-mono text-xs text-[var(--ink-secondary)]">
                  <span>{text.telemetryHeading}</span>
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent-patina)]"
                    aria-hidden="true"
                  />
                </div>

                {/* Primary Realtime Download Count */}
                <div className="my-5 rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[var(--ink-tertiary)]">
                      README · GitHub Releases
                    </span>
                    <Download
                      size={15}
                      className="text-[var(--accent-vermilion)]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 font-serif text-4xl font-semibold leading-none tracking-[-0.03em] text-[var(--accent-vermilion)] tabular-nums sm:text-5xl">
                    {downloadsDisplay ?? "—"}
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--ink-secondary)]">
                    {text.downloads}
                  </p>
                </div>

                {/* Secondary Live Metrics: Stars, Forks & Latest Tag */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs tabular-nums">
                  <div className="rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] p-3.5">
                    <div className="flex items-center gap-1.5 text-[var(--ink-tertiary)]">
                      <Star
                        size={14}
                        className="text-[var(--accent-ochre)]"
                        aria-hidden="true"
                      />
                      <span>{text.stars}</span>
                    </div>
                    <p className="mt-1.5 font-serif text-2xl font-semibold text-[var(--ink-primary)]">
                      {numberFormat.format(smoothScrollRepo.stargazers_count)}
                    </p>
                  </div>

                  <div className="rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] p-3.5">
                    <div className="flex items-center gap-1.5 text-[var(--ink-tertiary)]">
                      <GitFork
                        size={14}
                        className="text-[var(--accent-patina)]"
                        aria-hidden="true"
                      />
                      <span>{text.forks}</span>
                    </div>
                    <p className="mt-1.5 font-serif text-2xl font-semibold text-[var(--ink-primary)]">
                      {numberFormat.format(smoothScrollRepo.forks_count)}
                    </p>
                  </div>

                  {smoothScrollRepo.latest_release && (
                    <div className="col-span-2 flex items-center justify-between rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-3.5 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-[var(--ink-secondary)]">
                        <Tag
                          size={13}
                          className="text-[var(--accent-patina)]"
                          aria-hidden="true"
                        />
                        <span>{text.latestRelease}</span>
                      </span>
                      <span className="rounded-[2px] bg-[var(--accent-patina-wash)] px-2 py-0.5 font-semibold text-[var(--accent-patina)]">
                        {smoothScrollRepo.latest_release}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
