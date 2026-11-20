import { ViewTransition } from "react";

export default function ProjectLoading() {
  return (
    <ViewTransition exit="folio-forward">
      <div className="min-h-[100dvh] py-16">
        <div className="site-container">
          <div className="studio-surface p-8">
            <div className="h-5 w-32 animate-pulse rounded-md bg-[var(--surface-muted)]" />
            <div className="mt-5 h-12 w-2/3 animate-pulse rounded-lg bg-[var(--surface-muted)]" />
            <div className="mt-8 h-64 w-full animate-pulse rounded-xl bg-[var(--surface-subtle)]" />
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
