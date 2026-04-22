"use client";

import React from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import TechBadge from "@/components/ui/TechBadge";
import FadeIn from "@/components/animations/FadeIn";
import GlassCard from "@/components/ui/GlassCard";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  role: string;
  type: "work" | "thesis" | "personal";
  github?: string;
  demo?: string;
  highlights: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Property Management Platform",
    subtitle: "C3TEK Digital Marketing Solutions",
    description:
      "Enterprise-grade rental management system with contract lifecycle, automated billing, and role-based access control.",
    longDescription:
      "A comprehensive property management application that handles the full rental lifecycle — from lease creation to contract termination. Features automated invoice generation, complex utility calculations, and strict RBAC across four user roles. Built for scalability and real-world use by property management teams.",
    technologies: ["Laravel 12", "PHP 8+", "MySQL", "Filament", "RESTful API", "Eloquent ORM", "RBAC", "PDF Generation"],
    role: "Backend Developer",
    type: "work",
    github: "https://github.com/quangtruong2003",
    highlights: [
      "RESTful API design",
      "Automated billing",
      "4-tier RBAC system",
      "PDF document generation",
    ],
    featured: true,
  },
  {
    title: "Medical Appointment Booking",
    subtitle: "Thesis Project",
    description:
      "Full-stack medical booking platform with Spring Boot backend, secure payment via VNPay, and JWT-powered authentication.",
    longDescription:
      "An end-to-end appointment booking system for healthcare facilities. Patients can browse doctors, book appointments, and pay online through VNPay integration. Built with Spring Boot for robust backend logic, Clerk for user authentication, and React for a clean patient-facing interface.",
    technologies: ["Spring Boot", "React", "Clerk", "JWT", "VNPay", "MySQL", "RESTful API"],
    role: "Backend Developer",
    type: "thesis",
    github: "https://github.com/quangtruong2003/luanvan-fullstack",
    highlights: [
      "VNPay payment gateway",
      "JWT + Clerk auth",
      "Appointment scheduling",
      "Medical service catalog",
    ],
    featured: true,
  },
  {
    title: "ChatBot (ChatGPT Clone)",
    subtitle: "Android Personal Project",
    description:
      "Android conversational AI app built with Kotlin, replicating ChatGPT's interactive experience with Firebase-powered real-time sync.",
    longDescription:
      "A native Android application that brings conversational AI to mobile devices. Built with Kotlin and Firebase, featuring real-time message synchronization, cloud storage for conversation history, and a polished Material Design UI optimized for smooth, low-latency interactions.",
    technologies: ["Kotlin", "Firebase", "Android SDK", "Material Design", "REST API"],
    role: "Android Developer",
    type: "personal",
    github: "https://github.com/quangtruong2003/ChatBot",
    highlights: [
      "Real-time data sync",
      "Firebase BaaS",
      "Material Design UI",
      "Low-latency streaming",
    ],
    featured: false,
  },
];

export default function ProjectsSection() {
  const { dictionary } = useLanguage();
  const { projects: t } = dictionary;

  return (
    <SectionWrapper id="projects" theme="light" py="xl">
      <div className="flex flex-col gap-16">
        {/* Header */}
        <FadeIn>
          <SectionTitle
            eyebrow={t.eyebrow}
            title={t.title}
            theme="light"
            subtitle={t.subtitle}
          />
        </FadeIn>

        {/* Projects Grid */}
        <div className="flex flex-col gap-8">
          {/* Featured projects (2-column on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.featured)
              .map((project, i) => (
                <FadeIn key={project.title} delay={i * 0.1} direction="up">
                  <ProjectCard project={project} large />
                </FadeIn>
              ))}
          </div>

          {/* Other projects */}
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.1} direction="up">
                <ProjectCard project={project} />
              </FadeIn>
            ))}
        </div>

        {/* GitHub CTA */}
        <FadeIn delay={0.4}>
          <div className="text-center flex flex-col items-center gap-4">
            <p className="font-sans text-sm text-stone-gray">
              {t.seeMore}
            </p>
            <a
              href="https://github.com/quangtruong2003"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-[12px]
                bg-near-black text-ivory
                font-sans text-sm font-medium
                hover:bg-dark-surface
                transition-all duration-200
                hover:-translate-y-0.5
              "
            >
              <ExternalLink size={16} />
              {t.viewAll}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const { language } = useLanguage();
  const typeColors = {
    work: "text-terracotta bg-terracotta/8 border border-terracotta/15",
    thesis: "text-[#d97757] bg-[#d97757]/8 border border-[#d97757]/15",
    personal: "text-[#5e5d59] bg-warm-sand/60 border border-border-warm",
  };

  const typeLabels: Record<string, { vi: string; en: string }> = {
    work: { vi: "Công Việc", en: "Work" },
    thesis: { vi: "Đồ Án", en: "Thesis" },
    personal: { vi: "Cá Nhân", en: "Personal" },
  };

  return (
    <GlassCard
      hoverable
      className={`
        flex flex-col gap-5
        ${large ? "min-h-[320px]" : "min-h-[220px]"}
      `}
    >
      {/* Top: Type + Links */}
      <div className="flex items-center justify-between">
        <span className={`px-2.5 py-1 rounded-full text-xs font-sans font-medium ${typeColors[project.type]}`}>
          {typeLabels[project.type][language]}
        </span>
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="
                text-stone-gray hover:text-near-black
                transition-colors duration-200
              "
            >
              <ExternalLink size={17} />
            </a>
          )}
        </div>
      </div>

      {/* Title + Subtitle */}
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="
              font-serif font-medium leading-tight text-near-black
            "
            style={{ fontSize: large ? "clamp(1.3rem, 2vw, 1.6rem)" : "clamp(1.1rem, 1.5vw, 1.25rem)" }}
          >
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="text-stone-gray flex-shrink-0 mt-1"
          />
        </div>
        <p className="font-sans text-xs text-stone-gray font-medium">
          {project.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="font-sans text-sm leading-relaxed text-olive-gray flex-1">
        {large ? project.longDescription : project.description}
      </p>

      {/* Highlights */}
      {large && (
        <div className="grid grid-cols-2 gap-2">
          {project.highlights.map((h) => (
            <div key={h} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
              <span className="font-sans text-xs text-charcoal-warm">{h}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.technologies.slice(0, large ? 8 : 5).map((tech) => (
          <TechBadge key={tech} label={tech} variant="light" size="sm" />
        ))}
        {project.technologies.length > (large ? 8 : 5) && (
          <span className="font-sans text-xs text-stone-gray px-1 self-center">
            +{project.technologies.length - (large ? 8 : 5)}
          </span>
        )}
      </div>
    </GlassCard>
  );
}
