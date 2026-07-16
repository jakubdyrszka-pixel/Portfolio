"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";
import { dictionary, type Locale } from "@/lib/i18n";

export function CookieBannerTrigger({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookies-banner"))}
      className="transition-colors hover:text-ink focus:outline-none"
    >
      {label}
    </button>
  );
}

type CookieBannerProps = {
  locale: Locale;
};

export function CookieBanner({ locale }: CookieBannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const t = dictionary[locale]?.cookiesBanner || dictionary.pl.cookiesBanner;

  useEffect(() => {
    setIsMounted(true);
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay initial banner appearance slightly for smooth feel
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }

    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-cookies-banner", handleOpenEvent);
    return () => window.removeEventListener("open-cookies-banner", handleOpenEvent);
  }, []);

  if (!isMounted || !isOpen) return null;

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl animate-in fade-in slide-in-from-bottom-5 duration-300 sm:left-auto sm:right-6">
      <div className="relative rounded-lg border border-ink bg-background/95 p-5 shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close banner"
          className="absolute right-3 top-3 text-muted transition-colors hover:text-ink"
        >
          <X size={16} />
        </button>
        
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-md border border-border bg-surface p-2 text-ink">
            <ShieldCheck size={18} />
          </div>
          <div className="flex-1 pr-6">
            <h3 className="text-sm font-bold tracking-tight text-ink">
              {t.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {t.body}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAccept}
                className="rounded border border-ink bg-ink px-3 py-1.5 text-xs font-semibold text-inverse-ink transition hover:bg-ink/90"
              >
                {t.accept}
              </button>
              <Link
                href={`/${locale}/privacy`}
                onClick={() => setIsOpen(false)}
                className="text-xs font-medium text-muted underline transition hover:text-ink"
              >
                {t.settings}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
