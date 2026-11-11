import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
  py?: "sm" | "md" | "lg" | "xl";
}

const paddingMap = {
  sm: "py-14 md:py-20",
  md: "py-18 md:py-24",
  lg: "py-20 md:py-28",
  xl: "py-24 md:py-32",
};

export default function SectionWrapper({
  children,
  id,
  className = "",
  py = "lg",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`scroll-mt-20 border-t hairline ${paddingMap[py]} ${className}`}>
      <div className="site-container">{children}</div>
    </section>
  );
}
