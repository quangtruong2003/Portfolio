"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { ArrowRight, Eye, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import CVModal from "@/components/ui/CVModal";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const waveVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.3 },
  },
};

const waveItemVariants = {
  hidden: { y: 0 },
  visible: (i: number) => ({
    y: [0, -4, 0, -2, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatDelay: 3 + i * 0.2,
      ease: "easeInOut" as const,
    },
  }),
};

export default function HeroSection() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const { dictionary, language } = useLanguage();
  const { hero: t } = dictionary;
  const { stats: ghStats } = useGitHubStats();

  // Safari pageshow: re-trigger animations when page restored from bfcache
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setAnimationKey(k => k + 1);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

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
          key={animationKey}
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
                font-serif font-semibold leading-[1.3]
                text-near-black
              "
              style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)" }}
            >
              {/* Row 1: greeting + role label */}
              <div className="flex items-baseline justify-center gap-4 sm:gap-6">
                <span>{t.greeting}</span>
                <span className="text-charcoal-warm text-right">
                  {language === "vi" ? "tôi là" : "I'm"}
                </span>
              </div>
              {/* Row 2: name with wave animation */}
              <div className="flex justify-center">
                <span className="relative inline-block">
                  <motion.span
                    className="relative z-10 text-terracotta inline-flex"
                    variants={waveVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {(language === "vi" ? "Nguyễn Quang Trường" : "Nguyen Quang Truong").split("").map((char, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        variants={waveItemVariants}
                        custom={i}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 6 C 40 2, 80 2, 120 5 C 150 7, 180 4, 198 5"
                      stroke="#c96442"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.45 }}
                      transition={{ duration: 1.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </svg>
                </span>
              </div>
            </motion.h1>

            {/* Role */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <span className="relative z-10 font-sans text-base md:text-lg font-semibold">
                <motion.span
                  animate={{
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundImage: "linear-gradient(90deg, #5e5d59 0%, #8b8680 25%, #c96442 50%, #8b8680 75%, #5e5d59 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.role}
                </motion.span>
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="
                font-sans text-base leading-[1.7]
                text-charcoal-warm max-w-2xl
              "
            >
              {t.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center gap-3 pt-1"
            >
              {/* Primary CTA: View Projects + Download CV */}
              <div className="flex flex-wrap items-center justify-center gap-4">
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
                  icon={Eye}
                  onClick={() => setIsCVOpen(true)}
                >
                  {t.viewCV}
                </Button>
              </div>

              {/* Social Buttons: GitHub + LinkedIn */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="social-github"
                  size="md"
                  icon={GitHubIcon}
                  iconPosition="left"
                  onClick={() => {
                    window.open("https://github.com/quangtruong2003", "_blank", "noopener,noreferrer");
                  }}
                  aria-label="GitHub"
                >
                  GitHub
                </Button>

                <Button
                  variant="social-linkedin"
                  size="md"
                  icon={LinkedInIcon}
                  iconPosition="left"
                  onClick={() => {
                    window.open("https://www.linkedin.com/in/quangtruong2003", "_blank", "noopener,noreferrer");
                  }}
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </Button>
              </div>
            </motion.div>

            {/* Stats Row */}
            {ghStats && (
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-4 border-t border-[#d4d2c8]"
              >
                {[
                  {
                    value: ghStats.totalStars.toString(),
                    label: "Stars",
                    prefix: "★",
                  },
                  { value: t.yearsExp, label: language === "vi" ? "Năm Kinh Nghiệm" : "Years Experience" },
                  { value: t.projectsBuilt, label: language === "vi" ? "Dự Án" : "Projects Built" },
                  { value: t.technologies, label: language === "vi" ? "Công Nghệ" : "Technologies" },
                ].map(({ value, label, prefix }) => (
                  <div key={label} className="flex flex-col gap-0.5 text-center">
                    <span
                      className="font-serif font-semibold text-terracotta"
                      style={{ fontSize: "1.75rem" }}
                    >
                      {prefix && <span className="mr-0.5">{prefix}</span>}
                      {value}
                    </span>
                    <span className="font-sans text-xs font-medium text-olive-gray">{label}</span>
                  </div>
                ))}
              </motion.div>
            )}
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

      {/* CV Modal */}
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </section>
  );
}
