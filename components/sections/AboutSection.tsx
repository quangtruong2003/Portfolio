"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AboutSection() {
  const { dictionary } = useLanguage();
  const text = dictionary.about;

  return (
    <SectionWrapper id="about" py="xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="max-w-[12ch] font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-near-black sm:text-5xl">
            {text.title}
          </h2>
          <p className="section-copy mt-5">{text.subtitle}</p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-5 text-base leading-[1.75] text-charcoal-warm">
            <p>{text.bio1}</p>
            <p>{text.bio2}</p>
          </div>
          <p className="mt-8 border-t border-border-warm pt-4 font-mono text-xs uppercase leading-relaxed tracking-[0.05em] text-olive-gray">
            {text.education}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
