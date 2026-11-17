import { ViewTransition } from "react";

export default function ProjectLoading() {
  return (
    <ViewTransition exit="folio-skeleton-out">
      <div className="min-h-[100dvh] py-16">
        <div className="site-container">
          <div className="paper-sheet rounded-[4px] p-8">
            <div className="h-4 w-32 rounded-[2px] bg-[var(--bg-sheet-mid)]" />
            <div className="mt-5 h-12 w-2/3 rounded-[3px] bg-[var(--bg-sheet-mid)]" />
            <div className="mt-8 h-64 w-full rounded-[4px] bg-[var(--bg-sheet-mid)]" />
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
