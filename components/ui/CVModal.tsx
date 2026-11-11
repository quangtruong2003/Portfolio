"use client";

import { useEffect, useRef } from "react";
import { Download, X } from "lucide-react";
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

  const previewTitle = language === "vi" ? "Xem trước CV" : "CV preview";

  return (
    <dialog
      ref={dialogRef}
      aria-label={previewTitle}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-paper p-0 text-near-black backdrop:bg-near-black/75"
    >
      {isOpen && (
        <div className="relative h-full w-full">
          <iframe
            src="/cv.pdf#toolbar=0&navpanes=0"
            className="h-full w-full bg-paper"
            title={previewTitle}
          />
          <button
            type="button"
            ref={closeButtonRef}
            onClick={() => dialogRef.current?.close()}
            aria-label={language === "vi" ? "Đóng bản xem trước" : "Close preview"}
            className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center border border-border-warm bg-parchment text-near-black focus-visible:outline-2 focus-visible:outline-focus-blue"
          >
            <X size={20} aria-hidden="true" />
          </button>
          <a
            href="/cv.pdf"
            download="Nguyen-Quang-Truong-CV.pdf"
            className="absolute bottom-4 right-4 inline-flex min-h-11 items-center gap-2 border border-terracotta bg-terracotta px-4 text-sm font-medium text-ivory hover:bg-near-black focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-blue"
          >
            <Download size={16} aria-hidden="true" />
            {language === "vi" ? "Tải CV" : "Download CV"}
          </a>
        </div>
      )}
    </dialog>
  );
}
