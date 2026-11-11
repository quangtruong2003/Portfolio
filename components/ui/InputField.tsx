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
  const className = "w-full rounded-[4px] border border-border-warm bg-ivory px-3.5 py-3 font-sans text-base text-near-black placeholder:text-olive-gray focus:border-terracotta focus:outline-none disabled:opacity-50";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-sm font-medium text-near-black">
        {label}
        {required && <span className="ml-1 text-terracotta">*</span>}
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
