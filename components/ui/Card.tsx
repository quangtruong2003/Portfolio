"use client";

import React from "react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "ivory" | "dark" | "glass" | "outline";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantClasses = {
  ivory:
    "bg-ivory border border-[#f0eee6] shadow-[0_2px_16px_rgba(0,0,0,0.06)]",
  dark: "bg-dark-surface border border-[#30302e]",
  glass:
    "bg-white/70 backdrop-blur-[16px] border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)]",
  outline:
    "bg-transparent border border-[#e8e6dc] shadow-none",
};

export default function Card({
  children,
  variant = "ivory",
  padding = "md",
  hoverable = false,
  className = "",
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-[16px]
        ${paddingClasses[padding]}
        ${variantClasses[variant]}
        ${hoverable ? "cursor-pointer transition-all duration-300 hover:shadow-[0_0_0_1.5px_#c96442] hover:-translate-y-0.5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
