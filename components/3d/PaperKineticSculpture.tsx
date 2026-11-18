"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Database,
  Layers,
  Mouse,
  Play,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

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

type CardIndex = 0 | 1 | 2;
type AppProfileId = "vscode" | "browser" | "game";
type RbacRole = "Owner" | "Admin" | "Manager" | "Sales";

const CODE_SAMPLE_LINES = [
  { num: "01", code: "pub fn intercept_wheel(delta: i32, profile: &AppRule) {", accent: true },
  { num: "02", code: "  if profile.bypass_raw { return pass_win32(delta); }", accent: false },
  { num: "03", code: "  let target = state.target + (delta as f64) * profile.step;", accent: false },
  { num: "04", code: "  spring.integrate_120hz(target, profile.duration_ms);", accent: true },
  { num: "05", code: "}", accent: false },
  { num: "06", code: "// Laravel 12 · Queued Tiered Utility & Contract Billing", accent: false },
  { num: "07", code: "InvoiceBatchJob::dispatch($leaseIds)->onQueue('billing');", accent: true },
  { num: "08", code: "Cache::tags(['contracts'])->remember($key, 900, $query);", accent: false },
  { num: "09", code: "SELECT id, tenant_id, total FROM invoices USE INDEX (idx_ym);", accent: false },
  { num: "10", code: "return Response::json(['status' => 'queued', 'ms' => 14]);", accent: true },
];

