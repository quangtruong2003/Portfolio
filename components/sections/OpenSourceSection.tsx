"use client";

import React from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/animations/FadeIn";
import GlassCard from "@/components/ui/GlassCard";
import { useGitHubRepos, type GitHubRepo } from "@/hooks/useGitHubRepos";
import { ExternalLink, Star, GitFork } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Swift: "#F05138",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  Dart: "#00B4AB",
};

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] ?? "#8b949e") : "#8b949e";

  return (
    <FadeIn delay={index * 0.08} direction="up">
      <GlassCard
        hoverable
        className="flex flex-col gap-4 h-full"
      >
        {/* Header: name + link */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 flex-shrink-0 mt-0.5 text-stone-gray"
              aria-hidden="true"
            >
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 10.5v-8z" />
            </svg>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif font-medium text-near-black hover:text-terracotta transition-colors duration-200 leading-tight line-clamp-1"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
            >
              {repo.name}
            </a>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="flex-shrink-0 text-stone-gray hover:text-terracotta transition-colors duration-200"
          >
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Description */}
        {repo.description && (
          <p className="font-sans text-sm leading-relaxed text-olive-gray line-clamp-2 flex-1">
            {repo.description}
          </p>
        )}

        {/* Footer: language + stars + forks */}
        <div className="flex items-center gap-4 pt-1">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: langColor }}
                aria-hidden="true"
              />
              <span className="font-sans text-xs text-stone-gray">{repo.language}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Star size={12} className="text-stone-gray" aria-hidden="true" />
            <span className="font-sans text-xs text-stone-gray">
              {repo.stargazers_count.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <GitFork size={12} className="text-stone-gray" aria-hidden="true" />
            <span className="font-sans text-xs text-stone-gray">
              {repo.forks_count.toLocaleString()}
            </span>
          </div>
        </div>
      </GlassCard>
    </FadeIn>
  );
}

export default function OpenSourceSection() {
  const { repos } = useGitHubRepos();
  const { dictionary } = useLanguage();
  const { openSource: t } = dictionary;

  if (!repos) return null;

  return (
    <SectionWrapper id="open-source" theme="light" py="xl">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <FadeIn>
          <SectionTitle
            eyebrow={t.eyebrow}
            title={t.title}
            theme="light"
            subtitle={t.subtitle}
          />
        </FadeIn>

        {/* Repos Grid — responsive cols, centered margins for 1–2 items */}
        <div
          className={`
            grid gap-5
            ${repos.length === 1
              ? "grid-cols-1 max-w-sm mx-auto"
              : repos.length === 2
                ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }
          `}
        >
          {repos.map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>

        {/* GitHub link */}
        <FadeIn delay={0.3}>
          <div className="text-center">
            <a
              href="https://github.com/quangtruong2003"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                px-5 py-2.5 rounded-[10px]
                bg-near-black text-ivory
                font-sans text-sm font-medium
                hover:bg-dark-surface
                transition-all duration-200
                hover:-translate-y-0.5
              "
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 10.5v-8z" />
              </svg>
              {t.viewAll}
            </a>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
