"use client";

import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

export default function OpenSourceSection() {
  const { repos, loading, error, retry } = useGitHubRepos();
  const { dictionary, language } = useLanguage();
  const text = dictionary.openSource;
  const numberFormat = new Intl.NumberFormat(language === "vi" ? "vi-VN" : "en-US");

  return (
    <SectionWrapper id="open-source" py="xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionTitle title={text.title} subtitle={text.subtitle} />
          <a
            href="https://github.com/quangtruong2003"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
          >
            {text.viewAll}<ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {loading && <p className="font-mono text-xs text-olive-gray" role="status">{text.loading}</p>}
          {error && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-warm py-5" role="status">
              <p className="max-w-[50ch] text-sm leading-relaxed text-olive-gray">{text.error}</p>
              <button
                type="button"
                onClick={retry}
                className="inline-flex min-h-11 items-center text-sm font-medium text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
              >
                {text.retry}
              </button>
            </div>
          )}
          {!loading && !error && repos?.length === 0 && (
            <p className="border-t border-border-warm py-5 text-sm text-olive-gray" role="status">{text.empty}</p>
          )}

          {repos && repos.length > 0 && (
            <div>
              {repos.map((repo) => (
                <article className="open-source-row" key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 font-serif text-xl text-near-black transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
                  >
                    {repo.name}<ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-olive-gray">
                    {repo.description || repo.language || ""}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.68rem] text-olive-gray">
                    {repo.language && <span>{repo.language}</span>}
                    <span>{numberFormat.format(repo.stargazers_count)} {text.stars}</span>
                    <span>{numberFormat.format(repo.forks_count)} {text.forks}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
