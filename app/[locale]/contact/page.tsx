import type { Metadata } from "next";
import { FileText, Github, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { dictionary, isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact links for Jakub Dyrszka.",
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = dictionary[locale];

  return (
    <Section eyebrow="CONTACT / DIRECT" title={t.contact.title} className="border-t-0">
      <p className="mb-10 max-w-3xl text-xl leading-8 text-muted">{t.contact.subtitle}</p>
      <div className="flex flex-wrap gap-3">
        <Button href="mailto:jakub.dyrszka@gmail.com" external>
          <Mail size={16} aria-hidden="true" />
          Email
        </Button>
        <Button href="https://github.com/jakubdyrszka-pixel" variant="secondary" external>
          <Github size={16} aria-hidden="true" />
          GitHub
        </Button>
        <Button href="https://instagram.com/pwrlft.kubus" variant="secondary" external>
          <Instagram size={16} aria-hidden="true" />
          Instagram
        </Button>
        <Button href="/cv.pdf" variant="secondary" external>
          <FileText size={16} aria-hidden="true" />
          {t.actions.downloadCv}
        </Button>
      </div>
    </Section>
  );
}
