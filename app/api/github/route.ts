import { NextResponse } from "next/server";

const GITHUB_USERNAME = "quangtruong2003";
const FEATURED_REPOSITORIES = ["SmoothScroll", "luanvan-fullstack", "ChatBot"];

interface RawGitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork?: boolean;
}

export async function GET() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "NguyenQuangTruong-Portfolio",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "GitHub upstream unavailable" },
        { status: response.status }
      );
    }

    const repos = (await response.json()) as RawGitHubRepo[];
    const publicRepos = new Map(
      repos.filter((repo) => !repo.fork).map((repo) => [repo.name, repo])
    );

    const curated = FEATURED_REPOSITORIES.flatMap((name) => {
      const repo = publicRepos.get(name);
      if (!repo) return [];
      return [
        {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
        },
      ];
    });

    return NextResponse.json(curated, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "GitHub upstream unreachable" },
      { status: 502 }
    );
  }
}
