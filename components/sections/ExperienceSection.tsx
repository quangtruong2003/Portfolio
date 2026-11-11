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
    role: { en: "Windows desktop utility", vi: "Tiện ích desktop Windows" },
    period: { en: "May 2026–Present", vi: "Tháng 5/2026–nay" },
    type: "personal",
    summary: {
      en: "Open-source Windows mouse-wheel utility with more than 30,000 downloads.",
      vi: "Tiện ích chuột Windows mã nguồn mở với hơn 30.000 lượt tải.",
    },
    contributions: [
      {
        en: "Built low-level input hooks and a custom scrolling animation engine in Rust.",
        vi: "Xây dựng input hook mức thấp và bộ animation cuộn tùy chỉnh bằng Rust.",
      },
      {
        en: "Added per-app exclusions and maintained the project through GitHub issues and community feedback.",
        vi: "Thêm danh sách loại trừ theo ứng dụng, xử lý issue và tiếp nhận phản hồi từ cộng đồng.",
      },
    ],
    technologies: ["Rust", "Tauri 2", "React", "TypeScript"],
    href: "https://github.com/quangtruong2003/SmoothScroll",
  },
  {
    company: "Penalty Co., Ltd.",
    role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
    period: { en: "Apr–Sep 2026", vi: "Tháng 4–9/2026" },
    type: "work",
    summary: {
      en: "Maintained and upgraded internal PHP/Laravel applications, focusing on performance and maintainability.",
      vi: "Bảo trì và nâng cấp ứng dụng PHP/Laravel nội bộ, tập trung vào hiệu năng và khả năng bảo trì.",
    },
    contributions: [
      {
        en: "Modernized administrative UI and workflows, and built a bulk product upload flow integrated with WordPress inventory.",
        vi: "Hiện đại hóa giao diện quản trị và xây dựng luồng tải sản phẩm hàng loạt, đồng bộ tồn kho với WordPress.",
      },
      {
        en: "Optimized database queries and backend processing for large imports.",
        vi: "Tối ưu truy vấn cơ sở dữ liệu và xử lý backend cho các đợt nhập dữ liệu lớn.",
      },
    ],
    technologies: ["PHP 8+", "Laravel", "WordPress", "MySQL"],
    location: { en: "District 10, Ho Chi Minh City", vi: "Quận 10, TP. Hồ Chí Minh" },
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
        en: "Moved invoice generation and tiered utility calculations to Laravel queues and background jobs; implemented access control across four roles.",
        vi: "Chuyển việc lập hóa đơn và tính phí tiện ích theo bậc sang Laravel Queues và background jobs; triển khai phân quyền bốn vai trò.",
      },
      {
        en: "Fixed N+1 queries with eager loading, composite indexes, and Redis caching; added PDF export for contracts and billing statements.",
        vi: "Xử lý truy vấn N+1 bằng eager loading, composite index và Redis; bổ sung xuất PDF cho hợp đồng và hóa đơn.",
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
