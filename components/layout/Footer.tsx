"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { OWNER_INFO } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";

const socialLinks = [
  { icon: GitHubIcon, key: "github" as const, href: OWNER_INFO.githubUrl },
  { icon: LinkedInIcon, key: "linkedin" as const, href: OWNER_INFO.linkedinUrl },
  { icon: Mail, key: "email" as const, href: `mailto:${OWNER_INFO.email}` },
  { icon: Phone, key: "phone" as const, href: OWNER_INFO.phoneHref },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { language, dictionary } = useLanguage();
  const { footer, nav, contact } = dictionary;
  const ownerName = language === "vi" ? OWNER_INFO.nameVi : OWNER_INFO.nameEn;

  const navItems = [
    { key: "work" as const, id: "projects" },
    { key: "about" as const, id: "about" },
    { key: "capabilities" as const, id: "skills" },
    { key: "experience" as const, id: "experience" },
    { key: "openSource" as const, id: "open-source" },
    { key: "contact" as const, id: "contact" },
  ];

  return (
    <footer
      id="footer"
      className="border-t border-[var(--border-subtle)] bg-[var(--surface-subtle)] pb-[calc(3rem+env(safe-area-inset-bottom,0px))] pt-14 md:pt-16"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            {isHome ? (
              <a
                href="#hero"
                className="inline-flex min-h-11 items-center gap-2.5 font-display text-lg font-semibold tracking-[-0.025em] text-[var(--ink-primary)]"
              >
                <Image src="/favicon.svg" alt="" width={28} height={28} />
                <span>{ownerName}</span>
              </a>
            ) : (
              <Link
                href="/"
                transitionTypes={["folio-back"]}
                className="inline-flex min-h-11 items-center gap-2.5 font-display text-lg font-semibold tracking-[-0.025em] text-[var(--ink-primary)]"
              >
                <Image src="/favicon.svg" alt="" width={28} height={28} />
                <span>{ownerName}</span>
              </Link>
            )}
            <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--ink-secondary)]">
              {footer.tagline}
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold text-[var(--ink-primary)]">
              {footer.navigate}
            </h2>
            <nav aria-label={footer.navigate} className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {navItems.map(({ key, id }) =>
                isHome ? (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="link-draw flex min-h-11 items-center text-sm text-[var(--ink-secondary)] hover:text-[var(--accent-primary)]"
                  >
                    {nav[key]}
                  </a>
                ) : (
                  <Link
                    key={id}
                    href={`/#${id}`}
                    transitionTypes={["folio-back"]}
                    className="link-draw flex min-h-11 items-center text-sm text-[var(--ink-secondary)] hover:text-[var(--accent-primary)]"
                  >
                    {nav[key]}
                  </Link>
                )
              )}
            </nav>
          </div>

          <div className="flex items-start gap-2.5 md:col-span-3 md:justify-end">
            {socialLinks.map(({ icon: Icon, key, href }) => (
              <a
                key={key}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={contact[key]}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--ink-primary)] transition-[background-color,border-color,color,transform] duration-150 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.96]"
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--ink-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{footer.copyright}</span>
            <span className="hidden text-[var(--border-strong)] sm:inline" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-xs text-[var(--ink-muted)]">
              {footer.colophon}
            </span>
          </div>

          {isHome ? (
            <a
              href="#hero"
              className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-[var(--ink-primary)] transition-colors duration-150 hover:text-[var(--accent-primary)]"
            >
              <span>{footer.backToTop}</span>
              <ArrowUp size={14} aria-hidden="true" />
            </a>
          ) : (
            <Link
              href="/"
              transitionTypes={["folio-back"]}
              className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-[var(--ink-primary)] transition-colors duration-150 hover:text-[var(--accent-primary)]"
            >
              <span>{nav.home}</span>
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
