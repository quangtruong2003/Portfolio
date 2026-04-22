"use client";

import React from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/animations/FadeIn";
import TechBadge from "@/components/ui/TechBadge";
import { useLanguage } from "@/i18n/LanguageContext";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  locationKey: string;
  type: "work" | "project";
  descriptionKey: string;
  bullets: string[];
  technologies: string[];
  link?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "C3TEK Digital Marketing Solutions",
    role: "Junior PHP Developer",
    period: "Feb 2025 — Present",
    locationKey: "exp_c3tek_loc",
    type: "work",
    descriptionKey: "exp_c3tek_desc",
    bullets: [
      "Engineered RESTful APIs and backend logic using Laravel 12 and PHP 8+ for contract management, enabling seamless creation, termination, and lifecycle tracking of rental agreements.",
      "Automated monthly invoice generation and complex utility fee calculations (electricity, water), reducing manual data entry for property managers.",
      "Designed and optimized MySQL database schemas using Eloquent ORM relationships, ensuring high-performance data retrieval and structural integrity.",
      "Implemented strict Role-Based Access Control (RBAC) across a 4-tier user architecture (Owner, Admin, Manager, Sale) to secure sensitive system data.",
      "Integrated automated PDF generation and export capabilities for contracts and invoices, streamlining document management workflows.",
      "Collaborated within an agile 6-member cross-functional team delivering a scalable platform with online room booking and integrated payment tracking.",
    ],
    technologies: ["Laravel 12", "PHP 8+", "MySQL", "Filament", "RESTful API", "Eloquent ORM", "RBAC", "PDF Generation"],
  },
  {
    company: "Medical Appointment Booking System",
    role: "Backend Developer — Thesis Project",
    period: "May 2025 — Aug 2025",
    locationKey: "exp_medical_loc",
    type: "project",
    descriptionKey: "exp_medical_desc",
    bullets: [
      "Engineered RESTful APIs using Spring Boot to drive appointment scheduling, user account management, and medical service catalogs.",
      "Implemented secure authentication using Clerk for user sign-in and Spring Security with JWT for strict API authorization.",
      "Integrated VNPay payment gateway for secure, real-time online financial transactions for medical bookings.",
      "Architected and managed scalable MySQL database schemas for patient records and appointment lifecycles.",
      "Collaborated directly with a frontend developer in a fast-paced 2-person agile environment to deliver a fully functional web application.",
    ],
    technologies: ["Spring Boot", "React", "Clerk", "Spring Security", "JWT", "VNPay", "MySQL", "RESTful API"],
    link: "https://github.com/quangtruong2003/luanvan-fullstack",
  },
  {
    company: "ChatBot (ChatGPT Clone)",
    role: "Android Developer — Personal Project",
    period: "Oct 2024 — Mar 2025",
    locationKey: "exp_chatbot_loc",
    type: "project",
    descriptionKey: "exp_chatbot_desc",
    bullets: [
      "Developed an Android conversational AI application using Kotlin, replicating core interactive features of ChatGPT.",
      "Integrated Firebase as a Backend-as-a-Service (BaaS) to manage real-time data synchronization, user interactions, and cloud storage.",
      "Optimized mobile UI and API response handling to ensure smooth, low-latency conversational experiences on Android devices.",
    ],
    technologies: ["Kotlin", "Firebase", "Android SDK", "RESTful API", "Google Generative AI"],
    link: "https://github.com/quangtruong2003/ChatBot",
  },
];

export default function ExperienceSection() {
  const { dictionary, language } = useLanguage();
  const { experience: t } = dictionary;

  const getText = (key: string) => {
    const val = (dictionary as unknown as Record<string, unknown>)[key];
    if (typeof val === "string") return val;
    if (typeof val === "object" && val !== null && "vi" in val) {
      return (val as Record<"vi" | "en", string>)[language];
    }
    return key;
  };

  const getDescription = (key: string) => {
    const val = (dictionary as unknown as Record<string, unknown>)[key];
    if (typeof val === "object" && val !== null && "vi" in val) {
      return (val as Record<"vi" | "en", string>)[language];
    }
    return key;
  };

  return (
    <SectionWrapper id="experience" theme="dark" py="xl">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-terracotta/4 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-16 max-w-4xl">
        {/* Header */}
        <FadeIn>
          <SectionTitle
            eyebrow={t.eyebrow}
            title={t.title}
            theme="dark"
            subtitle={t.subtitle}
          />
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="
              absolute left-[11px] md:left-[13px] top-0 bottom-0 w-px
              bg-gradient-to-b from-terracotta/50 via-terracotta/30 to-transparent
            "
            aria-hidden="true"
          />

          {/* Items */}
          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.company} delay={i * 0.12} direction="left">
                <div className="relative flex gap-6 md:gap-8">
                  {/* Timeline node */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="
                        w-6 h-6 rounded-full
                        bg-terracotta
                        border-2 border-near-black
                        shadow-[0_0_0_2px_#c96442]
                        flex items-center justify-center
                        mt-1.5
                      "
                      aria-hidden="true"
                    >
                      <div className="w-2 h-2 rounded-full bg-ivory" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 pb-2">
                    <div
                      className="
                        bg-dark-surface border border-[#30302e]
                        rounded-[16px] p-6 md:p-8
                        hover:border-terracotta/30 transition-colors duration-300
                      "
                    >
                      {/* Header */}
                      <div className="flex flex-col gap-3 mb-5">
                        {/* Type tag */}
                        <span
                          className={`
                            inline-block self-start
                            px-2.5 py-0.5 rounded-full text-xs font-medium font-sans
                            ${exp.type === "work"
                              ? "bg-terracotta/15 text-coral border border-terracotta/20"
                              : "bg-warm-sand/10 text-warm-silver border border-[#30302e]"
                            }
                          `}
                        >
                          {exp.type === "work" ? t.work : t.project}
                        </span>

                        <div className="flex flex-col gap-1">
                          <h3 className="font-serif font-medium text-lg text-ivory leading-tight">
                            {exp.company}
                          </h3>
                          <p className="font-sans text-sm font-medium text-terracotta">
                            {exp.role}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-gray font-sans">
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                            {exp.period}
                          </span>
                          <span className="text-[#30302e]">|</span>
                          <span>{getText(exp.locationKey)}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-sm leading-relaxed text-warm-silver mb-5">
                        {getDescription(exp.descriptionKey)}
                      </p>

                      {/* Bullet points */}
                      <ul className="flex flex-col gap-2.5 mb-5">
                        {exp.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 font-sans text-sm text-warm-silver/85"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta/60 flex-shrink-0" aria-hidden="true" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <TechBadge key={tech} label={tech} variant="dark" size="sm" />
                        ))}
                      </div>

                      {/* Link */}
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex items-center gap-2 mt-4
                            font-sans text-sm font-medium
                            text-terracotta hover:text-coral
                            transition-colors duration-200
                          "
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                          View on GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
