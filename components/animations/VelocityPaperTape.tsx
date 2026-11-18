"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { formatRepoDownloads, useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

function wrapRange(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

export default function VelocityPaperTape() {
  const { language } = useLanguage();
  const { smoothScrollRepo } = useGitHubRepos();
  const shouldReduceMotion = useReducedMotion();
  const downloads = formatRepoDownloads(smoothScrollRepo, language);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 42,
    stiffness: 320,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3.8], {
    clamp: false,
  });

  const directionRef = useRef<-1 | 1>(-1);

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return;
    const dt = Math.min(delta / 1000, 0.05);
    const vf = velocityFactor.get();

    if (vf < -0.15) {
      directionRef.current = 1;
    } else if (vf > 0.15) {
      directionRef.current = -1;
    }

    const baseSpeed = 2.6; // % per second gentle ambient drift
    const moveBy =
      directionRef.current * baseSpeed * dt * (1 + Math.min(Math.abs(vf), 6));
    baseX.set(wrapRange(-50, 0, baseX.get() + moveBy));
  });

  const x = useTransform(baseX, (val) => `${val}%`);

  const items =
    language === "vi"
      ? [
          downloads
            ? `SmoothScroll · ${downloads} lượt tải`
            : "SmoothScroll · Rust & Tauri 2",
          "PHP 8+ & Laravel 12",
          "Hàng đợi hóa đơn & Phân quyền 4 tầng",
          "Tối ưu MySQL Index & Đệm Redis",
          "Đồng bộ WordPress hàng loạt",
          "Spring Boot & Cổng VNPay",
          "Kotlin Android · Gemini AI",
        ]
      : [
          downloads
            ? `SmoothScroll · ${downloads} downloads`
            : "SmoothScroll · Rust & Tauri 2",
          "PHP 8+ & Laravel 12",
          "Async Queues & 4-Tier RBAC",
          "MySQL Composite Indexes & Redis",
          "Bulk WordPress Inventory Sync",
          "Spring Boot & VNPay Settlement",
          "Kotlin Android · Gemini AI",
        ];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-b border-[var(--rule-cut)] bg-[var(--bg-sheet-mid)] py-3 select-none"
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { x }}
        className="flex w-max items-center will-change-transform"
      >
        {[0, 1].map((copyIdx) => (
          <div key={copyIdx} className="flex shrink-0 items-center gap-7 pr-7">
            {items.map((item, idx) => (
              <span
                key={`${copyIdx}-${item}`}
                className="inline-flex items-center gap-7 font-mono text-xs font-medium text-[var(--ink-primary)]"
              >
                <span>{item}</span>
                <span
                  className={
                    idx % 2 === 0
                      ? "h-1.5 w-1.5 rotate-45 bg-[var(--accent-vermilion)]"
                      : "h-1.5 w-1.5 rounded-full bg-[var(--accent-patina)]"
                  }
                />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
