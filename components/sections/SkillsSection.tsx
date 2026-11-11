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
      en: "Business logic, service boundaries, and APIs that support day-to-day workflows.",
      vi: "Nghiệp vụ, ranh giới dịch vụ và API phục vụ các quy trình sử dụng hằng ngày.",
    },
    technologies: ["PHP", "Laravel", "Spring Boot", "RESTful APIs", "OOP"],
  },
  {
    title: { en: "Data and persistence", vi: "Dữ liệu và lưu trữ" },
    description: {
      en: "Relational schemas and ORM relationships shaped around clear, maintainable data flows.",
      vi: "Lược đồ quan hệ và ORM được thiết kế cho luồng dữ liệu rõ ràng, dễ bảo trì.",
    },
    technologies: ["MySQL", "Eloquent ORM"],
  },
  {
    title: { en: "Automation and AI", vi: "Tự động hóa và AI" },
    description: {
      en: "Practical workflows that connect services and reduce repetitive manual steps.",
      vi: "Quy trình kết nối các dịch vụ và giảm bớt thao tác lặp lại.",
    },
    technologies: ["n8n", "Claude API", "OpenAI API"],
  },
  {
    title: { en: "Frontend and product UI", vi: "Frontend và giao diện sản phẩm" },
    description: {
      en: "Interfaces and admin tools that make underlying workflows understandable to people.",
      vi: "Giao diện và công cụ quản trị giúp người dùng nắm rõ các quy trình phía sau.",
    },
    technologies: ["React", "TypeScript", "Filament", "Blade", "Tailwind CSS"],
  },
  {
    title: { en: "Desktop and systems", vi: "Desktop và hệ thống" },
    description: {
      en: "Native desktop behavior and system-level integrations across Windows and macOS.",
      vi: "Tương tác desktop native và tích hợp hệ thống trên Windows và macOS.",
    },
    technologies: ["Rust", "Tauri 2", "Windows API", "macOS"],
  },
  {
    title: { en: "Security and integrations", vi: "Bảo mật và tích hợp" },
    description: {
      en: "Access control, authentication, payments, and external service connections.",
      vi: "Phân quyền, xác thực, thanh toán và kết nối dịch vụ bên ngoài.",
    },
    technologies: ["RBAC", "JWT", "Spring Security", "Clerk", "VNPay", "Firebase"],
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
