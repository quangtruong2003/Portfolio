"use client";

import { ArrowUpRight, GitFork, RefreshCw, Star } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { OWNER_INFO } from "@/data/portfolio";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

export default function OpenSourceSection() {
  const { repos, loading, error, retry } = useGitHubRepos();
  const { dictionary, language } = useLanguage();
  const text = dictionary.openSource;
  const numberFormat = new Intl.NumberFormat(language === "vi" ? "vi-VN" : "en-US");

  return (
    <section id="open-source" className="border-b border-[var(--rule-cut)] py-16 md:py-24">
      <div className="site-container">
        <SectionTitle
          title={text.title}
          subtitle={text.subtitle}
          asideMeta="github.com/quangtruong2003"
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3" role="status">
            <span className="sr-only">{text.loading}</span>
            {[0, 1, 2].map((skeletonIdx) => (
              <div
                key={skeletonIdx}
                className="paper-sheet flex h-44 flex-col justify-between rounded-[4px] p-5 opacity-70"
              >
                <div className="h-5 w-1/2 rounded-[2px] bg-[var(--bg-sheet-mid)]" />
                <div className="space-y-2">
                  <div className="h-3.5 w-full rounded-[2px] bg-[var(--bg-sheet-mid)]" />
                  <div className="h-3.5 w-3/4 rounded-[2px] bg-[var(--bg-sheet-mid)]" />
                </div>
                <div className="h-4 w-1/3 rounded-[2px] bg-[var(--bg-sheet-mid)]" />
              </div>
            ))}
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

        {!loading && !error && repos?.length === 0 && (
          <p
            className="paper-well rounded-[4px] p-6 text-sm text-[var(--ink-secondary)]"
            role="status"
          >
            {text.empty}
          </p>
        )}

        {repos && repos.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {repos.map((repo, index) => (
              <article
                key={repo.id}
                className="paper-sheet paper-lift flex flex-col justify-between rounded-[4px] p-6"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-dashed border-[var(--rule-cut)] pb-3 font-mono text-xs text-[var(--ink-tertiary)]">
                    <span className="tabular-nums">{`REPO 0${index + 1}`}</span>
                    {repo.language && (
                      <span className="rounded-[2px] bg-[var(--bg-sheet-mid)] px-2 py-0.5 font-medium text-[var(--ink-primary)]">
                        {repo.language}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex min-h-11 items-center gap-2 font-serif text-2xl font-medium text-[var(--ink-primary)] transition-colors duration-150 hover:text-[var(--accent-vermilion)]"
                    >
                      <span>{repo.name}</span>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                    {repo.description || repo.language || ""}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--rule-cut)] pt-3.5 font-mono text-xs text-[var(--ink-secondary)] tabular-nums">
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={14} className="text-[var(--accent-ochre)]" aria-hidden="true" />
                    <span>
                      {numberFormat.format(repo.stargazers_count)} {text.stars}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitFork size={14} className="text-[var(--accent-patina)]" aria-hidden="true" />
                    <span>
                      {numberFormat.format(repo.forks_count)} {text.forks}
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
