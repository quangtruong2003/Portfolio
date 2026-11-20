"use client";

import { ArrowUpRight, Check, Download, GitFork, RefreshCw, Star, Tag } from "lucide-react";
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
    <section
      id="open-source"
      className="border-b border-[var(--border-subtle)] py-16 md:py-24"
    >
      <div className="site-container">
        <SectionTitle title={text.title} subtitle={text.subtitle}>
          <a
            href={OWNER_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 font-sans text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.96]"
          >
            <span>{text.viewAll}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </SectionTitle>

        {loading && (
          <div
            className="studio-surface grid grid-cols-1 gap-8 p-6 opacity-85 sm:p-8 lg:grid-cols-12"
            role="status"
          >
            <span className="sr-only">{text.loading}</span>
            <div className="space-y-4 lg:col-span-7">
              <div className="h-5 w-48 animate-pulse rounded-md bg-[var(--surface-muted)]" />
              <div className="h-10 w-64 animate-pulse rounded-md bg-[var(--surface-muted)]" />
              <div className="h-16 w-full animate-pulse rounded-md bg-[var(--surface-muted)]" />
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div className="h-11 animate-pulse rounded-lg bg-[var(--surface-muted)]" />
                <div className="h-11 animate-pulse rounded-lg bg-[var(--surface-muted)]" />
              </div>
            </div>
            <div className="h-60 animate-pulse rounded-xl bg-[var(--surface-subtle)] lg:col-span-5" />
          </div>
        )}

        {error && (
          <div
            className="studio-inset flex flex-wrap items-center justify-between gap-4 p-6"
            role="status"
          >
            <p className="max-w-[54ch] text-sm leading-relaxed text-[var(--ink-secondary)]">
              {text.error}
            </p>
            <button
              type="button"
              onClick={retry}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-[var(--ink-primary)] bg-[var(--surface-elevated)] px-4 font-sans text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.96]"
            >
              <RefreshCw size={14} aria-hidden="true" />
              <span>{text.retry}</span>
            </button>
          </div>
        )}

        {!loading && !error && !smoothScrollRepo && (
          <p className="studio-inset p-6 text-sm text-[var(--ink-secondary)]" role="status">
            {text.empty}
          </p>
        )}

        {smoothScrollRepo && (
          <article className="studio-surface overflow-hidden p-6 sm:p-8 lg:p-9">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
              {/* Left 7 Columns: SmoothScroll Flagship Identity, Highlights & Actions */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 text-xs text-[var(--ink-muted)]">
                    <span className="font-medium text-[var(--accent-primary)]">
                      {text.flagshipLabel}
                    </span>
                    {smoothScrollRepo.language && (
                      <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-ground)] px-2.5 py-1 font-mono text-xs text-[var(--ink-secondary)]">
                        {smoothScrollRepo.language}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2">
                    <a
                      href={smoothScrollRepo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2.5 font-display text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-primary)] transition-colors duration-150 hover:text-[var(--accent-primary)] sm:text-4xl"
                    >
                      <span>{smoothScrollRepo.name}</span>
                      <ArrowUpRight size={24} aria-hidden="true" />
                    </a>
                  </h3>

                  <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-[var(--ink-secondary)]">
                    {smoothScrollRepo.description}
                  </p>

                  <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {text.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-ground)] px-3.5 py-2.5 text-sm text-[var(--ink-primary)]"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-[var(--accent-primary)]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary Release Download + Source + Website Actions */}
                <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-[var(--border-subtle)] pt-5">
                  <a
                    href={smoothScrollRepo.releases_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 font-sans text-sm font-medium text-[var(--surface-elevated)] transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:border-[var(--accent-primary-hover)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.96]"
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
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 font-sans text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.96]"
                  >
                    <span>{text.viewRepo}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>

                  <a
                    href={smoothScrollRepo.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-ground)] px-3.5 font-sans text-sm font-medium text-[var(--ink-secondary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)] active:scale-[0.96]"
                  >
                    <span>{text.viewWebsite}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right 5 Columns: Deep Forest-Obsidian Live Telemetry Console */}
              <div className="engine-room flex flex-col justify-between rounded-xl border border-[var(--engine-border)] p-5 sm:p-6 lg:col-span-5">
                <div className="flex items-center justify-between gap-2 border-b border-[var(--engine-border)] pb-3.5 text-xs text-[var(--engine-muted)]">
                  <span>{text.telemetryHeading}</span>
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent-on-engine)]"
                    aria-hidden="true"
                  />
                </div>

                {/* Live Realtime Downloads Counter */}
                <div className="engine-inset my-5 p-5">
                  <div className="flex items-center justify-between gap-2 text-xs text-[var(--engine-muted)]">
                    <span className="font-mono">GitHub Releases</span>
                    <Download
                      size={15}
                      className="text-[var(--signal-on-engine)]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 font-display text-4xl font-semibold leading-none tracking-[-0.03em] text-[var(--signal-on-engine)] tabular-nums sm:text-5xl">
                    {downloadsDisplay ?? "—"}
                  </p>
                  <p className="mt-2 text-xs text-[var(--engine-muted)]">
                    {text.downloads}
                  </p>
                </div>

                {/* Live Secondary Metrics */}
                <div className="grid grid-cols-2 gap-3 tabular-nums">
                  <div className="engine-inset p-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--engine-muted)]">
                      <Star
                        size={14}
                        className="text-[var(--signal-on-engine)]"
                        aria-hidden="true"
                      />
                      <span>{text.stars}</span>
                    </div>
                    <p className="mt-1.5 font-display text-2xl font-semibold text-[var(--engine-ink)]">
                      {numberFormat.format(smoothScrollRepo.stargazers_count)}
                    </p>
                  </div>

                  <div className="engine-inset p-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--engine-muted)]">
                      <GitFork
                        size={14}
                        className="text-[var(--accent-on-engine)]"
                        aria-hidden="true"
                      />
                      <span>{text.forks}</span>
                    </div>
                    <p className="mt-1.5 font-display text-2xl font-semibold text-[var(--engine-ink)]">
                      {numberFormat.format(smoothScrollRepo.forks_count)}
                    </p>
                  </div>

                  {smoothScrollRepo.latest_release && (
                    <div className="engine-inset col-span-2 flex items-center justify-between px-3.5 py-2.5 text-xs">
                      <span className="inline-flex items-center gap-1.5 text-[var(--engine-muted)]">
                        <Tag
                          size={13}
                          className="text-[var(--accent-on-engine)]"
                          aria-hidden="true"
                        />
                        <span>{text.latestRelease}</span>
                      </span>
                      <span className="rounded-md bg-[var(--accent-on-engine-soft)] px-2.5 py-0.5 font-mono font-semibold text-[var(--accent-on-engine)]">
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
