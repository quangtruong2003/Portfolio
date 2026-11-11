"use client";

import React, { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "terracotta" | "warm-sand" | "dark" | "ghost" | "outline" | "social-github" | "social-linkedin";
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
  terracotta: "border border-terracotta bg-terracotta text-ivory hover:border-near-black hover:bg-near-black",
  "warm-sand": "border border-border-warm bg-transparent text-near-black hover:bg-warm-sand",
  dark: "border border-near-black bg-near-black text-ivory hover:bg-dark-warm",
  ghost: "border border-transparent bg-transparent text-near-black hover:border-border-warm",
  outline: "border border-terracotta bg-transparent text-terracotta hover:bg-terracotta hover:text-ivory",
  "social-github": "border border-near-black bg-near-black text-ivory hover:bg-dark-warm",
  "social-linkedin": "border border-near-black bg-near-black text-ivory hover:bg-dark-warm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-3 text-sm gap-1.5",
  md: "min-h-12 px-5 text-sm gap-2",
  lg: "min-h-12 px-6 text-base gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "terracotta",
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
        className={`inline-flex items-center justify-center rounded-[4px] font-sans font-medium transition-[background-color,color,border-color,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-blue ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${isDisabled ? "cursor-not-allowed opacity-50" : "active:scale-[0.98]"} ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
