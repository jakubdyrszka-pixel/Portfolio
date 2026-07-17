"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Sparkles, Download } from "lucide-react";
import { PhysioNotesLandingClient } from "@/components/physionotes/PhysioNotesLandingClient";

export function PhysioNotesHero() {
  return (
    <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-24 lg:pb-36 overflow-hidden">
      {/* Subtle Background Glow for Depth (Arc / Vercel style) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-emerald-500/10 via-emerald-400/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-sm text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-8 transition duration-300 hover:border-neutral-300 dark:hover:border-neutral-700">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Suwerenna Elektroniczna Dokumentacja Medyczna</span>
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            Zero-Cloud
          </span>
        </div>

        {/* Strong Headline (56-72 px) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#111111] dark:text-white sm:leading-[1.08] max-w-4xl mx-auto">
          Suwerenna dokumentacja medyczna. Wywiad SOAP w 60 sekund.
        </h1>

        {/* One sentence explaining the product (18 px) */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Natywna aplikacja desktopowa dla fizjoterapeutów. Pełna kontrola i prywatność danych pacjentów dzięki lokalnej architekturze bazy danych, szyfrowaniu AES-256-GCM oraz natychmiastowej responsywności interfejsu.
        </p>

        {/* Two CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#download"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#111111] font-medium text-base shadow-[0_4px_25px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.35)] transition-all duration-200 hover:scale-[1.02]"
          >
            <Download className="h-5 w-5" />
            <span>Pobierz instalator</span>
            <ArrowRight className="h-4 w-4 opacity-80" />
          </a>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 text-[#111111] dark:text-white font-medium text-base shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700"
          >
            <Sparkles className="h-4.5 w-4.5 text-emerald-500" />
            <span>Architektura kliniczna</span>
          </a>
        </div>

        {/* Technical trust badges floating gently below CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            macOS (Apple Silicon M1–M4 &amp; Intel)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Windows 10 / 11 (64-bit)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Szyfrowanie AES-256-GCM
          </span>
        </div>
      </div>

      {/* Download & License Portal embedded directly in place of the first photo */}
      <div className="mt-14 sm:mt-18 lg:mt-22 max-w-6xl mx-auto px-4 sm:px-6">
        <PhysioNotesLandingClient />
      </div>
    </section>
  );
}
