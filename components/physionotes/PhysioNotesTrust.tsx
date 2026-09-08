"use client";

import React from "react";
import { ShieldCheck, Lock, WifiOff, FileCheck2 } from "lucide-react";

interface TrustCard {
  icon: React.ElementType;
  title: string;
  badge: string;
  description: string;
}

const trustCards: TrustCard[] = [
  {
    icon: ShieldCheck,
    badge: "Brak zewnetrznych serwerów",
    title: "Pełna kontrola nad danymi",
    description:
      "Aplikacja działa w oparciu o lokalną bazę danych. Dokumentacja pacjentów znajduje się wyłącznie na Twoim dysku, co minimalizuje ryzyko wycieku z zewnętrznej chmury.",
  },
  {
    icon: Lock,
    badge: "Szyfrowanie",
    title: "Zabezpieczony dostęp",
    description:
      "Baza pacjentów jest szyfrowana w standardzie AES-256. Nawet jeśli ktoś uzyska fizyczny dostęp do pliku bazy, nie odczyta jej zawartości bez Twojego kodu PIN.",
  },
  {
    icon: WifiOff,
    badge: "Offline-first",
    title: "Prywatność i niezawodność",
    description:
      "Nie potrzebujesz ciągłego dostępu do internetu, aby przeprowadzić wizytę. Brak konieczności wysyłania kartotek na zewnątrz ułatwia też spełnienie Twoich obowiązków jako Administratora Danych Osobowych.",
  },
  {
    icon: FileCheck2,
    badge: "Zgodność z RODO",
    title: "Łatwiejsze procedury",
    description:
      "Ponieważ PhysioNotes nie przetwarza danych medycznych na zewnętrznych serwerach (SaaS), zazwyczaj nie musisz podpisywać z nami dodatkowych umów powierzenia przetwarzania danych osobowych.",
  },
];

export function PhysioNotesTrust() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Prywatność Twoich Pacjentów
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#111111] dark:text-white leading-tight">
            Prywatność nie powinna zaczynać się dopiero wtedy, gdy wydarzy się coś złego.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Ostatnie wydarzenia przypomniały całej branży jedną rzecz: dane pacjentów nie powinny być traktowane jak zwykłe dane użytkowników. Dlatego prywatność w PhysioNotes nie jest dodatkiem. Jest fundamentem – aplikację projektujemy tak, aby dokumentacja Twoich pacjentów była chroniona od samego początku.
          </p>
        </div>

        {/* 4 Large Linear-style Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {trustCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="group relative border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-8 sm:p-10 bg-white dark:bg-neutral-900/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.07)] dark:hover:shadow-[0_12px_36px_rgb(0,0,0,0.35)] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="inline-block text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                    {card.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111111] dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Działa całkowicie offline</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
