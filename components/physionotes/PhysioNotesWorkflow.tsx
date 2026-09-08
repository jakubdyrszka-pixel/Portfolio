import React from "react";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";

export function PhysioNotesWorkflow() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-[#fafafa] dark:bg-[#111111]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Dlaczego mam zmienić program?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111] dark:text-white leading-tight">
            Masz dość tego, że dokumentacja zabiera Ci czas?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Większość systemów medycznych została stworzona z myślą o przychodniach NFZ i recepcjach, a nie fizjoterapeutach. Zobacz różnicę.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Bad systems */}
          <div className="border border-red-200 dark:border-red-900/30 rounded-2xl p-8 bg-red-50/50 dark:bg-red-950/10">
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-400 mb-6 flex items-center gap-2">
              <XCircle className="h-5 w-5" /> Inne systemy (Chmurowe)
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-red-500 font-bold mt-0.5">✕</span> Wymagają stałego dostępu do internetu.
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-red-500 font-bold mt-0.5">✕</span> Przeładowany, skomplikowany interfejs.
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-red-500 font-bold mt-0.5">✕</span> Opłaty za każdego użytkownika lub pacjenta.
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-red-500 font-bold mt-0.5">✕</span> Ciągłe logowanie, wylogowywanie sesji.
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-red-500 font-bold mt-0.5">✕</span> Kartoteki medyczne leżą na obcych serwerach.
              </li>
            </ul>
          </div>

          {/* PhysioNotes */}
          <div className="border border-emerald-500/50 rounded-2xl p-8 bg-white dark:bg-neutral-900/80 shadow-[0_4px_25px_rgba(16,185,129,0.1)] relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              Rozwiązanie
            </div>
            <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> PhysioNotes
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span> Działa 100% offline. Zawsze szybko.
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span> Zaczynasz z szablonami, nie od pustej kartki.
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span> Dokumentacja SOAP gotowa w kilkadziesiąt sekund.
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span> Prosty abonament bez ukrytych opłat.
              </li>
              <li className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span> Dane zostają wyłącznie u Ciebie na dysku.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:opacity-80 transition-opacity"
          >
            <span>Porównaj plany i wypróbuj</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
