"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, Variants } from "framer-motion";

/* eslint-disable react-hooks/exhaust-deps */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_EXPO,
      when: "beforeChildren",
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

const underlineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.4 },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export default function IntroPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR fallback: static markup, identical DOM structure
  if (!mounted) {
    return (
      <div className="intro-wrapper" suppressHydrationWarning>
        <div className="intro-frame">
          <div className="intro-content" data-cursor-element-id="cursor-el-1">
            <span className="intro-frame-mark intro-frame-mark--tl" aria-hidden="true" />
            <span className="intro-frame-mark intro-frame-mark--br" aria-hidden="true" />

            <div className="intro-tagline-container">
              <span className="intro-tagline">SOFTWARE ENGINEER</span>
            </div>

            <div className="intro-heading-container">
              <h1 className="intro-heading">
                <span className="intro-heading-line">NGUYEN QUANG</span>
                <span className="intro-heading-line intro-heading-accent-wrap">
                  <span className="intro-heading-accent">TRUONG</span>
                  <span className="intro-heading-underline" aria-hidden="true" />
                </span>
              </h1>
            </div>

            <span className="intro-hairline" aria-hidden="true" />

            <div className="intro-subtitle-container">
              <p className="intro-subtitle">LARAVEL &bull; AI AUTOMATION &bull; N8N</p>
            </div>

            <button
              id="try-me"
              className="intro-cta"
              onClick={() => router.push("/portfolio")}
              type="button"
            >
              <span className="intro-cta-label">START</span>
              <span className="intro-cta-arrow" aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Client render: same DOM, Framer Motion animations
  return (
    <div
      className="intro-wrapper"
      style={{ opacity: mounted ? 1 : 0 }}
      suppressHydrationWarning
    >
      <motion.div
        className="intro-frame"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="intro-content"
          data-cursor-element-id="cursor-el-1"
          variants={containerVariants}
        >
          <motion.span
            className="intro-frame-mark intro-frame-mark--tl"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT_EXPO }}
          />
          <motion.span
            className="intro-frame-mark intro-frame-mark--br"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT_EXPO }}
          />

          <motion.div variants={itemVariants} className="intro-tagline-container">
            <span className="intro-tagline">SOFTWARE ENGINEER</span>
          </motion.div>

          <motion.div variants={headingVariants} className="intro-heading-container">
            <h1 className="intro-heading">
              <span className="intro-heading-line">NGUYEN QUANG</span>
              <span className="intro-heading-line intro-heading-accent-wrap">
                <motion.span className="intro-heading-accent" variants={headingVariants}>
                  TRUONG
                </motion.span>
                <motion.span
                  className="intro-heading-underline"
                  variants={underlineVariants}
                  aria-hidden="true"
                />
              </span>
            </h1>
          </motion.div>

          <motion.span
            className="intro-hairline"
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.35 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE_OUT_EXPO }}
          />

          <motion.div variants={itemVariants} className="intro-subtitle-container">
            <p className="intro-subtitle">LARAVEL &bull; AI AUTOMATION &bull; N8N</p>
          </motion.div>

          <motion.button
            id="try-me"
            className="intro-cta"
            variants={buttonVariants}
            onClick={() => router.push("/portfolio")}
            type="button"
            whileHover={
              prefersReducedMotion
                ? undefined
                : { scale: 1.03, transition: { duration: 0.25, ease: EASE_OUT_QUART } }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          >
            <span className="intro-cta-label">START</span>
            <span className="intro-cta-arrow" aria-hidden="true">&rarr;</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
