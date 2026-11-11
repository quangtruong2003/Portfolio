"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

type LocalizedText = Record<"vi" | "en", string>;
type ProjectCategory = "work" | "thesis" | "personal";

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

const featured: Project = {
  title: "SmoothScroll",
  category: "personal",
  period: { en: "2026–Present", vi: "2026–nay" },
  role: { en: "Windows desktop utility", vi: "Tiện ích desktop Windows" },
  description: {
    en: "An open-source mouse-wheel utility with native input hooks, custom easing, and per-app exclusions.",
    vi: "Tiện ích chuột mã nguồn mở với input hook native, hiệu ứng cuộn tùy chỉnh và danh sách loại trừ theo ứng dụng.",
  },
  technologies: ["Rust", "Tauri 2", "React", "TypeScript"],
  href: "https://github.com/quangtruong2003/SmoothScroll",
  website: "https://smoothscroll.top/",
};

const projects: Project[] = [
  {
    title: "Property Management Platform",
    category: "work",
    period: { en: "2025–2026", vi: "2025–2026" },
    role: { en: "PHP Developer", vi: "Lập trình viên PHP" },
    description: {
      en: "Built Laravel contract workflows, queued invoice and utility jobs, optimized MySQL queries, and managed access across four roles.",
      vi: "Xây dựng quy trình hợp đồng Laravel, tác vụ hóa đơn và tiện ích chạy nền, tối ưu MySQL và phân quyền bốn vai trò.",
    },
    technologies: ["Laravel 12", "PHP 8+", "MySQL", "Redis", "Queues", "RBAC"],
  },
  {
    title: "Medical Appointment Booking",
    category: "thesis",
    period: { en: "2025", vi: "2025" },
    role: { en: "Backend developer", vi: "Lập trình backend" },
    description: {
      en: "Designed booking flows and backend APIs for patient records, service listings, appointments, and VNPay payments.",
      vi: "Thiết kế luồng đặt lịch và API backend cho hồ sơ bệnh nhân, danh mục dịch vụ, cuộc hẹn và thanh toán VNPay.",
    },
    technologies: ["Spring Boot", "React", "MySQL", "VNPay", "JWT"],
    href: "https://github.com/quangtruong2003/luanvan-fullstack",
  },
  {
    title: "ChatBot",
    category: "personal",
    period: { en: "2024–2025", vi: "2024–2025" },
    role: { en: "Android application", vi: "Ứng dụng Android" },
    description: {
      en: "Built an Android conversational AI app with real-time sync and cloud conversation history.",
      vi: "Xây dựng ứng dụng hội thoại AI trên Android với đồng bộ dữ liệu và lịch sử trò chuyện trên cloud.",
    },
    technologies: ["Kotlin", "Firebase", "Android SDK"],
    href: "https://github.com/quangtruong2003/ChatBot",
  },
];

const scrollSteps: Record<"vi" | "en", string[]> = {
  en: ["Wheel input", "Native hooks", "Custom easing", "Per-app rules"],
  vi: ["Tín hiệu cuộn", "Input hook native", "Hiệu ứng cuộn", "Quy tắc theo ứng dụng"],
};

export default function ProjectsSection() {
  const { dictionary, language } = useLanguage();
  const text = dictionary.projects;

  return (
    <SectionWrapper id="projects" py="xl">
      <SectionTitle eyebrow={text.eyebrow} title={text.title} subtitle={text.subtitle} />

      <article className="project-spotlight">
        <div className="project-spotlight-copy">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-olive-gray">
            {text.category[featured.category]} / {featured.period[language]}
          </p>
          <h3 className="mt-5 font-serif text-4xl leading-[0.98] tracking-[-0.04em] text-near-black sm:text-5xl">
            {featured.title}
          </h3>
          <p className="mt-3 text-sm font-medium text-terracotta">{featured.role[language]}</p>
          <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-charcoal-warm">
            {featured.description[language]}
          </p>
          <p className="mt-5 font-mono text-xs leading-relaxed text-olive-gray">
            {featured.technologies.join(" · ")}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {featured.href && (
              <a className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue" href={featured.href} target="_blank" rel="noopener noreferrer">
                {text.viewSource}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">: {featured.title}</span>
              </a>
            )}
            {featured.website && (
              <a className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue" href={featured.website} target="_blank" rel="noopener noreferrer">
                {text.viewWebsite}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">: {featured.title}</span>
              </a>
            )}
          </div>
        </div>

        <figure className="project-flow" aria-labelledby="scroll-process-caption">
          <figcaption id="scroll-process-caption" className="font-mono text-xs uppercase tracking-[0.08em] text-olive-gray">
            {text.processLabel}
          </figcaption>
          <ol className="project-flow-steps">
            {scrollSteps[language].map((step, index) => (
              <li className="project-flow-step" key={step}>
                <span className="block font-mono text-[0.68rem] text-terracotta">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-3 block max-w-[12ch] font-serif text-xl leading-tight text-near-black">{step}</span>
              </li>
            ))}
          </ol>
        </figure>
      </article>

      <div className="mt-12">
        {projects.map((project) => (
          <article className="project-row" key={project.title}>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.06em] text-olive-gray">
                {text.category[project.category]} / {project.period[language]}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight tracking-[-0.02em] text-near-black">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-terracotta">{project.role[language]}</p>
            </div>
            <div>
              <p className="max-w-[62ch] text-sm leading-relaxed text-charcoal-warm">{project.description[language]}</p>
              <p className="mt-3 font-mono text-[0.68rem] leading-relaxed text-olive-gray">
                {project.technologies.join(" · ")}
              </p>
              {project.href && (
                <a className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue" href={project.href} target="_blank" rel="noopener noreferrer">
                  {text.viewSource}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">: {project.title}</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <a href="#open-source" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue">
        {text.seeMore}<ArrowRight size={15} aria-hidden="true" />
      </a>
    </SectionWrapper>
  );
}
