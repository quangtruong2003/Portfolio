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
    damping: 44,
    stiffness: 300,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3.4], {
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

    const baseSpeed = 2.2;
    const moveBy =
      directionRef.current * baseSpeed * dt * (1 + Math.min(Math.abs(vf), 5.5));
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
          "Hàng đợi hóa đơn & Phân quyền RBAC 4 tầng",
          "MySQL Composite Index & Redis Cache",
          "Đồng bộ kho WordPress hàng loạt",
          "Spring Boot & Cổng thanh toán VNPay",
          "Kotlin Android & Firebase",
        ]
      : [
          downloads
            ? `SmoothScroll · ${downloads} downloads`
            : "SmoothScroll · Rust & Tauri 2",
          "PHP 8+ & Laravel 12",
          "Async Billing Queues & 4-Tier RBAC",
          "MySQL Composite Indexes & Redis Cache",
          "Bulk WordPress Inventory Sync",
          "Spring Boot & VNPay Settlement",
          "Kotlin Android & Firebase",
        ];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--surface-subtle)] py-3 select-none"
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { x }}
        className="flex w-max items-center will-change-transform"
      >
        {[0, 1].map((copyIdx) => (
          <div key={copyIdx} className="flex shrink-0 items-center gap-8 pr-8">
            {items.map((item, idx) => (
              <span
                key={`${copyIdx}-${item}`}
                className="inline-flex items-center gap-8 font-mono text-xs font-medium text-[var(--ink-secondary)]"
              >
                <span>{item}</span>
                <span
                  className={
                    idx % 2 === 0
                      ? "h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]"
                      : "h-1.5 w-1.5 rounded-full bg-[var(--signal-rust)]"
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
