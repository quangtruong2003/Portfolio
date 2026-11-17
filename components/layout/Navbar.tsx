"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
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

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !menuRef.current?.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  const ownerName = language === "vi" ? OWNER_INFO.nameVi : OWNER_INFO.nameEn;

  const languageButton = (
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
            {languageButton}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {languageButton}
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
              onClick={() => setIsOpen((open) => !open)}
              className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-[3px] border border-[var(--rule-cut)] bg-[var(--bg-sheet-top)] text-[var(--ink-primary)] active:scale-[0.96]"
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* Tactile Ink Scroll Progress Hairline */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothProgress }}
          className="h-[2px] w-full origin-left bg-[var(--accent-vermilion)]"
        />

        <nav
          id="mobile-navigation"
          ref={menuRef}
          aria-label={language === "vi" ? "Điều hướng di động" : "Mobile navigation"}
          hidden={!isOpen}
          className="absolute inset-x-0 top-full z-30 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-[var(--rule-strong)] bg-[var(--bg-sheet-top)] px-4 pb-5 pt-2 shadow-[0_18px_36px_rgba(24,23,21,0.16)] lg:hidden"
        >
          <div className="site-container flex flex-col">
            {NAV_LINKS.map(({ key, id }) =>
              isHome ? (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={activeSection === id ? "location" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-12 items-center justify-between border-b border-[var(--rule-cut)] text-sm font-medium text-[var(--ink-primary)] transition-colors duration-150 hover:text-[var(--accent-vermilion)]"
                >
                  <span>{dictionary.nav[key]}</span>
                  {activeSection === id && (
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-vermilion)]" aria-hidden="true" />
                  )}
                </a>
              ) : (
                <Link
                  key={id}
                  href={`/#${id}`}
                  transitionTypes={["folio-back"]}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-12 items-center justify-between border-b border-[var(--rule-cut)] text-sm font-medium text-[var(--ink-primary)] transition-colors duration-150 hover:text-[var(--accent-vermilion)]"
                >
                  <span>{dictionary.nav[key]}</span>
                </Link>
              )
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
