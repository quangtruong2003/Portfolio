"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function HeroSection() {
  const { dictionary, language } = useLanguage();
  const { hero: t } = dictionary;

  const fullName = language === "vi"
    ? "Nguyễn Quang Trường"
    : "Nguyen Quang Truong";

  return (
    <section
      id="hero"
      className="
        relative min-h-screen flex items-center
        bg-parchment overflow-hidden
      "
    >
      {/* Warm background mesh gradient */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-br from-transparent via-transparent
          to-[#e8e6dc]/30
        "
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 w-full pt-16 sm:pt-20 lg:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6"
          >
            {/* Eyebrow & Freelance badge - same row */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
              <span
                className="
                  inline-flex items-center gap-1.5 sm:gap-2
                  font-sans text-[10px] sm:text-xs md:text-xs font-medium uppercase tracking-[0.15em]
                  text-terracotta
                  px-2.5 py-1 sm:px-3.5 sm:py-1.5
                  rounded-full
                  bg-terracotta/8 border border-terracotta/15
                "
              >
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-terracotta animate-pulse flex-shrink-0" />
                {t.eyebrow}
              </span>

              <span
                className="
                  inline-flex items-center gap-1.5 sm:gap-2
                  font-sans text-[10px] sm:text-xs md:text-xs font-medium uppercase tracking-[0.15em]
                  text-charcoal-warm
                  px-2.5 py-1 sm:px-3.5 sm:py-1.5
                  rounded-full
                  bg-warm-sand/60 border border-warm-sand
                "
              >
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-charcoal-warm flex-shrink-0" />
                Freelance
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="
                font-serif font-medium leading-[1.08]
                text-near-black
              "
              style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)" }}
            >
              {t.greeting} <br className="hidden sm:block" />
              <span className="text-charcoal-warm">{language === "vi" ? "tôi là" : "I'm"}{" "}</span>
              <span className="relative inline-block">
                <span className="relative z-10 text-terracotta">
                  {language === "vi" ? "Nguyễn Quang Trường" : "Nguyen Quang Truong"}
                </span>
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6 C 40 2, 80 2, 120 5 C 150 7, 180 4, 198 5"
                    stroke="#c96442"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Role */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <span className="font-sans text-base md:text-lg font-medium text-olive-gray">
                {t.role}
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="
                font-sans text-base leading-[1.7]
                text-olive-gray max-w-2xl
              "
            >
              {t.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-4 pt-1"
            >
              <Button
                variant="terracotta"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => {
                  const targetY = document.getElementById("projects")?.getBoundingClientRect().top ?? 0;
                  window.scrollTo({ top: targetY + window.scrollY, behavior: "smooth" });
                }}
              >
                {t.viewProjects}
              </Button>

              <Button
                variant="warm-sand"
                size="lg"
                icon={Download}
                onClick={() => {
                  window.open(
                    "https://drive.google.com/file/d/1GC2Dq9sRW0eUNLd8nwJL7oGeVbtoYHAT/view?usp=sharing",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                {t.downloadCV}
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-4 border-t border-[#e8e6dc]"
            >
              {[
                { value: t.yearsExp, label: language === "vi" ? "Năm Kinh Nghiệm" : "Years Experience" },
                { value: t.projectsBuilt, label: language === "vi" ? "Dự Án" : "Projects Built" },
                { value: t.technologies, label: language === "vi" ? "Công Nghệ" : "Technologies" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5 text-center">
                  <span
                    className="font-serif font-medium text-terracotta"
                    style={{ fontSize: "1.75rem" }}
                  >
                    {value}
                  </span>
                  <span className="font-sans text-xs text-stone-gray">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="
          absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-1 sm:gap-2
          text-stone-gray
        "
      >
        <span className="font-sans text-xs tracking-widest uppercase">{t.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
