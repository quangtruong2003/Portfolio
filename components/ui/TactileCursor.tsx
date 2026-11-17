"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

type CursorMode = "idle" | "open" | "inspect";

export default function TactileCursor() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("idle");
  const [visible, setVisible] = useState(false);
  const { dictionary } = useLanguage();

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapability = () => {
      setEnabled(
        finePointer.matches && !coarsePointer.matches && !reducedMotion.matches
      );
    };
    updateCapability();

    finePointer.addEventListener("change", updateCapability);
    coarsePointer.addEventListener("change", updateCapability);
    reducedMotion.addEventListener("change", updateCapability);
    return () => {
      finePointer.removeEventListener("change", updateCapability);
      coarsePointer.removeEventListener("change", updateCapability);
      reducedMotion.removeEventListener("change", updateCapability);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.24;
      currentY += (targetY - currentY) * 0.24;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetX = event.clientX;
      targetY = event.clientY;
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const tagged = target?.closest<HTMLElement>("[data-cursor]");
      const nextMode = (tagged?.dataset.cursor as CursorMode | undefined) ?? "idle";
      setMode((prev) => (prev === nextMode ? prev : nextMode));
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setMode("idle");
    };

    const handlePointerDown = () => {
      setMode("idle");
    };

    rafId = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [enabled, pathname]);

  if (!enabled) return null;

  const isExpanded = mode !== "idle";
  const label = mode === "open" ? dictionary.cursor.open : dictionary.cursor.inspect;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 -translate-x-1/2 -translate-y-1/2 select-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className={
          "flex items-center justify-center transition-[transform,background-color,border-color,padding] duration-200 ease-[var(--ease-out-strong)] " +
          (isExpanded
            ? " -ml-10 -mt-4 rounded-[3px] border border-[var(--accent-vermilion)] bg-[var(--accent-vermilion)] px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.06em] text-[var(--bg-sheet-top)] shadow-[0_6px_16px_rgba(24,23,21,0.22)]"
            : " -ml-2 -mt-2 h-4 w-4 rounded-full border border-[var(--ink-primary)]/45 bg-[var(--accent-vermilion)]/15")
        }
      >
        {isExpanded ? (
          <span>{label}</span>
        ) : (
          <span className="h-1 w-1 rounded-full bg-[var(--accent-vermilion)]" />
        )}
      </div>
    </div>
  );
}
