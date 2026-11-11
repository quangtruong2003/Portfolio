"use client";

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "quangtruong2003";
const CACHE_KEY = "gh_repos";
const CACHE_TTL_MS = 60 * 60 * 1000;

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface CacheEntry {
  data: GitHubRepo[];
  fetchedAt: number;
}

function getCached(): GitHubRepo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CacheEntry;
    if (!Array.isArray(cached.data) || Date.now() - cached.fetchedAt > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!response.ok) throw new Error("GitHub repositories could not be loaded");

  const repos = await response.json() as Array<GitHubRepo & { fork?: boolean }>;
  return repos.filter((repo) => !repo.fork).slice(0, 4);
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadRepos = async () => {
      const cached = getCached();
      if (cached) {
        await Promise.resolve();
        if (!cancelled) {
          setRepos(cached);
          setLoading(false);
        }
        return;
      }

      try {
        const data = await fetchGitHubRepos();
        if (cancelled) return;
        setRepos(data);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data, fetchedAt: Date.now() }));
        } catch {
          // Keep fetched data available when storage is blocked.
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadRepos();
    return () => {
      cancelled = true;
    };
  }, []);

  return { repos, loading, error };
}
