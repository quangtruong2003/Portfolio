"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/i18n/LanguageContext";

const socialLinks = [
  {
    icon: GitHubIcon,
    label: "GitHub",
    href: "https://github.com/quangtruong2003",
    color: "hover:text-near-black",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/quangtruong2003",
    color: "hover:text-[#0A66C2]",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:nguyentruongk530042003@gmail.com",
    color: "hover:text-terracotta",
  },
  {
    icon: Phone,
    label: "Phone",
    href: "tel:+84947890450",
    color: "hover:text-coral",
  },
];

export default function Footer() {
  const { dictionary } = useLanguage();
  const { footer: t, nav: navT } = dictionary;

  const navItems = [
    { key: "about" as const, label: navT.about },
    { key: "skills" as const, label: navT.skills },
    { key: "experience" as const, label: navT.experience },
    { key: "projects" as const, label: navT.projects },
    { key: "contact" as const, label: navT.contact },
  ];

  return (
    <footer
      id="footer"
      className="bg-near-black text-ivory border-t border-[#30302e]"
    >
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="font-serif font-semibold text-2xl text-terracotta">NQT</span>
            <p className="font-sans text-sm leading-relaxed text-warm-silver max-w-xs">
              {t.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-stone-gray">
              {t.navigate}
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems.map(({ key, label }) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="
                    font-sans text-sm text-warm-silver
                    hover:text-ivory transition-colors duration-200
                    inline-flex items-center gap-1
                  "
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-stone-gray">
              {t.getInTouch}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:nguyentruongk530042003@gmail.com"
                className="font-sans text-sm text-warm-silver hover:text-ivory transition-colors duration-200"
              >
                nguyentruongk530042003@gmail.com
              </a>
              <a
                href="tel:+84947890450"
                className="font-sans text-sm text-warm-silver hover:text-ivory transition-colors duration-200"
              >
                (094) 789 0450
              </a>
              <p className="font-sans text-sm text-stone-gray">
                Binh Thanh, Ho Chi Minh City
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
            mt-12 pt-8 border-t border-[#30302e]
            flex flex-col sm:flex-row items-center justify-between gap-4
          "
        >
          <p className="font-sans text-xs text-stone-gray">
            {t.copyright}
          </p>

          <div className="flex items-center gap-5">
            {socialLinks.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className={`
                  text-stone-gray transition-colors duration-200
                  ${color}
                `}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
