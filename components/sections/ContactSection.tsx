"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useLanguage } from "@/i18n/LanguageContext";

const EMAIL = "nguyentruongk530042003@gmail.com";

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
        subject: `Portfolio message from ${form.name}`,
        body: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
      });
      window.location.href = `mailto:${EMAIL}?${query.toString()}`;
      setMailFallback(true);
      setSubmitting(false);
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
      window.setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" py="xl">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionTitle eyebrow={text.eyebrow} title={text.title} subtitle={text.subtitle} />
          <address className="not-italic">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-11 items-center gap-2 break-all text-base font-medium text-near-black underline decoration-border-warm underline-offset-4 transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue"
            >
              <Mail size={16} aria-hidden="true" />
              {EMAIL}
            </a>
            <p className="mt-5 flex items-center gap-2 text-sm text-olive-gray">
              <Phone size={15} aria-hidden="true" />
              <a className="min-h-10 content-center hover:text-terracotta" href="tel:+84947890450">(094) 789 0450</a>
            </p>
            <p className="mt-3 font-mono text-xs text-olive-gray">{text.location}: {dictionary.hero.location}</p>
          </address>

          <p className="mt-7 border-t border-border-warm pt-4 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-olive-gray">{text.orFind}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a className="inline-flex min-h-11 items-center gap-2 text-sm text-near-black transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue" href="https://github.com/quangtruong2003" target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={16} aria-hidden="true" /> {text.github} <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-11 items-center gap-2 text-sm text-near-black transition-colors duration-200 hover:text-terracotta focus-visible:outline-2 focus-visible:outline-focus-blue" href="https://www.linkedin.com/in/quangtruong2003" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon size={16} aria-hidden="true" /> {text.linkedin} <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <h3 className="mb-6 font-serif text-2xl text-near-black">{text.sendMessage}</h3>

          {submitted ? (
            <div className="border-y border-border-warm py-6" role="status" aria-live="polite">
              <p className="font-serif text-xl text-near-black">{text.sent}</p>
              <p className="mt-2 text-sm leading-relaxed text-olive-gray">{text.sentMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-busy={submitting} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InputField label={text.nameLabel} name="name" value={form.name} onChange={handleChange} placeholder={text.namePlaceholder} required />
                <InputField label={text.emailLabel} name="email" type="email" value={form.email} onChange={handleChange} placeholder={text.emailPlaceholder} required />
              </div>
              <InputField label={text.messageLabel} name="message" type="text-area" value={form.message} onChange={handleChange} placeholder={text.messagePlaceholder} rows={5} required />

              {error && <p role="alert" className="text-sm leading-relaxed text-error-crimson">{text.sendError}</p>}
              {mailFallback && <p role="status" aria-live="polite" className="text-sm leading-relaxed text-olive-gray">{text.mailFallback}</p>}

              <div className="flex justify-start pt-1">
                <Button type="submit" variant="terracotta" icon={Send} loading={submitting}>
                  {submitting ? text.sending : text.sendMessage}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
