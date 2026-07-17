import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { PhysioNotesHero } from "@/components/physionotes/PhysioNotesHero";
import { PhysioNotesTrust } from "@/components/physionotes/PhysioNotesTrust";
import { PhysioNotesShowcase } from "@/components/physionotes/PhysioNotesShowcase";
import { PhysioNotesWorkflow } from "@/components/physionotes/PhysioNotesWorkflow";
import { PhysioNotesFAQ } from "@/components/physionotes/PhysioNotesFAQ";
import { ArrowRight, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "PhysioNotes V2.0 | Nowoczesna Elektroniczna Dokumentacja Medyczna",
  description:
    "Nowoczesna, natywna aplikacja desktopowa dla fizjoterapeutów z lokalnym szyfrowaniem bazy danych AES-256-GCM, 7-sekcyjnym wywiadem SOAP oraz pełną zgodnością RODO jako ADO.",
};

export default function PhysioNotesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-[#111111] dark:text-white selection:bg-emerald-500 selection:text-[#111111] font-sans">
      {/* Sleek Glassmorphic Header (Linear / Arc / Vercel style) */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-neutral-800/60 transition-colors">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/pl" className="flex items-center gap-2.5 group">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
              <span className="font-semibold text-sm sm:text-base tracking-tight text-[#111111] dark:text-white">
                PhysioNotes <span className="text-emerald-600 dark:text-emerald-400 font-medium">V2.0</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              <a href="#showcase" className="hover:text-[#111111] dark:hover:text-white transition">Możliwości</a>
              <a href="#faq" className="hover:text-[#111111] dark:hover:text-white transition">FAQ</a>
              <a href="#download" className="hover:text-[#111111] dark:hover:text-white transition">Pobierz</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/pl/projects" 
              className="text-xs sm:text-sm text-neutral-500 hover:text-[#111111] dark:text-neutral-400 dark:hover:text-white transition font-medium hidden sm:inline-block"
            >
              ← Portfolio
            </Link>
            
            <a
              href="#download"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs sm:text-sm font-medium shadow-sm transition-all duration-200"
            >
              <Download className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
              <span>Pobierz Mac/Win</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Sections (Pure Modern SaaS Design Language) */}
      <main>
        {/* 1. Hero */}
        <PhysioNotesHero />

        {/* 2. Zaufanie (Zero Cloud / AES-256 / Offline / EDM) */}
        <PhysioNotesTrust />

        {/* 3. Screenshot + korzyści & 5. Kolejne screenshoty */}
        <div className="py-20 sm:py-28 lg:py-36 border-t border-neutral-200/60 dark:border-neutral-800/60">
          <PhysioNotesShowcase />
        </div>

        {/* 4. Jak działa (3 kroki) */}
        <PhysioNotesWorkflow />

        {/* 6. FAQ */}
        <PhysioNotesFAQ />

        {/* 7. Bottom CTA Banner (Linear/Vercel style) */}
        <section className="py-20 sm:py-28 border-t border-neutral-200/60 dark:border-neutral-800/60 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Pracuj Szybciej i Pewniej
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] dark:text-white leading-tight">
              Gotowy na nowoczesną dokumentację medyczną?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              Zrób pierwszy krok do wywiadów SOAP uzupełnianych w niespełna minutę. Brak umów chmurowych i 100% kontroli nad danymi pacjentów.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="#download"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#111111] font-medium text-base shadow-[0_4px_25px_rgba(16,185,129,0.25)] hover:scale-[1.02] transition-all duration-200"
              >
                <Download className="h-5 w-5" />
                <span>Przejdź do pobierania i aktywacji</span>
                <ArrowRight className="h-4 w-4 opacity-80" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer (Linear / Vercel style) */}
      <footer className="py-16 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#111111] text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm font-medium">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>© {new Date().getFullYear()} PhysioNotes V2.0 • Nowoczesne narzędzie EDM dla fizjoterapeutów.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/pl" className="hover:text-[#111111] dark:hover:text-white transition">Strona główna</Link>
            <Link href="/pl/projects" className="hover:text-[#111111] dark:hover:text-white transition">Wszystkie projekty</Link>
            <a 
              href="https://github.com/jakubdyrszka-pixel/PhysioNotes" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1 hover:text-[#111111] dark:hover:text-white transition"
            >
              <span>GitHub Repository</span>
              <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
