import { NextResponse } from "next/server";

const GITHUB_OWNER = "quangtruong2003";
const REPO_NAME = "SmoothScroll";
const REPO_SLUG = `${GITHUB_OWNER}/${REPO_NAME}`;

interface RawGitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface RawGitHubRelease {
  draft?: boolean;
  tag_name?: string;
  assets?: Array<{ download_count?: number }>;
}

interface ShieldsBadgeJson {
  value?: string;
  message?: string;
}

export interface SmoothScrollTelemetry {
  id: number;
  name: string;
  description: string;
  html_url: string;
  releases_url: string;
  website_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  downloads_count: number;
  downloads_exact: boolean;
  downloads_badge: string;
  latest_release: string;
}

function parseBadgeNumber(raw: string | undefined): {
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

function toShieldsJsonUrl(badgeUrl: string): string {
  const url = new URL(badgeUrl);
  if (!url.pathname.endsWith(".json")) {
    url.pathname = url.pathname.replace(/\.(svg|png)$/i, "") + ".json";
  }
  url.search = "";
  return url.toString();
}

async function resolveReadmeBadgeUrls(): Promise<{
  downloadsJsonUrl: string;
  releaseJsonUrl: string;
}> {
  const defaultDownloads = `https://img.shields.io/github/downloads/${REPO_SLUG}/total.json`;
  const defaultRelease = `https://img.shields.io/github/v/release/${REPO_SLUG}.json`;

  try {
    const readmeRes = await fetch(
      `https://raw.githubusercontent.com/${REPO_SLUG}/HEAD/README.md`,
      { next: { revalidate: 900 } }
    );
    if (!readmeRes.ok) {
      return { downloadsJsonUrl: defaultDownloads, releaseJsonUrl: defaultRelease };
    }
    const markdown = await readmeRes.text();
    const downloadsMatch = markdown.match(
      /https:\/\/img\.shields\.io\/github\/downloads\/[^\s)"']+/i
    );
    const releaseMatch = markdown.match(
      /https:\/\/img\.shields\.io\/github\/v\/release\/[^\s)"']+/i
    );

    return {
      downloadsJsonUrl: downloadsMatch
        ? toShieldsJsonUrl(downloadsMatch[0])
        : defaultDownloads,
      releaseJsonUrl: releaseMatch ? toShieldsJsonUrl(releaseMatch[0]) : defaultRelease,
    };
  } catch {
    return { downloadsJsonUrl: defaultDownloads, releaseJsonUrl: defaultRelease };
  }
}

async function fetchShieldsValue(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "NguyenQuangTruong-Portfolio" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return undefined;
    const json = (await res.json()) as ShieldsBadgeJson;
    return json.value ?? json.message;
  } catch {
    return undefined;
  }
}

async function fetchExactGitHubTelemetry(): Promise<{
  repo?: RawGitHubRepo;
  exactDownloads?: number;
  latestRelease?: string;
}> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "NguyenQuangTruong-Portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const result: {
    repo?: RawGitHubRepo;
    exactDownloads?: number;
    latestRelease?: string;
  } = {};

  try {
    const repoRes = await fetch(`https://api.github.com/repos/${REPO_SLUG}`, {
      headers,
      next: { revalidate: 600 },
    });
    if (repoRes.ok) {
      result.repo = (await repoRes.json()) as RawGitHubRepo;
    }

    let page = 1;
    let totalDownloads = 0;
    let gotAnyReleases = false;
    while (page <= 5) {
      const relRes = await fetch(
        `https://api.github.com/repos/${REPO_SLUG}/releases?per_page=100&page=${page}`,
        { headers, next: { revalidate: 600 } }
      );
      if (!relRes.ok) break;
      const releases = (await relRes.json()) as RawGitHubRelease[];
      if (!Array.isArray(releases) || releases.length === 0) break;

      gotAnyReleases = true;
      for (const rel of releases) {
        if (rel.draft) continue;
        if (!result.latestRelease && rel.tag_name) {
          result.latestRelease = rel.tag_name;
        }
        for (const asset of rel.assets ?? []) {
          totalDownloads += asset.download_count ?? 0;
        }
      }
      if (releases.length < 100) break;
      page += 1;
    }

    if (gotAnyReleases && totalDownloads > 0) {
      result.exactDownloads = totalDownloads;
    }
  } catch {
    // Graceful fallback to README Shields telemetry below
  }

  return result;
}

export async function GET() {
  const [{ downloadsJsonUrl, releaseJsonUrl }, ghData] = await Promise.all([
    resolveReadmeBadgeUrls(),
    fetchExactGitHubTelemetry(),
  ]);

  const [shieldsDownloads, shieldsRelease, shieldsStars, shieldsForks] =
    await Promise.all([
      fetchShieldsValue(downloadsJsonUrl),
      fetchShieldsValue(releaseJsonUrl),
      ghData.repo
        ? Promise.resolve(undefined)
        : fetchShieldsValue(`https://img.shields.io/github/stars/${REPO_SLUG}.json`),
      ghData.repo
        ? Promise.resolve(undefined)
        : fetchShieldsValue(`https://img.shields.io/github/forks/${REPO_SLUG}.json`),
    ]);

  const parsedDownloads = parseBadgeNumber(shieldsDownloads);
  const parsedStars = parseBadgeNumber(shieldsStars);
  const parsedForks = parseBadgeNumber(shieldsForks);

  const hasAnyLiveSource =
    Boolean(ghData.repo) ||
    typeof ghData.exactDownloads === "number" ||
    Boolean(parsedDownloads) ||
    Boolean(parsedStars);

  if (!hasAnyLiveSource) {
    return NextResponse.json(
      { error: "GitHub & Shields upstream unreachable" },
      { status: 502 }
    );
  }

  const exactDownloads = ghData.exactDownloads;
  const downloadsCount = exactDownloads ?? parsedDownloads?.count ?? 0;
  const downloadsExact = typeof exactDownloads === "number" && exactDownloads > 0;

  const payload: SmoothScrollTelemetry = {
    id: ghData.repo?.id ?? 1,
    name: ghData.repo?.name ?? REPO_NAME,
    description:
      ghData.repo?.description ??
      "Free smooth-scrolling utility for Windows 10/11 — velocity-based 120 Hz easing engine, per-app profiles, UWP support, zero telemetry. Built with Rust + Tauri.",
    html_url: ghData.repo?.html_url ?? `https://github.com/${REPO_SLUG}`,
    releases_url: `https://github.com/${REPO_SLUG}/releases`,
    website_url: "https://smoothscroll.top/",
    language: ghData.repo?.language ?? "Rust / TypeScript",
    stargazers_count: ghData.repo?.stargazers_count ?? parsedStars?.count ?? 0,
    forks_count: ghData.repo?.forks_count ?? parsedForks?.count ?? 0,
    downloads_count: downloadsCount,
    downloads_exact: downloadsExact,
    downloads_badge: parsedDownloads?.badge ?? (downloadsCount > 0 ? String(downloadsCount) : ""),
    latest_release: ghData.latestRelease ?? shieldsRelease ?? "",
  };

  return NextResponse.json([payload], {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
