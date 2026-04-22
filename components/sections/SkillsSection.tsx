"use client";

import React from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import TechBadge from "@/components/ui/TechBadge";
import FadeIn from "@/components/animations/FadeIn";
import Card from "@/components/ui/Card";
import {
  Server,
  Code2,
  Layout,
  Database,
  Shield,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface SkillCategory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  skills: { name: string; level?: "core" | "familiar" }[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: Server,
    title: "Backend Development",
    description: "Server-side logic, APIs, and database architecture",
    color: "#c96442",
    skills: [
      { name: "PHP", level: "core" },
      { name: "Laravel", level: "core" },
      { name: "Spring Boot", level: "familiar" },
      { name: "RESTful API", level: "core" },
      { name: "OOP & Design Patterns", level: "core" },
    ],
  },
  {
    icon: Database,
    title: "Database & Data",
    description: "Schema design, query optimization, and ORM mastery",
    color: "#d97757",
    skills: [
      { name: "MySQL", level: "core" },
      { name: "Eloquent ORM", level: "core" },
      { name: "Database Design", level: "core" },
      { name: "Query Optimization", level: "familiar" },
    ],
  },
  {
    icon: Code2,
    title: "Frontend & Tools",
    description: "Modern development tools and collaborative workflows",
    color: "#e8a87c",
    skills: [
      { name: "React", level: "familiar" },
      { name: "Git", level: "core" },
      { name: "Cursor / Claude Code", level: "core" },
      { name: "Firebase", level: "familiar" },
    ],
  },
  {
    icon: Layout,
    title: "Admin & UI",
    description: "Admin panels, design systems, and user-facing interfaces",
    color: "#a0522d",
    skills: [
      { name: "Filament", level: "core" },
      { name: "Material Design", level: "familiar" },
      { name: "Blade Templates", level: "core" },
      { name: "Tailwind CSS", level: "familiar" },
    ],
  },
  {
    icon: Shield,
    title: "Security & Auth",
    description: "Authentication, authorization, and secure coding",
    color: "#8b5e3c",
    skills: [
      { name: "RBAC", level: "core" },
      { name: "JWT", level: "core" },
      { name: "Spring Security", level: "familiar" },
      { name: "Clerk Auth", level: "familiar" },
    ],
  },
  {
    icon: Globe,
    title: "Payment & Integration",
    description: "Third-party APIs, payment gateways, and external services",
    color: "#c8764e",
    skills: [
      { name: "VNPay", level: "familiar" },
      { name: "PDF Generation", level: "core" },
      { name: "API Integration", level: "core" },
      { name: "Webhooks", level: "familiar" },
    ],
  },
];

export default function SkillsSection() {
  const { dictionary } = useLanguage();
  const { skills: t } = dictionary;

  return (
    <SectionWrapper id="skills" theme="light" py="xl">
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <FadeIn key={category.title} delay={i * 0.07} direction="up">
              <Card
                variant="ivory"
                padding="none"
                hoverable
                className="h-full overflow-hidden"
              >
                <div className="p-6 flex flex-col gap-5">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        w-11 h-11 rounded-[10px] flex items-center justify-center
                        flex-shrink-0
                      "
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <category.icon
                        size={20}
                        style={{ color: category.color }}
                      />
                    </div>
                    <div>
                      <h3 className="font-serif font-medium text-base text-near-black leading-tight">
                        {category.title}
                      </h3>
                      <p className="font-sans text-xs text-stone-gray mt-0.5 leading-snug">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(({ name, level }) => (
                      <TechBadge
                        key={name}
                        label={name}
                        variant={level === "core" ? "accent" : "light"}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Bottom note */}
        <FadeIn delay={0.4}>
          <div className="text-center">
            <p className="font-sans text-sm text-stone-gray">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-terracotta" />
                {t.coreLabel}
              </span>
              {" · "}
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-warm-sand border border-border-warm" />
                {t.familiarLabel}
              </span>
            </p>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
