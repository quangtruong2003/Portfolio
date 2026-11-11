"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.28,
  direction = "up",
  className = "",
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const offset = direction === "left" ? { x: 10 } : direction === "right" ? { x: -10 } : direction === "up" ? { y: 10 } : direction === "down" ? { y: -10 } : {};

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: Math.min(duration, 0.3),
        delay: Math.min(delay, 0.12),
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
