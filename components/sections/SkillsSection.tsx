"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

type LocalizedText = Record<"vi" | "en", string>;

const capabilities: Array<{
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
}> = [
  {
    title: { en: "Backend workflows", vi: "Nghiệp vụ backend" },
    description: {
      en: "APIs, contract lifecycles, queued processing, and role-based access.",
      vi: "API, vòng đời hợp đồng, xử lý nền và phân quyền theo vai trò.",
    },
    technologies: ["PHP 8+", "Laravel 12", "Spring Boot", "REST APIs", "Queues", "RBAC"],
  },
  {
    title: { en: "Data performance", vi: "Hiệu năng dữ liệu" },
    description: {
      en: "Schema design, query tuning, eager loading, indexing, and caching.",
      vi: "Thiết kế schema, tối ưu truy vấn, eager loading, index và caching.",
    },
    technologies: ["MySQL", "Redis", "Eloquent ORM", "Query optimization"],
  },
  {
    title: { en: "Product integrations", vi: "Tích hợp sản phẩm" },
    description: {
      en: "Web interfaces, payment flows, inventory tools, and Windows applications.",
      vi: "Giao diện web, thanh toán, quản lý tồn kho và ứng dụng Windows.",
    },
    technologies: ["React", "WordPress", "VNPay", "Rust", "Tauri 2", "Kotlin", "Firebase"],
  },
];

export default function SkillsSection() {
  const { dictionary, language } = useLanguage();
  const text = dictionary.skills;

  return (
    <SectionWrapper id="skills" py="xl">
      <SectionTitle title={text.title} subtitle={text.subtitle} />
      <div className="capability-grid">
        {capabilities.map((capability) => (
          <article className="capability-item" key={capability.title.en}>
            <h3 className="font-serif text-2xl leading-tight text-near-black">{capability.title[language]}</h3>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-olive-gray">
              {capability.description[language]}
            </p>
            <p className="mt-5 font-mono text-xs leading-[1.9] text-charcoal-warm">
              {capability.technologies.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
