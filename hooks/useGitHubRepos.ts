"use client";

import React from "react";

const GITHUB_USERNAME = "quangtruong2003";
const CACHE_KEY = "gh_repos";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const PER_PAGE = 6;

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
}

interface CacheEntry {
  data: GitHubRepo[];
  fetchedAt: number;
}

function getCached(key: string): GitHubRepo[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&direction=desc&per_page=${PER_PAGE}&type=public`,
    { headers: { Accept: "application/vnd.github.v3+json" } }
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  const repos = await res.json() as Array<{
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
  }>;
  return repos;
}

export function useGitHubRepos() {
  const [repos, setRepos] = React.useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const cached = getCached(CACHE_KEY);
    if (cached) {
      setRepos(cached);
      return;
    }

    setLoading(true);
    fetchGitHubRepos()
      .then((data) => {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, fetchedAt: Date.now() }));
        setRepos(data);
      })
      .catch(() => {
        // Graceful: hide section on error
      })
      .finally(() => setLoading(false));
  }, []);

  return { repos, loading };
}
