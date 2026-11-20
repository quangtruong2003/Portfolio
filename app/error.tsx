"use client";

import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--surface-ground)] p-6 text-[var(--ink-primary)]">
      <div className="studio-surface w-full max-w-lg p-8 text-left">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--status-error)]/25 bg-[var(--status-error-bg)] text-[var(--status-error)]">
          <AlertTriangle size={20} aria-hidden="true" />
        </div>

        <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.025em] text-[var(--ink-primary)]">
          Page interrupted
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
          An unexpected render error occurred. Reload this view or return to the main portfolio.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 font-sans text-sm font-medium text-[var(--surface-elevated)] transition-[background-color,transform] duration-150 hover:bg-[var(--accent-primary-hover)] active:scale-[0.96]"
          >
            <RotateCcw size={15} aria-hidden="true" />
            <span>Reload view</span>
          </button>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 font-sans text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color] duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            Return home
          </Link>
        </div>

        {isDev && error?.message && (
          <details className="studio-inset mt-6 p-4 text-xs">
            <summary className="cursor-pointer font-mono font-medium text-[var(--status-error)]">
              Diagnostic trace
            </summary>
            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs text-[var(--ink-secondary)]">
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
