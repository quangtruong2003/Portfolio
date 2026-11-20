"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { OWNER_INFO } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";

const NAV_LINKS = [
  { key: "work", id: "projects" },
  { key: "about", id: "about" },
  { key: "capabilities", id: "skills" },
  { key: "experience", id: "experience" },
  { key: "openSource", id: "open-source" },
  { key: "contact", id: "contact" },
] as const;

// Non-uniform organic stagger offsets (shrinking gaps, never robotic linear)
const MENU_STAGGER_DELAYS = [0.09, 0.145, 0.19, 0.225, 0.255, 0.28];
const EASE_CURTAIN_OPEN: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EASE_CURTAIN_CLOSE: [number, number, number, number] = [0.32, 0.72, 0, 1];

function MenuMorphGlyph({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden="true">
      <span
        className={
          "absolute h-[1.5px] w-4.5 rounded-full bg-current transition-[transform,opacity] duration-250 ease-[var(--ease-out-strong)] " +
          (isOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px] rotate-0")
        }
      />
      <span
        className={
          "absolute h-[1.5px] w-4.5 rounded-full bg-current transition-[transform,opacity] duration-180 ease-out " +
          (isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100")
        }
      />
      <span
        className={
          "absolute h-[1.5px] w-4.5 rounded-full bg-current transition-[transform,opacity] duration-250 ease-[var(--ease-out-strong)] " +
          (isOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px] rotate-0")
        }
      />
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { language, dictionary, toggleLanguage } = useLanguage();

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.4,
  });

  useEffect(() => {
    if (!isHome) return;
    const sections = ["hero", ...NAV_LINKS.map(({ id }) => id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const ownerName = language === "vi" ? OWNER_INFO.nameVi : OWNER_INFO.nameEn;

  const renderLanguageButton = (dark = false) => (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={
        language === "vi"
          ? "Switch language to English"
          : "Chuyển ngôn ngữ sang tiếng Việt"
      }
      className={
        "inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border px-3 font-mono text-xs font-medium transition-[background-color,border-color,color,transform] duration-150 ease-[var(--ease-out-strong)] active:scale-[0.96] " +
        (dark
          ? "border-[var(--engine-border-strong)] bg-[var(--engine-surface)] text-[var(--engine-ink)] hover:border-[var(--accent-on-engine)] hover:text-[var(--accent-on-engine)]"
          : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--ink-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]")
      }
    >
      <span className="sm:hidden">{language === "vi" ? "VI/EN" : "EN/VI"}</span>
      <span className="hidden sm:inline">{language === "vi" ? "VI / EN" : "EN / VI"}</span>
    </button>
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        {dictionary.nav.skip}
      </a>

      <header
        inert={isOpen}
        style={{ viewTransitionName: "site-header" }}
        className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--surface-ground)]/92 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md"
      >
        <nav
          className="site-container flex min-h-16 items-center justify-between gap-2 sm:gap-4"
          aria-label={language === "vi" ? "Điều hướng chính" : "Main navigation"}
        >
          {isHome ? (
            <a
              href="#hero"
              className="inline-flex min-h-11 min-w-0 items-center gap-2.5 font-display text-base font-semibold tracking-[-0.025em] text-[var(--ink-primary)] sm:text-lg"
            >
              <Image src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
              <span className="truncate">{ownerName}</span>
            </a>
          ) : (
            <Link
              href="/"
              transitionTypes={["folio-back"]}
              className="inline-flex min-h-11 min-w-0 items-center gap-2.5 font-display text-base font-semibold tracking-[-0.025em] text-[var(--ink-primary)] sm:text-lg"
            >
              <Image src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
              <span className="truncate">{ownerName}</span>
            </Link>
          )}

          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-6">
              {NAV_LINKS.map(({ key, id }) => {
                const isActive = isHome ? activeSection === id : key === "work";
                const className =
                  "relative flex min-h-11 items-center text-sm font-medium transition-colors duration-150 hover:text-[var(--accent-primary)] " +
                  (isActive ? "text-[var(--accent-primary)]" : "text-[var(--ink-secondary)]");

                return isHome ? (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={className}
                  >
                    {dictionary.nav[key]}
                    <span
                      className={
                        "absolute inset-x-0 -bottom-px h-[2px] origin-left rounded-full bg-[var(--accent-primary)] transition-transform duration-200 ease-[var(--ease-out-strong)] " +
                        (isActive ? "scale-x-100" : "scale-x-0")
                      }
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <Link
                    key={id}
                    href={`/#${id}`}
                    transitionTypes={["folio-back"]}
                    className={className}
                  >
                    {dictionary.nav[key]}
                    <span
                      className={
                        "absolute inset-x-0 -bottom-px h-[2px] origin-left rounded-full bg-[var(--accent-primary)] transition-transform duration-200 ease-[var(--ease-out-strong)] " +
                        (isActive ? "scale-x-100" : "scale-x-0")
                      }
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>
            {renderLanguageButton(false)}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {renderLanguageButton(false)}
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
              onClick={() => setIsOpen((open) => !open)}
              className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.96]"
            >
              <MenuMorphGlyph isOpen={isOpen} />
            </button>
          </div>
        </nav>

        {/* Spring-Damped Scroll Progress Hairline */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothProgress }}
          className="h-[2px] w-full origin-left bg-[var(--accent-primary)]"
        />
      </header>

      {/* Full-Screen 100dvh Artistic Forest-Obsidian Navigation Curtain (Sibling outside viewTransition header) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="fullscreen-monograph-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.16 : 0.34, ease: "easeOut" }}
            className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden lg:hidden"
          >
            {/* Leading Forest Pine Curtain Layer */}
            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{
                  clipPath: "inset(0% 0% 0% 0%)",
                  transition: { duration: 0.42, ease: EASE_CURTAIN_OPEN },
                }}
                exit={{
                  clipPath: "inset(0% 0% 100% 0%)",
                  transition: { duration: 0.34, delay: 0.04, ease: EASE_CURTAIN_CLOSE },
                }}
                className="pointer-events-none absolute inset-0 bg-[var(--accent-primary)]"
              />
            )}

            {/* Main Full-Viewport Forest-Obsidian Navigation Canvas */}
            <motion.nav
              id="mobile-navigation"
              aria-label={language === "vi" ? "Điều hướng toàn màn hình" : "Full-screen navigation"}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      clipPath: "inset(0% 0% 100% 0%)",
                      scale: 0.992,
                    }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1, transition: { duration: 0.2 } }
                  : {
                      opacity: 1,
                      clipPath: "inset(0% 0% 0% 0%)",
                      scale: 1,
                      transition: {
                        clipPath: { duration: 0.5, delay: 0.045, ease: EASE_CURTAIN_OPEN },
                        opacity: { duration: 0.32, delay: 0.02, ease: "easeOut" },
                        scale: { duration: 0.5, delay: 0.045, ease: EASE_CURTAIN_OPEN },
                      },
                    }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: { duration: 0.15 } }
                  : {
                      opacity: 0,
                      clipPath: "inset(0% 0% 100% 0%)",
                      scale: 0.995,
                      transition: {
                        opacity: { duration: 0.24, ease: "easeOut" },
                        clipPath: { duration: 0.32, ease: EASE_CURTAIN_CLOSE },
                        scale: { duration: 0.32, ease: EASE_CURTAIN_CLOSE },
                      },
                    }
              }
              className="engine-room relative flex h-full w-full flex-col justify-between overflow-y-auto overscroll-contain pb-[max(1.75rem,env(safe-area-inset-bottom,0px))] pt-[env(safe-area-inset-top,0px)]"
            >
              {/* Top Overlay Header */}
              <div className="border-b border-[var(--engine-border)]">
                <div className="site-container flex min-h-16 items-center justify-between gap-2 sm:gap-4">
                  {isHome ? (
                    <a
                      href="#hero"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex min-h-11 min-w-0 items-center gap-2.5 font-display text-base font-semibold tracking-[-0.025em] text-[var(--engine-ink)] sm:text-lg"
                    >
                      <Image src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
                      <span className="truncate">{ownerName}</span>
                    </a>
                  ) : (
                    <Link
                      href="/"
                      transitionTypes={["folio-back"]}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex min-h-11 min-w-0 items-center gap-2.5 font-display text-base font-semibold tracking-[-0.025em] text-[var(--engine-ink)] sm:text-lg"
                    >
                      <Image src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
                      <span className="truncate">{ownerName}</span>
                    </Link>
                  )}

                  <div className="flex items-center gap-2">
                    {renderLanguageButton(true)}
                    <button
                      ref={closeButtonRef}
                      type="button"
                      aria-label={dictionary.nav.closeMenu}
                      onClick={() => {
                        setIsOpen(false);
                        menuButtonRef.current?.focus();
                      }}
                      className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--engine-border-strong)] bg-[var(--engine-surface)] text-[var(--engine-ink)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-on-engine)] hover:text-[var(--accent-on-engine)] active:scale-[0.96]"
                    >
                      <MenuMorphGlyph isOpen={true} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Centerpiece Sculptural Navigation Links */}
              <div className="site-container relative z-10 my-auto py-6 sm:py-10">
                <ul className="divide-y divide-[var(--engine-border)] border-y border-[var(--engine-border)]">
                  {NAV_LINKS.map(({ key, id }, index) => {
                    const isActive = isHome ? activeSection === id : key === "work";
                    const itemContent = (
                      <>
                        <span
                          className={
                            "font-display text-[clamp(1.75rem,4.6vh,2.8rem)] font-semibold leading-[1.12] tracking-[-0.03em] transition-[color,transform] duration-250 ease-[var(--ease-out-strong)] group-hover:translate-x-1.5 " +
                            (isActive
                              ? "text-[var(--accent-on-engine)]"
                              : "text-[var(--engine-ink)] group-hover:text-[var(--accent-on-engine)]")
                          }
                        >
                          {dictionary.nav[key]}
                        </span>

                        <span className="flex items-center gap-3">
                          {isActive && (
                            <span
                              className="h-2 w-2 rounded-full bg-[var(--accent-on-engine)]"
                              aria-hidden="true"
                            />
                          )}
                          <ArrowUpRight
                            size={22}
                            aria-hidden="true"
                            className={
                              "transition-[color,transform] duration-250 ease-[var(--ease-out-strong)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 " +
                              (isActive
                                ? "text-[var(--accent-on-engine)]"
                                : "text-[var(--engine-muted)] group-hover:text-[var(--accent-on-engine)]")
                            }
                          />
                        </span>
                      </>
                    );

                    return (
                      <motion.li
                        key={id}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.4,
                            delay: shouldReduceMotion ? 0 : MENU_STAGGER_DELAYS[index] ?? 0.28,
                            ease: EASE_CURTAIN_OPEN,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                          transition: { duration: 0.16, ease: "easeOut" },
                        }}
                      >
                        {isHome ? (
                          <a
                            href={`#${id}`}
                            aria-current={isActive ? "location" : undefined}
                            onClick={() => setIsOpen(false)}
                            className="group flex min-h-14 items-center justify-between py-3.5 sm:py-4"
                          >
                            {itemContent}
                          </a>
                        ) : (
                          <Link
                            href={`/#${id}`}
                            transitionTypes={["folio-back"]}
                            onClick={() => setIsOpen(false)}
                            className="group flex min-h-14 items-center justify-between py-3.5 sm:py-4"
                          >
                            {itemContent}
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* Bottom Direct Channels */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.36,
                    delay: shouldReduceMotion ? 0 : 0.32,
                    ease: EASE_CURTAIN_OPEN,
                  },
                }}
                exit={{ opacity: 0, transition: { duration: 0.14 } }}
                className="site-container relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2 text-sm text-[var(--engine-muted)]"
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--accent-on-engine)]"
                    aria-hidden="true"
                  />
                  <span>{dictionary.hero.location}</span>
                </span>

                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={OWNER_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw inline-flex min-h-11 items-center gap-1 text-[var(--engine-ink)] hover:text-[var(--accent-on-engine)]"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <a
                    href={`mailto:${OWNER_INFO.email}`}
                    className="link-draw inline-flex min-h-11 items-center gap-1 text-[var(--engine-ink)] hover:text-[var(--accent-on-engine)]"
                  >
                    <span>Email</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
