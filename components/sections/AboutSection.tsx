"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/animations/FadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AboutSection() {
  const { dictionary } = useLanguage();
  const text = dictionary.about;

  return (
    <SectionWrapper id="about" py="xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <SectionTitle title={text.title} subtitle={text.subtitle} />
        </div>
        <FadeIn className="md:col-span-6 md:col-start-7">
          <div className="space-y-6 text-base leading-[1.75] text-charcoal-warm">
            <p>{text.bio1}</p>
            <p>{text.bio2}</p>
          </div>
          <p className="mt-9 border-t border-border-warm pt-4 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.05em] text-olive-gray">
            {text.education}
          </p>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
