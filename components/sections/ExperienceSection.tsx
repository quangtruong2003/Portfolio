"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";

type LocalizedText = Record<"vi" | "en", string>;

const experience = [
  {
    company: "Penalty Co., Ltd.",
    role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
    period: { en: "Apr–Sep 2026", vi: "Tháng 4–9/2026" },
    summary: {
      en: "Maintained internal PHP/Laravel applications and improved performance and maintainability.",
      vi: "Bảo trì ứng dụng PHP/Laravel nội bộ, tập trung vào hiệu năng và khả năng bảo trì.",
    },
    contributions: [
      {
        en: "Built a bulk product upload flow integrated with WordPress inventory.",
        vi: "Xây dựng luồng tải sản phẩm hàng loạt, tích hợp với tồn kho WordPress.",
      },
      {
        en: "Optimized database queries and backend processing for large imports.",
        vi: "Tối ưu truy vấn cơ sở dữ liệu và xử lý backend cho các đợt nhập dữ liệu lớn.",
      },
    ],
    technologies: ["PHP 8+", "Laravel", "WordPress", "MySQL"],
  },
  {
    company: "C3TEK Digital Marketing Solutions",
    role: { en: "PHP Developer", vi: "Lập trình viên PHP" },
    period: { en: "Feb 2025–Apr 2026", vi: "Tháng 2/2025–4/2026" },
    summary: {
      en: "Worked on a property management platform for managers and rental owners.",
      vi: "Phát triển nền tảng quản lý bất động sản cho quản lý và chủ nhà.",
    },
    contributions: [
      {
        en: "Built Laravel APIs and contract lifecycle workflows.",
        vi: "Xây dựng API Laravel và quy trình vòng đời hợp đồng.",
      },
      {
        en: "Moved invoice and tiered utility calculations to queues; applied access control across four roles.",
        vi: "Chuyển việc lập hóa đơn và tính phí tiện ích theo bậc sang queues; phân quyền bốn vai trò.",
      },
      {
        en: "Fixed N+1 queries with eager loading, composite indexes, and Redis; added PDF exports.",
        vi: "Xử lý N+1 bằng eager loading, composite index và Redis; bổ sung xuất PDF.",
      },
    ],
    technologies: ["Laravel 12", "PHP 8+", "MySQL", "Redis", "RBAC"],
  },
] satisfies Array<{
  company: string;
  role: LocalizedText;
  period: LocalizedText;
  summary: LocalizedText;
  contributions: LocalizedText[];
  technologies: string[];
}>;

export default function ExperienceSection() {
  const { dictionary, language } = useLanguage();
  const text = dictionary.experience;

  return (
    <SectionWrapper id="experience" py="xl">
      <SectionTitle eyebrow={text.eyebrow} title={text.title} subtitle={text.subtitle} />
      <div>
        {experience.map((item) => (
          <article className="experience-item" key={item.company}>
            <p className="font-mono text-xs leading-relaxed text-olive-gray">{item.period[language]}</p>
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.07em] text-olive-gray">{text.work}</p>
              <h3 className="mt-2 font-serif text-2xl leading-tight tracking-[-0.02em] text-near-black">
                {item.company}
              </h3>
              <p className="mt-2 text-sm text-terracotta">{item.role[language]}</p>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-charcoal-warm">{item.summary[language]}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-olive-gray marker:text-terracotta">
                {item.contributions.map((contribution) => (
                  <li key={contribution.en}>{contribution[language]}</li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[0.68rem] leading-relaxed text-olive-gray">
                {item.technologies.join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
