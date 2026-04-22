"use client";

import React, { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  theme?: "light" | "dark";
  id?: string;
  className?: string;
  py?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const paddingMap = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-28",
  xl: "py-24 md:py-36",
  "2xl": "py-28 md:py-44",
};

export default function SectionWrapper({
  children,
  theme = "light",
  id,
  className = "",
  py = "lg",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`
        w-full
        ${theme === "dark" ? "bg-near-black" : "bg-parchment"}
        ${paddingMap[py]}
        ${className}
      `}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {children}
      </div>
    </section>
  );
}
