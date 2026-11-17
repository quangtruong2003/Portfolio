"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { EXPERIENCES } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ExperienceSection() {
  const { dictionary, language } = useLanguage();
  const text = dictionary.experience;

  return (
    <section id="experience" className="border-b border-[var(--rule-cut)] py-16 md:py-24">
      <div className="site-container">
        <SectionTitle
          title={text.title}
          subtitle={text.subtitle}
          asideMeta="2025 — 2026"
        />

        {/* Sticky Stacked Archival Career Sheets */}
        <div className="flex flex-col gap-8">
          {EXPERIENCES.map((item, idx) => (
            <article
              key={item.id}
              className={
                "paper-stack paper-chamfer p-6 sm:p-8 " +
                (idx === 0 ? "lg:sticky lg:top-[5.5rem]" : "lg:sticky lg:top-[7rem]")
              }
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="flex flex-col justify-between border-b border-[var(--rule-cut)] pb-5 lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-cut)] pb-2.5 font-mono text-xs">
                      <span className="font-semibold text-[var(--accent-vermilion)] tabular-nums">
                        {item.ledgerCode}
                      </span>
                      <span className="text-[var(--ink-secondary)] tabular-nums">
                        {item.period[language]}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-2xl font-medium leading-tight tracking-[-0.02em] text-[var(--ink-primary)] sm:text-3xl">
                      {item.company}
                    </h3>
                    <p className="mt-2 font-sans text-sm font-medium text-[var(--accent-patina)]">
                      {item.role[language]}
                    </p>
                  </div>

                  <p className="mt-4 font-mono text-xs text-[var(--ink-tertiary)]">
                    {item.location[language]}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-base leading-relaxed text-[var(--ink-primary)]">
                    {item.summary[language]}
                  </p>

                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.05em] text-[var(--ink-tertiary)]">
                    {text.contributionsLabel}
                  </p>

                  <ul className="mt-3 space-y-2.5">
                    {item.contributions.map((contribution) => (
                      <li
                        key={contribution.en}
                        className="flex items-start gap-3 text-sm leading-relaxed text-[var(--ink-secondary)]"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-vermilion)]"
                          aria-hidden="true"
                        />
                        <span>{contribution[language]}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[var(--rule-cut)] pt-4">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-[2px] border border-[var(--rule-cut)] bg-[var(--bg-canvas)] px-2.5 py-0.5 font-mono text-xs text-[var(--ink-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
