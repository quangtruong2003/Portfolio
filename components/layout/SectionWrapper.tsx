import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
  py?: "sm" | "md" | "lg" | "xl";
}

const paddingMap = {
  sm: "py-10 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-14 md:py-20",
  xl: "py-16 md:py-24",
};

export default function SectionWrapper({
  children,
  id,
  className = "",
  py = "lg",
}: SectionWrapperProps) {
  return (
    <section id={id} className={["border-t", "hairline", paddingMap[py], className].filter(Boolean).join(" ")}>
      <div className="site-container">{children}</div>
    </section>
  );
}
