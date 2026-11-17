import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--bg-canvas)] p-6 text-[var(--ink-primary)]">
      <div className="paper-stack paper-chamfer w-full max-w-lg p-8">
        <h1 className="font-serif text-4xl font-medium leading-tight text-[var(--ink-primary)]">
          Folio 404 — Sheet not in archive.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
          The page or project dossier you requested could not be found. Return to the main portfolio index to browse verified work.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-4 font-sans text-sm font-medium text-[var(--bg-sheet-top)] transition-[background-color,border-color] duration-150 hover:border-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          <span>Return to atelier</span>
        </Link>
      </div>
    </main>
  );
}
