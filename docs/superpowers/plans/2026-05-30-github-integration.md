# GitHub Realtime Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add GitHub stats to Hero section and a new Open Source section displaying pinned repos, both fetched client-side with localStorage TTL caching.

**Architecture:**
- Two custom React hooks (`useGitHubStats`, `useGitHubRepos`) handle data fetching + localStorage caching with 1-hour TTL.
- GitHub public API is called client-side; if it fails the components hide gracefully (not fail loudly).
- Open Source section is a standalone section component placed between Hero and About sections in `app/page.tsx`.

**Tech Stack:** React hooks, localStorage, GitHub REST API v3 (GraphQL for pinned repos via restapiclient), Framer Motion (already installed).

---

## File Structure

| Action | Path |
|--------|------|
| Create | `hooks/useGitHubStats.ts` |
| Create | `hooks/useGitHubRepos.ts` |
| Create | `components/sections/OpenSourceSection.tsx` |
| Modify | `components/sections/HeroSection.tsx` — replace hardcoded stats row with GitHub stats |
| Modify | `i18n/dictionary.ts` — add `openSource` section keys |
| Modify | `app/page.tsx` — insert `<OpenSourceSection />` between Hero and About |

---

## API Details

**GitHub Stars (Hero):**
- Endpoint: `GET https://api.github.com/users/quangtruong2003`
- Response field: `public_repos`
- Stars count requires either the GitHub GraphQL API (needs token) or summing `stargazers_count` from each public repo. For unauthenticated client-side, the most practical approach is fetching all repos and summing `stargazers_count` per repo.
- Alternative: `GET https://api.github.com/users/quangtruong2003/starred` returns all starred repos, count = array length. This is the cleanest unauthenticated approach for getting the user's total stars received (not stars given).
- Decision: Fetch `https://api.github.com/users/quangtruong2003` for `public_repos`, `followers`, `following`. For **total stars received** on the user's repos, paginate through `https://api.github.com/users/quangtruong2003/repos?per_page=100&sort=updated` and sum `stargazers_count`. Cache both.

**GitHub Pinned Repos (Open Source section):**
- Endpoint: GitHub GraphQL API `https://api.github.com/graphql` with a simple query.
- GraphQL query fetches pinned items (up to 6) with name, description, url, stargazerCount, primaryLanguage (name + color), and forkCount.
- Since GraphQL requires a token, use the GitHub REST API as fallback:
  `GET https://api.github.com/users/quangtruong2003/repos?sort=stars&per_page=6&type=public` — returns top 6 repos sorted by stars.
  Then display: name, description, stars, primaryLanguage, forkCount.
- This is what we'll use for the unauthenticated approach.

---

### Task 1: Create `useGitHubStats` hook

**Files:**
- Create: `hooks/useGitHubStats.ts`

The hook fetches the user's GitHub profile to get `public_repos`, `followers`, and `following`. It also sums `stargazers_count` from all public repos to get total stars received. All results are cached in localStorage under key `gh_stats` with 1-hour TTL.

- [ ] **Step 1: Create `hooks/useGitHubStats.ts`**

```typescript
// hooks/useGitHubStats.ts

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
```

- [ ] **Step 2: Add "use client" and React import**

```typescript
"use client";

import React from "react";
```

Prepend `"use client";` and `import React from "react";` to the file above.

- [ ] **Step 3: Verify file compiles**

Run: `npx tsc --noEmit hooks/useGitHubStats.ts`
Expected: No errors (may show "cannot find module" for local imports, ignore those).

---

### Task 2: Update `HeroSection.tsx` to use GitHub stats

**Files:**
- Modify: `components/sections/HeroSection.tsx` — replace hardcoded stats row with GitHub stats + existing hardcoded stats

The stats row currently shows hardcoded `{ yearsExp, projectsBuilt, technologies }`. We will prepend a GitHub stats item (`★ {stars}`) and keep the existing stats below it.

- [ ] **Step 1: Add imports to `HeroSection.tsx`**

Add after the existing imports:

```typescript
import { useGitHubStats } from "@/hooks/useGitHubStats";
```

- [ ] **Step 2: Call the hook and destructure stats**

Add inside `HeroSection` component function, after `const { dictionary, language } = useLanguage();`:

```typescript
const { stats: ghStats } = useGitHubStats();
```

- [ ] **Step 3: Replace the stats row**

Find the stats row:

```tsx
<motion.div
  variants={itemVariants}
  className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-4 border-t border-[#e8e6dc]"
>
  {[
    { value: t.yearsExp, label: language === "vi" ? "Năm Kinh Nghiệm" : "Years Experience" },
    { value: t.projectsBuilt, label: language === "vi" ? "Dự Án" : "Projects Built" },
    { value: t.technologies, label: language === "vi" ? "Công Nghệ" : "Technologies" },
  ].map(({ value, label }) => (
    <div key={label} className="flex flex-col gap-0.5 text-center">
      <span
        className="font-serif font-medium text-terracotta"
        style={{ fontSize: "1.75rem" }}
      >
        {value}
      </span>
      <span className="font-sans text-xs text-stone-gray">{label}</span>
    </div>
  ))}
</motion.div>
```

