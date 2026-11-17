import type { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  asideMeta?: string;
  inverted?: boolean;
  children?: ReactNode;
}

export default function SectionTitle({
  title,
  subtitle,
  asideMeta,
  inverted = false,
  children,
}: SectionTitleProps) {
  return (
    <header className="mb-10 grid grid-cols-1 gap-4 border-b pb-7 md:mb-14 md:grid-cols-12 md:items-end md:gap-8" style={{ borderColor: inverted ? "var(--rule-on-press)" : "var(--rule-cut)" }}>
      <div className="md:col-span-8">
        <h2
          className={
            "section-heading " +
            (inverted ? "text-[var(--ink-on-press)]" : "text-[var(--ink-primary)]")
          }
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={
              "mt-4 max-w-[62ch] text-base leading-relaxed " +
              (inverted ? "text-[var(--muted-on-press)]" : "text-[var(--ink-secondary)]")
            }
          >
            {subtitle}
          </p>
        )}
      </div>

      {(asideMeta || children) && (
        <div className="flex flex-col items-start gap-3 md:col-span-4 md:items-end md:text-right">
          {asideMeta && (
            <span
              className={
                "rounded-[2px] border px-2.5 py-1 font-mono text-xs tracking-[0.04em] tabular-nums " +
                (inverted
                  ? "border-[var(--rule-on-press)] bg-[var(--bg-press-well)] text-[var(--muted-on-press)]"
                  : "border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] text-[var(--ink-tertiary)]")
              }
            >
              {asideMeta}
            </span>
          )}
          {children}
        </div>
      )}
    </header>
  );
}
