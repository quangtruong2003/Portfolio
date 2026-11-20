"use client";

import React, { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost" | "outline";
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
  primary:
    "border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--surface-elevated)] shadow-[0_1px_2px_rgba(17,23,20,0.12)] hover:border-[var(--accent-primary-hover)] hover:bg-[var(--accent-primary-hover)]",
  secondary:
    "border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--ink-primary)] shadow-[0_1px_2px_rgba(17,23,20,0.05)] hover:border-[var(--ink-primary)] hover:bg-[var(--surface-subtle)]",
  dark:
    "border border-[var(--ink-primary)] bg-[var(--ink-primary)] text-[var(--surface-elevated)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--ink-primary)] hover:border-[var(--border-subtle)] hover:bg-[var(--surface-elevated)]",
  outline:
    "border border-[var(--accent-primary)] bg-transparent text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--surface-elevated)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-3.5 text-sm gap-1.5",
  md: "min-h-12 px-5 text-sm gap-2",
  lg: "min-h-12 px-6 text-base gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
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
    const iconSize = size === "sm" ? 15 : size === "lg" ? 18 : 16;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`inline-flex cursor-pointer items-center justify-center rounded-lg font-sans font-medium transition-[background-color,color,border-color,transform] duration-150 ease-[var(--ease-out-strong)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--focus-ring)] ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${isDisabled ? "cursor-not-allowed opacity-55" : "enabled:active:scale-[0.96]"} ${className}`}
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
