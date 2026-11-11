"use client";

import { useState } from "react";
import { ArrowRight, Eye } from "lucide-react";
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
      <div className="border-b border-border-warm pb-4 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-olive-gray sm:flex sm:items-center sm:justify-between sm:text-xs">
        <p className="mb-2 sm:mb-0">Nguyen Quang Truong <span className="px-2 text-terracotta">/</span>{hero.role}</p>
        <p>{hero.location}</p>
      </div>

      <div className="grid grid-cols-1 gap-10 pt-12 md:grid-cols-12 md:gap-8 md:pt-20">
        <div className="md:col-span-9">
          <h1 className="max-w-[18ch] font-serif text-[clamp(2.75rem,7.3vw,6rem)] font-normal leading-[0.98] tracking-[-0.045em] text-near-black">
            {hero.headlineStart}
            <span className="block pb-[0.08em] font-normal italic text-terracotta">{hero.headlineAccent}</span>
          </h1>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center gap-3 rounded-[4px] border border-terracotta bg-terracotta px-5 text-sm font-medium text-ivory transition-[background-color,color,border-color,transform] duration-200 hover:border-near-black hover:bg-near-black focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus-blue active:scale-[0.98]"
            >
              {hero.viewProjects}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <Button variant="warm-sand" icon={Eye} onClick={() => setIsCVOpen(true)}>
              {hero.viewCV}
            </Button>
          </div>
        </div>

        <aside className="flex flex-col justify-end gap-8 border-t border-border-warm pt-6 md:col-span-3 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <p className="max-w-[34ch] text-base leading-relaxed text-olive-gray">{hero.bio}</p>
          <p className="border-t border-border-warm pt-4 font-mono text-xs leading-relaxed text-near-black">
            {hero.focus}
          </p>
        </aside>
      </div>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </SectionWrapper>
  );
}
