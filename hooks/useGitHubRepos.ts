"use client";

import React from "react";

const GITHUB_USERNAME = "quangtruong2003";
const CACHE_KEY = "gh_repos";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? "";

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

const PINNED_REPOS_QUERY = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: PINNED_REPOS_QUERY }),
  });

  if (!res.ok) throw new Error("Failed to fetch pinned repos");
  const json = await res.json() as {
    data?: {
      user?: {
        pinnedItems?: {
          nodes?: Array<{
            id: number;
            name: string;
            description: string | null;
            url: string;
            stargazerCount: number;
            forkCount: number;
            primaryLanguage?: { name: string } | null;
            repositoryTopics?: { nodes?: Array<{ topic?: { name: string } }> };
          }>;
        };
      };
    };
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];

  return nodes.map((node) => ({
    id: node.id,
    name: node.name,
    description: node.description,
    html_url: node.url,
    stargazers_count: node.stargazerCount,
    forks_count: node.forkCount,
    language: node.primaryLanguage?.name ?? null,
    topics: node.repositoryTopics?.nodes?.map((n) => n.topic?.name ?? "").filter(Boolean) ?? [],
  }));
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
