"use client";

import type { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  type?: "text" | "email" | "text-area";
  placeholder?: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  required = false,
  rows = 4,
}: InputFieldProps) {
  const id = `contact-${name}`;
  const className =
    "w-full rounded-lg border border-[var(--border-input)] bg-[var(--surface-elevated)] px-3.5 py-3 font-sans text-base text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] transition-[border-color,background-color] duration-150 focus:border-[var(--accent-primary)] disabled:opacity-50";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-sm font-medium text-[var(--ink-primary)]">
        {label}
        {required && (
          <span className="ml-1 text-[var(--signal-rust)]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {type === "text-area" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`${className} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={name === "name" ? "name" : name === "email" ? "email" : undefined}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={className}
        />
      )}
    </div>
  );
}
