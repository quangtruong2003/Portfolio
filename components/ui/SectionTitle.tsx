import type { ReactNode } from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  children,
}: SectionTitleProps) {
  return (
    <header className={`mb-8 flex flex-col gap-4 md:mb-12 md:gap-5 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
      {eyebrow && <p className="section-kicker">{eyebrow}</p>}
      <h2 className="section-heading">{title}</h2>
      {subtitle && <p className="section-copy">{subtitle}</p>}
      {children}
    </header>
  );
}
