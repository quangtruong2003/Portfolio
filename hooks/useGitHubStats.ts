"use client";

import React from "react";

const GITHUB_USERNAME = "quangtruong2003";
const CACHE_KEY = "gh_stats";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  fetchedAt: number;
}

function getCached(key: string): GitHubStats | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GitHubStats;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function fetchGitHubStats(): Promise<GitHubStats> {
  // Fetch user profile
  const profileRes = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    { headers: { Accept: "application/vnd.github.v3+json" } }
  );
  if (!profileRes.ok) throw new Error("Failed to fetch GitHub profile");
  const profile = await profileRes.json() as {
    public_repos: number;
    followers: number;
    following: number;
  };

  // Fetch all repos to sum stars (paginate through all pages)
  let page = 1;
  let totalStars = 0;
  let hasMore = true;
  while (hasMore) {
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`,
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
    if (!reposRes.ok) throw new Error("Failed to fetch repos");
    const repos = await reposRes.json() as Array<{ stargazers_count: number }>;
    if (repos.length === 0) {
      hasMore = false;
    } else {
      totalStars += repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      hasMore = repos.length === 100;
      page++;
    }
  }

  return {
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    totalStars,
    fetchedAt: Date.now(),
  };
}

export function useGitHubStats() {
  const [stats, setStats] = React.useState<GitHubStats | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Try cache first
    const cached = getCached(CACHE_KEY);
    if (cached) {
      setStats(cached);
      return;
    }

    setLoading(true);
    fetchGitHubStats()
      .then((data) => {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        setStats(data);
      })
      .catch(() => {
        // Graceful: hide stats on error — do nothing, leave null
      })
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
