import type { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  inverted?: boolean;
  children?: ReactNode;
}

export default function SectionTitle({
  title,
  subtitle,
  inverted = false,
  children,
}: SectionTitleProps) {
  return (
    <header
      className="mb-10 grid grid-cols-1 gap-4 border-b pb-7 md:mb-14 md:grid-cols-12 md:items-end md:gap-8"
      style={{
        borderColor: inverted ? "var(--engine-border)" : "var(--border-subtle)",
      }}
    >
      <div className={children ? "md:col-span-8" : "md:col-span-10"}>
        <h2
          className={
            "section-heading " +
            (inverted ? "text-[var(--engine-ink)]" : "text-[var(--ink-primary)]")
          }
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={
              "mt-4 max-w-[62ch] text-base leading-relaxed " +
              (inverted ? "text-[var(--engine-muted)]" : "text-[var(--ink-secondary)]")
            }
          >
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="flex flex-col items-start gap-3 md:col-span-4 md:items-end md:text-right">
          {children}
        </div>
      )}
    </header>
  );
}
