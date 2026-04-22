"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  type?: "text" | "email" | "text-area";
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
  rows?: number;
  disabled?: boolean;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  required = false,
  className = "",
  rows = 4,
  disabled = false,
}: InputFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className="font-sans text-sm font-medium text-warm-silver"
      >
        {label}
        {required && <span className="text-coral ml-0.5">*</span>}
      </label>

      {type === "text-area" ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="
            w-full
            bg-dark-surface
            border border-[#30302e]
            rounded-[12px]
            px-4 py-3
            font-sans text-ivory placeholder:text-stone-gray
            text-base leading-relaxed
            resize-none
            transition-all duration-200
            focus:outline-none focus:border-terracotta focus:shadow-[0px_0px_0px_1.5px_#c96442]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="
            w-full
            bg-dark-surface
            border border-[#30302e]
            rounded-[12px]
            px-4 py-3
            font-sans text-ivory placeholder:text-stone-gray
            text-base
            transition-all duration-200
            focus:outline-none focus:border-terracotta focus:shadow-[0px_0px_0px_1.5px_#c96442]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
      )}
    </div>
  );
}
