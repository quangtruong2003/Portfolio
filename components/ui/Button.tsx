"use client";

import React from "react";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";

type ButtonVariant = "terracotta" | "warm-sand" | "dark" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  terracotta:
    "bg-terracotta text-ivory shadow-[0px_0px_0px_1px_#c96442] hover:bg-coral hover:shadow-[0_4px_20px_rgba(201,100,66,0.3)]",
  "warm-sand":
    "bg-warm-sand text-charcoal-warm shadow-[0px_0px_0px_1px_#d1cfc5] hover:bg-border-warm hover:shadow-[0px_0px_0px_1px_#c2c0b6]",
  dark: "bg-dark-surface text-ivory hover:bg-near-black shadow-[0px_0px_0px_1px_#30302e]",
  ghost:
    "bg-transparent text-charcoal-warm hover:bg-warm-sand",
  outline:
    "bg-transparent text-terracotta border border-[1.5px] border-terracotta hover:bg-terracotta hover:text-ivory",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-lg gap-2.5",
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

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          inline-flex items-center justify-center
          font-sans font-medium
          rounded-[12px]
          transition-all duration-200 ease-out
          cursor-pointer select-none
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? "w-full" : ""}
          ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:-translate-y-0.5 active:translate-y-0"}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
            {Icon && iconPosition === "left" && (
              <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
            )}
            <span>{children}</span>
            {Icon && iconPosition === "right" && (
              <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
