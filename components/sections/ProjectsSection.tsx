"use client";

import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/animations/FadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

type ProjectCategory = "work" | "thesis" | "personal";
type LocalizedText = Record<"vi" | "en", string>;

interface Project {
  title: string;
  category: ProjectCategory;
  period: LocalizedText;
  role: LocalizedText;
  description: LocalizedText;
  technologies: string[];
  href?: string;
  website?: string;
}

const projects: Project[] = [
  {
    title: "Property Management Platform",
    category: "work",
    period: { en: "2025–2026", vi: "2025–2026" },
    role: { en: "PHP Developer", vi: "Lập trình viên PHP" },
    description: {
      en: "Laravel contract workflows, queued invoice and utility jobs, MySQL query optimization, and access control across four roles.",
      vi: "Quy trình hợp đồng Laravel, tác vụ hóa đơn và tiện ích chạy nền, tối ưu truy vấn MySQL và phân quyền bốn vai trò.",
    },
    technologies: ["Laravel 12", "PHP 8+", "MySQL", "Redis", "Laravel Queues", "RBAC"],
  },
  {
    title: "SmoothScroll",
    category: "personal",
    period: { en: "2026–Present", vi: "2026–nay" },
    role: { en: "Windows desktop utility", vi: "Tiện ích desktop Windows" },
    description: {
      en: "An open-source Windows mouse-wheel utility with native input hooks, custom easing, and per-app exclusions. The project has passed 30,000 downloads.",
      vi: "Tiện ích mã nguồn mở cho chuột Windows, có input hook native, hiệu ứng cuộn tùy chỉnh và danh sách loại trừ theo ứng dụng. Dự án đã vượt 30.000 lượt tải.",
    },
    technologies: ["Rust", "Tauri 2", "React", "TypeScript"],
    href: "https://github.com/quangtruong2003/SmoothScroll",
    website: "https://smoothscroll.top/",
  },
  {
    title: "Medical Appointment Booking",
    category: "thesis",
    period: { en: "2025", vi: "2025" },
    role: { en: "Backend developer", vi: "Lập trình backend" },
    description: {
      en: "A healthcare booking system with patient records, service listings, appointment flows, and VNPay integration.",
      vi: "Hệ thống đặt lịch khám với hồ sơ bệnh nhân, danh mục dịch vụ, quy trình đặt hẹn và tích hợp VNPay.",
    },
    technologies: ["Spring Boot", "React", "MySQL", "VNPay", "JWT"],
    href: "https://github.com/quangtruong2003/luanvan-fullstack",
  },
  {
    title: "ChatBot",
    category: "personal",
    period: { en: "2024–2025", vi: "2024–2025" },
    role: { en: "Android app", vi: "Ứng dụng Android" },
    description: {
      en: "An Android conversational AI app built with Kotlin and Firebase for real-time sync and cloud conversation history.",
      vi: "Ứng dụng hội thoại AI trên Android, xây dựng bằng Kotlin và Firebase để đồng bộ dữ liệu và lưu lịch sử trò chuyện.",
    },
    technologies: ["Kotlin", "Firebase", "Android SDK"],
    href: "https://github.com/quangtruong2003/ChatBot",
  },
];

export default function ProjectsSection() {
  const { dictionary, language } = useLanguage();
  const { projects: text } = dictionary;

  return (
    <SectionWrapper id="projects" py="xl">
      <SectionTitle
        eyebrow={text.eyebrow}
        title={text.title}
        subtitle={text.subtitle}
      />

      <div className="border-t border-border-warm">
        {projects.map((project, index) => (
          <FadeIn key={project.title}>
            <article className="grid grid-cols-1 gap-4 border-b border-border-warm py-7 md:grid-cols-12 md:gap-6 md:py-9">
              <p className="font-mono text-xs text-olive-gray md:col-span-1 md:pt-2">
                {String(index + 1).padStart(2, "0")}
              </p>

              <div className="md:col-span-4">
                <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-olive-gray">
                  {text.category[project.category]} <span className="px-1.5 text-terracotta">/</span> {project.period[language]}
                </p>
                <h3 className={`font-serif leading-tight tracking-[-0.025em] text-near-black ${index === 0 ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-olive-gray">{project.role[language]}</p>
              </div>

              <p className="max-w-[52ch] text-sm leading-relaxed text-charcoal-warm md:col-span-4 md:pt-7">
                {project.description[language]}
              </p>

              <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-end md:pt-7">
                <p className="text-left font-mono text-[0.68rem] leading-relaxed text-olive-gray md:text-right">
                  {project.technologies.join(" · ")}
                </p>
                <div className="flex flex-wrap gap-x-4">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-terracotta underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-near-black focus-visible:outline-2 focus-visible:outline-focus-blue"
                    >
                      {text.viewSource}
                      <ArrowUpRight size={15} aria-hidden="true" />
                      <span className="sr-only">: {project.title}</span>
                    </a>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-terracotta underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-near-black focus-visible:outline-2 focus-visible:outline-focus-blue"
                    >
                      {text.viewWebsite}
                      <ArrowUpRight size={15} aria-hidden="true" />
                      <span className="sr-only">: {project.title}</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      <a
        href="#open-source"
        className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
      >
        {text.seeMore}
        <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </SectionWrapper>
  );
}
