"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play, Sparkles } from "lucide-react";

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

type ActIndex = 0 | 1 | 2 | 3;

interface FlowCourier {
  u: number;
  lane: number;
  speed: number;
  size: number;
  tone: 0 | 1 | 2; // 0: vermilion, 1: brass, 2: patina
}

interface JewelNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface WakePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const FILAMENT_COUNT = 22;
const SAMPLES = 68;
const COURIER_COUNT = 54;
const JEWEL_COUNT = 28;
const ACT_DURATION_SEC = 6.2;

function damp(cur: number, target: number, lambda: number, dt: number): number {
  return cur + (target - cur) * (1 - Math.exp(-lambda * dt));
}

/** Draw precision horological gear with involute-inspired teeth & spoked cutout */
function drawPrecisionGear(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  teeth: number,
  toothDepth: number,
  rotation: number,
  fillStyle: string,
  strokeStyle: string,
  spokes = 5
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  ctx.beginPath();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.22;
    const a2 = a0 + step * 0.32;
    const a3 = a0 + step * 0.68;
    const a4 = a0 + step * 0.78;
    const baseR = outerR - toothDepth;

    if (i === 0) {
      ctx.moveTo(Math.cos(a0) * baseR, Math.sin(a0) * baseR);
    } else {
      ctx.lineTo(Math.cos(a0) * baseR, Math.sin(a0) * baseR);
    }
    ctx.lineTo(Math.cos(a1) * baseR, Math.sin(a1) * baseR);
    ctx.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
    ctx.lineTo(Math.cos(a3) * outerR, Math.sin(a3) * outerR);
    ctx.lineTo(Math.cos(a4) * baseR, Math.sin(a4) * baseR);
  }
  ctx.closePath();

  // Inner cutout ring
  ctx.moveTo(innerR, 0);
  ctx.arc(0, 0, innerR, 0, Math.PI * 2, true);

  ctx.fillStyle = fillStyle;
  ctx.fill("evenodd");
  ctx.lineWidth = 0.9;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();

  // Delicate watchmaker spokes
  if (spokes > 0 && innerR > 6) {
    ctx.beginPath();
    for (let s = 0; s < spokes; s++) {
      const sa = (s / spokes) * Math.PI * 2;
      ctx.moveTo(Math.cos(sa) * 4.5, Math.sin(sa) * 4.5);
      ctx.lineTo(Math.cos(sa) * innerR, Math.sin(sa) * innerR);
    }
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }

  // Jewel center bearing
  ctx.beginPath();
  ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
  ctx.fillStyle = "#FAF7F1";
  ctx.fill();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = "#B8332A";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
  ctx.fillStyle = "#B8332A";
  ctx.fill();

  ctx.restore();
}

/** Smooth quadratic midpoint spline through sampled points */
function strokeSmoothCurve(ctx: CanvasRenderingContext2D, pts: Array<[number, number]>) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) * 0.5;
    const my = (pts[i][1] + pts[i + 1][1]) * 0.5;
    ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last[0], last[1]);
  ctx.stroke();
}

/** Render a sculpted variable-width cut-paper silk ribbon with cast relief shadow */
function drawTaperedSilkRibbon(
  ctx: CanvasRenderingContext2D,
  pts: Array<[number, number]>,
  maxHalfWidth: number,
  fillStyle: string,
  edgeStroke: string,
  withShadow: boolean
) {
  const n = pts.length;
  if (n < 3) return;

  const upper: Array<[number, number]> = [];
  const lower: Array<[number, number]> = [];

  for (let i = 0; i < n; i++) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(n - 1, i + 1)];
    const tx = next[0] - prev[0];
    const ty = next[1] - prev[1];
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;

    const u = i / (n - 1);
    // Needle-sharp calligraphic taper at both ends, full body in middle
    const taper = Math.pow(Math.sin(u * Math.PI), 0.75);
    const hw = maxHalfWidth * taper;

    upper.push([pts[i][0] + nx * hw, pts[i][1] + ny * hw]);
    lower.push([pts[i][0] - nx * hw, pts[i][1] - ny * hw]);
  }

  ctx.save();
  if (withShadow) {
    ctx.shadowColor = "rgba(24, 23, 21, 0.14)";
    ctx.shadowBlur = 7;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;
  }

  ctx.beginPath();
  ctx.moveTo(upper[0][0], upper[0][1]);
  for (let i = 1; i < n; i++) {
    ctx.lineTo(upper[i][0], upper[i][1]);
  }
  for (let i = n - 1; i >= 0; i--) {
    ctx.lineTo(lower[i][0], lower[i][1]);
  }
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.lineWidth = 0.7;
  ctx.strokeStyle = edgeStroke;
  ctx.stroke();
  ctx.restore();
}

