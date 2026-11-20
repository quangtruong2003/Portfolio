"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import SectionTitle from "@/components/ui/SectionTitle";
import { CAPABILITIES } from "@/data/portfolio";
import { formatRepoDownloads, useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useLanguage } from "@/i18n/LanguageContext";

export default function PressPlateZone() {
  const { dictionary, language } = useLanguage();
  const { smoothScrollRepo } = useGitHubRepos();
  const aboutText = dictionary.about;
  const skillsText = dictionary.skills;
  const shouldReduceMotion = useReducedMotion();

  const liveDownloads = formatRepoDownloads(smoothScrollRepo, language);
  const resolvedBio2 = liveDownloads
    ? aboutText.bio2.replace("{downloads}", liveDownloads)
    : aboutText.bio2
        .replace(" với {downloads} lượt tải trên GitHub Releases", "")
        .replace(" with {downloads} GitHub release downloads", "");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 92%", "start 26%"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 1.5% 0% 1.5% round 20px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  return (
    <div ref={wrapperRef} className="py-4 md:py-8">
      <motion.div
        style={shouldReduceMotion ? undefined : { clipPath }}
        className="engine-room relative border-y border-[var(--engine-border)]"
      >
        {/* Subtle Architectural Status Bar */}
        <div className="site-container flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-[var(--engine-border)] py-3.5 text-xs text-[var(--engine-muted)]">
          <span>{aboutText.engineLabel}</span>
          <span className="font-mono text-[var(--accent-on-engine)]">
            PHP 8+ · Laravel 12 · MySQL · Redis · Rust
          </span>
        </div>

        {/* SECTION: #about */}
        <section id="about" className="py-16 md:py-24">
          <div className="site-container">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="section-heading text-[var(--engine-ink)]">
                  {aboutText.title}
                </h2>
                <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-[var(--engine-muted)]">
                  {aboutText.subtitle}
                </p>

                <div className="engine-panel mt-8 p-5">
                  <p className="font-display text-lg font-semibold text-[var(--engine-ink)]">
                    {aboutText.educationSchool}
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-[var(--engine-muted)]">
                    {aboutText.educationMeta}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
                <div className="max-w-[64ch] space-y-6 text-base leading-[1.75] text-[var(--engine-ink)]/90 sm:text-lg">
                  <p>{aboutText.bio1}</p>
                  <p>{resolvedBio2}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: #skills */}
        <section
          id="skills"
          className="border-t border-[var(--engine-border)] py-16 md:py-24"
        >
          <div className="site-container">
            <SectionTitle
              title={skillsText.title}
              subtitle={skillsText.subtitle}
              inverted
            />

            {/* Unified 3-Column Specification Matrix (No redundant boxed card grid) */}
            <div className="engine-panel overflow-hidden">
              <div className="grid grid-cols-1 divide-y divide-[var(--engine-border)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {CAPABILITIES.map((cap) => (
                  <article
                    key={cap.id}
                    className="flex flex-col justify-between p-6 sm:p-7"
                  >
                    <div>
                      <span className="inline-block font-mono text-xs font-medium text-[var(--accent-on-engine)]">
                        {cap.plateCode}
                      </span>

                      <h3 className="mt-3 font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--engine-ink)]">
                        {cap.title[language]}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-[var(--engine-muted)]">
                        {cap.summary[language]}
                      </p>

                      <div className="engine-inset mt-5 p-3.5">
                        <p className="text-xs font-medium text-[var(--accent-on-engine)]">
                          {skillsText.focusLabel}
                        </p>
                        <p className="mt-1.5 font-mono text-xs leading-relaxed text-[var(--engine-ink)]">
                          {cap.architectureFocus[language]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[var(--engine-border)] pt-4">
                      <p className="mb-2.5 text-xs font-medium text-[var(--engine-muted)]">
                        {skillsText.stackLabel}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cap.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-[var(--engine-border)] bg-[var(--engine-ground)] px-2.5 py-1 font-mono text-xs text-[var(--engine-ink)]"
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
          </div>
        </section>
      </motion.div>
    </div>
  );
}
