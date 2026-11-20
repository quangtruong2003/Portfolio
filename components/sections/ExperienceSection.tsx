"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { EXPERIENCES } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ExperienceSection() {
  const { dictionary, language } = useLanguage();
  const text = dictionary.experience;

  return (
    <section id="experience" className="border-b border-[var(--border-subtle)] py-16 md:py-24">
      <div className="site-container">
        <SectionTitle title={text.title} subtitle={text.subtitle} />

        {/* Clean Architectural Timeline Rows (Easy to scan, zero stacked-card overlap) */}
        <div className="divide-y divide-[var(--border-subtle)] border-b border-[var(--border-subtle)]">
          {EXPERIENCES.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-1 gap-6 py-10 first:pt-2 lg:grid-cols-12 lg:gap-12 lg:py-12"
            >
              {/* Left 4 Columns: Company, Role, Period & Location */}
              <div className="flex flex-col justify-between gap-4 lg:col-span-4">
                <div>
                  <span className="inline-block rounded-md bg-[var(--accent-primary-soft)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent-primary)] tabular-nums">
                    {item.period[language]}
                  </span>

                  <h3 className="mt-3.5 font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-[var(--ink-primary)] sm:text-3xl">
                    {item.company}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-[var(--accent-primary)]">
                    {item.role[language]}
                  </p>
                </div>

                <p className="text-xs text-[var(--ink-muted)]">
                  {item.location[language]}
                </p>
              </div>

              {/* Right 8 Columns: Engineering Scope, Deliverables & Stack */}
              <div className="lg:col-span-8">
                <p className="max-w-[65ch] text-base leading-relaxed text-[var(--ink-primary)]">
                  {item.summary[language]}
                </p>

                <p className="mt-6 text-xs font-semibold text-[var(--ink-muted)]">
                  {text.contributionsLabel}
                </p>

                <ul className="mt-3 space-y-3">
                  {item.contributions.map((contribution) => (
                    <li
                      key={contribution.en}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[var(--ink-secondary)] sm:text-base"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]"
                        aria-hidden="true"
                      />
                      <span>{contribution[language]}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2.5 py-1 font-mono text-xs text-[var(--ink-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
