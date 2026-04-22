"use client";

import React from "react";
import { ReactNode } from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  theme?: "light" | "dark";
  align?: "left" | "center";
  children?: ReactNode;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  theme = "light",
  align = "center",
  children,
}: SectionTitleProps) {
  const isLight = theme === "light";

  return (
    <div
      className={`
        flex flex-col gap-4
        ${align === "center" ? "items-center text-center" : "items-start text-left"}
      `}
    >
      {eyebrow && (
        <span
          className={`
            font-sans text-xs font-medium uppercase tracking-[0.15em]
            ${isLight ? "text-terracotta" : "text-coral"}
          `}
          style={{ letterSpacing: "0.15em" }}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`
          font-serif font-medium leading-[1.15]
          ${isLight ? "text-near-black" : "text-ivory"}
        `}
        style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`
            max-w-2xl font-sans leading-[1.65]
            ${isLight ? "text-olive-gray" : "text-warm-silver"}
          `}
          style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.125rem)" }}
        >
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}
