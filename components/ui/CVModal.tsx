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
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none overscroll-contain border-0 bg-[var(--ink-primary)]/75 p-2 text-[var(--ink-primary)] backdrop:bg-[var(--ink-primary)]/70 sm:p-6"
    >
      {isOpen && (
        <div className="paper-sheet mx-auto flex h-full max-w-5xl flex-col overflow-hidden rounded-[4px]">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-4 py-2.5 sm:px-5">
            <p className="truncate font-mono text-xs font-medium text-[var(--ink-primary)]">
              {previewTitle}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={OWNER_INFO.cvPath}
                download={OWNER_INFO.cvDownloadName}
                className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] px-3.5 font-sans text-xs font-medium text-[var(--bg-sheet-top)] transition-[background-color,transform] duration-150 ease-out hover:bg-[var(--accent-vermilion-hover)] active:scale-[0.97]"
              >
                <Download size={15} aria-hidden="true" />
                <span>{language === "vi" ? "Tải PDF" : "Download PDF"}</span>
              </a>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={() => dialogRef.current?.close()}
                aria-label={language === "vi" ? "Đóng bản xem trước CV" : "Close CV preview"}
                className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] text-[var(--ink-primary)] transition-[background-color,transform] duration-150 hover:bg-[var(--bg-sheet-mid)] active:scale-[0.97]"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <iframe
            src={`${OWNER_INFO.cvPath}#toolbar=0&navpanes=0`}
            className="h-full w-full flex-1 bg-[var(--bg-sheet-top)]"
            title={previewTitle}
          />
        </div>
      )}
    </dialog>
  );
}
