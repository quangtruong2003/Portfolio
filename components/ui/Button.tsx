"use client";

import React, { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonVariant =
  | "vermilion"
  | "terracotta"
  | "paper"
  | "warm-sand"
  | "dark"
  | "ghost"
  | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  vermilion:
    "border border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[var(--bg-sheet-top)] hover:border-[var(--accent-vermilion-hover)] hover:bg-[var(--accent-vermilion-hover)]",
  terracotta:
    "border border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] text-[var(--bg-sheet-top)] hover:border-[var(--accent-vermilion-hover)] hover:bg-[var(--accent-vermilion-hover)]",
  paper:
    "border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] text-[var(--ink-primary)] shadow-[0_2px_4px_rgba(24,23,21,0.06)] hover:border-[var(--ink-primary)] hover:bg-[var(--bg-sheet-mid)]",
  "warm-sand":
    "border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] text-[var(--ink-primary)] shadow-[0_2px_4px_rgba(24,23,21,0.06)] hover:border-[var(--ink-primary)] hover:bg-[var(--bg-sheet-mid)]",
  dark:
    "border border-[var(--ink-primary)] bg-[var(--ink-primary)] text-[var(--bg-sheet-top)] hover:border-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--ink-primary)] hover:border-[var(--rule-cut)] hover:bg-[var(--bg-sheet-top)]",
  outline:
    "border border-[var(--accent-vermilion)] bg-transparent text-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)] hover:text-[var(--bg-sheet-top)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-3.5 text-sm gap-1.5",
  md: "min-h-12 px-5 text-sm gap-2",
  lg: "min-h-12 px-6 text-base gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "vermilion",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      loading = false,
      fullWidth = false,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`inline-flex cursor-pointer items-center justify-center rounded-[3px] font-sans font-medium transition-[background-color,color,border-color,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--focus-ring)] ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${isDisabled ? "cursor-not-allowed opacity-55" : "enabled:active:scale-[0.97]"} ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>{children}</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === "left" && <Icon size={iconSize} aria-hidden="true" />}
            <span>{children}</span>
            {Icon && iconPosition === "right" && <Icon size={iconSize} aria-hidden="true" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
