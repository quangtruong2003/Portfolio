"use client";

import React from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/animations/FadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

const softSkills = [
  "Problem Solving",
  "Agile Collaboration",
  "Clean Code",
  "API Design",
  "Documentation",
  "Code Review",
];

const languages = [
  { name: "Vietnamese", level: "Native" },
  { name: "English", level: "Professional" },
];

export default function AboutSection() {
  const { dictionary } = useLanguage();
  const { about: t } = dictionary;

  return (
    <SectionWrapper id="about" theme="dark" py="xl">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-terracotta/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-coral/4 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <FadeIn>
          <SectionTitle
            eyebrow={t.eyebrow}
            title={t.title}
            theme="dark"
            align="center"
            subtitle={t.subtitle}
          />
        </FadeIn>

        {/* Bio */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-6">
            <p className="font-sans text-base leading-[1.75] text-warm-silver">
              {t.bio1}
            </p>
            <p className="font-sans text-base leading-[1.75] text-warm-silver">
              {t.bio2}
            </p>
          </div>
        </FadeIn>

        {/* Soft Skills */}
        <FadeIn delay={0.25}>
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-stone-gray">
              {t.softSkills}
            </h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="
                    px-3.5 py-1.5 rounded-full
                    bg-dark-surface border border-[#30302e]
                    font-sans text-sm text-warm-silver
                    hover:border-terracotta/40 hover:text-ivory transition-all duration-200
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Languages */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-stone-gray">
              {t.languagesLabel}
            </h3>
            <div className="flex flex-wrap gap-4">
              {languages.map(({ name, level }) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-terracotta" />
                  <div>
                    <div className="font-sans text-sm font-medium text-ivory">{name}</div>
                    <div className="font-sans text-xs text-stone-gray">{level}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
