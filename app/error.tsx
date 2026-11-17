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
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--bg-canvas)] p-6 text-[var(--ink-primary)]">
      <div className="paper-stack paper-chamfer w-full max-w-lg p-8 text-left">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-[var(--accent-vermilion)]/35 bg-[var(--accent-vermilion-wash)] text-[var(--accent-vermilion)]">
          <AlertTriangle size={20} aria-hidden="true" />
        </div>

        <h1 className="mt-5 font-serif text-3xl font-medium text-[var(--ink-primary)]">
          Page interrupted
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
          An unexpected render error occurred. Reload this view or return to the main portfolio sheet.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[3px] border border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] px-4 font-sans text-sm font-medium text-[var(--bg-sheet-top)] transition-[background-color,transform] duration-150 hover:bg-[var(--accent-vermilion-hover)] active:scale-[0.97]"
          >
            <RotateCcw size={15} aria-hidden="true" />
            <span>Reload view</span>
          </button>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] px-4 font-sans text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)]"
          >
            Return home
          </Link>
        </div>

        {isDev && error?.message && (
          <details className="paper-well mt-6 rounded-[3px] p-4 text-xs">
            <summary className="cursor-pointer font-mono font-medium text-[var(--error-crimson)]">
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
