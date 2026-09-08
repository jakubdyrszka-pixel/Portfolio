import React from "react";
import { Stethoscope, Building2, ArrowRight } from "lucide-react";

export function PhysioNotesAudience() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-[#fafafa] dark:bg-[#111111]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Dla kogo?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] dark:text-white leading-tight">
            Idealne narzędzie dla Twojej praktyki.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
            PhysioNotes został stworzony z myślą o różnych modelach pracy, od jednoosobowych gabinetów po rozbudowane kliniki rehabilitacyjne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Persona 1 */}
          <div className="border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-8 bg-white dark:bg-neutral-900/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:border-emerald-500/50 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111111] dark:text-white mb-3">
              Indywidualne Praktyki Fizjoterapeutyczne
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mb-6">
              Dla terapeutów pracujących samodzielnie, potrzebujących błyskawicznego systemu EDM, który nie obciąża ich miesięcznego budżetu i gwarantuje bezpieczeństwo danych (Brak umów powierzenia RODO).
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-emerald-500 font-bold">✓</span> Wywiad w 60 sekund
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-emerald-500 font-bold">✓</span> Gotowe kody ICD-10
              </li>
            </ul>
          </div>

          {/* Persona 2 */}
          <div className="border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-8 bg-white dark:bg-neutral-900/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:border-emerald-500/50 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111111] dark:text-white mb-3">
              Kliniki i Zespoły Fizjoterapeutów
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mb-6">
              Dla placówek z wieloma gabinetami, które chcą ujednolicić standard dokumentacji (SOAP) i współdzielić wiedzę kliniczną dzięki synchronizacji.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-emerald-500 font-bold">✓</span> Standardy wizyty
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-emerald-500 font-bold">✓</span> Współdzielona baza pacjentów
              </li>
            </ul>
          </div>
        </div>
        
        {/* Banner CTA */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
            <span className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
              Chcesz sprawdzić jak system działa w praktyce?
            </span>
            <a href="#pricing" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:opacity-80 transition-opacity">
              Wybierz plan <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
