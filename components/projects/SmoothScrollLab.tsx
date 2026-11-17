"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type PresetKey = "crisp" | "balanced" | "silky";

const PRESET_PARAMS: Record<PresetKey, { stiffness: number; damping: number }> = {
  crisp: { stiffness: 190, damping: 24 },
  balanced: { stiffness: 120, damping: 18 },
  silky: { stiffness: 72, damping: 13 },
};

export default function SmoothScrollLab() {
  const { dictionary } = useLanguage();
  const lab = dictionary.projects.lab;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preset, setPreset] = useState<PresetKey>("balanced");

  const simRef = useRef({
    targetPos: 0.35,
    rawPos: 0.35,
    smoothPos: 0.35,
    smoothVel: 0,
    rawHistory: new Array<number>(140).fill(0.35),
    smoothHistory: new Array<number>(140).fill(0.35),
    burstQueue: [] as number[],
    preset: "balanced" as PresetKey,
    inView: true,
  });

  useEffect(() => {
    simRef.current.preset = preset;
  }, [preset]);

  const fireBurst = useCallback(() => {
    const s = simRef.current;
    const dir = s.targetPos > 0.62 ? -1 : 1;
    s.burstQueue.push(dir * 0.16, dir * 0.16, dir * 0.14);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        simRef.current.inView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    let rafId = 0;
    let lastTime = performance.now();
    let burstTimer = 0;
    let autoDemoTimer = 0.8;

    const draw = (now: number) => {
      rafId = window.requestAnimationFrame(draw);
      if (!simRef.current.inView) return;

      const dt = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;
      const s = simRef.current;

      if (!reducedMotion.matches) {
        burstTimer -= dt;
        if (s.burstQueue.length > 0 && burstTimer <= 0) {
          const step = s.burstQueue.shift() ?? 0;
          s.targetPos = Math.max(0.14, Math.min(0.86, s.targetPos + step));
          s.rawPos = s.targetPos;
          burstTimer = 0.085;
        }

        autoDemoTimer -= dt;
        if (autoDemoTimer <= 0 && s.burstQueue.length === 0) {
          const nextDir = s.targetPos > 0.5 ? -1 : 1;
          s.burstQueue.push(nextDir * 0.15, nextDir * 0.15, nextDir * 0.12);
          autoDemoTimer = 3.2;
        }

        const { stiffness, damping } = PRESET_PARAMS[s.preset];
        const force = (s.targetPos - s.smoothPos) * stiffness;
        s.smoothVel += (force - s.smoothVel * damping) * dt;
        s.smoothPos += s.smoothVel * dt;

        s.rawHistory.push(s.rawPos);
        s.rawHistory.shift();
        s.smoothHistory.push(s.smoothPos);
        s.smoothHistory.shift();
      } else {
        // Static clean comparison curve under reduced motion
        for (let i = 0; i < s.rawHistory.length; i++) {
          const t = i / (s.rawHistory.length - 1);
          s.rawHistory[i] = t < 0.25 ? 0.22 : t < 0.5 ? 0.44 : t < 0.75 ? 0.66 : 0.8;
          s.smoothHistory[i] = 0.22 + 0.58 * (1 - Math.pow(1 - t, 2.4));
        }
      }

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Drafting grid lines
      ctx.strokeStyle = "rgba(158, 150, 134, 0.28)";
      ctx.lineWidth = 1;
      for (let row = 1; row <= 3; row++) {
        const y = (h / 4) * row;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Raw Win32 Stepped Trace (dashed graphite)
      ctx.save();
      ctx.strokeStyle = "#615C53";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      s.rawHistory.forEach((val, idx) => {
        const x = (idx / (s.rawHistory.length - 1)) * (w - 14) + 7;
        const y = h - val * h;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();

      // SmoothScroll Rust Spring Trace (solid vermilion)
      ctx.save();
      ctx.strokeStyle = "#B8332A";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      s.smoothHistory.forEach((val, idx) => {
        const x = (idx / (s.smoothHistory.length - 1)) * (w - 14) + 7;
        const y = h - val * h;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      const headX = w - 7;
      const headY = h - s.smoothHistory[s.smoothHistory.length - 1] * h;
      ctx.fillStyle = "#B8332A";
      ctx.beginPath();
      ctx.arc(headX, headY, 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    rafId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  const handleWheelOnPad = (event: React.WheelEvent<HTMLDivElement>) => {
    const s = simRef.current;
    const step = Math.sign(event.deltaY) * 0.14;
    let next = s.targetPos + step;
    if (next > 0.86) next = 0.2;
    if (next < 0.14) next = 0.8;
    s.targetPos = next;
    s.rawPos = next;
  };

  return (
    <div
      data-cursor="inspect"
      onWheel={handleWheelOnPad}
      className="paper-well rounded-[4px] p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-2.5">
        <span className="font-mono text-xs font-medium text-[var(--ink-primary)]">
          {lab.title}
        </span>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="inline-flex items-center gap-1.5 text-[var(--ink-secondary)]">
            <span className="inline-block h-0.5 w-3.5 border-t border-dashed border-[var(--ink-secondary)]" />
            {lab.rawLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-vermilion)]">
            <span className="inline-block h-0.5 w-3.5 bg-[var(--accent-vermilion)]" />
            {lab.smoothLabel}
          </span>
        </div>
      </div>

      <div className="my-3 h-28 w-full overflow-hidden rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)]">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          aria-label={lab.title}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] p-0.5">
          {(["crisp", "balanced", "silky"] as const).map((key) => {
            const active = preset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setPreset(key)}
                aria-pressed={active}
                className={
                  "min-h-9 rounded-[2px] px-2.5 font-mono text-xs transition-colors duration-150 " +
                  (active
                    ? "bg-[var(--ink-primary)] text-[var(--bg-sheet-top)]"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]")
                }
              >
                {lab.presets[key]}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={fireBurst}
          className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-[3px] border border-[var(--ink-primary)] bg-[var(--ink-primary)] px-3 font-sans text-xs font-medium text-[var(--bg-sheet-top)] transition-[background-color,border-color,transform] duration-150 ease-out hover:border-[var(--accent-vermilion)] hover:bg-[var(--accent-vermilion)] active:scale-[0.97]"
        >
          {lab.triggerBurst}
        </button>
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
        {lab.caption}
      </p>
    </div>
  );
}
