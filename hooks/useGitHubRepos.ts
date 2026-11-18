"use client";

import { useEffect, useState } from "react";
import type { Language } from "@/i18n/dictionary";

const GITHUB_OWNER = "quangtruong2003";
const REPO_NAME = "SmoothScroll";
const REPO_SLUG = `${GITHUB_OWNER}/${REPO_NAME}`;
const CACHE_KEY = "gh_smoothscroll_live_v2";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  releases_url: string;
  website_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  downloads_count: number;
  downloads_exact: boolean;
  downloads_badge: string;
  latest_release: string;
}

interface CacheEntry {
  data: GitHubRepo[];
  fetchedAt: number;
}

interface ShieldsJson {
  value?: string;
  message?: string;
}

let inFlightPromise: Promise<GitHubRepo[]> | null = null;

function parseBadgeCount(raw: string | undefined): {
  count: number;
  exact: boolean;
  badge: string;
} | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/,/g, "");
  const match = cleaned.match(/^(\d+(?:\.\d+)?)\s*([kKmM])?\+?$/);
  if (!match) return null;
  const num = Number.parseFloat(match[1]);
  if (!Number.isFinite(num)) return null;
  const unit = match[2]?.toLowerCase();
  if (unit === "m") {
    return { count: Math.round(num * 1_000_000), exact: false, badge: cleaned };
  }
  if (unit === "k") {
    return { count: Math.round(num * 1_000), exact: false, badge: cleaned };
  }
  return { count: Math.round(num), exact: !cleaned.endsWith("+"), badge: cleaned };
}

export function formatRepoDownloads(
  repo: GitHubRepo | null | undefined,
  language: Language
): string | null {
  if (!repo || repo.downloads_count <= 0) return null;
  const formatter = new Intl.NumberFormat(language === "vi" ? "vi-VN" : "en-US");
  const formatted = formatter.format(repo.downloads_count);
  return repo.downloads_exact ? formatted : `${formatted}+`;
}

function getCached(): GitHubRepo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CacheEntry;
    if (
      !Array.isArray(cached.data) ||
      cached.data.length === 0 ||
      typeof cached.data[0]?.downloads_count !== "number" ||
      Date.now() - cached.fetchedAt > CACHE_TTL_MS
    ) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

async function fetchShieldsFallback(): Promise<GitHubRepo[]> {
  const [dlRes, relRes, starsRes, forksRes] = await Promise.all([
    fetch(`https://img.shields.io/github/downloads/${REPO_SLUG}/total.json`),
    fetch(`https://img.shields.io/github/v/release/${REPO_SLUG}.json`),
    fetch(`https://img.shields.io/github/stars/${REPO_SLUG}.json`),
    fetch(`https://img.shields.io/github/forks/${REPO_SLUG}.json`),
  ]);

  if (!dlRes.ok && !starsRes.ok) {
    throw new Error("Upstream telemetry unavailable");
  }

  const [dlJson, relJson, starsJson, forksJson] = (await Promise.all([
    dlRes.ok ? dlRes.json() : {},
    relRes.ok ? relRes.json() : {},
    starsRes.ok ? starsRes.json() : {},
    forksRes.ok ? forksRes.json() : {},
  ])) as [ShieldsJson, ShieldsJson, ShieldsJson, ShieldsJson];

  const dlParsed = parseBadgeCount(dlJson.value ?? dlJson.message);
  const starsParsed = parseBadgeCount(starsJson.value ?? starsJson.message);
  const forksParsed = parseBadgeCount(forksJson.value ?? forksJson.message);
  const releaseTag = (relJson.value ?? relJson.message ?? "").trim();

  return [
    {
      id: 1,
      name: REPO_NAME,
      description:
        "Free smooth-scrolling utility for Windows 10/11 — velocity-based 120 Hz easing engine, per-app profiles, UWP support, zero telemetry. Built with Rust + Tauri.",
      html_url: `https://github.com/${REPO_SLUG}`,
      releases_url: `https://github.com/${REPO_SLUG}/releases`,
      website_url: "https://smoothscroll.top/",
      language: "Rust / TypeScript",
      stargazers_count: starsParsed?.count ?? 0,
      forks_count: forksParsed?.count ?? 0,
      downloads_count: dlParsed?.count ?? 0,
      downloads_exact: dlParsed?.exact ?? false,
      downloads_badge: dlParsed?.badge ?? "",
      latest_release: releaseTag,
    },
  ];
}

async function fetchSmoothScrollTelemetry(): Promise<GitHubRepo[]> {
  if (inFlightPromise) return inFlightPromise;

  inFlightPromise = (async () => {
    try {
      const proxyRes = await fetch("/api/github");
      if (proxyRes.ok) {
        const proxyData = (await proxyRes.json()) as GitHubRepo[];
        if (Array.isArray(proxyData) && proxyData.length > 0) {
          return proxyData;
        }
      }
    } catch {
      // Fall back to direct Shields JSON endpoints
    }

    return fetchShieldsFallback();
  })();

  try {
    return await inFlightPromise;
  } finally {
    inFlightPromise = null;
  }
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const loadRepos = async () => {
      const cached = getCached();
      if (cached) {
        if (!cancelled) {
          setRepos(cached);
          setLoading(false);
          setError(false);
        }
        return;
      }

      try {
        const data = await fetchSmoothScrollTelemetry();
        if (cancelled) return;
        setRepos(data);
        setError(false);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data, fetchedAt: Date.now() })
          );
        } catch {
          // Storage blocked in private mode
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
  }, [retryCount]);

  const retry = () => {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch {
      // Ignore storage error
    }
    setError(false);
    setLoading(true);
    setRetryCount((count) => count + 1);
  };

  const smoothScrollRepo = repos?.[0] ?? null;

  return { repos, smoothScrollRepo, loading, error, retry };
}
