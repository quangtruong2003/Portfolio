"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface PaperKineticSculptureProps {
  stageLabel: string;
  overviewLabel?: string;
  explodeLabel: string;
  assembleLabel: string;
  pulseLabel: string;
  strataHint: string;
  layers: [string, string, string];
  liveDownloads?: string | null;
  language?: "vi" | "en";
}

type FocusIdx = 0 | 1 | 2;

export default function PaperKineticSculpture({
  liveDownloads,
  language = "en",
}: PaperKineticSculptureProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isVi = language === "vi";

  const [activeFocus, setActiveFocus] = useState<FocusIdx>(0);

  // Normalized pointer coordinates in [-1 .. +1]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Silky physical spring solver for 60-120fps 3D spatial parallax
  const springConfig = { stiffness: 150, damping: 24, mass: 0.7 };
  const sx = useSpring(rawX, springConfig);
  const sy = useSpring(rawY, springConfig);

  // 3D Gimbal Tilt Angles (preserve-3d)
  const rotateY = useTransform(sx, [-1, 1], [-8.5, 8.5]);
  const rotateX = useTransform(sy, [-1, 1], [6.5, -6.5]);

  // Plane 1 (Deep Studio Backdrop & Compass Halo, Z = -36px): shifts opposite to pointer
  const bgX = useTransform(sx, [-1, 1], [13, -13]);
  const bgY = useTransform(sy, [-1, 1], [9, -9]);

  // Plane 2 (Real Studio Cast Silhouette Shadow, Z = -16px): shifts opposite to studio key light
  const shadowX = useTransform(sx, [-1, 1], [22, -22]);
  const shadowY = useTransform(sy, [-1, 1], [14, -8]);

  // Plane 3 (Authentic Portrait Subject, Z = +18px): shifts forward with pointer
  const portraitX = useTransform(sx, [-1, 1], [-9, 9]);
  const portraitY = useTransform(sy, [-1, 1], [-6, 6]);

  // Plane 4 (Floating Foreground Die-Cut Cards, Z = +48px): strongest foreground parallax
  const badgeX = useTransform(sx, [-1, 1], [-19, 19]);
  const badgeY = useTransform(sy, [-1, 1], [-13, 13]);

  // Dynamic Studio Softbox Key-Light Spotlight Percentage
  const lightPctX = useTransform(sx, [-1, 1], [22, 78]);
  const lightPctY = useTransform(sy, [-1, 1], [18, 72]);
  const spotlightBg = useMotionTemplate`radial-gradient(360px circle at ${lightPctX}% ${lightPctY}%, rgba(255, 253, 248, 0.88), rgba(244, 239, 230, 0) 72%)`;

  const resetAngle = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  // Global viewport cursor tracking so the 3D spatial portrait responds smoothly across the Hero
  useEffect(() => {
    if (shouldReduceMotion) return;

    const onWindowPointerMove = (e: PointerEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.45;

      const nx = Math.tanh(((e.clientX - cx) / Math.max(280, window.innerWidth * 0.45)) * 1.15);
      const ny = Math.tanh(((e.clientY - cy) / Math.max(240, window.innerHeight * 0.45)) * 1.15);
      rawX.set(nx);
      rawY.set(ny);
    };

    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onWindowPointerMove);
  }, [rawX, rawY, shouldReduceMotion]);

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2.0;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2.0;
    rawX.set(Math.max(-1, Math.min(1, nx)));
    rawY.set(Math.max(-1, Math.min(1, ny)));
  };

  const floatingCards = [
    {
      idx: 0 as FocusIdx,
      posClass: "bottom-3.5 right-3.5 hidden sm:block",
      code: "01 · RUST & TAURI 2",
      title: liveDownloads ? `SmoothScroll · ${liveDownloads}` : "SmoothScroll · 120Hz",
      meta: isVi ? "Tiện ích cuộn chuột Windows" : "Windows 120Hz wheel engine",
      href: "/projects/smoothscroll",
      accent: "var(--accent-patina)",
    },
    {
      idx: 1 as FocusIdx,
      posClass: "left-3.5 top-3.5 hidden sm:block",
      code: "02 · PHP 8+ & LARAVEL 12",
      title: isVi ? "Kiến trúc API & Queue" : "REST APIs & Async Queues",
      meta: isVi ? "Phân quyền RBAC 4 tầng · C3TEK" : "4-Tier RBAC · Billing Workers",
      href: "/projects/property-management",
      accent: "var(--accent-vermilion)",
    },
    {
      idx: 2 as FocusIdx,
      posClass: "right-3.5 top-3.5 hidden sm:block",
      code: "03 · DATA & SETTLEMENT",
      title: "MySQL · Redis · VNPay",
      meta: isVi ? "Tối ưu N+1 & Composite Index" : "N+1 Elimination & Cache Hit",
      href: "/projects/medical-booking",
      accent: "var(--accent-ochre)",
    },
  ];

  return (
    <div className="paper-stack paper-chamfer relative p-3.5 sm:p-4">
      {/* 3D Perspective Viewport (1100px focal length) */}
      <div
        ref={stageRef}
        onPointerMove={handleStagePointerMove}
        onPointerLeave={resetAngle}
        style={{ perspective: "1100px" }}
        className="relative h-[370px] w-full select-none sm:h-[430px]"
      >
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }
          }
          className="paper-well relative h-full w-full overflow-hidden rounded-[4px] border border-[var(--rule-strong)] bg-[#EFE8DC] will-change-transform"
        >
          {/* PLANE 1 (Deep Studio Backdrop & Drafting Calibration Rings, Z = -36px) */}
          <motion.div
            style={shouldReduceMotion ? undefined : { x: bgX, y: bgY }}
            className="pointer-events-none absolute -inset-5"
            aria-hidden="true"
          >
            <svg viewBox="0 0 560 440" className="h-full w-full">
              <defs>
                <radialGradient id="atelier-halo" cx="50%" cy="40%" r="54%">
                  <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.96" />
                  <stop offset="62%" stopColor="#F2ECE0" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#E1D8C7" stopOpacity="0.3" />
                </radialGradient>
              </defs>
              <rect width="560" height="440" fill="url(#atelier-halo)" />

              {/* Subtle Architectural Drafting Halo Behind Portrait */}
              <circle
                cx="280"
                cy="176"
                r="148"
                fill="none"
                stroke="#9E9686"
                strokeOpacity="0.34"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <circle
                cx="280"
                cy="176"
                r="108"
                fill="none"
                stroke="#B8332A"
                strokeOpacity="0.24"
                strokeWidth="1"
              />
              <line
                x1="48"
                y1="176"
                x2="512"
                y2="176"
                stroke="#9E9686"
                strokeOpacity="0.22"
                strokeWidth="0.8"
              />
              <line
                x1="280"
                y1="20"
                x2="280"
                y2="415"
                stroke="#9E9686"
                strokeOpacity="0.22"
                strokeWidth="0.8"
              />
            </svg>
          </motion.div>

          {/* Dynamic Studio Key-Light Softbox Glow Following Pointer */}
          <motion.div
            style={shouldReduceMotion ? undefined : { background: spotlightBg }}
            className="pointer-events-none absolute inset-0 z-10"
            aria-hidden="true"
          />

          {/* PLANE 2 (Dynamic 3D Cast Silhouette Shadow on Studio Wall, Z = -16px) */}
          <motion.div
            style={shouldReduceMotion ? undefined : { x: shadowX, y: shadowY }}
            className="pointer-events-none absolute inset-x-0 bottom-0 top-4 z-10 flex items-end justify-center opacity-18 blur-[7px]"
            aria-hidden="true"
          >
            <div className="relative h-full w-[310px] sm:w-[355px]">
              <Image
                src="/portrait/truong-portrait.png"
                alt=""
                fill
                sizes="360px"
                className="object-contain object-bottom brightness-0"
              />
            </div>
          </motion.div>

          {/* PLANE 3 (100% Authentic, Untouched Studio Portrait Subject, Z = +18px) */}
          <motion.div
            style={shouldReduceMotion ? undefined : { x: portraitX, y: portraitY }}
            className="pointer-events-none absolute inset-x-0 bottom-0 top-3 z-20 flex items-end justify-center will-change-transform"
          >
            <div className="relative h-full w-[310px] sm:w-[360px]">
              <Image
                src="/portrait/truong-portrait.png"
                alt={
                  isVi
                    ? "Chân dung Nguyễn Quang Trường — Kỹ sư PHP & Hệ thống"
                    : "Portrait of Nguyen Quang Truong — PHP & Systems Engineer"
                }
                fill
                priority
                sizes="(max-width: 640px) 310px, 370px"
                className="object-contain object-bottom drop-shadow-[0_14px_24px_rgba(24,23,21,0.16)]"
              />
            </div>
          </motion.div>

          {/* Patent Corner Frame Registration Ticks */}
          <svg
            viewBox="0 0 520 420"
            className="pointer-events-none absolute inset-0 z-25 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M 10 24 L 10 10 L 24 10 M 496 10 L 510 10 L 510 24 M 10 396 L 10 410 L 24 410 M 496 410 L 510 410 L 510 396"
              fill="none"
              stroke="#8E8677"
              strokeWidth="1.1"
            />
          </svg>

          {/* PLANE 4 (Floating 3D Die-Cut Engineering Spec Cards in Foreground, Z = +48px) */}
          <motion.div
            style={shouldReduceMotion ? undefined : { x: badgeX, y: badgeY }}
            className="pointer-events-none absolute inset-0 z-30 will-change-transform"
          >
            {floatingCards.map((card) => {
              const isSelected = activeFocus === card.idx;
              return (
                <Link
                  key={card.code}
                  href={card.href}
                  transitionTypes={["folio-forward"]}
                  onMouseEnter={() => setActiveFocus(card.idx)}
                  className={
                    `pointer-events-auto absolute ${card.posClass} group max-w-[205px] rounded-[3px] border bg-[var(--bg-sheet-top)]/95 px-3 py-2 shadow-[0_12px_26px_-6px_rgba(24,23,21,0.22)] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 ` +
                    (isSelected
                      ? "border-[var(--ink-primary)]"
                      : "border-[var(--rule-strong)] hover:border-[var(--accent-vermilion)]")
                  }
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      style={{ color: card.accent }}
                      className="font-mono text-xs font-semibold tabular-nums"
                    >
                      {card.code}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="shrink-0 text-[var(--ink-tertiary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-vermilion)]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-0.5 truncate font-serif text-sm font-semibold text-[var(--ink-primary)]">
                    {card.title}
                  </p>
                  <p className="truncate font-sans text-xs text-[var(--ink-secondary)]">
                    {card.meta}
                  </p>
                </Link>
              );
            })}

            {/* Bottom-Left Identity Plaque on Desktop + Compact Dual Pill Strip on Mobile */}
            <div className="absolute bottom-3.5 left-3.5 hidden rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)]/95 px-3 py-1.5 shadow-[0_10px_22px_-6px_rgba(24,23,21,0.18)] sm:block">
              <p className="font-serif text-sm font-semibold text-[var(--ink-primary)]">
                {isVi ? "Nguyễn Quang Trường" : "Nguyen Quang Truong"}
              </p>
              <p className="font-mono text-xs text-[var(--ink-secondary)]">
                {isVi ? "Kỹ sư PHP & Hệ thống" : "PHP & Systems Engineer"}
              </p>
            </div>

            <div className="pointer-events-auto absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 sm:hidden">
              <span className="truncate rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)]/95 px-2.5 py-1 font-serif text-xs font-semibold text-[var(--ink-primary)] shadow-[0_6px_16px_rgba(24,23,21,0.16)]">
                {isVi ? "Nguyễn Quang Trường" : "Nguyen Quang Truong"}
              </span>
              <Link
                href={floatingCards[0].href}
                transitionTypes={["folio-forward"]}
                className="inline-flex shrink-0 items-center gap-1 rounded-[3px] border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--bg-sheet-top)] shadow-[0_6px_16px_rgba(24,23,21,0.18)]"
              >
                <span>{floatingCards[0].title}</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
