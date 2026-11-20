"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type PresetKey = "crisp" | "balanced" | "silky";

const PRESET_PARAMS: Record<
  PresetKey,
  { stiffness: number; damping: number; spec: string }
> = {
  crisp: { stiffness: 200, damping: 25, spec: "k=200 · c=25" },
  balanced: { stiffness: 120, damping: 18, spec: "k=120 · c=18" },
  silky: { stiffness: 72, damping: 13, spec: "k=72 · c=13" },
};

export default function SmoothScrollLab() {
  const { dictionary } = useLanguage();
  const lab = dictionary.projects.lab;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preset, setPreset] = useState<PresetKey>("balanced");

  const simRef = useRef({
    targetPos: 0.34,
    rawPos: 0.34,
    smoothPos: 0.34,
    smoothVel: 0,
    rawHistory: new Array<number>(150).fill(0.34),
    smoothHistory: new Array<number>(150).fill(0.34),
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
    let autoDemoTimer = 0.7;

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
          autoDemoTimer = 3.1;
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
        for (let i = 0; i < s.rawHistory.length; i++) {
          const t = i / (s.rawHistory.length - 1);
          s.rawHistory[i] = t < 0.25 ? 0.22 : t < 0.5 ? 0.44 : t < 0.75 ? 0.66 : 0.8;
          s.smoothHistory[i] = 0.22 + 0.58 * (1 - Math.pow(1 - t, 2.4));
        }
      }

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Subtle oscilloscope grid
      ctx.strokeStyle = "rgba(169, 184, 174, 0.12)";
      ctx.lineWidth = 1;
      for (let row = 1; row <= 3; row++) {
        const y = (h / 4) * row;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let col = 1; col <= 5; col++) {
        const x = (w / 6) * col;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Raw Win32 Stepped Signal (dashed sage-gray)
      ctx.save();
      ctx.strokeStyle = "rgba(169, 184, 174, 0.72)";
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      s.rawHistory.forEach((val, idx) => {
        const x = (idx / (s.rawHistory.length - 1)) * (w - 16) + 8;
        const y = h - val * h;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();

      // SmoothScroll Rust Spring Curve (luminous copper-rust trace + subtle area fill)
      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(243, 149, 103, 0.22)");
      grad.addColorStop(1, "rgba(243, 149, 103, 0.0)");

      ctx.beginPath();
      s.smoothHistory.forEach((val, idx) => {
        const x = (idx / (s.smoothHistory.length - 1)) * (w - 16) + 8;
        const y = h - val * h;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(w - 8, h);
      ctx.lineTo(8, h);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = "#F39567";
      ctx.lineWidth = 2.4;
      ctx.lineJoin = "round";
      ctx.beginPath();
      s.smoothHistory.forEach((val, idx) => {
        const x = (idx / (s.smoothHistory.length - 1)) * (w - 16) + 8;
        const y = h - val * h;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Live tracking head dot
      const headX = w - 8;
      const headY = h - s.smoothHistory[s.smoothHistory.length - 1] * h;
      ctx.fillStyle = "rgba(243, 149, 103, 0.28)";
      ctx.beginPath();
      ctx.arc(headX, headY, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#F39567";
      ctx.beginPath();
      ctx.arc(headX, headY, 3.6, 0, Math.PI * 2);
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
      onWheel={handleWheelOnPad}
      className="engine-room rounded-xl border border-[var(--engine-border)] p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[var(--engine-border)] pb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2 w-2 rounded-full bg-[var(--accent-on-engine)]"
            aria-hidden="true"
          />
          <span className="font-display text-sm font-medium text-[var(--engine-ink)]">
            {lab.title}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3.5 font-mono text-xs">
          <span className="inline-flex items-center gap-1.5 text-[var(--engine-muted)]">
            <span className="inline-block h-0.5 w-3.5 border-t border-dashed border-[var(--engine-muted)]" />
            {lab.rawLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-[var(--signal-on-engine)]">
            <span className="inline-block h-0.5 w-3.5 bg-[var(--signal-on-engine)]" />
            {lab.smoothLabel}
          </span>
        </div>
      </div>

      {/* Live 120 Hz Canvas Oscilloscope */}
      <div className="my-3.5 h-36 w-full overflow-hidden rounded-lg border border-[var(--engine-border)] bg-[var(--engine-inset)]">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          aria-label={lab.title}
        />
      </div>

      {/* Tactile Instrument Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-lg border border-[var(--engine-border)] bg-[var(--engine-inset)] p-0.5">
            {(["crisp", "balanced", "silky"] as const).map((key) => {
              const active = preset === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPreset(key)}
                  aria-pressed={active}
                  className={
                    "min-h-9 cursor-pointer rounded-md px-3 font-sans text-xs font-medium transition-[background-color,color] duration-150 " +
                    (active
                      ? "bg-[var(--accent-on-engine)] text-[var(--engine-ground)]"
                      : "text-[var(--engine-muted)] hover:text-[var(--engine-ink)]")
                  }
                >
                  {lab.presets[key]}
                </button>
              );
            })}
          </div>

          <span className="hidden font-mono text-xs text-[var(--engine-muted)] tabular-nums sm:inline">
            {PRESET_PARAMS[preset].spec}
          </span>
        </div>

        <button
          type="button"
          onClick={fireBurst}
          className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-[var(--signal-on-engine)]/40 bg-[var(--signal-on-engine)]/14 px-3.5 font-sans text-xs font-medium text-[var(--signal-on-engine)] transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:border-[var(--signal-on-engine)] hover:bg-[var(--signal-on-engine)] hover:text-[var(--engine-ground)] active:scale-[0.96]"
        >
          {lab.triggerBurst}
        </button>
      </div>
    </div>
  );
}
