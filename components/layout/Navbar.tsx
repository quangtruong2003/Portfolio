"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Mail, ExternalLink, CircleUser, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { language, dictionary, toggleLanguage } = useLanguage();

  const navLinks = [
    { key: "about", href: "#about" },
    { key: "skills", href: "#skills" },
    { key: "experience", href: "#experience" },
    { key: "projects", href: "#projects" },
    { key: "contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const targetY = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? "bg-parchment/95 backdrop-blur-md shadow-[0_1px_0_0_#e8e6dc]"
            : "bg-transparent"
          }
        `}
      >
        <nav className="max-w-6xl mx-auto px-6 lg:px-10">
          <div
            className={`
              flex items-center justify-between h-16 md:h-[72px]
              transition-all duration-300
            `}
          >
            {/* Logo */}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 group"
            >
              <span
                className="
                  font-serif font-semibold text-xl tracking-tight
                  text-terracotta
                  transition-transform duration-200
                  group-hover:scale-105
                "
              >
                NQT
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`
                    font-sans text-sm font-medium
                    transition-colors duration-200
                    relative group
                    ${activeSection === link.href.replace("#", "")
                      ? "text-terracotta"
                      : "text-olive-gray hover:text-near-black"
                    }
                  `}
                >
                  {dictionary.nav[link.key as keyof typeof dictionary.nav]}
                  <span
                    className={`
                      absolute -bottom-0.5 left-0 h-px
                      bg-terracotta transition-all duration-300
                      ${activeSection === link.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </button>
              ))}

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                aria-label="Toggle language"
                className="
                  flex items-center gap-1.5
                  px-2.5 py-1.5 rounded-[8px]
                  text-xs font-medium font-mono
                  border border-[#e8e6dc]
                  text-stone-gray hover:text-terracotta hover:border-terracotta/30
                  transition-all duration-200
                "
              >
                <Globe size={13} />
                <span>{language === "vi" ? "VI" : "EN"}</span>
              </button>

              {/* Social Icons */}
              <div className="flex items-center gap-3 ml-1">
                <a
                  href="https://github.com/quangtruong2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-gray hover:text-terracotta transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <ExternalLink size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/quangtruong2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-gray hover:text-terracotta transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <CircleUser size={18} />
                </a>
              </div>
            </div>

            {/* Mobile Header Right: Language + Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleLanguage(); }}
                aria-label="Toggle language"
                className="
                  flex items-center gap-1
                  px-2 py-1 rounded-[6px]
                  text-xs font-medium font-mono
                  border border-[#e8e6dc]
                  text-stone-gray hover:text-terracotta hover:border-terracotta/30
                  transition-all duration-200
                "
              >
                <Globe size={12} />
                {language === "vi" ? "VI" : "EN"}
              </button>

              {/* Hamburger */}
              <button
                className="text-charcoal-warm p-2 -mr-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-parchment/98 backdrop-blur-lg
          flex flex-col
          transition-all duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex flex-col h-full pt-20 px-8 pb-8">
          {/* Logo + close */}
          <div className="flex items-center justify-between mb-12">
            <span className="font-serif font-semibold text-2xl text-terracotta">NQT</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-charcoal-warm"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-6 flex-1">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`
                  font-serif font-medium text-left
                  transition-all duration-200
                  ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}
                `}
                style={{
                  transitionDelay: `${i * 60}ms`,
                  fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                  color: activeSection === link.href.replace("#", "")
                    ? "var(--terracotta)"
                    : "var(--near-black)",
                }}
              >
                {dictionary.nav[link.key as keyof typeof dictionary.nav]}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-auto pt-8 border-t border-[#e8e6dc]">
            <a
              href="https://github.com/quangtruong2003"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-olive-gray hover:text-terracotta transition-colors font-sans text-sm"
            >
              <ExternalLink size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/quangtruong2003"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-olive-gray hover:text-terracotta transition-colors font-sans text-sm"
            >
              <CircleUser size={18} />
              LinkedIn
            </a>
            <a
              href="mailto:nguyentruongk530042003@gmail.com"
              className="flex items-center gap-2 text-olive-gray hover:text-terracotta transition-colors font-sans text-sm"
            >
              <Mail size={18} />
              Email
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
