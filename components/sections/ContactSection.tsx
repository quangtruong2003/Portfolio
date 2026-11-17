"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { OWNER_INFO } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ContactSection() {
  const { dictionary } = useLanguage();
  const text = dictionary.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mailFallback, setMailFallback] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(false);
    setMailFallback(false);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const query = new URLSearchParams({
        subject: "Portfolio inquiry from " + form.name,
        body: "Name: " + form.name + "\nEmail: " + form.email + "\n\nMessage:\n" + form.message,
      });
      setMailFallback(true);
      setSubmitting(false);
      window.location.href = `mailto:${OWNER_INFO.email}?${query.toString()}`;
      return;
    }

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: form.name, from_email: form.email, message: form.message },
        publicKey
      );
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="site-container">
        <SectionTitle
          title={text.title}
          subtitle={text.subtitle}
          asideMeta="HCMC · VN"
        />

        <div className="paper-stack paper-chamfer p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Direct Correspondence Channels */}
            <div className="flex flex-col justify-between border-b border-[var(--rule-cut)] pb-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
              <address className="space-y-4 not-italic">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.05em] text-[var(--ink-tertiary)]">
                    {text.email}
                  </p>
                  <a
                    href={`mailto:${OWNER_INFO.email}`}
                    className="link-draw mt-1 inline-flex min-h-11 items-center gap-2.5 break-words font-sans text-sm font-medium text-[var(--ink-primary)] hover:text-[var(--accent-vermilion)] sm:text-base"
                  >
                    <Mail size={16} className="shrink-0 text-[var(--accent-vermilion)]" aria-hidden="true" />
                    <span>{OWNER_INFO.email}</span>
                  </a>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.05em] text-[var(--ink-tertiary)]">
                    {text.phone}
                  </p>
                  <a
                    href={OWNER_INFO.phoneHref}
                    className="link-draw mt-1 inline-flex min-h-11 items-center gap-2.5 font-mono text-sm font-medium text-[var(--ink-primary)] tabular-nums hover:text-[var(--accent-vermilion)]"
                  >
                    <Phone size={15} className="shrink-0 text-[var(--accent-patina)]" aria-hidden="true" />
                    <span>{OWNER_INFO.phoneDisplay}</span>
                  </a>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.05em] text-[var(--ink-tertiary)]">
                    {text.location}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-2.5 text-sm text-[var(--ink-secondary)]">
                    <MapPin size={15} className="shrink-0 text-[var(--ink-tertiary)]" aria-hidden="true" />
                    <span>{dictionary.hero.location}</span>
                  </p>
                </div>
              </address>

              <div className="mt-8 border-t border-[var(--rule-cut)] pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.05em] text-[var(--ink-tertiary)]">
                  {text.orFind}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={OWNER_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-canvas)] px-3.5 text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
                  >
                    <GitHubIcon size={16} aria-hidden="true" />
                    <span>{text.github}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <a
                    href={OWNER_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-canvas)] px-3.5 text-sm font-medium text-[var(--ink-primary)] transition-[border-color,color,transform] duration-150 hover:border-[var(--accent-vermilion)] hover:text-[var(--accent-vermilion)] active:scale-[0.97]"
                  >
                    <LinkedInIcon size={16} aria-hidden="true" />
                    <span>{text.linkedin}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Stamped Dispatch Form */}
            <div className="lg:col-span-7">
              <h3 className="mb-6 font-serif text-2xl font-medium text-[var(--ink-primary)]">
                {text.sendMessage}
              </h3>

              {submitted ? (
                <div
                  className="paper-well flex flex-col items-start gap-4 rounded-[4px] p-6"
                  role="status"
                  aria-live="polite"
                >
                  <div className="inline-flex items-center gap-2 rounded-[2px] bg-[var(--accent-patina-wash)] px-3 py-1 font-mono text-xs font-medium text-[var(--accent-patina)]">
                    <CheckCircle2 size={15} aria-hidden="true" />
                    <span>{text.sent}</span>
                  </div>
                  <p className="text-base leading-relaxed text-[var(--ink-primary)]">
                    {text.sentMessage}
                  </p>
                  <Button
                    type="button"
                    variant="paper"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                  >
                    {text.sendAnother}
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  aria-busy={submitting}
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <InputField
                      label={text.nameLabel}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={text.namePlaceholder}
                      required
                    />
                    <InputField
                      label={text.emailLabel}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={text.emailPlaceholder}
                      required
                    />
                  </div>

                  <InputField
                    label={text.messageLabel}
                    name="message"
                    type="text-area"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={text.messagePlaceholder}
                    rows={5}
                    required
                  />

                  {error && (
                    <p
                      role="alert"
                      className="rounded-[3px] border border-[var(--error-crimson)]/40 bg-[var(--accent-vermilion-wash)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--error-crimson)]"
                    >
                      {text.sendError}
                    </p>
                  )}

                  {mailFallback && (
                    <p
                      role="status"
                      aria-live="polite"
                      className="rounded-[3px] border border-[var(--rule-strong)] bg-[var(--bg-canvas)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--ink-secondary)]"
                    >
                      {text.mailFallback}
                    </p>
                  )}

                  <div className="flex justify-start pt-1">
                    <Button type="submit" variant="vermilion" icon={Send} loading={submitting}>
                      {submitting ? text.sending : text.sendMessage}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
