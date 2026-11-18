"use client";

import { useRef, useState } from "react";
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

  const [activePlate, setActivePlate] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 92%", "start 25%"],
  });

  // Origami paper-cut aperture unfold as the dark letterpress bed enters viewport
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 1.5% 0% 1.5% round 6px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  return (
    <div ref={wrapperRef} className="py-6 md:py-10">
      <motion.div
        style={shouldReduceMotion ? undefined : { clipPath }}
        className="press-plate relative border-y border-[var(--rule-on-press)]"
      >
        {/* Top Engraved Die-Cut Notch Strip */}
        <div className="site-container flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-[var(--rule-on-press)] py-3.5 font-mono text-xs tracking-[0.04em] text-[var(--muted-on-press)]">
          <span>{aboutText.pressNote}</span>
          <span className="text-[var(--accent-ochre-on-press)]">PHP 8+ · LARAVEL 12 · RUST</span>
        </div>

        {/* SECTION: #about */}
        <section id="about" className="py-16 md:py-24">
          <div className="site-container">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="section-heading text-[var(--ink-on-press)]">
                  {aboutText.title}
                </h2>
                <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-[var(--muted-on-press)]">
                  {aboutText.subtitle}
                </p>

                {/* Engraved Academic Colophon Plate (no uppercase eyebrow above title) */}
                <div className="press-card relative mt-8 rounded-[4px] p-5">
                  <span
                    className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r border-t border-[var(--accent-ochre-on-press)]/65"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-[var(--accent-ochre-on-press)]/65"
                    aria-hidden="true"
                  />
                  <p className="font-serif text-xl font-medium text-[var(--ink-on-press)]">
                    {aboutText.educationSchool}
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-[var(--muted-on-press)]">
                    {aboutText.educationMeta}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
                <div className="space-y-6 text-base leading-[1.78] text-[var(--ink-on-press)]/92 sm:text-lg">
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
          className="border-t border-[var(--rule-on-press)] py-16 md:py-24"
        >
          <div className="site-container">
            <SectionTitle
              title={skillsText.title}
              subtitle={skillsText.subtitle}
              asideMeta="PLATE A — C"
              inverted
            />

            {/* Interactive 3-Plate Die-Cut Folder & Specification Deck */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {CAPABILITIES.map((cap, index) => {
                const isSelected = activePlate === index;
                return (
                  <article
                    key={cap.id}
                    onClick={() => setActivePlate(index)}
                    data-cursor="inspect"
                    className={
                      "press-card relative flex cursor-pointer flex-col justify-between rounded-[4px] p-6 transition-[border-color,transform] duration-200 ease-[var(--ease-out-strong)] " +
                      (isSelected
                        ? "border-[var(--accent-ochre-on-press)] lg:-translate-y-1.5"
                        : "hover:border-[var(--muted-on-press)]/55")
                    }
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-[var(--rule-on-press)] pb-3">
                        <span
                          className={
                            "font-mono text-xs font-semibold tabular-nums " +
                            (isSelected
                              ? "text-[var(--accent-ochre-on-press)]"
                              : "text-[var(--muted-on-press)]")
                          }
                        >
                          {cap.plateCode}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePlate(index);
                          }}
                          aria-pressed={isSelected}
                          aria-label={cap.title[language]}
                          className={
                            "min-h-9 min-w-9 rounded-[2px] px-2 font-mono text-xs transition-colors " +
                            (isSelected
                              ? "bg-[var(--accent-ochre-on-press)] font-semibold text-[var(--bg-press)]"
                              : "bg-[var(--bg-press-well)] text-[var(--muted-on-press)]")
                          }
                        >
                          {`0${index + 1}`}
                        </button>
                      </div>

                      <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-[var(--ink-on-press)]">
                        {cap.title[language]}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-[var(--muted-on-press)]">
                        {cap.summary[language]}
                      </p>

                      {/* Architecture Focus Chain */}
                      <div className="mt-5 rounded-[3px] border border-[var(--rule-on-press)] bg-[var(--bg-press-well)] p-3">
                        <p className="font-mono text-xs uppercase tracking-[0.05em] text-[var(--accent-patina-on-press)]">
                          {skillsText.focusLabel}
                        </p>
                        <p className="mt-1.5 font-mono text-xs leading-relaxed text-[var(--ink-on-press)]">
                          {cap.architectureFocus[language]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[var(--rule-on-press)] pt-4">
                      <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.05em] text-[var(--muted-on-press)]">
                        {skillsText.stackLabel}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cap.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-[2px] border border-[var(--rule-on-press)] bg-[var(--bg-press)] px-2.5 py-1 font-mono text-xs text-[var(--ink-on-press)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
