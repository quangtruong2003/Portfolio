"use client";

import { ArrowUpRight, GitFork, Star } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/animations/FadeIn";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

export default function OpenSourceSection() {
  const { repos, loading, error } = useGitHubRepos();
  const { dictionary, language } = useLanguage();
  const text = dictionary.openSource;
  const numberFormat = new Intl.NumberFormat(language === "vi" ? "vi-VN" : "en-US");

  return (
    <SectionWrapper id="open-source" py="lg">
      <SectionTitle title={text.title} subtitle={text.subtitle} />

      {loading && <p className="font-mono text-xs text-olive-gray" role="status">{text.loading}</p>}
      {error && <p className="max-w-[60ch] text-sm leading-relaxed text-olive-gray" role="status">{text.error}</p>}
      {!loading && !error && repos?.length === 0 && (
        <p className="text-sm text-olive-gray" role="status">{text.empty}</p>
      )}

      {repos && repos.length > 0 && (
        <div className="border-t border-border-warm">
          {repos.map((repo) => (
            <FadeIn key={repo.id}>
              <article className="grid grid-cols-1 gap-3 border-b border-border-warm py-5 sm:grid-cols-12 sm:items-center sm:gap-6">
                <div className="sm:col-span-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 font-serif text-xl text-near-black transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
                  >
                    {repo.name}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
                <p className="text-sm leading-relaxed text-olive-gray sm:col-span-5">
                  {repo.description || repo.language || ""}
                </p>
                <div className="flex items-center gap-5 font-mono text-xs text-olive-gray sm:col-span-3 sm:justify-end">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="inline-flex items-center gap-1.5" aria-label={`${numberFormat.format(repo.stargazers_count)} ${text.stars}`}>
                    <Star size={13} aria-hidden="true" />
                    {numberFormat.format(repo.stargazers_count)}
                  </span>
                  <span className="inline-flex items-center gap-1.5" aria-label={`${numberFormat.format(repo.forks_count)} ${text.forks}`}>
                    <GitFork size={13} aria-hidden="true" />
                    {numberFormat.format(repo.forks_count)}
                  </span>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      )}

      <a
        href="https://github.com/quangtruong2003"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
      >
        {text.viewAll}
        <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </SectionWrapper>
  );
}
