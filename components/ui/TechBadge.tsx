"use client";

import React from "react";

interface TechBadgeProps {
  label: string;
  variant?: "light" | "dark" | "accent";
  size?: "sm" | "md";
  className?: string;
}

export default function TechBadge({
  label,
  variant = "light",
  size = "sm",
  className = "",
}: TechBadgeProps) {
  const variantStyles = {
    light: "bg-warm-sand/70 text-charcoal-warm border border-border-warm",
    dark: "bg-dark-surface/80 text-warm-silver border border-border-dark",
    accent: "bg-terracotta/10 text-terracotta border border-terracotta/20",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3.5 py-1 text-sm",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-sans font-medium
        transition-all duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {label}
    </span>
  );
}
