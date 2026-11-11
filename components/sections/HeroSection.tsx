"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Eye } from "lucide-react";
import Button from "@/components/ui/Button";
import CVModal from "@/components/ui/CVModal";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HeroSection() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const { dictionary } = useLanguage();
  const { hero } = dictionary;

  return (
    <SectionWrapper id="hero" py="xl" className="border-t-0">
      <div className="hero-meta">
        <p className="mb-2 sm:mb-0">Nguyen Quang Truong <span className="px-2 text-terracotta">/</span>{hero.role}</p>
        <p>{hero.location}</p>
      </div>

      <div className="hero-layout">
        <div>
          <h1 className="hero-headline">
            {hero.headlineStart}
            <span>{hero.headlineAccent}</span>
          </h1>
          <p className="hero-description">{hero.bio}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center gap-2 rounded-[4px] border border-terracotta bg-terracotta px-5 text-sm font-medium text-ivory transition-colors duration-200 hover:border-near-black hover:bg-near-black focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-blue"
            >
              {hero.viewProjects}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <Button variant="warm-sand" icon={Eye} onClick={() => setIsCVOpen(true)}>
              {hero.viewCV}
            </Button>
          </div>
        </div>

        <aside className="hero-proof">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-olive-gray">{hero.proofLabel}</p>
          <p className="hero-proof-value">30,000+</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.06em] text-olive-gray">{hero.proofCaption}</p>
          <div className="mt-7 flex items-center justify-between gap-4 border-t border-border-warm pt-4">
            <span className="font-serif text-2xl text-near-black">SmoothScroll</span>
            <a
              href="https://github.com/quangtruong2003/SmoothScroll"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={hero.viewProject + ": SmoothScroll"}
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-terracotta transition-transform duration-200 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-focus-blue"
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </SectionWrapper>
  );
}
