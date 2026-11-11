"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { language, dictionary, toggleLanguage } = useLanguage();

  useEffect(() => {
    const sections = ["hero", ...NAV_LINKS.map(({ id }) => id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-22% 0px -68% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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

  const languageButton = (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "vi" ? "Switch language to English" : "Chuyển ngôn ngữ sang tiếng Việt"}
      className="min-h-11 min-w-11 border-l border-border-warm px-3 font-mono text-xs text-near-black transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
    >
      {language === "vi" ? "VI" : "EN"}
    </button>
  );

  return (
    <>
      <a className="skip-link" href="#main-content">{dictionary.nav.skip}</a>
      <header className="sticky top-0 z-40 border-b border-border-warm bg-parchment/95">
        <nav className="site-container flex min-h-16 items-center justify-between gap-4" aria-label={language === "vi" ? "Điều hướng chính" : "Main navigation"}>
          <a href="#hero" className="inline-flex shrink-0 items-center gap-2.5 font-serif text-lg tracking-[-0.03em] text-near-black sm:text-xl">
            <Image src="/favicon.svg" alt="" width={28} height={28} />
            <span>Nguyen Quang Truong</span>
          </a>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center gap-4 xl:gap-6">
              {NAV_LINKS.map(({ key, id }) => (
                <a
                  key={id}
                  href={"#" + id}
                  aria-current={activeSection === id ? "location" : undefined}
                  className={"relative flex min-h-11 items-center text-sm transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue " + (activeSection === id ? "text-terracotta" : "text-olive-gray")}
                >
                  {dictionary.nav[key]}
                  <span className={"absolute inset-x-0 -bottom-px h-px bg-terracotta transition-transform duration-200 " + (activeSection === id ? "scale-x-100" : "scale-x-0")} aria-hidden="true" />
                </a>
              ))}
            </div>
            {languageButton}
          </div>

          <div className="flex items-center lg:hidden">
            {languageButton}
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
              onClick={() => setIsOpen((open) => !open)}
              className="flex min-h-11 min-w-11 items-center justify-center text-near-black focus-visible:outline-2 focus-visible:outline-focus-blue"
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <nav
          id="mobile-navigation"
          ref={menuRef}
          aria-label={language === "vi" ? "Điều hướng di động" : "Mobile navigation"}
          hidden={!isOpen}
          className="absolute inset-x-0 top-full z-20 border-t border-border-warm bg-parchment px-4 pb-4 pt-2 lg:hidden"
        >
          <div className="site-container flex flex-col">
            {NAV_LINKS.map(({ key, id }) => (
              <a
                key={id}
                href={"#" + id}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 items-center border-b border-border-cream text-sm text-near-black transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
              >
                {dictionary.nav[key]}
              </a>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
