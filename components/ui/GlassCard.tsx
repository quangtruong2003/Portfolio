"use client";

import React from "react";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  hoverable = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative
        bg-white/60
        backdrop-blur-xl
        border border-white/70
        rounded-[20px]
        shadow-[0_4px_32px_rgba(0,0,0,0.08)]
        p-6 md:p-8
        ${hoverable ? "cursor-pointer transition-all duration-300 hover:bg-white/80 hover:shadow-[0_8px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {/* Subtle top highlight */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      {children}
    </div>
  );
}
