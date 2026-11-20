import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--surface-ground)] p-6 text-[var(--ink-primary)]">
      <div className="studio-surface w-full max-w-lg p-8">
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-[var(--ink-primary)]">
          404 — Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
          The page or project dossier you requested does not exist. Return to the main portfolio to browse verified work.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 font-sans text-sm font-medium text-[var(--surface-elevated)] transition-[background-color,border-color,transform] duration-150 hover:bg-[var(--accent-primary-hover)] active:scale-[0.96]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          <span>Return home</span>
        </Link>
      </div>
    </main>
  );
}
