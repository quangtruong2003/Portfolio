"use client";

import React, { useState } from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeIn from "@/components/animations/FadeIn";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { Mail, Phone, Send, MapPin, ExternalLink, CircleUser } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ContactSection() {
  const { dictionary } = useLanguage();
  const { contact: t } = dictionary;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <SectionWrapper id="contact" theme="dark" py="xl">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-terracotta/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <FadeIn>
          <SectionTitle
            eyebrow={t.eyebrow}
            title={t.title}
            theme="dark"
            subtitle={t.subtitle}
          />
        </FadeIn>

        {/* Contact Links */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Mail,
                labelKey: "email" as const,
                value: "nguyentruongk530042003@gmail.com",
                href: "mailto:nguyentruongk530042003@gmail.com",
                color: "#c96442",
              },
              {
                icon: Phone,
                labelKey: "phone" as const,
                value: "(094) 789 0450",
                href: "tel:+84947890450",
                color: "#d97757",
              },
              {
                icon: CircleUser,
                labelKey: "linkedin" as const,
                value: "quangtruong2003",
                href: "https://www.linkedin.com/in/quangtruong2003",
                color: "#0A66C2",
              },
              {
                icon: ExternalLink,
                labelKey: "github" as const,
                value: "quangtruong2003",
                href: "https://github.com/quangtruong2003",
                color: "#24292f",
              },
              {
                icon: MapPin,
                labelKey: "location" as const,
                value: "Binh Thanh, Ho Chi Minh City",
                href: null,
                color: "#87867f",
              },
            ].map(({ icon: Icon, labelKey, value, href, color }) => (
              <div
                key={labelKey}
                className="
                  bg-dark-surface border border-[#30302e]
                  rounded-[16px] p-4
                  flex items-center gap-4
                  hover:border-[#3d3d3a] transition-colors duration-300
                "
              >
                <div
                  className="
                    w-10 h-10 rounded-[10px] flex items-center justify-center
                    flex-shrink-0
                  "
                  style={{
                    backgroundColor: `${color}15`,
                    color: color === "#24292f" ? "#f0eee6" : color === "#0A66C2" ? "#70B5F9" : color,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-sans text-xs text-stone-gray">{t[labelKey]}</span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="
                        font-sans text-sm font-medium text-warm-silver
                        hover:text-ivory transition-colors duration-200
                        truncate
                      "
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-sans text-sm font-medium text-warm-silver truncate">
                      {value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Contact Form */}
        <FadeIn delay={0.2}>
          <div
            className="
              bg-dark-surface border border-[#30302e]
              rounded-[20px] p-6 md:p-8
            "
          >
            <h3 className="font-serif font-medium text-xl text-ivory mb-6">
              {t.sendMessage}
            </h3>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div
                  className="
                    w-14 h-14 rounded-full bg-terracotta/15
                    flex items-center justify-center
                  "
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c96442" strokeWidth="2" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <p className="font-serif font-medium text-lg text-ivory">{t.sent}</p>
                  <p className="font-sans text-sm text-warm-silver mt-1">
                    {t.sentMessage}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label={t.nameLabel}
                    type="text"
                    placeholder={t.namePlaceholder}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label={t.emailLabel}
                    type="email"
                    placeholder={t.emailPlaceholder}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <InputField
                  label={t.messageLabel}
                  type="text-area"
                  placeholder={t.messagePlaceholder}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    variant="terracotta"
                    size="lg"
                    icon={Send}
                    loading={submitting}
                  >
                    {submitting ? t.sending : t.sendMessage}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </FadeIn>

        {/* Social Row */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-sans text-xs text-stone-gray uppercase tracking-widest">
              {t.orFind}
            </p>
            <div className="flex items-center gap-5">
              {[
                { icon: ExternalLink, href: "https://github.com/quangtruong2003", label: "GitHub" },
                { icon: CircleUser, href: "https://www.linkedin.com/in/quangtruong2003", label: "LinkedIn" },
                { icon: Mail, href: "mailto:nguyentruongk530042003@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    w-10 h-10 rounded-full
                    bg-dark-surface border border-[#30302e]
                    flex items-center justify-center
                    text-stone-gray
                    hover:text-terracotta hover:border-terracotta/30
                    transition-all duration-200
                    hover:-translate-y-0.5
                  "
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
