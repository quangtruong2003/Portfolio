"use client";

import { useState } from "react";
import type { ProjectItem } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";
import SmoothScrollLab from "./SmoothScrollLab";

interface ProjectSchematicProps {
  project: ProjectItem;
  showLiveLab?: boolean;
  compact?: boolean;
}

const NODE_CENTERS_X = [50, 150, 250, 350] as const;

export default function ProjectSchematic({
  project,
  showLiveLab = true,
  compact = false,
}: ProjectSchematicProps) {
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeNode = project.architectureNodes[selectedIndex] ?? project.architectureNodes[0];
  const activeStemX = NODE_CENTERS_X[selectedIndex] ?? 50;

  return (
    <div className="flex flex-col gap-4">
      {showLiveLab && project.slug === "smoothscroll" && <SmoothScrollLab />}

      <div className="studio-inset p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
          <span className="font-display text-sm font-semibold text-[var(--ink-primary)]">
            {project.architectureTitle[language]}
          </span>
          <span className="font-mono text-xs font-medium text-[var(--accent-primary)] tabular-nums">
            {activeNode.code}
          </span>
        </div>

        {/* Clean Signal Flow Track (Desktop / Wide View) */}
        {!compact && (
          <svg
            viewBox="0 0 400 20"
            className="mt-3 hidden h-5 w-full sm:block"
            aria-hidden="true"
          >
            <line
              x1="50"
              y1="10"
              x2="350"
              y2="10"
              stroke="var(--border-strong)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <line
              x1="50"
              y1="10"
              x2={activeStemX}
              y2="10"
              stroke="var(--accent-primary)"
              strokeWidth="1.8"
            />
            {[100, 200, 300].map((ax, idx) => (
              <path
                key={ax}
                d={`M ${ax - 4} 6.5 L ${ax + 1.5} 10 L ${ax - 4} 13.5`}
                fill="none"
                stroke={idx < selectedIndex ? "var(--accent-primary)" : "var(--ink-muted)"}
                strokeWidth="1.25"
              />
            ))}
            {NODE_CENTERS_X.map((cx, idx) => (
              <circle
                key={cx}
                cx={cx}
                cy="10"
                r={idx === selectedIndex ? 4.2 : 2.6}
                fill={idx <= selectedIndex ? "var(--accent-primary)" : "var(--border-strong)"}
              />
            ))}
          </svg>
        )}

        {/* Interactive 4-Stage Pipeline Controls */}
        <ol
          className={
            "mt-3 grid gap-2 " +
            (compact ? "grid-cols-2" : "grid-cols-2 sm:mt-2 sm:grid-cols-4")
          }
        >
          {project.architectureNodes.map((node, index) => {
            const isSelected = index === selectedIndex;
            return (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-pressed={isSelected}
                  className={
                    "flex min-h-14 w-full cursor-pointer flex-col items-start justify-between rounded-lg border p-2.5 text-left transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out-strong)] active:scale-[0.97] " +
                    (isSelected
                      ? "border-[var(--accent-primary)] bg-[var(--surface-elevated)] shadow-[0_4px_12px_-4px_rgba(25,74,56,0.18)]"
                      : "border-[var(--border-subtle)] bg-[var(--surface-ground)]/80 hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]")
                  }
                >
                  <span
                    className={
                      "font-mono text-xs font-semibold tabular-nums " +
                      (isSelected
                        ? "text-[var(--accent-primary)]"
                        : "text-[var(--ink-muted)]")
                    }
                  >
                    {node.code}
                  </span>
                  <span className="mt-1 font-display text-xs font-semibold leading-snug text-[var(--ink-primary)] sm:text-sm">
                    {node.label[language]}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Active Stage Specification Output */}
        <div
          key={activeNode.id}
          className="mt-3 flex flex-col justify-between gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3.5 sm:flex-row sm:items-center"
        >
          <p className="max-w-[58ch] text-sm leading-relaxed text-[var(--ink-secondary)]">
            {activeNode.detail[language]}
          </p>
          <span className="shrink-0 self-start rounded-md bg-[var(--accent-primary-soft)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent-primary)] sm:self-center">
            {activeNode.metricOrTag}
          </span>
        </div>
      </div>
    </div>
  );
}
