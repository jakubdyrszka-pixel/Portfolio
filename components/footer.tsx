import Link from "next/link";
import { Github, Mail, FileText, Instagram } from "lucide-react";
import { dictionary, type Locale } from "@/lib/i18n";
import { CookieBannerTrigger } from "@/components/cookie-banner";

type FooterProps = {
  locale?: Locale;
};

export function Footer({ locale = "pl" }: FooterProps) {
  const t = dictionary[locale];

  return (
    <footer className="border-t border-border px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            Designed and architected by{" "}
            <span className="font-medium text-ink">Jakub Dyrszka</span>.
            {" "}Built with AI, systems logic, Next.js and Tailwind.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:jakub.dyrszka@gmail.com"
              aria-label="Email"
              className="text-muted transition-colors hover:text-ink"
            >
              <Mail size={16} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/jakubdyrszka-pixel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-ink"
            >
              <Github size={16} aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com/pwrlft.kubus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted transition-colors hover:text-ink"
            >
              <Instagram size={16} aria-hidden="true" />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume PDF"
              className="text-muted transition-colors hover:text-ink"
            >
              <FileText size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-border/60 pt-4 text-xs font-medium text-muted">
          <Link href={`/${locale}/privacy`} className="transition-colors hover:text-ink">
            {t.legal.privacy}
          </Link>
          <span className="text-border">•</span>
          <Link href={`/${locale}/terms`} className="transition-colors hover:text-ink">
            {t.legal.terms}
          </Link>
          <span className="text-border">•</span>
          <CookieBannerTrigger label={t.legal.cookies} />
          <span className="ml-auto hidden text-muted/60 sm:inline-block">
            © {new Date().getFullYear()} Jakub Dyrszka // All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