export default function PaperKineticSculpture({
  stageLabel,
  pulseLabel,
  strataHint,
  layers,
  liveDownloads,
  language = "en",
}: PaperKineticSculptureProps) {
  const shouldReduceMotion = useReducedMotion();
  const isVi = language === "vi";

  // Active stacked paper window: 0 = SmoothScroll, 1 = Laravel 12 C3TEK, 2 = Spring Boot + VNPay
  const [activeCard, setActiveCard] = useState<CardIndex>(0);

  // ==================== WINDOW 01 STATE: SMOOTHSCROLL LIVE APP ====================
  const [appProfile, setAppProfile] = useState<AppProfileId>("vscode");
  const [smoothEnabled, setSmoothEnabled] = useState(true);
  const scrollStageRef = useRef<HTMLDivElement>(null);
  const rawTrackRef = useRef<HTMLDivElement>(null);
  const smoothTrackRef = useRef<HTMLDivElement>(null);
  const velocityReadoutRef = useRef<HTMLSpanElement>(null);

  const physicsRef = useRef({
    targetY: 0,
    rawY: 0,
    smoothY: 0,
    velocity: 0,
    autoClock: 0,
    userTouchedUntil: 0,
    enabled: true,
    profile: "vscode" as AppProfileId,
  });

  useEffect(() => {
    physicsRef.current.enabled = smoothEnabled && appProfile !== "game";
    physicsRef.current.profile = appProfile;
  }, [smoothEnabled, appProfile]);

  const fireScrollBurst = useCallback((deltaPx = 108) => {
    const p = physicsRef.current;
    p.userTouchedUntil = performance.now() + 4200;
    p.targetY += deltaPx;
  }, []);

  // Capture physical mouse-wheel scrolling over Window 01's split comparator
  useEffect(() => {
    const el = scrollStageRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (activeCard !== 0) return;
      e.preventDefault();
      const stepScale = appProfile === "browser" ? 0.95 : 0.75;
      const step = Math.sign(e.deltaY) * Math.min(Math.max(Math.abs(e.deltaY) * stepScale, 36), 140);
      physicsRef.current.userTouchedUntil = performance.now() + 5000;
      physicsRef.current.targetY += step;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [activeCard, appProfile]);

  // 60/120fps Dual-Pane Scroll Physics Loop (Stepped 120Δ vs Rust Smooth Spring)
  useEffect(() => {
    let rafId = 0;
    let last = performance.now();
    const loopHeight = 260; // seamless 2x list wrap height in px

    const tick = (now: number) => {
      rafId = window.requestAnimationFrame(tick);
      const dt = Math.max(0, Math.min((now - last) / 1000, 0.05));
      last = now;

      const p = physicsRef.current;

      // Gentle automatic wheel notches when idle so visitor sees the difference immediately
      if (!shouldReduceMotion && activeCard === 0 && now > p.userTouchedUntil) {
        p.autoClock += dt;
        if (p.autoClock >= 1.55) {
          p.autoClock = 0;
          p.targetY += 56;
        }
      }

      // Raw Win32 stepped scroll: snaps harshly in 28px discrete wheel detents!
      const quantStep = 28;
      p.rawY = Math.round(p.targetY / quantStep) * quantStep;

      // SmoothScroll Rust engine: velocity-damped sub-pixel interpolation
      if (!p.enabled || shouldReduceMotion) {
        p.smoothY = p.rawY;
        p.velocity = 0;
      } else {
        const lambda = p.profile === "browser" ? 7.2 : 10.5;
        const prev = p.smoothY;
        p.smoothY = prev + (p.targetY - prev) * (1 - Math.exp(-lambda * dt));
        p.velocity = dt > 0 ? Math.abs(p.smoothY - prev) / dt : 0;
      }

      const rawMod = (((p.rawY % loopHeight) + loopHeight) % loopHeight);
      const smoothMod = (((p.smoothY % loopHeight) + loopHeight) % loopHeight);

      if (rawTrackRef.current) {
        rawTrackRef.current.style.transform = `translate3d(0, ${(-rawMod).toFixed(1)}px, 0)`;
      }
      if (smoothTrackRef.current) {
        smoothTrackRef.current.style.transform = `translate3d(0, ${(-smoothMod).toFixed(2)}px, 0)`;
      }
      if (velocityReadoutRef.current) {
        velocityReadoutRef.current.textContent = p.enabled
          ? `${Math.round(p.velocity)} px/s`
          : "RAW PASS";
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [activeCard, shouldReduceMotion]);

  // ==================== WINDOW 02 STATE: LARAVEL 12 API & QUEUE ====================
  const [rbacRole, setRbacRole] = useState<RbacRole>("Owner");
  const [optimizedQuery, setOptimizedQuery] = useState(true);
  const [queueStep, setQueueStep] = useState(0);

  useEffect(() => {
    if (activeCard !== 1 || shouldReduceMotion) return;
    const id = window.setInterval(() => {
      setQueueStep((s) => (s + 1) % 4);
    }, 1150);
    return () => window.clearInterval(id);
  }, [activeCard, shouldReduceMotion]);

  // ==================== WINDOW 03 STATE: SPRING BOOT + VNPAY ====================
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [txStage, setTxStage] = useState(3);

  const runVnpaySimulation = useCallback((slotIdx: number) => {
    setSelectedSlot(slotIdx);
    setTxStage(0);
  }, []);

  useEffect(() => {
    if (txStage >= 3) return;
    const t = window.setTimeout(() => {
      setTxStage((s) => Math.min(3, s + 1));
    }, 420);
    return () => window.clearTimeout(t);
  }, [txStage]);

  const profileConfigs = [
    {
      id: "vscode" as const,
      label: "Code.exe",
      meta: "110px · 340ms",
    },
    {
      id: "browser" as const,
      label: "chrome.exe",
      meta: "135px · 460ms",
    },
    {
      id: "game" as const,
      label: isVi ? "Game (Loại trừ)" : "Game Bypass",
      meta: "Raw Win32",
    },
  ];

  const rbacScopes: Record<RbacRole, { en: string; vi: string }> = {
    Owner: {
      en: "Full portfolio: multi-building revenue, contracts, RBAC & audit",
      vi: "Toàn quyền: doanh thu đa tòa nhà, hợp đồng, phân quyền & đối soát",
    },
    Admin: {
      en: "System ops: room catalog, queued utility billing & PDF templates",
      vi: "Quản trị: danh mục phòng, chạy hàng đợi điện nước & xuất PDF",
    },
    Manager: {
      en: "Branch scope: assigned building leases, meter readings & invoices",
      vi: "Theo chi nhánh: hợp đồng tòa nhà phụ trách, chốt điện nước & hóa đơn",
    },
    Sales: {
      en: "Scoped read/book: available rooms & tenant reservation requests",
      vi: "Giới hạn nghiệp vụ: xem phòng trống & tạo phiếu giữ chỗ khách thuê",
    },
  };

  const queueStages = isVi
    ? ["RBAC Guard", "Điện nước bậc", "Queue hóa đơn", "Xuất file PDF"]
    : ["RBAC Guard", "Utility Tiers", "Invoice Queue", "Contract PDF"];

  const medicalSlots = isVi
    ? [
        { time: "08:30", dept: "Tim mạch · BS. Minh", fee: "350.000đ" },
        { time: "10:15", dept: "Nội tổng quát · BS. Lan", fee: "250.000đ" },
        { time: "14:00", dept: "Nhi khoa · BS. Hùng", fee: "300.000đ" },
      ]
    : [
        { time: "08:30", dept: "Cardiology · Dr. Minh", fee: "350,000 VND" },
        { time: "10:15", dept: "Internal Med · Dr. Lan", fee: "250,000 VND" },
        { time: "14:00", dept: "Pediatrics · Dr. Hung", fee: "300,000 VND" },
      ];

  const vnpaySteps = isVi
    ? ["Xác thực JWT", "Khóa lịch khám", "VNPay IPN (00)", "Đã xác nhận"]
    : ["JWT Guard", "MySQL Lock", "VNPay IPN (00)", "Confirmed"];

  const cardMeta = [
    {
      idx: 0 as CardIndex,
      icon: Mouse,
      headerTitle: `SmoothScroll ${liveDownloads ? `· ${liveDownloads} dl` : "· Rust + Tauri 2"}`,
      slug: "smoothscroll",
      openText: isVi ? "Chi tiết SmoothScroll" : "SmoothScroll dossier",
    },
    {
      idx: 1 as CardIndex,
      icon: Layers,
      headerTitle: isVi
        ? "C3TEK Property · Laravel 12 + Queue + Redis"
        : "C3TEK Property · Laravel 12 + Queue + Redis",
      slug: "property-management",
      openText: isVi ? "Chi tiết Property Platform" : "Property dossier",
    },
    {
      idx: 2 as CardIndex,
      icon: ShieldCheck,
      headerTitle: isVi
        ? "Medical Booking · Spring Boot + VNPay"
        : "Medical Booking · Spring Boot + VNPay",
      slug: "medical-booking",
      openText: isVi ? "Chi tiết Medical Booking" : "Medical dossier",
    },
  ];

  return (
    <div className="paper-well relative flex flex-col justify-between rounded-[4px] p-4 sm:p-5">
      {/* Top Workbench Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-2.5 font-mono text-xs text-[var(--ink-secondary)]">
        <span className="truncate font-medium text-[var(--ink-primary)]">{stageLabel}</span>
        {activeCard === 0 && (
          <button
            type="button"
            onClick={() => fireScrollBurst(112)}
            className="inline-flex min-h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-[2px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] px-2.5 py-0.5 font-mono text-xs font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
          >
            <Play size={11} aria-hidden="true" />
            <span>{pulseLabel}</span>
          </button>
        )}
      </div>

      {/* Physical Stacked Paper-Window Deck (3 Real Interactive Project Interfaces) */}
      <div className="relative mt-7 mb-3 h-[335px] w-full sm:h-[345px]">
        {cardMeta.map((meta) => {
          const depth = ((meta.idx - activeCard + 3) % 3) as 0 | 1 | 2;
          const isFront = depth === 0;
          const IconComp = meta.icon;

          const targetY = depth === 0 ? 0 : depth === 1 ? -13 : -24;
          const targetScale = depth === 0 ? 1 : depth === 1 ? 0.965 : 0.93;
          const targetOpacity = depth === 0 ? 1 : depth === 1 ? 0.9 : 0.72;
          const zIndex = depth === 0 ? 30 : depth === 1 ? 20 : 10;

          return (
            <motion.div
              key={meta.idx}
              style={{ zIndex }}
              initial={false}
              animate={
                shouldReduceMotion
                  ? { y: targetY, scale: targetScale, opacity: targetOpacity }
                  : { y: targetY, scale: targetScale, opacity: targetOpacity }
              }
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 30,
                mass: 0.75,
              }}
              onClick={!isFront ? () => setActiveCard(meta.idx) : undefined}
              className={
                "paper-sheet absolute inset-0 flex origin-top flex-col justify-between overflow-hidden rounded-[4px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] " +
                (!isFront ? "cursor-pointer hover:border-[var(--accent-vermilion)]" : "")
              }
              aria-hidden={!isFront}
            >
              {/* Tactile Software Window Titlebar */}
              <div className="flex items-center justify-between gap-2 border-b border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-3.5 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-vermilion)]" />
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-ochre)]" />
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-patina)]" />
                  </span>
                  <IconComp
                    size={13}
                    className="ml-1 shrink-0 text-[var(--ink-secondary)]"
                    aria-hidden="true"
                  />
                  <span className="truncate font-mono text-xs font-medium text-[var(--ink-primary)]">
                    {meta.headerTitle}
                  </span>
                </div>

                {meta.idx === 0 && isFront && (
                  <button
                    type="button"
                    onClick={() => setSmoothEnabled((v) => !v)}
                    aria-pressed={smoothEnabled}
                    className={
                      "shrink-0 cursor-pointer rounded-[2px] border px-2 py-0.5 font-mono text-xs font-semibold transition-colors " +
                      (smoothEnabled && appProfile !== "game"
                        ? "border-[var(--accent-patina)] bg-[var(--accent-patina-wash)] text-[var(--accent-patina)]"
                        : "border-[var(--rule-strong)] bg-[var(--bg-sheet-mid)] text-[var(--ink-secondary)]")
                    }
                  >
                    {smoothEnabled && appProfile !== "game" ? "120HZ ON" : "BYPASS"}
                  </button>
                )}

                {meta.idx !== 0 && isFront && (
                  <span className="shrink-0 rounded-[2px] bg-[var(--accent-patina-wash)] px-2 py-0.5 font-mono text-xs font-medium text-[var(--accent-patina)]">
                    200 OK
                  </span>
                )}
              </div>

              {/* ==================== BODY 01: SMOOTHSCROLL LIVE SPLIT APP ==================== */}
              {meta.idx === 0 && (
                <div className="flex min-h-0 flex-1 flex-col justify-between p-3 sm:p-3.5">
                  {/* Per-App Profile Selector (Real SmoothScroll Feature) */}
                  <div className="mb-2.5 flex shrink-0 flex-wrap items-center justify-between gap-1.5">
                    <div className="flex flex-wrap gap-1.5">
                      {profileConfigs.map((prof) => {
                        const active = appProfile === prof.id;
                        return (
                          <button
                            key={prof.id}
                            type="button"
                            tabIndex={isFront ? 0 : -1}
                            onClick={() => {
                              setAppProfile(prof.id);
                              fireScrollBurst(84);
                            }}
                            className={
                              "cursor-pointer rounded-[2px] border px-2 py-1 font-mono text-xs transition-colors " +
                              (active
                                ? "border-[var(--ink-primary)] bg-[var(--ink-primary)] font-medium text-[var(--bg-sheet-top)]"
                                : "border-[var(--rule-cut)] bg-[var(--bg-canvas)] text-[var(--ink-secondary)] hover:border-[var(--rule-strong)]")
                            }
                          >
                            {prof.label}
                          </button>
                        );
                      })}
                    </div>

                    <span
                      ref={velocityReadoutRef}
                      className="hidden font-mono text-xs text-[var(--accent-patina)] tabular-nums sm:inline"
                    >
                      0 px/s
                    </span>
                  </div>

                  {/* Side-by-Side Live Scrolling Code Panes: Raw Stepped vs SmoothScroll 120Hz */}
                  <div
                    ref={scrollStageRef}
                    className="grid min-h-0 flex-1 grid-cols-2 gap-2.5 overflow-hidden"
                  >
                    {/* LEFT: Default Windows Stepped Scroll */}
                    <div className="flex flex-col overflow-hidden rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)]">
                      <div className="flex items-center justify-between border-b border-[var(--rule-cut)] bg-[var(--bg-sheet-mid)] px-2.5 py-1 font-mono text-xs text-[var(--ink-secondary)]">
                        <span className="truncate">
                          {isVi ? "Win32 gốc (Giật nấc)" : "Win32 Raw (Stepped)"}
                        </span>
                        <span className="shrink-0 text-[var(--ink-tertiary)]">120Δ</span>
                      </div>
                      <div className="relative flex-1 overflow-hidden p-2">
                        <div ref={rawTrackRef} className="space-y-1.5 will-change-transform">
                          {[...CODE_SAMPLE_LINES, ...CODE_SAMPLE_LINES].map((ln, i) => (
                            <div
                              key={`raw-${i}`}
                              className="flex items-center gap-2 truncate font-mono text-xs leading-5 text-[var(--ink-secondary)]"
                            >
                              <span className="text-[var(--ink-tertiary)] opacity-60">{ln.num}</span>
                              <span className="truncate">{ln.code}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: SmoothScroll Rust 120Hz Interpolated Scroll */}
                    <div className="flex flex-col overflow-hidden rounded-[3px] border border-[var(--accent-patina)]/55 bg-[var(--bg-sheet-top)]">
                      <div className="flex items-center justify-between border-b border-[var(--accent-patina)]/25 bg-[var(--accent-patina-wash)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent-patina)]">
                        <span className="truncate">
                          {smoothEnabled && appProfile !== "game"
                            ? isVi
                              ? "SmoothScroll (Mượt)"
                              : "SmoothScroll (120Hz)"
                            : isVi
                              ? "Đã tạm ngưng (Raw)"
                              : "Bypassed (Raw)"}
                        </span>
                        <span className="shrink-0">Rust</span>
                      </div>
                      <div className="relative flex-1 overflow-hidden p-2">
                        <div ref={smoothTrackRef} className="space-y-1.5 will-change-transform">
                          {[...CODE_SAMPLE_LINES, ...CODE_SAMPLE_LINES].map((ln, i) => (
                            <div
                              key={`smooth-${i}`}
                              className={
                                "flex items-center gap-2 truncate font-mono text-xs leading-5 " +
                                (ln.accent
                                  ? "font-medium text-[var(--ink-primary)]"
                                  : "text-[var(--ink-secondary)]")
                              }
                            >
                              <span className="text-[var(--accent-vermilion)]/75">{ln.num}</span>
                              <span className="truncate">{ln.code}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Window Footer */}
                  <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-[var(--rule-cut)] pt-2">
                    <span className="truncate font-sans text-xs text-[var(--ink-secondary)]">
                      {isVi
                        ? "Lăn chuột ngay trên 2 khung code để thấy sự khác biệt"
                        : "Roll your mouse wheel over both panes to feel the difference"}
                    </span>
                    <Link
                      href="/projects/smoothscroll"
                      tabIndex={isFront ? 0 : -1}
                      transitionTypes={["folio-forward"]}
                      className="inline-flex shrink-0 items-center gap-1 font-mono text-xs font-semibold text-[var(--ink-primary)] hover:text-[var(--accent-vermilion)]"
                    >
                      <span>{meta.openText}</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}

              {/* ==================== BODY 02: LARAVEL 12 PROPERTY API & QUEUE ==================== */}
              {meta.idx === 1 && (
                <div className="flex flex-1 flex-col justify-between p-3.5">
                  {/* 4-Tier RBAC Interactive Switcher */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex flex-wrap gap-1.5">
                        {(["Owner", "Admin", "Manager", "Sales"] as RbacRole[]).map((role) => (
                          <button
                            key={role}
                            type="button"
                            tabIndex={isFront ? 0 : -1}
                            onClick={() => setRbacRole(role)}
                            className={
                              "cursor-pointer rounded-[2px] border px-2.5 py-1 font-mono text-xs transition-colors " +
                              (rbacRole === role
                                ? "border-[var(--ink-primary)] bg-[var(--ink-primary)] font-medium text-[var(--bg-sheet-top)]"
                                : "border-[var(--rule-cut)] bg-[var(--bg-canvas)] text-[var(--ink-secondary)] hover:border-[var(--rule-strong)]")
                            }
                          >
                            {role}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        tabIndex={isFront ? 0 : -1}
                        onClick={() => setOptimizedQuery((v) => !v)}
                        className="inline-flex cursor-pointer items-center gap-1 rounded-[2px] border border-[var(--rule-strong)] bg-[var(--bg-canvas)] px-2 py-1 font-mono text-xs font-medium text-[var(--ink-primary)] hover:border-[var(--accent-vermilion)]"
                      >
                        <Database size={12} aria-hidden="true" />
                        <span>{optimizedQuery ? "Redis + Index" : "Legacy N+1"}</span>
                      </button>
                    </div>

                    <p className="mt-2 rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-2.5 py-1.5 font-sans text-xs text-[var(--ink-primary)]">
                      <span className="font-mono font-semibold text-[var(--accent-patina)]">
                        {`RBAC [${rbacRole}]: `}
                      </span>
                      {rbacScopes[rbacRole][isVi ? "vi" : "en"]}
                    </p>
                  </div>

                  {/* MySQL + Redis Query Benchmark Bar */}
                  <div className="rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] p-2.5">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[var(--ink-secondary)]">
                        {optimizedQuery
                          ? "Eloquent::with(['room','meter']) + Redis"
                          : "Unindexed N+1 Loop (64 queries)"}
                      </span>
                      <span
                        className={
                          "font-semibold tabular-nums " +
                          (optimizedQuery
                            ? "text-[var(--accent-patina)]"
                            : "text-[var(--accent-vermilion)]")
                        }
                      >
                        {optimizedQuery ? "14 ms · 2 SQL" : "286 ms · 64 SQL"}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-sheet-mid)]">
                      <motion.div
                        initial={false}
                        animate={{ width: optimizedQuery ? "11%" : "92%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        className={
                          "h-full rounded-full " +
                          (optimizedQuery
                            ? "bg-[var(--accent-patina)]"
                            : "bg-[var(--accent-vermilion)]")
                        }
                      />
                    </div>
                  </div>

                  {/* Live Async Billing Queue Pipeline */}
                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                    {queueStages.map((stName, idx) => {
                      const active = queueStep === idx;
                      return (
                        <div
                          key={stName}
                          className={
                            "rounded-[3px] border px-2 py-1.5 font-mono text-xs transition-colors " +
                            (active
                              ? "border-[var(--accent-patina)] bg-[var(--accent-patina-wash)] font-semibold text-[var(--accent-patina)]"
                              : "border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] text-[var(--ink-secondary)]")
                          }
                        >
                          <span className="block truncate">{stName}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-[var(--rule-cut)] pt-2">
                    <span className="truncate font-mono text-xs text-[var(--ink-tertiary)]">
                      Queue: billing-high · Worker OK
                    </span>
                    <Link
                      href="/projects/property-management"
                      tabIndex={isFront ? 0 : -1}
                      transitionTypes={["folio-forward"]}
                      className="inline-flex shrink-0 items-center gap-1 font-mono text-xs font-semibold text-[var(--ink-primary)] hover:text-[var(--accent-vermilion)]"
                    >
                      <span>{meta.openText}</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}

              {/* ==================== BODY 03: SPRING BOOT + VNPAY BOOKING ==================== */}
              {meta.idx === 2 && (
                <div className="flex flex-1 flex-col justify-between p-3.5">
                  <div className="space-y-1.5">
                    {medicalSlots.map((slot, sIdx) => {
                      const chosen = selectedSlot === sIdx;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          tabIndex={isFront ? 0 : -1}
                          onClick={() => runVnpaySimulation(sIdx)}
                          className={
                            "flex w-full cursor-pointer items-center justify-between rounded-[3px] border px-3 py-2 text-left text-xs transition-colors " +
                            (chosen
                              ? "border-[var(--ink-primary)] bg-[var(--bg-canvas)] font-medium text-[var(--ink-primary)]"
                              : "border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] text-[var(--ink-secondary)] hover:border-[var(--rule-strong)]")
                          }
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span className="font-mono font-semibold text-[var(--accent-vermilion)] tabular-nums">
                              {slot.time}
                            </span>
                            <span className="truncate font-sans">{slot.dept}</span>
                          </span>
                          <span className="shrink-0 font-mono text-xs text-[var(--accent-patina)] tabular-nums">
                            {slot.fee}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Live 4-Step VNPay Settlement Verification Trace */}
                  <div className="grid grid-cols-2 gap-1.5 rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] p-2.5 sm:grid-cols-4">
                    {vnpaySteps.map((stepText, idx) => {
                      const done = idx <= txStage;
                      return (
                        <div key={stepText} className="flex items-center gap-1.5 font-mono text-xs">
                          <CheckCircle2
                            size={13}
                            className={
                              "shrink-0 transition-colors " +
                              (done
                                ? "text-[var(--accent-patina)]"
                                : "text-[var(--ink-tertiary)] opacity-40")
                            }
                            aria-hidden="true"
                          />
                          <span
                            className={
                              "truncate " +
                              (done ? "font-medium text-[var(--ink-primary)]" : "text-[var(--ink-tertiary)]")
                            }
                          >
                            {stepText}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-[var(--rule-cut)] pt-2">
                    <button
                      type="button"
                      tabIndex={isFront ? 0 : -1}
                      onClick={() => runVnpaySimulation((selectedSlot + 1) % 3)}
                      className="inline-flex cursor-pointer items-center gap-1 font-mono text-xs font-medium text-[var(--accent-patina)] hover:underline"
                    >
                      <Zap size={12} aria-hidden="true" />
                      <span>
                        {isVi ? "Mô phỏng callback VNPay" : "Simulate VNPay callback"}
                      </span>
                    </button>

                    <Link
                      href="/projects/medical-booking"
                      tabIndex={isFront ? 0 : -1}
                      transitionTypes={["folio-forward"]}
                      className="inline-flex shrink-0 items-center gap-1 font-mono text-xs font-semibold text-[var(--ink-primary)] hover:text-[var(--accent-vermilion)]"
                    >
                      <span>{meta.openText}</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom 3-Project Deck Switcher */}
      <div className="space-y-2 border-t border-[var(--rule-cut)] pt-2.5">
        <p className="font-sans text-xs text-[var(--ink-secondary)]">{strataHint}</p>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3" role="tablist" aria-label={stageLabel}>
          {layers.map((label, idx) => {
            const cardIdx = idx as CardIndex;
            const selected = activeCard === cardIdx;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveCard(cardIdx)}
                className={
                  "min-h-10 cursor-pointer rounded-[3px] border px-3 py-1.5 text-left font-mono text-xs transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] " +
                  (selected
                    ? "border-[var(--ink-primary)] bg-[var(--ink-primary)] font-semibold text-[var(--bg-sheet-top)]"
                    : "border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] text-[var(--ink-secondary)] hover:border-[var(--rule-strong)] hover:text-[var(--ink-primary)]")
                }
              >
                <span className="block truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
