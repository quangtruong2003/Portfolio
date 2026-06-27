"use client";

import React, { useEffect } from "react";
import { X, Download } from "lucide-react";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    window.open("/cv.pdf", "_blank");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="CV Preview"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal - Fullscreen */}
      <div
        className="relative z-10 w-screen h-screen max-w-full max-h-full bg-white"
      >
        {/* PDF Viewer */}
        <iframe
          src="/cv.pdf#toolbar=0&navpanes=0&scrollbar=1"
          className="w-full h-full bg-[#525659]"
          title="CV Preview"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-coral transition-colors z-10 shadow-lg"
          aria-label="Download CV"
        >
          <Download size={16} />
          Download CV
        </button>
      </div>
    </div>
  );
}
