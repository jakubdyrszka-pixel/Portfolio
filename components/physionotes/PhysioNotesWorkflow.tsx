"use client";

import React from "react";
import { Download, KeyRound, FileCheck2, ArrowRight } from "lucide-react";

interface WorkflowStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  tip: string;
}

const steps: WorkflowStep[] = [
  {
    number: "01",
    title: "Instalacja na stacji roboczej gabinetu",
    subtitle: "Natywna instalacja w 30 sekund",
    description:
      "Pobierz lekki pakiet instalacyjny dla systemu macOS (Apple Silicon M1–M4 / Intel) lub Windows 10/11. Aplikacja zajmuje ~150 MB i nie wymaga konfiguracji infrastruktury serwerowej ani zewnętrznych silników bazodanowych.",
    icon: Download,
    tip: "Aplikacja funkcjonuje w architekturze Offline-First natychmiast po uruchomieniu.",
  },
  {
    number: "02",
    title: "Konfiguracja kodu PIN i pęku kluczy",
    subtitle: "Kryptograficzna ochrona sprzętowa",
    description:
      "Podczas pierwszego uruchomienia definiujesz prywatny kod PIN. Lokalna baza danych pacjentów (SQLite) zostaje zaszyfrowana algorytmem AES-256-GCM, a klucze trafiają bezpośrednio do systemowego modułu Apple Keychain lub Windows Credential Locker.",
    icon: KeyRound,
    tip: "Paradygmat Zero-Knowledge: klucze kryptograficzne nie opuszczają Twojego urządzenia.",
  },
  {
    number: "03",
    title: "Realizacja wywiadu SOAP i eksport PDF",
    subtitle: "Ustrukturyzowane badanie kliniczne",
    description:
      "W trakcie wizyty wykorzystujesz słownikowe skróty klawiszowe, szablony jednostek chorobowych oraz kody ICD-10. Po zakończeniu sesji jednym kliknięciem generujesz kompletne karty EDM lub spersonalizowane zalecenia terapeutyczne.",
    icon: FileCheck2,
    tip: "Kompletna dokumentacja kliniczna i zalecenia gotowe przed zakończeniem wizyty.",
  },
];

export function PhysioNotesWorkflow() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Efektywność Operacyjna • Proces Wdrożenia
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#111111] dark:text-white leading-tight">
            Błyskawiczne wdrożenie w gabinecie w trzy proste kroki.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Eliminacja wielogodzinnych szkoleń, skomplikowanych wdrożeń IT oraz zależności od dostawców chmurowych. PhysioNotes jest gotowy do pracy klinicznej natychmiast po instalacji na stacji roboczej.
          </p>
        </div>

        {/* 3 Storytelling Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="group relative border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-8 sm:p-10 bg-white dark:bg-neutral-900/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-neutral-200 dark:text-neutral-800 group-hover:text-emerald-500/30 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111111] dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{step.tip}</span>
                </div>

                {/* Arrow connecting to next step on desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-5 top-1/3 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-400 shadow-sm pointer-events-none">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
