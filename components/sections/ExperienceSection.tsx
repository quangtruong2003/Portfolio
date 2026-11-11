"use client";

import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/animations/FadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

type LocalizedText = Record<"vi" | "en", string>;

interface ExperienceItem {
  company: string;
  role: LocalizedText;
  period: LocalizedText;
  type: "work" | "personal" | "thesis";
  summary: LocalizedText;
  contributions: LocalizedText[];
  technologies: string[];
  location?: LocalizedText;
  href?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "SmoothScroll",
    role: { en: "Desktop utility", vi: "Tiện ích desktop" },
    period: { en: "May 2026–Present", vi: "Tháng 5/2026–nay" },
    type: "personal",
    summary: {
      en: "Cross-platform desktop utility for smoother mouse-wheel scrolling.",
      vi: "Tiện ích desktop đa nền tảng giúp thao tác cuộn chuột mượt mà hơn.",
    },
    contributions: [
      {
        en: "Built native input interception and a custom easing engine in Rust.",
        vi: "Xây dựng cơ chế bắt sự kiện đầu vào native và bộ easing tùy chỉnh bằng Rust.",
      },
      {
        en: "Added per-app exclusions and a settings interface with live configuration.",
        vi: "Thêm danh sách loại trừ theo ứng dụng và giao diện cài đặt cập nhật trực tiếp.",
      },
    ],
    technologies: ["Rust", "Tauri 2", "React", "TypeScript"],
    href: "https://github.com/quangtruong2003/SmoothScroll",
  },
  {
    company: "C3TEK Digital Marketing Solutions",
    role: { en: "PHP Developer", vi: "Lập trình viên PHP" },
    period: { en: "Feb 2025–Apr 2026", vi: "Tháng 2/2025–4/2026" },
    type: "work",
    summary: {
      en: "Full-time role on a property management platform for managers and rental owners.",
      vi: "Vai trò toàn thời gian trong dự án nền tảng quản lý bất động sản cho quản lý và chủ nhà.",
    },
    contributions: [
      {
        en: "Built Laravel APIs and contract lifecycle workflows, including creation, termination, and tracking.",
        vi: "Phát triển API Laravel và quy trình hợp đồng, từ khởi tạo, kết thúc đến theo dõi vòng đời.",
      },
      {
        en: "Automated monthly invoices and utility calculations, with access control across four roles.",
        vi: "Tự động hóa hóa đơn hằng tháng, tính phí tiện ích và phân quyền cho bốn vai trò người dùng.",
      },
    ],
    technologies: ["Laravel 12", "PHP 8+", "MySQL", "Filament", "RBAC", "PDF"],
    location: { en: "District 10, Ho Chi Minh City", vi: "Quận 10, TP. Hồ Chí Minh" },
  },
  {
    company: "Medical Appointment Booking System",
    role: { en: "Backend developer · Thesis", vi: "Lập trình backend · Đồ án" },
    period: { en: "May–Aug 2025", vi: "Tháng 5–8/2025" },
    type: "thesis",
    summary: {
      en: "Full-stack healthcare booking system with patient records and a service catalog.",
      vi: "Hệ thống đặt lịch khám với hồ sơ bệnh nhân và danh mục dịch vụ y tế.",
    },
    contributions: [
      {
        en: "Designed booking flows and backend APIs for appointments and patient records.",
        vi: "Thiết kế luồng đặt lịch và API backend cho cuộc hẹn, hồ sơ bệnh nhân.",
      },
      {
        en: "Integrated VNPay and coordinated API documentation and system testing with a frontend developer.",
        vi: "Tích hợp VNPay, phối hợp tài liệu API và kiểm thử hệ thống cùng lập trình viên frontend.",
      },
    ],
    technologies: ["Spring Boot", "React", "MySQL", "VNPay", "JWT"],
    href: "https://github.com/quangtruong2003/luanvan-fullstack",
  },
  {
    company: "ChatBot",
    role: { en: "Android developer · Personal project", vi: "Lập trình Android · Dự án cá nhân" },
    period: { en: "Oct 2024–Mar 2025", vi: "Tháng 10/2024–3/2025" },
    type: "personal",
    summary: {
      en: "Android conversational AI app built with Kotlin and Firebase.",
      vi: "Ứng dụng hội thoại AI trên Android, xây dựng bằng Kotlin và Firebase.",
    },
    contributions: [
      {
        en: "Implemented real-time data sync, user activity tracking, and cloud conversation history.",
        vi: "Triển khai đồng bộ dữ liệu trực tiếp, theo dõi hoạt động và lưu lịch sử trò chuyện trên cloud.",
      },
      {
        en: "Refined the mobile UI and API handling for a responsive chat experience.",
        vi: "Cải thiện giao diện di động và xử lý API để trải nghiệm trò chuyện phản hồi tốt hơn.",
      },
    ],
    technologies: ["Kotlin", "Firebase", "Android SDK"],
    href: "https://github.com/quangtruong2003/ChatBot",
  },
];

export default function ExperienceSection() {
  const { dictionary, language } = useLanguage();
  const text = dictionary.experience;

  return (
    <SectionWrapper id="experience" py="xl">
      <SectionTitle eyebrow={text.eyebrow} title={text.title} subtitle={text.subtitle} />
      <div className="border-t border-border-warm">
        {experiences.map((item) => (
          <FadeIn key={item.company}>
            <article className="grid grid-cols-1 gap-4 border-b border-border-warm py-7 md:grid-cols-12 md:gap-6 md:py-9">
              <p className="font-mono text-xs leading-relaxed text-olive-gray md:col-span-2 md:pt-1">
                {item.period[language]}
                {item.location && <span className="mt-2 block">{item.location[language]}</span>}
              </p>
              <div className="md:col-span-4">
                <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-olive-gray">
                  {item.type === "work" ? text.work : item.type === "thesis" ? text.thesis : text.project}
                </p>
                <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-near-black">
                  {item.company}
                </h3>
                <p className="mt-2 text-sm text-terracotta">{item.role[language]}</p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
                  >
                    {text.viewSource}
                    <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only">: {item.company}</span>
                  </a>
                )}
              </div>
              <div className="md:col-span-6">
                <p className="text-sm leading-relaxed text-charcoal-warm">{item.summary[language]}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-olive-gray">
                  {item.contributions.map((contribution) => (
                    <li key={contribution.en} className="flex gap-3">
                      <span className="mt-[0.65em] h-1 w-1 shrink-0 bg-terracotta" aria-hidden="true" />
                      <span>{contribution[language]}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[0.68rem] leading-relaxed text-olive-gray">
                  {item.technologies.join(" · ")}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
