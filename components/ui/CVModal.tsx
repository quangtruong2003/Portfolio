"use client";

import { useEffect, useRef } from "react";
import { Download, X } from "lucide-react";
import { OWNER_INFO } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    }
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const previewTitle =
    language === "vi"
      ? "Hồ sơ năng lực (CV) — Nguyễn Quang Trường"
      : "Curriculum Vitae — Nguyen Quang Truong";

  return (
    <dialog
      ref={dialogRef}
      aria-label={previewTitle}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overscroll-contain border-0 bg-[var(--engine-ground)]/78 p-2 text-[var(--ink-primary)] backdrop:bg-[var(--engine-ground)]/72 sm:p-6"
    >
      {isOpen && (
        <div className="studio-surface mx-auto flex h-full max-w-5xl flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-ground)] px-4 py-3 sm:px-5">
            <p className="truncate font-display text-sm font-medium text-[var(--ink-primary)] sm:text-base">
              {previewTitle}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={OWNER_INFO.cvPath}
                download={OWNER_INFO.cvDownloadName}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--accent-primary)] bg-[var(--accent-primary)] px-3.5 font-sans text-xs font-medium text-[var(--surface-elevated)] transition-[background-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.96]"
              >
                <Download size={15} aria-hidden="true" />
                <span>{language === "vi" ? "Tải PDF" : "Download PDF"}</span>
              </a>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={() => dialogRef.current?.close()}
                aria-label={language === "vi" ? "Đóng bản xem trước CV" : "Close CV preview"}
                className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--ink-primary)] transition-[background-color,border-color,transform] duration-150 hover:border-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] active:scale-[0.96]"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <iframe
            src={`${OWNER_INFO.cvPath}#toolbar=0&navpanes=0`}
            className="h-full w-full flex-1 bg-[var(--surface-elevated)]"
            title={previewTitle}
          />
        </div>
      )}
    </dialog>
  );
}