/** Crisp drafted callout pill + hair-leader rendered directly in the engraving */
function drawEngravedCallout(
  ctx: CanvasRenderingContext2D,
  anchorX: number,
  anchorY: number,
  boxX: number,
  boxY: number,
  label: string,
  accentColor: string,
  alpha: number
) {
  if (alpha <= 0.04) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = "600 9.5px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  const textW = ctx.measureText(label).width;
  const padX = 6.5;
  const boxW = textW + padX * 2;
  const boxH = 17;
  const rx = boxX - boxW * 0.5;
  const ry = boxY - boxH * 0.5;

  // Orthogonal drafting leader stem
  ctx.beginPath();
  ctx.moveTo(anchorX, anchorY);
  ctx.lineTo(boxX, anchorY);
  ctx.lineTo(boxX, boxY);
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 0.85;
  ctx.setLineDash([2.5, 2]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Bullseye anchor point
  ctx.beginPath();
  ctx.arc(anchorX, anchorY, 2.4, 0, Math.PI * 2);
  ctx.fillStyle = accentColor;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(anchorX, anchorY, 4.8, 0, Math.PI * 2);
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 0.7;
  ctx.stroke();

  // Micro-plaque card
  ctx.fillStyle = "rgba(250, 247, 241, 0.94)";
  ctx.strokeStyle = "rgba(73, 69, 62, 0.42)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.rect(rx, ry, boxW, boxH);
  ctx.fill();
  ctx.stroke();

  // Left pigment bar on micro-plaque
  ctx.fillStyle = accentColor;
  ctx.fillRect(rx, ry, 2.2, boxH);

  ctx.fillStyle = "#181715";
  ctx.textBaseline = "middle";
  ctx.fillText(label, rx + padX + 1, boxY + 0.5);
  ctx.restore();
}

export default function PaperKineticSculpture({
  stageLabel,
  pulseLabel,
  strataHint,
  liveDownloads,
  language = "en",
}: PaperKineticSculptureProps) {
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRefs = useRef<Array<HTMLSpanElement | null>>([null, null, null, null]);

  const [activeAct, setActiveAct] = useState<ActIndex>(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const stateRef = useRef({
    act: 0 as ActIndex,
    autoPlay: true,
    actTimer: 0,
    morphBlend: [1, 0, 0, 0] as [number, number, number, number],
    pointerX: 0.5,
    pointerY: 0.5,
    prevPointerX: 0.5,
    prevPointerY: 0.5,
    pointerActive: false,
    isDragging: false,
    dragLastAngle: 0,
    wheelVelocity: 1.55,
    shockwave: 0,
    shockX: 0.35,
    shockY: 0.5,
    liveDlLabel: liveDownloads ?? "40k+",
  });

  useEffect(() => {
    stateRef.current.liveDlLabel = liveDownloads ?? "40k+";
  }, [liveDownloads]);

  useEffect(() => {
    stateRef.current.act = activeAct;
    stateRef.current.actTimer = 0;
  }, [activeAct]);

  useEffect(() => {
    stateRef.current.autoPlay = autoPlay;
  }, [autoPlay]);

  const triggerWave = useCallback((nx = 0.5, ny = 0.5) => {
    stateRef.current.wheelVelocity = Math.min(stateRef.current.wheelVelocity + 7.5, 16);
    stateRef.current.shockwave = 1;
    stateRef.current.shockX = nx;
    stateRef.current.shockY = ny;
  }, []);

  const chapters =
    language === "vi"
      ? [
          {
            code: "I",
            short: "SmoothScroll",
            title: liveDownloads
              ? `SmoothScroll · ${liveDownloads} lượt tải`
              : "SmoothScroll · Cơ cấu Lò xo 120Hz",
            caption: "Bộ hồi cơ khí Rust biến xung nấc Win32 120Δ thành dải lụa vận tốc 120Hz",
            slug: "smoothscroll",
            cta: "Hồ sơ SmoothScroll",
          },
          {
            code: "II",
            short: "Laravel 12",
            title: "Laravel 12 · Thiên cầu RBAC & Queue",
            caption: "4 quỹ đạo phân quyền đồng tâm & luồng hàng đợi hóa đơn bất đồng bộ (C3TEK)",
            slug: "property-management",
            cta: "Hồ sơ Property",
          },
          {
            code: "III",
            short: "MySQL/Redis",
            title: "MySQL B+Tree & Cộng hưởng Redis",
            caption: "Cấu trúc chỉ mục phân tầng kết hợp vòng sóng bộ nhớ đệm phản hồi O(1)",
            slug: "medical-booking",
            cta: "Hồ sơ Medical",
          },
          {
            code: "IV",
            short: "Sync & AI",
            title: "Chuỗi Xoắn Đồng bộ Đa Kênh",
            caption: "Con quay đôi kết nối Laravel ↔ WordPress, Spring Boot ↔ VNPay & Kotlin AI",
            slug: "chatbot",
            cta: "Hồ sơ ChatBot",
          },
        ]
      : [
          {
            code: "I",
            short: "SmoothScroll",
            title: liveDownloads
              ? `SmoothScroll · ${liveDownloads} downloads`
              : "SmoothScroll · 120Hz Escapement",
            caption: "Triple-gear Rust escapement smoothing raw 120Δ Win32 detents into 120Hz silk",
            slug: "smoothscroll",
            cta: "SmoothScroll folio",
          },
          {
            code: "II",
            short: "Laravel 12",
            title: "Laravel 12 · 4-Ring RBAC Orrery",
            caption: "Concentric Owner/Admin/Manager/Sales access rings & async queue couriers",
            slug: "property-management",
            cta: "Property folio",
          },
          {
            code: "III",
            short: "MySQL/Redis",
            title: "MySQL B+Tree & Redis Cymatics",
            caption: "Composite-indexed B+Tree hierarchy crowned by O(1) cache resonance waves",
            slug: "medical-booking",
            cta: "Medical folio",
          },
          {
            code: "IV",
            short: "Sync & AI",
            title: "Dual-Gyroscope Sync Helix",
            caption: "Braided pipeline bridging WordPress inventory, VNPay settlement & Kotlin AI",
            slug: "chatbot",
            cta: "ChatBot folio",
          },
        ];

  const currentChapter = chapters[activeAct];

  // Non-passive mouse-wheel capture over the art canvas
  useEffect(() => {
    const el = stageWrapperRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dir = e.deltaY >= 0 ? 1 : -1;
      const boost = Math.min(Math.abs(e.deltaY) * 0.055, 9);
      stateRef.current.wheelVelocity = Math.max(
        -16,
        Math.min(16, stateRef.current.wheelVelocity + dir * Math.max(2.2, boost))
      );
      stateRef.current.shockwave = Math.min(1, stateRef.current.shockwave + 0.6);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = stageWrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReduced = reducedQuery.matches;
    const onReducedChange = (e: MediaQueryListEvent) => {
      prefersReduced = e.matches;
    };
    reducedQuery.addEventListener("change", onReducedChange);

    let width = 580;
    let height = 330;
    let renderScale = 2;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      width = Math.max(260, Math.round(rect.width));
      height = Math.max(240, Math.round(rect.height));
      // Supersample >= 2x even on 1x desktop monitors for razor-sharp copperplate lines!
      const rawDpr = window.devicePixelRatio || 1;
      renderScale = Math.max(2, Math.min(rawDpr * 1.5, 3));
      canvas.width = Math.round(width * renderScale);
      canvas.height = Math.round(height * renderScale);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    let inViewport = true;
    const io = new IntersectionObserver(
      (entries) => {
        inViewport = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(wrapper);

    const couriers: FlowCourier[] = Array.from({ length: COURIER_COUNT }, (_, i) => ({
      u: (i / COURIER_COUNT) % 1,
      lane: i % FILAMENT_COUNT,
      speed: 0.14 + ((i * 11) % 13) * 0.015,
      size: 1.5 + (i % 3) * 0.75,
      tone: (i % 3) as 0 | 1 | 2,
    }));

    const jewels: JewelNode[] = Array.from({ length: JEWEL_COUNT }, (_, i) => {
      const a = (i / JEWEL_COUNT) * Math.PI * 2;
      return {
        x: 0.5 + Math.cos(a) * 0.24,
        y: 0.5 + Math.sin(a) * 0.24,
        vx: 0,
        vy: 0,
      };
    });

    const wakeTrail: WakePoint[] = [];

    // Sample normalized [0..1] filament geometry for each Act (0..3)
    const sampleActFilament = (
      act: number,
      rIdx: number,
      u: number,
      time: number,
      wheelPhase: number
    ): [number, number] => {
      const laneNorm = FILAMENT_COUNT > 1 ? rIdx / (FILAMENT_COUNT - 1) - 0.5 : 0;

      if (act === 0) {
        // ACT I: SmoothScroll — Quantized 120Δ Square Steps -> Escapement (0.35) -> 120Hz Laminar Silk
        const gateX = 0.35;
        const x = 0.05 + u * 0.9;
        if (x < gateX) {
          const localU = (x - 0.05) / (gateX - 0.05);
          // Crisp quantized stair-steps mimicking raw 120-delta wheel ticks
          const steps = 6;
          const q = Math.floor(localU * steps) / steps;
          const smoothSub = Math.pow((localU * steps) % 1, 7);
          const quantU = q + smoothSub / steps;
          const stair = Math.sin(quantU * 5.2 + rIdx * 0.35 - wheelPhase * 0.28) * 0.16;
          const funnel = Math.max(0.06, 1 - Math.pow(localU, 1.55) * 0.92);
          return [x, 0.5 + (laneNorm * 0.64 + stair) * funnel];
        }
        const postU = (x - gateX) / (0.95 - gateX);
        const bloom = 0.03 + Math.pow(postU, 0.72) * 0.66;
        const harmonic1 =
          Math.sin(postU * 7.4 - wheelPhase * 1.1 + rIdx * 0.22) * 0.115 * Math.sin(postU * Math.PI * 0.92);
        const harmonic2 =
          Math.cos(postU * 13.5 - time * 1.9 - rIdx * 0.4) * 0.026 * postU;
        return [x, 0.5 + laneNorm * bloom + harmonic1 + harmonic2];
      }

      if (act === 1) {
        // ACT II: Laravel 12 — 4 Concentric RBAC Planetary Rings + Guilloché Epicycles
        const tier = rIdx % 4;
        const baseR = 0.125 + tier * 0.082;
        const subOffset = Math.floor(rIdx / 4) * ((Math.PI * 2) / 6);
        const dir = tier % 2 === 0 ? 1 : -1;
        const theta =
          u * Math.PI * 1.92 +
          subOffset +
          time * 0.32 * dir +
          wheelPhase * 0.07 * dir;
        // Subtle 6-lobe guilloché rose modulation
        const guilloche = Math.sin(theta * 6 + time * 1.5) * 0.009;
        const r = baseR + guilloche;
        const aspect = width / height;
        return [
          0.5 + (Math.cos(theta) * r * 1.18) / Math.max(1, aspect * 0.74),
          0.5 + Math.sin(theta) * r * 1.12,
        ];
      }

      if (act === 2) {
        // ACT III: MySQL B+Tree Cathedral & Cymatic Standing-Wave Resonance
        const cluster = rIdx % 5; // 5 indexed leaf columns
        const fineOffset = (Math.floor(rIdx / 5) - 2) * 0.022;
        const targetX = 0.14 + (cluster / 4) * 0.72 + fineOffset;
        const sEase = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        const standingWave =
          Math.sin(u * Math.PI * 3 - wheelPhase * 0.5 + rIdx * 0.3) *
          0.022 *
          Math.sin(u * Math.PI);
        const x = 0.5 + (targetX - 0.5) * sEase + standingWave;
        const y = 0.15 + u * 0.72;
        return [x, y];
      }

      // ACT IV: Dual-Gyroscope Braided DNA / Lissajous Helix
      const strand = rIdx % 2 === 0 ? 1 : -1;
      const band = (Math.floor(rIdx / 2) / (FILAMENT_COUNT / 2 - 1) - 0.5) * 0.16;
      const x = 0.14 + u * 0.72;
      const pinch = Math.sin(u * Math.PI); // widest in center, pinched into the 2 gyroscopes at x=0.18 & x=0.82
      const helix =
        Math.sin(u * Math.PI * 3.5 - wheelPhase * 0.65 + (strand > 0 ? 0 : Math.PI)) *
        0.24 *
        (0.28 + 0.72 * pinch);
      const y = 0.5 + helix + band * pinch;
      return [x, y];
    };

    // Structural Jewel Node Coordinates per Act
    const targetJewelPos = (act: number, idx: number, time: number): [number, number] => {
      const aspect = width / height;
      const xScale = 1 / Math.max(1, aspect * 0.74);

      if (act === 0) {
        if (idx < 10) {
          const a = (idx / 10) * Math.PI * 2 + time * 0.85;
          return [0.35 + Math.cos(a) * 0.115 * xScale, 0.5 + Math.sin(a) * 0.115];
        }
        if (idx < 18) {
          const k = idx - 10;
          return [0.08 + (k / 7) * 0.21, 0.24 + ((k * 29) % 9) * 0.062];
        }
        const k = idx - 18;
        const ux = 0.48 + (k / 9) * 0.43;
        return [ux, 0.5 + Math.sin(ux * 7.4 - time * 1.8 + k * 0.7) * 0.23];
      }

      if (act === 1) {
        const ring = idx % 4;
        const spoke = Math.floor(idx / 4); // 0..6
        const r = 0.125 + ring * 0.082;
        const a = (spoke / 7) * Math.PI * 2 + (ring % 2 === 0 ? time * 0.32 : -time * 0.32);
        return [0.5 + Math.cos(a) * r * 1.18 * xScale, 0.5 + Math.sin(a) * r * 1.12];
      }

      if (act === 2) {
        // 1 Root + 3 Branch + 9 Mid + 15 Leaf B+Tree Index Nodes
        if (idx === 0) return [0.5, 0.15];
        if (idx < 4) {
          const k = idx - 1;
          return [0.24 + (k / 2) * 0.52, 0.38];
        }
        if (idx < 13) {
          const k = idx - 4;
          return [0.16 + (k / 8) * 0.68, 0.63];
        }
        const k = idx - 13;
        return [0.12 + (k / 14) * 0.76, 0.87];
      }

      // Act 3: Two Gyroscope Rings at x=0.18 & x=0.82 + 8 Central Helix Nodes
      if (idx < 10) {
        const a = (idx / 10) * Math.PI * 2 + time * 0.65;
        return [0.18 + Math.cos(a) * 0.095 * xScale, 0.5 + Math.sin(a) * 0.12];
      }
      if (idx < 20) {
        const a = ((idx - 10) / 10) * Math.PI * 2 - time * 0.65;
        return [0.82 + Math.cos(a) * 0.095 * xScale, 0.5 + Math.sin(a) * 0.12];
      }
      const k = idx - 20;
      const ux = 0.32 + (k / 7) * 0.36;
      return [ux, 0.5 + Math.sin(ux * 10 - time * 2.2) * 0.14];
    };

    const sampledRibbons: Array<Array<[number, number]>> = Array.from(
      { length: FILAMENT_COUNT },
      () => Array.from({ length: SAMPLES }, () => [0, 0])
    );

    let elapsed = 0;
    let wheelPhase = 0;
    let rafId = 0;
    let lastNow = performance.now();

    const drawFrame = (now: number) => {
      rafId = window.requestAnimationFrame(drawFrame);
      if (!inViewport) return;

      const dt = Math.max(0, Math.min((now - lastNow) / 1000, 0.05));
      lastNow = now;
      const st = stateRef.current;

      if (!prefersReduced) {
        elapsed += dt;
        wheelPhase += st.wheelVelocity * dt;
        if (!st.isDragging) {
          st.wheelVelocity = damp(st.wheelVelocity, 1.45, 2.0, dt);
        }
        st.shockwave = Math.max(0, st.shockwave - dt * 1.25);

        if (st.autoPlay && !st.isDragging) {
          st.actTimer += dt;
          if (st.actTimer >= ACT_DURATION_SEC) {
            st.actTimer = 0;
            const nextAct = ((st.act + 1) % 4) as ActIndex;
            st.act = nextAct;
            setActiveAct(nextAct);
          }
        }
      }

      // Decay pointer fluid wake trail
      for (let w = wakeTrail.length - 1; w >= 0; w--) {
        wakeTrail[w].life -= dt * 2.1;
        if (wakeTrail[w].life <= 0) {
          wakeTrail.splice(w, 1);
        }
      }

      if (st.pointerActive && !prefersReduced) {
        const dvx = st.pointerX - st.prevPointerX;
        const dvy = st.pointerY - st.prevPointerY;
        if (Math.hypot(dvx, dvy) > 0.004) {
          wakeTrail.push({
            x: st.pointerX * width,
            y: st.pointerY * height,
            vx: dvx * width * 16,
            vy: dvy * height * 16,
            life: 1,
          });
          if (wakeTrail.length > 10) wakeTrail.shift();
        }
        st.prevPointerX = st.pointerX;
        st.prevPointerY = st.pointerY;
      }

      // Sync chapter progress hairlines
      for (let i = 0; i < 4; i++) {
        const bar = progressBarRefs.current[i];
        if (!bar) continue;
        const ratio =
          st.act === i
            ? st.autoPlay && !prefersReduced
              ? Math.min(1, st.actTimer / ACT_DURATION_SEC)
              : 1
            : 0;
        bar.style.transform = `scaleX(${ratio.toFixed(3)})`;
      }

      // Blend Act weights
      for (let a = 0; a < 4; a++) {
        const targetW = st.act === a ? 1 : 0;
        st.morphBlend[a] = prefersReduced ? targetW : damp(st.morphBlend[a], targetW, 4.8, dt);
      }
      const weightSum =
        st.morphBlend[0] + st.morphBlend[1] + st.morphBlend[2] + st.morphBlend[3] || 1;

      ctx.save();
      ctx.scale(renderScale, renderScale);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // =======================================================================
      // 1. ARCHIVAL COTTON-RAG GROUND + ISOMETRIC MICRO-DOT MATRIX
      // =======================================================================
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        12,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.72
      );
      bgGrad.addColorStop(0, "#FCF9F2");
      bgGrad.addColorStop(0.65, "#F5EFE3");
      bgGrad.addColorStop(1, "#E9E1D0");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Precision 22px Isometric Blueprint Micro-Dot Matrix
      ctx.fillStyle = "rgba(73, 69, 62, 0.13)";
      const gridStep = 22;
      for (let gx = 18; gx < width - 14; gx += gridStep) {
        for (let gy = 18; gy < height - 14; gy += gridStep) {
          ctx.fillRect(gx, gy, 1.1, 1.1);
        }
      }

      // Golden-Ratio Axis Hairlines
      const hubX = width * (0.35 * st.morphBlend[0] + 0.5 * (1 - st.morphBlend[0]));
      const hubY = height * 0.5;

      ctx.strokeStyle = "rgba(73, 69, 62, 0.09)";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(12, hubY);
      ctx.lineTo(width - 12, hubY);
      ctx.moveTo(hubX, 12);
      ctx.lineTo(hubX, height - 12);
      ctx.stroke();

      // =======================================================================
      // 2. COUNTER-ROTATING SWISS ASTROLABE VERNIER DIAL (120 TICKS + DEGREES)
      // =======================================================================
      const outerDialR = Math.min(width, height) * 0.44;
      ctx.save();
      ctx.translate(hubX, hubY);

      // Outer Slow Counter-Rotating Degree Ring
      ctx.save();
      ctx.rotate(-elapsed * 0.06);
      ctx.strokeStyle = "rgba(158, 150, 134, 0.38)";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.arc(0, 0, outerDialR, 0, Math.PI * 2);
      ctx.arc(0, 0, outerDialR - 11, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = "500 7.5px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.fillStyle = "rgba(97, 92, 83, 0.65)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let t = 0; t < 120; t++) {
        const ang = (t / 120) * Math.PI * 2;
        const isMajor = t % 15 === 0;
        const isMid = t % 5 === 0;
        const rIn = isMajor ? outerDialR - 11 : isMid ? outerDialR - 6.5 : outerDialR - 3.5;

        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * rIn, Math.sin(ang) * rIn);
        ctx.lineTo(Math.cos(ang) * outerDialR, Math.sin(ang) * outerDialR);
        ctx.strokeStyle = isMajor
          ? "rgba(184, 51, 42, 0.55)"
          : isMid
            ? "rgba(73, 69, 62, 0.32)"
            : "rgba(73, 69, 62, 0.16)";
        ctx.lineWidth = isMajor ? 1 : 0.6;
        ctx.stroke();

        if (isMajor && outerDialR > 95) {
          const deg = String(Math.round((t / 120) * 360)).padStart(3, "0") + "°";
          ctx.save();
          ctx.rotate(ang + Math.PI / 2);
          ctx.fillText(deg, 0, -(outerDialR + 7));
          ctx.restore();
        }
      }
      ctx.restore();

      // Inner Wheel-Driven Vernier Compass Ring
      ctx.save();
      ctx.rotate(wheelPhase * 0.18);
      ctx.strokeStyle = "rgba(182, 132, 52, 0.34)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([6, 3, 1.5, 3]);
      ctx.beginPath();
      ctx.arc(0, 0, outerDialR * 0.72, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      ctx.restore();

      // Double Concentric Copperplate Shockwaves on Impulse
      if (st.shockwave > 0.01) {
        const prog = 1 - st.shockwave;
        const maxR = Math.max(width, height) * 0.62;
        for (let ring = 0; ring < 2; ring++) {
          const rProg = Math.max(0, prog - ring * 0.12);
          if (rProg <= 0) continue;
          ctx.beginPath();
          ctx.arc(st.shockX * width, st.shockY * height, 14 + rProg * maxR, 0, Math.PI * 2);
          ctx.strokeStyle =
            ring === 0
              ? `rgba(184, 51, 42, ${(st.shockwave * 0.45).toFixed(3)})`
              : `rgba(182, 132, 52, ${(st.shockwave * 0.32).toFixed(3)})`;
          ctx.lineWidth = ring === 0 ? 1.5 : 0.9;
          ctx.stroke();
        }
      }

      // =======================================================================
      // 3. SAMPLE ALL 22 RIBBONS WITH FLUID WAKE & MAGNETIC VORTEX DEFORMATION
      // =======================================================================
      for (let r = 0; r < FILAMENT_COUNT; r++) {
        const row = sampledRibbons[r];
        for (let s = 0; s < SAMPLES; s++) {
          const u = s / (SAMPLES - 1);
          let bx = 0;
          let by = 0;
          for (let a = 0; a < 4; a++) {
            const w = st.morphBlend[a] / weightSum;
            if (w < 0.002) continue;
            const [ax, ay] = sampleActFilament(a, r, u, elapsed, wheelPhase);
            bx += ax * w;
            by += ay * w;
          }

          let px = bx * width;
          let py = by * height;

          // Cursor Magnetic Swirl
          if (st.pointerActive && !prefersReduced) {
            const mx = st.pointerX * width;
            const my = st.pointerY * height;
            const dx = px - mx;
            const dy = py - my;
            const d2 = dx * dx + dy * dy;
            const rad = 110;
            if (d2 < rad * rad && d2 > 0.2) {
              const d = Math.sqrt(d2);
              const f = Math.pow(1 - d / rad, 2) * 22;
              px += (dx / d) * f - (dy / d) * f * 0.42;
              py += (dy / d) * f + (dx / d) * f * 0.42;
            }
          }

          // Trailing Fluid Velocity Wake
          for (let w = 0; w < wakeTrail.length; w++) {
            const wp = wakeTrail[w];
            const dx = px - wp.x;
            const dy = py - wp.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 4900) {
              const k = (1 - d2 / 4900) * wp.life * 0.22;
              px += wp.vx * k;
              py += wp.vy * k;
            }
          }

          row[s][0] = px;
          row[s][1] = py;
        }
      }

      // First Pass: 16 Ultra-Fine Guilloché Copperplate Filaments (0.65px crisp ink)
      for (let r = 0; r < FILAMENT_COUNT; r++) {
        if (r % 4 === 0) continue; // Save hero lanes for sculpted paper-silk ribbons!
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        if (r % 3 === 0) {
          ctx.strokeStyle = "rgba(182, 132, 52, 0.44)";
          ctx.lineWidth = 0.9;
        } else if (r % 3 === 1) {
          ctx.strokeStyle = "rgba(42, 92, 77, 0.38)";
          ctx.lineWidth = 0.85;
        } else {
          ctx.strokeStyle = "rgba(38, 36, 32, 0.24)";
          ctx.lineWidth = 0.65;
        }
        strokeSmoothCurve(ctx, sampledRibbons[r]);
      }

      // Second Pass: 6 Sculpted Tapered Washi-Paper & Vermilion Silk Ribbons (with relief shadow!)
      for (let r = 0; r < FILAMENT_COUNT; r += 4) {
        const idx = r / 4;
        const isVermilionSilk = idx % 2 === 0;
        const isAlabasterPaper = idx % 3 === 1;

        const fill = isVermilionSilk
          ? "rgba(184, 51, 42, 0.78)"
          : isAlabasterPaper
            ? "rgba(250, 247, 241, 0.92)"
            : "rgba(201, 154, 62, 0.72)";
        const edge = isVermilionSilk
          ? "rgba(122, 26, 20, 0.9)"
          : isAlabasterPaper
            ? "rgba(73, 69, 62, 0.68)"
            : "rgba(130, 92, 24, 0.85)";

        drawTaperedSilkRibbon(
          ctx,
          sampledRibbons[r],
          isAlabasterPaper ? 4.4 : 3.4,
          fill,
          edge,
          true
        );
      }

      // =======================================================================
      // 4. INTRICATE CHAPTER-SPECIFIC HOROLOGICAL & ARCHITECTURAL MECHANISMS
      // =======================================================================
      // ACT I: Triple Interlocking SmoothScroll Escapement Gears
      if (st.morphBlend[0] > 0.04) {
        const a0 = st.morphBlend[0];
        ctx.save();
        ctx.globalAlpha = a0;

        // Vertical laser gate line separating raw Win32 from 120Hz Silk
        ctx.strokeStyle = "rgba(184, 51, 42, 0.38)";
        ctx.lineWidth = 0.9;
        ctx.setLineDash([4, 2.5]);
        ctx.beginPath();
        ctx.moveTo(hubX, 18);
        ctx.lineTo(hubX, height - 18);
        ctx.stroke();
        ctx.setLineDash([]);

        // Secondary Upper Brass Pinion Gear (14 teeth, counter-rotates at -24/14 ratio)
        drawPrecisionGear(
          ctx,
          hubX - 24,
          hubY - 31,
          17,
          8.5,
          14,
          3.2,
          -wheelPhase * 0.55 * (24 / 14) + 0.2,
          "rgba(234, 227, 213, 0.95)",
          "#8B6524",
          4
        );

        // Tertiary Lower Patina Balance Gear (16 teeth)
        drawPrecisionGear(
          ctx,
          hubX - 21,
          hubY + 34,
          19,
          9.5,
          16,
          3.2,
          -wheelPhase * 0.55 * (24 / 16),
          "rgba(232, 240, 236, 0.95)",
          "#2A5C4D",
          4
        );

        // Primary Central Vermilion & Alabaster Scroll Escapement Wheel (24 teeth)
        drawPrecisionGear(
          ctx,
          hubX,
          hubY,
          28,
          16,
          24,
          3.8,
          wheelPhase * 0.55,
          "rgba(250, 247, 241, 0.97)",
          "#B8332A",
          6
        );
        ctx.restore();

        if (width >= 440) {
          drawEngravedCallout(
            ctx,
            width * 0.14,
            height * 0.24,
            width * 0.17,
            26,
            "WIN32 · 120Δ RAW",
            "#49453E",
            a0
          );
          drawEngravedCallout(
            ctx,
            hubX,
            hubY - 28,
            hubX + 18,
            height - 24,
            "RUST 120HZ ESCAPEMENT",
            "#B8332A",
            a0
          );
          drawEngravedCallout(
            ctx,
            width * 0.78,
            height * 0.34,
            width * 0.78,
            26,
            `SMOOTHSCROLL · ${st.liveDlLabel}`,
            "#2A5C4D",
            a0
          );
        }
      }

      // ACT II: Laravel 12 Central Dispatch Seal & Engraved RBAC Ring Callouts
      if (st.morphBlend[1] > 0.04) {
        const a1 = st.morphBlend[1];
        ctx.save();
        ctx.globalAlpha = a1;
        drawPrecisionGear(
          ctx,
          width * 0.5,
          height * 0.5,
          22,
          11,
          18,
          3,
          wheelPhase * 0.35,
          "rgba(250, 247, 241, 0.96)",
          "#B8332A",
          4
        );
        ctx.restore();

        if (width >= 440) {
          drawEngravedCallout(
            ctx,
            width * 0.5,
            height * 0.5 - 22,
            width * 0.22,
            26,
            "LARAVEL 12 · 4-TIER RBAC",
            "#B8332A",
            a1
          );
          drawEngravedCallout(
            ctx,
            width * 0.68,
            height * 0.68,
            width * 0.77,
            height - 24,
            "QUEUE · BILLING & PDF",
            "#B68434",
            a1
          );
        }
      }

      // ACT III: MySQL B+Tree Apex Jewel & Cymatic Redis Resonance Rings
      if (st.morphBlend[2] > 0.04) {
        const a2 = st.morphBlend[2];
        const rx = width * 0.5;
        const ry = height * 0.15;
        ctx.save();
        for (let w = 0; w < 3; w++) {
          const p = ((elapsed * 0.65 + w * 0.33) % 1);
          ctx.globalAlpha = a2 * (1 - p) * 0.55;
          ctx.strokeStyle = w % 2 === 0 ? "#2A5C4D" : "#B68434";
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(rx, ry, 8 + p * 48, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        if (width >= 440) {
          drawEngravedCallout(
            ctx,
            rx,
            ry,
            width * 0.23,
            26,
            "REDIS CACHE · O(1) HIT",
            "#2A5C4D",
            a2
          );
          drawEngravedCallout(
            ctx,
            width * 0.74,
            height * 0.63,
            width * 0.77,
            26,
            "MYSQL COMPOSITE B+TREE",
            "#B8332A",
            a2
          );
        }
      }

      // ACT IV: Dual Horological Gyroscopes at x=0.18 & x=0.82
      if (st.morphBlend[3] > 0.04) {
        const a3 = st.morphBlend[3];
        ctx.save();
        ctx.globalAlpha = a3;
        drawPrecisionGear(
          ctx,
          width * 0.18,
          height * 0.5,
          23,
          12,
          16,
          3.2,
          wheelPhase * 0.45,
          "rgba(250, 247, 241, 0.96)",
          "#B8332A",
          4
        );
        drawPrecisionGear(
          ctx,
          width * 0.82,
          height * 0.5,
          23,
          12,
          16,
          3.2,
          -wheelPhase * 0.45,
          "rgba(232, 240, 236, 0.96)",
          "#2A5C4D",
          4
        );
        ctx.restore();

        if (width >= 440) {
          drawEngravedCallout(
            ctx,
            width * 0.18,
            height * 0.5 - 23,
            width * 0.24,
            26,
            "LARAVEL · SPRING BOOT",
            "#B8332A",
            a3
          );
          drawEngravedCallout(
            ctx,
            width * 0.82,
            height * 0.5 - 23,
            width * 0.76,
            26,
            "WORDPRESS · VNPAY · AI",
            "#2A5C4D",
            a3
          );
        }
      }

      // =======================================================================
      // 5. SPRING-PHYSICS CONSTELLATION JEWELS & FINE ARCHITECTURAL WEBBING
      // =======================================================================
      for (let i = 0; i < JEWEL_COUNT; i++) {
        let tx = 0;
        let ty = 0;
        for (let a = 0; a < 4; a++) {
          const w = st.morphBlend[a] / weightSum;
          if (w < 0.002) continue;
          const [nx, ny] = targetJewelPos(a, i, elapsed);
          tx += nx * w;
          ty += ny * w;
        }
        const jw = jewels[i];
        if (prefersReduced) {
          jw.x = tx;
          jw.y = ty;
        } else {
          const ax = (tx - jw.x) * 28 - jw.vx * 7.4;
          const ay = (ty - jw.y) * 28 - jw.vy * 7.4;
          jw.vx += ax * dt;
          jw.vy += ay * dt;
          jw.x += jw.vx * dt;
          jw.y += jw.vy * dt;
        }
      }

      ctx.lineWidth = 0.65;
      for (let i = 0; i < JEWEL_COUNT; i++) {
        const x1 = jewels[i].x * width;
        const y1 = jewels[i].y * height;
        for (let j = i + 1; j < JEWEL_COUNT; j++) {
          const x2 = jewels[j].x * width;
          const y2 = jewels[j].y * height;
          const d2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
          if (d2 < 6400) {
            const op = (1 - d2 / 6400) * 0.22;
            ctx.strokeStyle = `rgba(73, 69, 62, ${op.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < JEWEL_COUNT; i++) {
        const px = jewels[i].x * width;
        const py = jewels[i].y * height;
        if (i % 3 === 0) {
          // Diamond Watchmaker Bearing Node
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle = "#FAF7F1";
          ctx.strokeStyle = i % 6 === 0 ? "#B8332A" : "#2A5C4D";
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.rect(-3.2, -3.2, 6.4, 6.4);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(px, py, 2.1, 0, Math.PI * 2);
          ctx.fillStyle = "#262420";
          ctx.fill();
        }
      }

      // =======================================================================
      // 6. 54 LUMINOUS COURIER BEADS STREAMING ALONG RIBBON TRAJECTORIES
      // =======================================================================
      const flowBoost = prefersReduced
        ? 0
        : 1 + Math.abs(st.wheelVelocity) * 0.14 + st.shockwave * 1.9;

      for (const c of couriers) {
        c.u = (((c.u + dt * c.speed * flowBoost) % 1) + 1) % 1;
        const sampleIdx = Math.min(SAMPLES - 1, Math.floor(c.u * (SAMPLES - 1)));
        const [px, py] = sampledRibbons[c.lane][sampleIdx];
        const env = Math.sin(c.u * Math.PI);
        const rad = c.size * (0.65 + env * 0.6);

        // Outer soft halo + razor crisp core
        ctx.beginPath();
        ctx.arc(px, py, rad * 2.1, 0, Math.PI * 2);
        ctx.fillStyle =
          c.tone === 0
            ? `rgba(184, 51, 42, ${(0.18 * env).toFixed(2)})`
            : c.tone === 1
              ? `rgba(182, 132, 52, ${(0.18 * env).toFixed(2)})`
              : `rgba(42, 92, 77, ${(0.18 * env).toFixed(2)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fillStyle =
          c.tone === 0
            ? `rgba(184, 51, 42, ${(0.95 * env).toFixed(2)})`
            : c.tone === 1
              ? `rgba(182, 132, 52, ${(0.92 * env).toFixed(2)})`
              : `rgba(42, 92, 77, ${(0.92 * env).toFixed(2)})`;
        ctx.fill();
      }

      // =======================================================================
      // 7. LEICA RANGEFINDER CURSOR CROSSHAIR & LIVE MICRO-TELEMETRY BAR
      // =======================================================================
      if (st.pointerActive && !prefersReduced) {
        const mx = st.pointerX * width;
        const my = st.pointerY * height;

        ctx.save();
        ctx.strokeStyle = "rgba(184, 51, 42, 0.22)";
        ctx.lineWidth = 0.65;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(mx, 10);
        ctx.lineTo(mx, height - 10);
        ctx.moveTo(10, my);
        ctx.lineTo(width - 10, my);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(mx, my, 16, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(184, 51, 42, 0.45)";
        ctx.lineWidth = 0.85;
        ctx.stroke();
        ctx.restore();
      }

      // Crisp Vernier Corner Registration Brackets + Bottom-Left Micro Scale
      ctx.strokeStyle = "rgba(97, 92, 83, 0.62)";
      ctx.lineWidth = 1;
      const m = 9;
      const tk = 12;
      ctx.beginPath();
      ctx.moveTo(m, m + tk);
      ctx.lineTo(m, m);
      ctx.lineTo(m + tk, m);
      ctx.moveTo(width - m - tk, m);
      ctx.lineTo(width - m, m);
      ctx.lineTo(width - m, m + tk);
      ctx.moveTo(m, height - m - tk);
      ctx.lineTo(m, height - m);
      ctx.lineTo(m + tk, height - m);
      ctx.moveTo(width - m - tk, height - m);
      ctx.lineTo(width - m, height - m);
      ctx.lineTo(width - m, height - m - tk);
      ctx.stroke();

      ctx.font = "500 8.5px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.fillStyle = "rgba(97, 92, 83, 0.72)";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText(
        `ω ${Math.abs(st.wheelVelocity).toFixed(2)} rad/s · ${Math.round(renderScale)}X RETINA`,
        16,
        height - 11
      );

      ctx.restore();
    };

    rafId = window.requestAnimationFrame(drawFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      reducedQuery.removeEventListener("change", onReducedChange);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    stateRef.current.isDragging = true;
    stateRef.current.dragLastAngle = Math.atan2(ny - 0.5, nx - 0.5);
    triggerWave(nx, ny);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    stateRef.current.pointerX = nx;
    stateRef.current.pointerY = ny;
    stateRef.current.pointerActive = true;

    if (stateRef.current.isDragging) {
      const ang = Math.atan2(ny - 0.5, nx - 0.5);
      let delta = ang - stateRef.current.dragLastAngle;
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;
      stateRef.current.wheelVelocity = Math.max(-16, Math.min(16, delta * 28));
      stateRef.current.dragLastAngle = ang;
    }
  };

  const handlePointerUpOrLeave = (leave: boolean) => {
    stateRef.current.isDragging = false;
    if (leave) stateRef.current.pointerActive = false;
  };

  return (
    <div className="paper-stack paper-chamfer relative flex flex-col justify-between p-4 sm:p-5">
      {/* Top Horological Plate Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-2.5 font-mono text-xs text-[var(--ink-secondary)]">
        <span className="truncate font-medium text-[var(--ink-primary)]">{stageLabel}</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => triggerWave(0.35, 0.5)}
            className="inline-flex min-h-7 cursor-pointer items-center gap-1 rounded-[2px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-2 py-0.5 font-mono text-xs text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)]"
          >
            <Sparkles size={12} aria-hidden="true" />
            <span>{pulseLabel}</span>
          </button>

          <button
            type="button"
            aria-pressed={autoPlay}
            aria-label={autoPlay ? "Pause chapter cycle" : "Resume chapter cycle"}
            onClick={() => setAutoPlay((v) => !v)}
            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[2px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)]"
          >
            {autoPlay ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>
      </div>

      {/* 100% Unobstructed Supersampled Engraving Canvas */}
      <div
        ref={stageWrapperRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={() => handlePointerUpOrLeave(false)}
        onPointerLeave={() => handlePointerUpOrLeave(true)}
        data-cursor="inspect"
        className="relative my-2.5 h-[265px] w-full cursor-crosshair overflow-hidden rounded-[3px] border border-[var(--rule-strong)] bg-[#FAF7F1] select-none sm:h-[315px]"
      >
        <canvas
          ref={canvasRef}
          aria-label={stageLabel}
          role="img"
          className="block h-full w-full"
        />
      </div>

      {/* Dedicated Unobstructed Story Plaque + Direct Folio Jump */}
      <div className="mb-2.5 flex flex-col items-start justify-between gap-2.5 rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-3 py-2.5 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <p className="font-serif text-sm font-semibold text-[var(--ink-primary)] sm:truncate sm:text-base">
            {currentChapter.title}
          </p>
          <p className="mt-0.5 font-sans text-xs leading-snug text-[var(--ink-secondary)] sm:line-clamp-1">
            {currentChapter.caption}
          </p>
        </div>

        <Link
          href={`/projects/${currentChapter.slug}`}
          transitionTypes={["folio-forward"]}
          data-cursor="open"
          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-[3px] border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-3 font-mono text-xs font-medium text-[var(--bg-sheet-top)] transition-[background-color,border-color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)] active:scale-[0.97]"
        >
          <span>{currentChapter.cta}</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>

      {/* 4 Interactive Portfolio Chapter Tabs with Live Progress Hairlines */}
      <div className="space-y-1.5 border-t border-[var(--rule-cut)] pt-2">
        <p className="font-sans text-xs text-[var(--ink-tertiary)]">{strataHint}</p>

        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4" role="tablist" aria-label={stageLabel}>
          {chapters.map((ch, idx) => {
            const act = idx as ActIndex;
            const isSelected = activeAct === act;
            return (
              <button
                key={ch.code}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveAct(act);
                  triggerWave(idx === 0 ? 0.35 : 0.5, 0.5);
                }}
                className={
                  "relative min-h-9 cursor-pointer overflow-hidden rounded-[3px] border px-2 py-1.5 text-left font-mono text-xs transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] " +
                  (isSelected
                    ? "border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] font-semibold text-[var(--ink-primary)] shadow-[0_2px_8px_rgba(24,23,21,0.06)]"
                    : "border-[var(--rule-cut)] bg-[var(--bg-canvas)]/75 text-[var(--ink-secondary)] hover:border-[var(--rule-strong)] hover:text-[var(--ink-primary)]")
                }
              >
                <span className="block truncate">{`${ch.code} · ${ch.short}`}</span>
                <span
                  ref={(el) => {
                    progressBarRefs.current[idx] = el;
                  }}
                  aria-hidden="true"
                  style={{ transform: isSelected ? "scaleX(1)" : "scaleX(0)" }}
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[var(--accent-vermilion)]"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