Replace with:

```tsx
{ghStats && (
  <motion.div
    variants={itemVariants}
    className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-4 border-t border-[#e8e6dc]"
  >
    {[
      {
        value: ghStats.totalStars.toString(),
        label: language === "vi" ? "Stars" : "Stars",
        prefix: "★",
      },
      { value: t.yearsExp, label: language === "vi" ? "Năm Kinh Nghiệm" : "Years Experience" },
      { value: t.projectsBuilt, label: language === "vi" ? "Dự Án" : "Projects Built" },
      { value: t.technologies, label: language === "vi" ? "Công Nghệ" : "Technologies" },
    ].map(({ value, label, prefix }) => (
      <div key={label} className="flex flex-col gap-0.5 text-center">
        <span
          className="font-serif font-medium text-terracotta"
          style={{ fontSize: "1.75rem" }}
        >
          {prefix && <span className="mr-0.5">{prefix}</span>}
          {value}
        </span>
        <span className="font-sans text-xs text-stone-gray">{label}</span>
      </div>
    ))}
  </motion.div>
)}
```

---

### Task 3: Create `useGitHubRepos` hook

**Files:**
- Create: `hooks/useGitHubRepos.ts`

Fetches top 6 public repos from `quangtruong2003` sorted by stars via REST API. Caches in localStorage under key `gh_repos` with 1-hour TTL.

- [ ] **Step 1: Create `hooks/useGitHubRepos.ts`**

```typescript
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
```

- [ ] **Step 2: Verify file compiles**

Run: `npx tsc --noEmit hooks/useGitHubRepos.ts`
Expected: No type errors.

---

### Task 4: Create `OpenSourceSection.tsx`

**Files:**
- Create: `components/sections/OpenSourceSection.tsx`

The section displays a grid of up to 6 GitHub repo cards. Each card shows: repo name, description, stars, forks, primary language (with color dot), and a GitHub link icon. Falls back gracefully if repos are null.

- [ ] **Step 1: Create `components/sections/OpenSourceSection.tsx`**

```tsx
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
  const { dictionary, language } = useLanguage();
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

        {/* Repos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>

        {/* GitHub link */}
        <FadeIn delay={0.3}>
          <div className="text-center">
            <a
              href={`https://github.com/quangtruong2003`}
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
```

---

### Task 5: Add `openSource` dictionary keys

**Files:**
- Modify: `i18n/dictionary.ts` — add `openSource` to Dictionary interface and both `vi`/`en` objects

- [ ] **Step 1: Add to Dictionary interface**

```typescript
openSource: {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewAll: string;
};
```

Add after the `projects` entry in the `Dictionary` interface.

- [ ] **Step 2: Add Vietnamese translations**

```typescript
openSource: {
  eyebrow: "Open Source",
  title: "Trên GitHub",
  subtitle: "Những repo nguồn mở của tôi — thả sao, fork, và contributing.",
  viewAll: "Xem Tất Cả trên GitHub",
},
```

Add after the `projects` entry in the `vi` object.

- [ ] **Step 3: Add English translations**

```typescript
openSource: {
  eyebrow: "Open Source",
  title: "On GitHub",
  subtitle: "My open-source work — starring, forking, and contributing.",
  viewAll: "View All on GitHub",
},
```

Add after the `projects` entry in the `en` object.

---

### Task 6: Mount `OpenSourceSection` in page

**Files:**
- Modify: `app/page.tsx` — import and insert `<OpenSourceSection />` between `<HeroSection />` and `<AboutSection />`

- [ ] **Step 1: Add import**

```typescript
import OpenSourceSection from "@/components/sections/OpenSourceSection";
```

Add after the `HeroSection` import.

- [ ] **Step 2: Insert component**

```tsx
<HeroSection />
<OpenSourceSection />
<AboutSection />
```

Replace the current `<HeroSection />` / `<AboutSection />` sequence.

---

### Task 7: Verify build

**Files:**
- Run: `npm run build`

Expected: Build completes without errors.

---

### Task 8: Manual verification

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: Dev server starts at http://localhost:3000

- [ ] **Step 2: Verify Hero shows GitHub stars**

Navigate to the page. In the Hero stats row, there should be a `★` followed by the total star count from the GitHub API. If API fails, the entire stats row hides (graceful degradation).

- [ ] **Step 3: Verify Open Source section appears**

Scroll down past Hero. The "Open Source" section should appear with up to 6 repo cards showing name, description, language, stars, and forks.

- [ ] **Step 4: Verify localStorage caching**

Open DevTools > Application > Local Storage. Keys `gh_stats` and `gh_repos` should appear after first load. Refresh the page — the second load should be instant (from cache).

---

### Task 9: Commit

- [ ] **Commit all changes**

```bash
git add hooks/useGitHubStats.ts hooks/useGitHubRepos.ts components/sections/OpenSourceSection.tsx components/sections/HeroSection.tsx i18n/dictionary.ts app/page.tsx
git commit -m "feat: add GitHub realtime integration — stats in Hero and Open Source section"
```
