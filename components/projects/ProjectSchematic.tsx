"use client";

import { useState } from "react";
import type { ProjectItem } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import SmoothScrollLab from "./SmoothScrollLab";

interface ProjectSchematicProps {
  project: ProjectItem;
  showLiveLab?: boolean;
  compactOnRail?: boolean;
}

const NODE_CENTERS_X = [50, 150, 250, 350] as const;

export default function ProjectSchematic({
  project,
  showLiveLab = true,
  compactOnRail = false,
}: ProjectSchematicProps) {
  const { language, dictionary } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeNode = project.architectureNodes[selectedIndex] ?? project.architectureNodes[0];

  const isCompactSmoothScroll =
    compactOnRail && showLiveLab && project.slug === "smoothscroll";

  if (isCompactSmoothScroll) {
    return (
      <div className="flex flex-col gap-2.5">
        <SmoothScrollLab />
        <div>
          <svg
            viewBox="0 0 400 14"
            className="hidden h-3.5 w-full sm:block"
            aria-hidden="true"
          >
            <path
              d="M 50 7 L 350 7"
              fill="none"
              stroke="#9E9686"
              strokeWidth="1"
              strokeDasharray="3 2.5"
            />
            {[100, 200, 300].map((ax) => (
              <path
                key={ax}
                d={`M ${ax - 4} 4 L ${ax + 1} 7 L ${ax - 4} 10`}
                fill="none"
                stroke="#B8332A"
                strokeWidth="1.2"
              />
            ))}
            {NODE_CENTERS_X.map((cx) => (
              <circle key={cx} cx={cx} cy="7" r="2.2" fill="#49453E" />
            ))}
          </svg>
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {project.architectureNodes.map((node) => (
              <li
                key={node.id}
                className="rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-2.5 py-2"
              >
                <span className="block font-mono text-xs font-semibold text-[var(--accent-vermilion)] tabular-nums">
                  {node.code}
                </span>
                <span className="mt-0.5 block font-serif text-xs font-medium leading-snug text-[var(--ink-primary)]">
                  {node.label[language]}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  const activeStemX = NODE_CENTERS_X[selectedIndex] ?? 50;

  return (
    <div className="flex flex-col gap-3.5">
      {showLiveLab && project.slug === "smoothscroll" && <SmoothScrollLab />}

      <div className="paper-well relative rounded-[4px] p-4">
        {/* Patent Sheet Corner Registration Ticks */}
        <svg
          viewBox="0 0 400 220"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-1.5 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)]"
          aria-hidden="true"
        >
          <path
            d="M 0 10 L 0 0 L 10 0 M 390 0 L 400 0 L 400 10 M 0 210 L 0 220 L 10 220 M 390 220 L 400 220 L 400 210"
            fill="none"
            stroke="#9E9686"
            strokeOpacity="0.65"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-2.5">
          <span className="font-mono text-xs font-medium text-[var(--ink-primary)]">
            {project.architectureTitle[language]}
          </span>
          <span className="font-sans text-xs text-[var(--ink-tertiary)]">
            {dictionary.projects.interactiveNodeHint}
          </span>
        </div>

        {/* Drafted SVG Patent Flow Rail (01 -> 02 -> 03 -> 04) */}
        <svg
          viewBox="0 0 400 18"
          className="relative z-10 mt-2.5 hidden h-4 w-full sm:block"
          aria-hidden="true"
        >
          <line
            x1="50"
            y1="9"
            x2="350"
            y2="9"
            stroke="#9E9686"
            strokeWidth="1"
            strokeDasharray="3 2.5"
          />
          {[100, 200, 300].map((ax) => (
            <path
              key={ax}
              d={`M ${ax - 4} 5.5 L ${ax + 1.5} 9 L ${ax - 4} 12.5`}
              fill="none"
              stroke="#49453E"
              strokeWidth="1.2"
            />
          ))}
          {NODE_CENTERS_X.map((cx, idx) => (
            <g key={cx}>
              <circle
                cx={cx}
                cy="9"
                r={idx === selectedIndex ? 4 : 2.5}
                fill={idx === selectedIndex ? "#B8332A" : "#615C53"}
              />
              <line
                x1={cx}
                y1="9"
                x2={cx}
                y2="18"
                stroke={idx === selectedIndex ? "#B8332A" : "#9E9686"}
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>

        {/* 4-Stage Pipeline Selector */}
        <ol className="relative z-10 mt-2 grid grid-cols-2 gap-2 sm:mt-0 sm:grid-cols-4">
          {project.architectureNodes.map((node, index) => {
            const isSelected = index === selectedIndex;
            return (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-pressed={isSelected}
                  className={
                    "flex min-h-14 w-full cursor-pointer flex-col items-start justify-between rounded-[3px] border p-2.5 text-left transition-[background-color,border-color,transform] duration-150 ease-out active:scale-[0.98] " +
                    (isSelected
                      ? "border-[var(--accent-vermilion)] bg-[var(--bg-sheet-top)] shadow-[0_3px_10px_rgba(24,23,21,0.08)]"
                      : "border-[var(--rule-cut)] bg-[var(--bg-canvas)]/75 hover:border-[var(--rule-strong)] hover:bg-[var(--bg-sheet-top)]/80")
                  }
                >
                  <span
                    className={
                      "font-mono text-xs font-semibold tabular-nums " +
                      (isSelected
                        ? "text-[var(--accent-vermilion)]"
                        : "text-[var(--ink-tertiary)]")
                    }
                  >
                    {node.code}
                  </span>
                  <span className="mt-1 font-serif text-sm font-medium leading-snug text-[var(--ink-primary)]">
                    {node.label[language]}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Active Patent Leader Stem Connecting Selected Stage -> Specification Drawer */}
        <svg
          viewBox="0 0 400 18"
          className="relative z-10 hidden h-4 w-full sm:block"
          aria-hidden="true"
        >
          <path
            d={`M ${activeStemX} 0 L ${activeStemX} 9 L 200 9 L 200 17`}
            fill="none"
            stroke="#B8332A"
            strokeWidth="1.2"
          />
          <path d="M 196.5 13 L 200 17.5 L 203.5 13" fill="none" stroke="#B8332A" strokeWidth="1.2" />
        </svg>

        {/* Unfolded Active Specification Card */}
        <div
          key={activeNode.id}
          className="relative z-10 mt-2.5 flex flex-col justify-between gap-2 rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] p-3.5 sm:mt-0 sm:flex-row sm:items-center"
        >
          <p className="max-w-[58ch] text-sm leading-relaxed text-[var(--ink-primary)]">
            {activeNode.detail[language]}
          </p>
          <span className="shrink-0 self-start rounded-[2px] border border-[var(--accent-patina)]/35 bg-[var(--accent-patina-wash)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent-patina)] sm:self-center">
            {activeNode.metricOrTag}
          </span>
        </div>
      </div>
    </div>
  );
}
