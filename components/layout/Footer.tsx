"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/i18n/LanguageContext";

const socialLinks = [
  { icon: GitHubIcon, key: "github" as const, href: "https://github.com/quangtruong2003" },
  { icon: LinkedInIcon, key: "linkedin" as const, href: "https://www.linkedin.com/in/quangtruong2003" },
  { icon: Mail, key: "email" as const, href: "mailto:nguyentruongk530042003@gmail.com" },
  { icon: Phone, key: "phone" as const, href: "tel:+84947890450" },
];

export default function Footer() {
  const { dictionary } = useLanguage();
  const { footer, nav, contact } = dictionary;
  const navItems = [
    { key: "work" as const, id: "projects" },
    { key: "about" as const, id: "about" },
    { key: "capabilities" as const, id: "skills" },
    { key: "experience" as const, id: "experience" },
    { key: "openSource" as const, id: "open-source" },
    { key: "contact" as const, id: "contact" },
  ];

  return (
    <footer id="footer" className="border-t border-border-warm py-12 md:py-14">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <a href="#hero" className="inline-flex min-h-11 items-center gap-2.5 font-serif text-xl tracking-[-0.03em] text-near-black">
              <Image src="/favicon.svg" alt="" width={28} height={28} />
              <span>Nguyen Quang Truong</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-olive-gray">{footer.tagline}</p>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-olive-gray">{footer.navigate}</h2>
            <nav aria-label={footer.navigate} className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {navItems.map(({ key, id }) => (
                <a key={id} href={`#${id}`} className="flex min-h-10 items-center text-sm text-near-black transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue">
                  {nav[key]}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-start gap-5 md:col-span-4 md:justify-end">
            {socialLinks.map(({ icon: Icon, key, href }) => (
              <a
                key={key}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={contact[key]}
                className="flex min-h-11 min-w-8 items-center justify-center text-olive-gray transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-border-warm pt-4 text-xs text-olive-gray sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <a href="#hero" className="min-h-10 content-center underline decoration-border-warm underline-offset-4 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue">
            {footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
