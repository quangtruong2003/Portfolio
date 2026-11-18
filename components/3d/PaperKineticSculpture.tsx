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

interface FlowParticle {
  u: number;
  lane: number;
  speed: number;
  size: number;
  hue: 0 | 1 | 2; // 0: vermilion, 1: brass, 2: patina
}

interface MorphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const RIBBON_COUNT = 14;
const SAMPLES_PER_RIBBON = 46;
const PARTICLE_COUNT = 42;
const NODE_COUNT = 24;
const ACT_DURATION_SEC = 5.6;

function damp(cur: number, target: number, lambda: number, dt: number): number {
  return cur + (target - cur) * (1 - Math.exp(-lambda * dt));
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
    pointerActive: false,
    wheelVelocity: 1.5,
    shockwave: 0,
    shockX: 0.36,
    shockY: 0.5,
  });

  useEffect(() => {
    stateRef.current.act = activeAct;
    stateRef.current.actTimer = 0;
  }, [activeAct]);

  useEffect(() => {
    stateRef.current.autoPlay = autoPlay;
  }, [autoPlay]);

  const triggerWave = useCallback((nx = 0.5, ny = 0.5) => {
    stateRef.current.wheelVelocity = Math.min(stateRef.current.wheelVelocity + 6.5, 14);
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
              : "SmoothScroll · Nội suy 120Hz",
            caption: "Biến nấc cuộn Win32 bậc thang thành dải lụa vận tốc 120Hz bằng Rust",
            slug: "smoothscroll",
            linkLabel: "Mở hồ sơ SmoothScroll",
          },
          {
            code: "II",
            short: "Laravel 12",
            title: "Laravel 12 · RBAC & Queue",
            caption: "4 vòng phân quyền đồng tâm & luồng hàng đợi hóa đơn bất đồng bộ (C3TEK)",
            slug: "property-management",
            linkLabel: "Mở hồ sơ Property Platform",
          },
          {
            code: "III",
            short: "MySQL/Redis",
            title: "MySQL B-Tree & Đệm Redis",
            caption: "Triệt tiêu N+1 bằng Eager Loading, Composite Index & vòng cộng hưởng O(1)",
            slug: "medical-booking",
            linkLabel: "Mở hồ sơ Medical Booking",
          },
          {
            code: "IV",
            short: "Sync & AI",
            title: "Đồng bộ Đa kênh & AI",
            caption: "Cầu nối nhịp đôi: Laravel ↔ WordPress, Spring Boot ↔ VNPay, Kotlin ↔ Gemini",
            slug: "chatbot",
            linkLabel: "Mở hồ sơ ChatBot",
          },
        ]
      : [
          {
            code: "I",
            short: "SmoothScroll",
            title: liveDownloads
              ? `SmoothScroll · ${liveDownloads} dl`
              : "SmoothScroll · 120Hz Rust Engine",
            caption: "Transforming coarse 120-delta Win32 notches into liquid 120Hz silk ribbons",
            slug: "smoothscroll",
            linkLabel: "Open SmoothScroll folio",
          },
          {
            code: "II",
            short: "Laravel 12",
            title: "Laravel 12 · RBAC & Queues",
            caption: "4 concentric access rings & async billing/contract queue couriers (C3TEK)",
            slug: "property-management",
            linkLabel: "Open Property folio",
          },
          {
            code: "III",
            short: "MySQL/Redis",
            title: "MySQL B-Tree & Redis Halo",
            caption: "Collapsing N+1 bottlenecks via Composite Indexes & O(1) cache resonance",
            slug: "medical-booking",
            linkLabel: "Open Medical folio",
          },
          {
            code: "IV",
            short: "Sync & AI",
            title: "Live Sync & Payment Bridges",
            caption: "Dual-pole harmonic loom: WordPress batch sync, VNPay callbacks & Kotlin AI",
            slug: "chatbot",
            linkLabel: "Open ChatBot folio",
          },
        ];

  const currentChapter = chapters[activeAct];

  // Non-passive wheel capture directly over the art canvas
  useEffect(() => {
    const el = stageWrapperRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dir = e.deltaY >= 0 ? 1 : -1;
      const boost = Math.min(Math.abs(e.deltaY) * 0.05, 8);
      stateRef.current.wheelVelocity = Math.max(
        -14,
        Math.min(14, stateRef.current.wheelVelocity + dir * Math.max(2, boost))
      );
      stateRef.current.shockwave = Math.min(1, stateRef.current.shockwave + 0.55);
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

    let width = 540;
    let height = 310;
    let dpr = 1;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      width = Math.max(260, Math.round(rect.width));
      height = Math.max(230, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
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

    // Deterministic particles & spring-interpolated constellation nodes
    const particles: FlowParticle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      u: (i / PARTICLE_COUNT) % 1,
      lane: i % RIBBON_COUNT,
      speed: 0.16 + ((i * 7) % 11) * 0.018,
      size: 1.8 + (i % 3) * 0.85,
      hue: (i % 3) as 0 | 1 | 2,
    }));

    const nodes: MorphNode[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const a = (i / NODE_COUNT) * Math.PI * 2;
      return {
        x: 0.5 + Math.cos(a) * 0.25,
        y: 0.5 + Math.sin(a) * 0.25,
        vx: 0,
        vy: 0,
      };
    });

    // Compute normalized [0..1] ribbon sample point for a given Act (0..3)
    const sampleActRibbon = (
      act: number,
      rIdx: number,
      u: number,
      time: number,
      wheelPhase: number
    ): [number, number] => {
      const laneNorm = RIBBON_COUNT > 1 ? rIdx / (RIBBON_COUNT - 1) - 0.5 : 0; // [-0.5 .. +0.5]

      if (act === 0) {
        // ACT I: SmoothScroll — Stepped raw ticks (left) -> Rotor Gate (0.34) -> 120Hz Silk Wave (right)
        const gateX = 0.34;
        const x = 0.06 + u * 0.88;
        if (x < gateX) {
          // Discrete stepped staircase notches before the Rust Spring Gate
          const localU = (x - 0.06) / (gateX - 0.06);
          const quantized = Math.floor(localU * 5) / 5;
          const stepOffset = Math.sin(quantized * 4.2 + rIdx * 0.45 - wheelPhase * 0.35) * 0.14;
          const converge = 1 - Math.pow(localU, 1.8) * 0.78;
          const y = 0.5 + (laneNorm * 0.56 + stepOffset) * converge;
          return [x, y];
        }
        // Liquid 120Hz harmonic silk ribbons blooming out of the gate
        const postU = (x - gateX) / (0.94 - gateX);
        const spread = 0.06 + Math.pow(postU, 0.78) * 0.62;
        const wave1 = Math.sin(postU * 6.8 - wheelPhase * 1.15 + rIdx * 0.32) * 0.11 * postU;
        const wave2 = Math.cos(postU * 3.4 - time * 1.4 - rIdx * 0.2) * 0.045 * postU;
        const y = 0.5 + laneNorm * spread + wave1 + wave2;
        return [x, y];
      }

      if (act === 1) {
        // ACT II: Laravel 12 — 4 Concentric RBAC Orbital Rings & Spiraling Queue Streams
        const tier = rIdx % 4;
        const baseRadius = 0.13 + tier * 0.078;
        const angleOffset = (Math.floor(rIdx / 4) * Math.PI) / 2;
        const theta =
          u * Math.PI * 1.85 +
          angleOffset +
          time * (tier % 2 === 0 ? 0.38 : -0.28) +
          wheelPhase * 0.08;
        const ripple = Math.sin(u * 12 + time * 2.2 + rIdx) * 0.012;
        const aspect = width / height;
        const rx = (baseRadius + ripple) / Math.max(1, aspect * 0.72);
        const ry = baseRadius + ripple;
        return [0.5 + Math.cos(theta) * rx * 1.15, 0.5 + Math.sin(theta) * ry * 1.08];
      }

      if (act === 2) {
        // ACT III: MySQL B-Tree & Redis Halo — Root (top) branching into indexed leaves + harmonic rings
        const branchGroup = rIdx % 4; // 4 primary index branches
        const subLane = (Math.floor(rIdx / 4) - 1.5) * 0.032;
        const branchTargetX = 0.18 + (branchGroup / 3) * 0.64 + subLane;
        const easeU = u * u * (3 - 2 * u);
        const sCurve = Math.sin(u * Math.PI) * Math.sin(time * 1.6 + rIdx * 0.5) * 0.035;
        const x = 0.5 + (branchTargetX - 0.5) * easeU + sCurve;
        const y = 0.16 + u * 0.68;
        return [x, y];
      }

      // ACT IV: Dual-Pole Infinity Loom (Laravel/Spring <-> WordPress/VNPay/AI)
      const phase = u * Math.PI * 2 + time * 0.55 + rIdx * 0.22;
      const spread = 1 + laneNorm * 0.36;
      const x = 0.5 + Math.sin(phase) * 0.34 * spread;
      const y = 0.5 + Math.sin(phase * 2 + wheelPhase * 0.12) * 0.24 * spread;
      return [x, y];
    };

    // Compute normalized [0..1] target for structural architecture nodes per Act
    const targetNodePos = (act: number, idx: number, time: number): [number, number] => {
      if (act === 0) {
        // 8 wheel teeth around Rotor Gate (0.34, 0.5) + 8 raw ticks + 8 wave crests
        if (idx < 8) {
          const a = (idx / 8) * Math.PI * 2 + time * 1.1;
          const aspect = width / height;
          return [0.34 + (Math.cos(a) * 0.095) / Math.max(1, aspect * 0.75), 0.5 + Math.sin(a) * 0.095];
        }
        if (idx < 16) {
          const k = idx - 8;
          return [0.09 + (k / 7) * 0.2, 0.24 + ((k * 37) % 10) * 0.052];
        }
        const k = idx - 16;
        const ux = 0.46 + (k / 7) * 0.44;
        return [ux, 0.5 + Math.sin(ux * 7 - time * 2.1 + k) * 0.22];
      }

      if (act === 1) {
        // 4 RBAC rings x 6 domain nodes
        const ring = idx % 4;
        const spoke = Math.floor(idx / 4); // 0..5
        const r = 0.13 + ring * 0.078;
        const a = (spoke / 6) * Math.PI * 2 + (ring % 2 === 0 ? time * 0.32 : -time * 0.24);
        const aspect = width / height;
        return [0.5 + (Math.cos(a) * r * 1.15) / Math.max(1, aspect * 0.72), 0.5 + Math.sin(a) * r * 1.08];
      }

      if (act === 2) {
        // B-Tree hierarchy: 1 Root + 3 Level-1 + 8 Level-2 + 12 Leaf Index Nodes
        if (idx === 0) return [0.5, 0.16];
        if (idx < 5) {
          const k = idx - 1; // 0..3
          return [0.23 + (k / 3) * 0.54, 0.42];
        }
        if (idx < 13) {
          const k = idx - 5; // 0..7
          return [0.15 + (k / 7) * 0.7, 0.65];
        }
        const k = idx - 13; // 0..10
        return [0.12 + (k / 10) * 0.76, 0.83];
      }

      // Act 3: Dual poles (Left cluster at 0.24, Right cluster at 0.76 + bridge nodes)
      if (idx < 10) {
        const a = (idx / 10) * Math.PI * 2 + time * 0.5;
        return [0.23 + Math.cos(a) * 0.085, 0.5 + Math.sin(a) * 0.13];
      }
      if (idx < 20) {
        const a = ((idx - 10) / 10) * Math.PI * 2 - time * 0.5;
        return [0.77 + Math.cos(a) * 0.085, 0.5 + Math.sin(a) * 0.13];
      }
      const k = idx - 20;
      return [0.38 + (k / 3) * 0.24, 0.5 + Math.sin(time * 2 + k) * 0.08];
    };

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
        st.wheelVelocity = damp(st.wheelVelocity, 1.35, 2.1, dt);
        st.shockwave = Math.max(0, st.shockwave - dt * 1.35);

        if (st.autoPlay) {
          st.actTimer += dt;
          if (st.actTimer >= ACT_DURATION_SEC) {
            st.actTimer = 0;
            const nextAct = ((st.act + 1) % 4) as ActIndex;
            st.act = nextAct;
            setActiveAct(nextAct);
          }
        }
      }

      // Update active chapter progress bar directly via DOM (zero React re-renders!)
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

      // Smoothly blend weights across the 4 Acts for seamless liquid morphing
      for (let a = 0; a < 4; a++) {
        const targetW = st.act === a ? 1 : 0;
        st.morphBlend[a] = prefersReduced
          ? targetW
          : damp(st.morphBlend[a], targetW, 4.6, dt);
      }
      const weightSum =
        st.morphBlend[0] + st.morphBlend[1] + st.morphBlend[2] + st.morphBlend[3] || 1;

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Warm Cotton-Rag Atelier Canvas Ground + Subtle Vignette
      ctx.fillStyle = "#F7F2E8";
      ctx.fillRect(0, 0, width, height);

      const radialBg = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        18,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.68
      );
      radialBg.addColorStop(0, "rgba(255, 253, 249, 0.75)");
      radialBg.addColorStop(1, "rgba(226, 217, 200, 0.45)");
      ctx.fillStyle = radialBg;
      ctx.fillRect(0, 0, width, height);

      // 2. Architectural Drafting Grid Hairlines & Rotating Horological Compass Dial
      ctx.strokeStyle = "rgba(73, 69, 62, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.5);
      ctx.lineTo(width, height * 0.5);
      ctx.moveTo(width * 0.5, 0);
      ctx.lineTo(width * 0.5, height);
      ctx.stroke();

      const dialR = Math.min(width, height) * 0.43;
      const cx = width * (0.34 * st.morphBlend[0] + 0.5 * (1 - st.morphBlend[0]));
      const cy = height * 0.5;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(wheelPhase * 0.16);
      ctx.strokeStyle = "rgba(182, 132, 52, 0.24)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, dialR, 0, Math.PI * 2);
      ctx.stroke();

      // 48 Precision Chronometer Detent Ticks (echoing mouse-wheel notches)
      for (let t = 0; t < 48; t++) {
        const ang = (t / 48) * Math.PI * 2;
        const inner = t % 4 === 0 ? dialR - 7 : dialR - 3.5;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * inner, Math.sin(ang) * inner);
        ctx.lineTo(Math.cos(ang) * dialR, Math.sin(ang) * dialR);
        ctx.strokeStyle =
          t % 12 === 0 ? "rgba(184, 51, 42, 0.55)" : "rgba(73, 69, 62, 0.22)";
        ctx.stroke();
      }
      ctx.restore();

      // Expanding Shockwave Ring on Scroll / Impulse
      if (st.shockwave > 0.01) {
        const swProgress = 1 - st.shockwave;
        const swRadius = 16 + swProgress * Math.max(width, height) * 0.55;
        ctx.beginPath();
        ctx.arc(st.shockX * width, st.shockY * height, swRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(184, 51, 42, ${(st.shockwave * 0.42).toFixed(3)})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // Helper: blended sample across active morph weights + cursor fluid vortex
      const getBlendedPoint = (rIdx: number, u: number): [number, number] => {
        let bx = 0;
        let by = 0;
        for (let a = 0; a < 4; a++) {
          const w = st.morphBlend[a] / weightSum;
          if (w < 0.002) continue;
          const [ax, ay] = sampleActRibbon(a, rIdx, u, elapsed, wheelPhase);
          bx += ax * w;
          by += ay * w;
        }

        let px = bx * width;
        let py = by * height;

        // Interactive Cursor Magnetic Vortex Repulsion & Swirl
        if (st.pointerActive && !prefersReduced) {
          const mx = st.pointerX * width;
          const my = st.pointerY * height;
          const dx = px - mx;
          const dy = py - my;
          const distSq = dx * dx + dy * dy;
          const radius = 105;
          if (distSq < radius * radius && distSq > 0.1) {
            const dist = Math.sqrt(distSq);
            const falloff = Math.pow(1 - dist / radius, 2);
            const push = falloff * 24;
            // Radial push + subtle tangential calligraphic curl
            px += (dx / dist) * push - (dy / dist) * push * 0.38;
            py += (dy / dist) * push + (dx / dist) * push * 0.38;
          }
        }

        return [px, py];
      };

      // 3. Render 14 Layered Calligraphic Silk & Sumi-Ink Ribbons
      for (let r = 0; r < RIBBON_COUNT; r++) {
        const isPrimaryVermilion = r % 4 === 0;
        const isBrass = r % 4 === 2;
        const isPatina = r % 5 === 3;

        ctx.beginPath();
        for (let s = 0; s < SAMPLES_PER_RIBBON; s++) {
          const u = s / (SAMPLES_PER_RIBBON - 1);
          const [px, py] = getBlendedPoint(r, u);
          if (s === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        const alphaBoost = st.shockwave * 0.2;
        if (isPrimaryVermilion) {
          ctx.strokeStyle = `rgba(184, 51, 42, ${(0.62 + alphaBoost).toFixed(2)})`;
          ctx.lineWidth = 2.1;
        } else if (isBrass) {
          ctx.strokeStyle = `rgba(182, 132, 52, ${(0.48 + alphaBoost).toFixed(2)})`;
          ctx.lineWidth = 1.45;
        } else if (isPatina) {
          ctx.strokeStyle = `rgba(42, 92, 77, ${(0.44 + alphaBoost).toFixed(2)})`;
          ctx.lineWidth = 1.35;
        } else {
          ctx.strokeStyle = "rgba(38, 36, 32, 0.22)";
          ctx.lineWidth = 1.05;
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // 4. Act-Specific Centerpiece Emblem (SmoothScroll Rotor / Redis Halo)
      if (st.morphBlend[0] > 0.05) {
        const a0 = st.morphBlend[0];
        const gx = width * 0.34;
        const gy = height * 0.5;

        // Vertical Spring Gate Line
        ctx.save();
        ctx.globalAlpha = a0;
        ctx.strokeStyle = "rgba(184, 51, 42, 0.35)";
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(gx, 18);
        ctx.lineTo(gx, height - 18);
        ctx.stroke();
        ctx.setLineDash([]);

        // Sculpted Vermilion & Brass Scroll Escapement Wheel
        ctx.translate(gx, gy);
        ctx.rotate(wheelPhase * 0.65);

        ctx.fillStyle = "#FAF7F1";
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#B8332A";
        ctx.stroke();

        for (let k = 0; k < 12; k++) {
          const ka = (k / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(ka) * 15, Math.sin(ka) * 15);
          ctx.lineTo(Math.cos(ka) * 22, Math.sin(ka) * 22);
          ctx.strokeStyle = k % 3 === 0 ? "#B8332A" : "#B68434";
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        ctx.fillStyle = "#B8332A";
        ctx.beginPath();
        ctx.arc(0, 0, 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (st.morphBlend[2] > 0.05) {
        // Redis O(1) Resonance Halo around B-Tree Root
        const a2 = st.morphBlend[2];
        const rx = width * 0.5;
        const ry = height * 0.16;
        const pulse = (elapsed * 0.85) % 1;
        ctx.save();
        ctx.globalAlpha = a2 * (1 - pulse) * 0.65;
        ctx.strokeStyle = "#2A5C4D";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(rx, ry, 10 + pulse * 36, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Update & Draw 24 Spring-Physics Structural Nodes + Subtle Mesh Filaments
      for (let i = 0; i < NODE_COUNT; i++) {
        let tx = 0;
        let ty = 0;
        for (let a = 0; a < 4; a++) {
          const w = st.morphBlend[a] / weightSum;
          if (w < 0.002) continue;
          const [nx, ny] = targetNodePos(a, i, elapsed);
          tx += nx * w;
          ty += ny * w;
        }

        const nd = nodes[i];
        if (prefersReduced) {
          nd.x = tx;
          nd.y = ty;
        } else {
          const stiffness = 26;
          const damping = 7.2;
          const ax = (tx - nd.x) * stiffness - nd.vx * damping;
          const ay = (ty - nd.y) * stiffness - nd.vy * damping;
          nd.vx += ax * dt;
          nd.vy += ay * dt;
          nd.x += nd.vx * dt;
          nd.y += nd.vy * dt;
        }
      }

      // Connect nearby B-Tree / RBAC nodes with ultra-fine architectural hairlines
      ctx.lineWidth = 0.85;
      for (let i = 0; i < NODE_COUNT; i++) {
        const ax = nodes[i].x * width;
        const ay = nodes[i].y * height;
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const bx = nodes[j].x * width;
          const by = nodes[j].y * height;
          const d2 = (ax - bx) * (ax - bx) + (ay - by) * (ay - by);
          if (d2 < 5200) {
            const op = (1 - d2 / 5200) * 0.18;
            ctx.strokeStyle = `rgba(73, 69, 62, ${op.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < NODE_COUNT; i++) {
        const px = nodes[i].x * width;
        const py = nodes[i].y * height;
        const isAnchor = i % 4 === 0;

        ctx.fillStyle = isAnchor ? "#FAF7F1" : "#262420";
        ctx.beginPath();
        ctx.arc(px, py, isAnchor ? 4 : 2.3, 0, Math.PI * 2);
        ctx.fill();

        if (isAnchor) {
          ctx.strokeStyle = i % 8 === 0 ? "#B8332A" : "#2A5C4D";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // 6. Advance & Render 42 Luminous Courier Beads Streaming Along the Silk Ribbons
      const speedBoost = prefersReduced
        ? 0
        : 1 + Math.abs(st.wheelVelocity) * 0.15 + st.shockwave * 1.8;

      for (const p of particles) {
        p.u = (((p.u + dt * p.speed * speedBoost) % 1) + 1) % 1;
        const [px, py] = getBlendedPoint(p.lane, p.u);
        const fade = Math.sin(p.u * Math.PI);

        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.7 + fade * 0.55), 0, Math.PI * 2);
        if (p.hue === 0) {
          ctx.fillStyle = `rgba(184, 51, 42, ${(0.88 * fade).toFixed(2)})`;
        } else if (p.hue === 1) {
          ctx.fillStyle = `rgba(182, 132, 52, ${(0.85 * fade).toFixed(2)})`;
        } else {
          ctx.fillStyle = `rgba(42, 92, 77, ${(0.85 * fade).toFixed(2)})`;
        }
        ctx.fill();
      }

      // 7. Crisp Corner Patent Registration Marks
      ctx.strokeStyle = "rgba(110, 103, 91, 0.55)";
      ctx.lineWidth = 1;
      const m = 10;
      const tk = 11;
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

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    stateRef.current.pointerX = (e.clientX - rect.left) / rect.width;
    stateRef.current.pointerY = (e.clientY - rect.top) / rect.height;
    stateRef.current.pointerActive = true;
  };

  const handlePointerLeave = () => {
    stateRef.current.pointerActive = false;
  };

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    triggerWave(
      (e.clientX - rect.left) / rect.width,
      (e.clientY - rect.top) / rect.height
    );
  };

  return (
    <div className="paper-stack paper-chamfer relative flex flex-col justify-between p-4 sm:p-5">
      {/* Top Atelier Frame Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-2.5 font-mono text-xs text-[var(--ink-secondary)]">
        <span className="truncate font-medium text-[var(--ink-primary)]">{stageLabel}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => triggerWave(0.36, 0.5)}
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

      {/* Interactive High-DPI Generative Silk & Architecture Canvas */}
      <div
        ref={stageWrapperRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleStageClick}
        data-cursor="inspect"
        className="relative my-3 h-[255px] w-full cursor-crosshair overflow-hidden rounded-[3px] border border-[var(--rule-cut)] bg-[#F7F2E8] select-none sm:h-[300px]"
      >
        <canvas
          ref={canvasRef}
          aria-label={stageLabel}
          role="img"
          className="block h-full w-full"
        />

        {/* Floating Live Chapter Story Plaque on Desktop/Tablet (>=640px) */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden items-end justify-between gap-2 sm:flex">
          <div className="max-w-[34ch] rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)]/92 px-3 py-2 shadow-[0_6px_18px_rgba(24,23,21,0.08)]">
            <p className="font-serif text-sm font-semibold leading-tight text-[var(--ink-primary)] sm:text-base">
              {currentChapter.title}
            </p>
            <p className="mt-0.5 font-sans text-xs leading-snug text-[var(--ink-secondary)]">
              {currentChapter.caption}
            </p>
          </div>

          <Link
            href={`/projects/${currentChapter.slug}`}
            transitionTypes={["folio-forward"]}
            onClick={(e) => e.stopPropagation()}
            data-cursor="open"
            className="pointer-events-auto inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-[3px] border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-3 font-mono text-xs font-medium text-[var(--bg-sheet-top)] shadow-[0_4px_12px_rgba(24,23,21,0.14)] transition-[background-color,border-color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)] active:scale-[0.97]"
          >
            <span>{currentChapter.short}</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Unobstructed Mobile Chapter Caption Strip (<640px) */}
      <div className="mb-2.5 flex items-center justify-between gap-2.5 rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-3 py-2 sm:hidden">
        <div className="min-w-0">
          <p className="truncate font-serif text-sm font-semibold text-[var(--ink-primary)]">
            {currentChapter.title}
          </p>
          <p className="mt-0.5 line-clamp-2 font-sans text-xs leading-snug text-[var(--ink-secondary)]">
            {currentChapter.caption}
          </p>
        </div>
        <Link
          href={`/projects/${currentChapter.slug}`}
          transitionTypes={["folio-forward"]}
          className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-[3px] border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-2.5 font-mono text-xs font-medium text-[var(--bg-sheet-top)]"
        >
          <span>{currentChapter.code}</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>

      {/* 4 Interactive Portfolio Act Switcher Tabs with Smooth Progress Hairlines */}
      <div className="space-y-2 border-t border-[var(--rule-cut)] pt-2.5">
        <p className="font-sans text-xs text-[var(--ink-secondary)]">{strataHint}</p>

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
                  triggerWave(0.5, 0.5);
                }}
                className={
                  "relative min-h-10 cursor-pointer overflow-hidden rounded-[3px] border px-2.5 py-1.5 text-left font-mono text-xs transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] " +
                  (isSelected
                    ? "border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] font-semibold text-[var(--ink-primary)] shadow-[0_2px_8px_rgba(24,23,21,0.06)]"
                    : "border-[var(--rule-cut)] bg-[var(--bg-canvas)]/75 text-[var(--ink-secondary)] hover:border-[var(--rule-strong)] hover:text-[var(--ink-primary)]")
                }
              >
                <span className="flex items-center justify-between gap-1">
                  <span className="truncate">{`${ch.code} · ${ch.short}`}</span>
                </span>
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
