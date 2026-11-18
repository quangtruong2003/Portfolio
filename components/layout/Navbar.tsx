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
  { key: "work", id: "projects", code: "01" },
  { key: "about", id: "about", code: "02" },
  { key: "capabilities", id: "skills", code: "03" },
  { key: "experience", id: "experience", code: "04" },
  { key: "openSource", id: "open-source", code: "05" },
  { key: "contact", id: "contact", code: "06" },
] as const;

const EASE_UNFOLD: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_FOLD: [number, number, number, number] = [0.4, 0, 0.2, 1];

function MenuMorphGlyph({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden="true">
      <span
        className={
          "absolute h-[1.5px] w-4.5 rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
          (isOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px] rotate-0")
        }
      />
      <span
        className={
          "absolute h-[1.5px] w-4.5 rounded-full bg-current transition-[transform,opacity] duration-200 ease-out " +
          (isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100")
        }
      />
      <span
        className={
          "absolute h-[1.5px] w-4.5 rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
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

  const renderLanguageButton = () => (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={
        language === "vi"
          ? "Switch language to English"
          : "Chuyển ngôn ngữ sang tiếng Việt"
      }
      className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] px-2.5 font-mono text-xs font-medium text-[var(--ink-primary)] transition-[background-color,border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.96]"
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
        style={{ viewTransitionName: "site-header" }}
        className="sticky top-0 z-40 border-b border-[var(--rule-cut)] bg-[var(--bg-canvas)] pt-[env(safe-area-inset-top,0px)]"
      >
        <nav
          className="site-container flex min-h-16 items-center justify-between gap-2 sm:gap-4"
          aria-label={language === "vi" ? "Điều hướng chính" : "Main navigation"}
        >
          {isHome ? (
            <a
              href="#hero"
              className="inline-flex min-h-11 min-w-0 items-center gap-2 font-serif text-base font-medium tracking-[-0.02em] text-[var(--ink-primary)] sm:gap-2.5 sm:text-xl"
            >
              <Image src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
              <span className="truncate">{ownerName}</span>
            </a>
          ) : (
            <Link
              href="/"
              transitionTypes={["folio-back"]}
              className="inline-flex min-h-11 min-w-0 items-center gap-2 font-serif text-base font-medium tracking-[-0.02em] text-[var(--ink-primary)] sm:gap-2.5 sm:text-xl"
            >
              <Image src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
              <span className="truncate">{ownerName}</span>
            </Link>
          )}

          <div className="hidden items-center gap-5 lg:flex">
            <div className="flex items-center gap-5 xl:gap-6">
              {NAV_LINKS.map(({ key, id }) => {
                const isActive = isHome ? activeSection === id : key === "work";
                const className =
                  "relative flex min-h-11 items-center text-sm font-medium transition-colors duration-150 hover:text-[var(--accent-vermilion)] " +
                  (isActive ? "text-[var(--accent-vermilion)]" : "text-[var(--ink-secondary)]");

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
                        "absolute inset-x-0 -bottom-px h-[2px] origin-left bg-[var(--accent-vermilion)] transition-transform duration-200 ease-[var(--ease-out-strong)] " +
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
                        "absolute inset-x-0 -bottom-px h-[2px] origin-left bg-[var(--accent-vermilion)] transition-transform duration-200 ease-[var(--ease-out-strong)] " +
                        (isActive ? "scale-x-100" : "scale-x-0")
                      }
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>
            {renderLanguageButton()}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {renderLanguageButton()}
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
              onClick={() => setIsOpen((open) => !open)}
              className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.96]"
            >
              <MenuMorphGlyph isOpen={isOpen} />
            </button>
          </div>
        </nav>

        {/* Tactile Ink Scroll Progress Hairline */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothProgress }}
          className="h-[2px] w-full origin-left bg-[var(--accent-vermilion)]"
        />
      </header>

      {/* Full-Screen Artistic Paper-Curtain Navigation Overlay (Sibling outside viewTransition header) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="fullscreen-atelier-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.18 : 0.36, ease: "easeOut" }}
            className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden lg:hidden"
          >
            {/* Dimmed Ink Backdrop Scrim */}
            <div
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#181715]/30"
            />

            {/* Secondary Offset Paper Ply (Leads on Unfold, Trails on Fold) */}
            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{
                  clipPath: "inset(0% 0% 0% 0%)",
                  transition: { duration: 0.46, ease: EASE_UNFOLD },
                }}
                exit={{
                  clipPath: "inset(0% 0% 100% 0%)",
                  transition: { duration: 0.4, delay: 0.05, ease: EASE_FOLD },
                }}
                className="pointer-events-none absolute inset-0 bg-[var(--bg-sheet-deep)]"
              />
            )}

            {/* Main Full-Viewport Archival Paper Sheet */}
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
                        clipPath: { duration: 0.56, delay: 0.04, ease: EASE_UNFOLD },
                        opacity: { duration: 0.38, delay: 0.02, ease: "easeOut" },
                        scale: { duration: 0.56, delay: 0.04, ease: EASE_UNFOLD },
                      },
                    }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: { duration: 0.16 } }
                  : {
                      opacity: 0,
                      clipPath: "inset(0% 0% 100% 0%)",
                      scale: 0.995,
                      transition: {
                        opacity: { duration: 0.3, ease: "easeInOut" },
                        clipPath: { duration: 0.38, ease: EASE_FOLD },
                        scale: { duration: 0.38, ease: EASE_FOLD },
                      },
                    }
              }
              className="relative flex h-full w-full flex-col justify-between overflow-y-auto overscroll-contain bg-[var(--bg-canvas)] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-[env(safe-area-inset-top,0px)]"
            >
              {/* Subtle Architectural Drafting Watermark Rings + Corner Registration Marks */}
              <svg
                viewBox="0 0 600 600"
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -right-28 h-[420px] w-[420px] text-[var(--rule-strong)] opacity-30 sm:h-[520px] sm:w-[520px]"
              >
                <circle
                  cx="300"
                  cy="300"
                  r="240"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="175"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="96"
                  fill="none"
                  stroke="#B8332A"
                  strokeOpacity="0.45"
                  strokeWidth="1.2"
                />
                <line x1="60" y1="300" x2="540" y2="300" stroke="currentColor" strokeWidth="0.75" />
                <line x1="300" y1="60" x2="300" y2="540" stroke="currentColor" strokeWidth="0.75" />
              </svg>

              {/* Overlay Top Header Bar (Pixel-Aligned with Main Header) */}
              <div className="border-b border-[var(--rule-cut)] bg-[var(--bg-canvas)]/90">
                <div className="site-container flex min-h-16 items-center justify-between gap-2 sm:gap-4">
                  {isHome ? (
                    <a
                      href="#hero"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex min-h-11 min-w-0 items-center gap-2 font-serif text-base font-medium tracking-[-0.02em] text-[var(--ink-primary)] sm:gap-2.5 sm:text-xl"
                    >
                      <Image src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
                      <span className="truncate">{ownerName}</span>
                    </a>
                  ) : (
                    <Link
                      href="/"
                      transitionTypes={["folio-back"]}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex min-h-11 min-w-0 items-center gap-2 font-serif text-base font-medium tracking-[-0.02em] text-[var(--ink-primary)] sm:gap-2.5 sm:text-xl"
                    >
                      <Image src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
                      <span className="truncate">{ownerName}</span>
                    </Link>
                  )}

                  <div className="flex items-center gap-2">
                    {renderLanguageButton()}
                    <button
                      ref={closeButtonRef}
                      type="button"
                      aria-label={dictionary.nav.closeMenu}
                      onClick={() => {
                        setIsOpen(false);
                        menuButtonRef.current?.focus();
                      }}
                      className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.96]"
                    >
                      <MenuMorphGlyph isOpen={true} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Centerpiece Staggered Editorial Navigation Spread */}
              <div className="site-container relative z-10 my-auto py-6 sm:py-10">
                <ul className="divide-y divide-[var(--rule-cut)] border-y border-[var(--rule-cut)]">
                  {NAV_LINKS.map(({ key, id, code }, index) => {
                    const isActive = isHome ? activeSection === id : key === "work";
                    const itemContent = (
                      <>
                        <div className="flex items-baseline gap-4 sm:gap-6">
                          <span
                            className={
                              "font-mono text-xs font-semibold tabular-nums transition-colors duration-200 " +
                              (isActive
                                ? "text-[var(--accent-vermilion)]"
                                : "text-[var(--ink-tertiary)] group-hover:text-[var(--accent-vermilion)]")
                            }
                          >
                            {`FIG.${code}`}
                          </span>
                          <span
                            className={
                              "font-serif text-[clamp(1.75rem,4.6vh,2.85rem)] font-medium leading-[1.12] tracking-[-0.025em] transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 " +
                              (isActive
                                ? "text-[var(--accent-vermilion)]"
                                : "text-[var(--ink-primary)] group-hover:text-[var(--accent-vermilion)]")
                            }
                          >
                            {dictionary.nav[key]}
                          </span>
                        </div>

                        <span className="flex items-center gap-2.5">
                          {isActive && (
                            <span
                              className="h-2 w-2 rounded-full bg-[var(--accent-vermilion)]"
                              aria-hidden="true"
                            />
                          )}
                          <ArrowUpRight
                            size={20}
                            aria-hidden="true"
                            className={
                              "transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 " +
                              (isActive
                                ? "text-[var(--accent-vermilion)]"
                                : "text-[var(--ink-tertiary)] group-hover:text-[var(--accent-vermilion)]")
                            }
                          />
                        </span>
                      </>
                    );

                    return (
                      <motion.li
                        key={id}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: 18 }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.44,
                            delay: shouldReduceMotion ? 0 : 0.1 + index * 0.045,
                            ease: EASE_UNFOLD,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                          transition: {
                            duration: 0.18,
                            ease: "easeIn",
                          },
                        }}
                      >
                        {isHome ? (
                          <a
                            href={`#${id}`}
                            aria-current={isActive ? "location" : undefined}
                            onClick={() => setIsOpen(false)}
                            className="group flex min-h-14 items-center justify-between py-3 sm:py-4"
                          >
                            {itemContent}
                          </a>
                        ) : (
                          <Link
                            href={`/#${id}`}
                            transitionTypes={["folio-back"]}
                            onClick={() => setIsOpen(false)}
                            className="group flex min-h-14 items-center justify-between py-3 sm:py-4"
                          >
                            {itemContent}
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* Bottom Archival Colophon & Direct Channels */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : 0.36,
                    ease: EASE_UNFOLD,
                  },
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="site-container relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs text-[var(--ink-secondary)]"
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--accent-patina)]"
                    aria-hidden="true"
                  />
                  <span>{dictionary.hero.location}</span>
                </span>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={OWNER_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw inline-flex min-h-9 items-center gap-1 text-[var(--ink-primary)] hover:text-[var(--accent-vermilion)]"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <a
                    href={`mailto:${OWNER_INFO.email}`}
                    className="link-draw inline-flex min-h-9 items-center gap-1 text-[var(--ink-primary)] hover:text-[var(--accent-vermilion)]"
                  >
                    <span>Email</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
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
