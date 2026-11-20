"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface StudioPortraitStageProps {
  language: "vi" | "en";
}

export default function StudioPortraitStage({
  language,
}: StudioPortraitStageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isVi = language === "vi";

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Subtle, calm optical damping — zero 3D tilt, zero distortion
  const sx = useSpring(pointerX, { stiffness: 110, damping: 28, mass: 0.9 });
  const sy = useSpring(pointerY, { stiffness: 110, damping: 28, mass: 0.9 });

  const portraitX = useTransform(sx, [-1, 1], [-4, 4]);
  const portraitY = useTransform(sy, [-1, 1], [-2.5, 2.5]);
  const shadowX = useTransform(sx, [-1, 1], [10, -10]);
  const shadowY = useTransform(sy, [-1, 1], [6, -4]);

  const lightPctX = useTransform(sx, [-1, 1], [28, 72]);
  const lightPctY = useTransform(sy, [-1, 1], [18, 56]);
  const studioSoftbox = useMotionTemplate`radial-gradient(420px circle at ${lightPctX}% ${lightPctY}%, rgba(255, 255, 255, 0.85), rgba(235, 240, 234, 0) 70%)`;

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const handleMove = (e: PointerEvent) => {
      const el = frameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.45;
      const nx = Math.tanh((e.clientX - cx) / Math.max(320, window.innerWidth * 0.45));
      const ny = Math.tanh((e.clientY - cy) / Math.max(260, window.innerHeight * 0.45));
      pointerX.set(nx);
      pointerY.set(ny);
    };

    const handleLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [pointerX, pointerY, shouldReduceMotion]);

  return (
    <div
      ref={frameRef}
      className="studio-surface overflow-hidden p-2.5 sm:p-3"
    >
      {/* Daylight Architectural Cyclorama Stage (Untouched Authentic Studio Portrait) */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-[linear-gradient(162deg,#FAFBF9_0%,#EDF1EB_58%,#DFE6DC_100%)] outline-1 -outline-offset-1 outline-black/10 sm:h-[420px] lg:h-[445px]">
        {/* Softbox Studio Light Gradient Responding Gently to Pointer */}
        <motion.div
          aria-hidden="true"
          style={shouldReduceMotion ? undefined : { background: studioSoftbox }}
          className="pointer-events-none absolute inset-0 z-10"
        />

        {/* Subtle Daylight Key Glow Behind Subject */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-45"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 34%, rgba(255,255,255,0.92) 0%, transparent 64%)",
          }}
        />

        {/* Soft Cast Studio Wall Shadow */}
        <motion.div
          aria-hidden="true"
          style={shouldReduceMotion ? undefined : { x: shadowX, y: shadowY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 top-4 z-10 flex items-end justify-center opacity-[0.11] blur-[10px]"
        >
          <div className="relative h-full w-[250px] sm:w-[355px]">
            <Image
              src="/portrait/truong-portrait.png"
              alt=""
              fill
              sizes="(max-width: 640px) 250px, 355px"
              className="object-contain object-bottom brightness-0"
            />
          </div>
        </motion.div>

        {/* 100% Natural, Unaltered Portrait Subject */}
        <motion.div
          style={shouldReduceMotion ? undefined : { x: portraitX, y: portraitY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 top-2.5 z-20 flex items-end justify-center"
        >
          <div className="relative h-full w-[255px] sm:w-[365px]">
            <Image
              src="/portrait/truong-portrait.png"
              alt={
                isVi
                  ? "Chân dung Nguyễn Quang Trường — Kỹ sư PHP & Hệ thống"
                  : "Portrait of Nguyen Quang Truong — PHP & Systems Engineer"
              }
              fill
              priority
              sizes="(max-width: 640px) 255px, 365px"
              className="object-contain object-bottom"
            />
          </div>
        </motion.div>
      </div>

      {/* Single-Row Balanced Engineering Stack Footer */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5 px-1.5 py-1 font-mono text-[11px] sm:text-xs">
        <span className="rounded-md bg-[var(--accent-primary-soft)] px-2 py-1 font-medium text-[var(--accent-primary)]">
          PHP 8+ / Laravel 12
        </span>
        <span className="rounded-md bg-[var(--surface-subtle)] px-2 py-1 text-[var(--ink-secondary)]">
          Rust / Tauri 2
        </span>
        <span className="rounded-md bg-[var(--surface-subtle)] px-2 py-1 text-[var(--ink-secondary)]">
          MySQL / Redis
        </span>
      </div>
    </div>
  );
}
