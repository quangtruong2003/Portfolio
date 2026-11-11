"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/animations/FadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

type LocalizedText = Record<"vi" | "en", string>;

const capabilities: Array<{
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
}> = [
  {
    title: { en: "Backend and APIs", vi: "Backend và API" },
    description: {
      en: "PHP backends, RESTful APIs, and domain logic built for maintainable workflows.",
      vi: "Backend PHP, RESTful API và nghiệp vụ được xây dựng theo hướng dễ bảo trì.",
    },
    technologies: ["PHP 8+", "Laravel 12", "Spring Boot", "Python", "TypeScript", "RESTful APIs", "Laravel Queues"],
  },
  {
    title: { en: "Data and persistence", vi: "Dữ liệu và lưu trữ" },
    description: {
      en: "Schema design, query optimization, and caching for data-heavy workflows.",
      vi: "Thiết kế schema, tối ưu truy vấn và caching cho các luồng xử lý dữ liệu lớn.",
    },
    technologies: ["MySQL", "Redis", "Eloquent ORM", "Query optimization", "Database schema"],
  },
  {
    title: { en: "Full-stack integrations", vi: "Tích hợp Full Stack" },
    description: {
      en: "Product interfaces and service connections across web, admin, and payment workflows.",
      vi: "Giao diện sản phẩm và kết nối dịch vụ cho web, trang quản trị và quy trình thanh toán.",
    },
    technologies: ["React", "Filament", "WordPress", "VNPay", "Firebase", "PDF"],
  },
  {
    title: { en: "Security and architecture", vi: "Bảo mật và kiến trúc" },
    description: {
      en: "Access control and design principles applied to backend application structure.",
      vi: "Phân quyền và nguyên tắc thiết kế được áp dụng trong cấu trúc ứng dụng backend.",
    },
    technologies: ["RBAC", "OOP", "SOLID", "System architecture"],
  },
  {
    title: { en: "Desktop and systems", vi: "Desktop và hệ thống" },
    description: {
      en: "Native input handling and desktop application development for Windows.",
      vi: "Xử lý input native và phát triển ứng dụng desktop cho Windows.",
    },
    technologies: ["Rust", "Tauri 2", "Windows API", "Windows"],
  },
  {
    title: { en: "Developer tools", vi: "Công cụ phát triển" },
    description: {
      en: "Tools used for version control, API testing, dependency management, and daily development.",
      vi: "Công cụ dùng cho quản lý phiên bản, kiểm thử API, quản lý dependency và phát triển hằng ngày.",
    },
    technologies: ["Git", "GitLab", "Composer", "Postman", "Cursor", "Claude Code"],
  },
];

export default function SkillsSection() {
  const { dictionary, language } = useLanguage();
  const text = dictionary.skills;

  return (
    <SectionWrapper id="skills" py="xl">
      <SectionTitle title={text.title} subtitle={text.subtitle} />
      <dl className="border-t border-border-warm">
        {capabilities.map((capability) => (
          <FadeIn key={capability.title.en}>
            <div className="grid grid-cols-1 gap-3 border-b border-border-warm py-6 md:grid-cols-12 md:gap-6 md:py-7">
              <dt className="font-serif text-2xl leading-tight text-near-black md:col-span-3">
                {capability.title[language]}
              </dt>
              <dd className="text-sm leading-relaxed text-olive-gray md:col-span-4">
                {capability.description[language]}
              </dd>
              <dd className="font-mono text-[0.68rem] leading-[1.9] text-charcoal-warm md:col-span-5 md:text-right">
                {capability.technologies.join(" · ")}
              </dd>
            </div>
          </FadeIn>
        ))}
      </dl>
    </SectionWrapper>
  );
}
