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
    badge: "Architektura Zero-Cloud",
    title: "100% Suwerenność Danych Medycznych",
    description:
      "Całkowita niezależność od infrastruktury chmurowej. Kartoteki pacjentów, historia kliniczna oraz biblioteki szablonów są przechowywane wyłącznie na lokalnym dysku stacji roboczej, co eliminuje ryzyko wycieku z zewnętrznych serwerów.",
  },
  {
    icon: Lock,
    badge: "Szyfrowanie sprzętowe",
    title: "Standard AES-256-GCM & Zero-Knowledge",
    description:
      "Klucz kryptograficzny zabezpieczający bazę danych SQLite wywodzi się bezpośrednio z Twojego prywatnego kodu PIN i jest chroniony w systemie Apple Keychain lub Windows Credential Locker. Pełna poufność kliniczna.",
  },
  {
    icon: WifiOff,
    badge: "Zgodność z RODO (ADO)",
    title: "Praca bez umów powierzenia (DPA)",
    description:
      "Jako Administrator Danych Osobowych (ADO) nie powierzasz przetwarzania wrażliwych danych medycznych podmiotom zewnętrznym. Zwalnia to praktykę z procedur audytowych oraz konieczności podpisywania umów DPA.",
  },
  {
    icon: FileCheck2,
    badge: "Status prawny i regulacje",
    title: "Natywne wyłączenie z dyrektywy MDR",
    description:
      "Zgodnie z oficjalnymi wytycznymi MDCG 2019-11 oprogramowanie dedykowane do prowadzenia Elektronicznej Dokumentacji Medycznej (EDM) bez zautomatyzowanej diagnozy nie stanowi wyrobu medycznego, gwarantując stabilność wdrożenia.",
  },
];

export function PhysioNotesTrust() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Standardy Bezpieczeństwa Klinicznego
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#111111] dark:text-white leading-tight">
            Prywatność by Design. Pełna kontrola nad dokumentacją pacjentów.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            W odróżnieniu od rozproszonych systemów chmurowych, PhysioNotes łączy bezkompromisową wydajność aplikacji natywnej z pełną zgodnością prawną i kryptograficzną ochroną wrażliwych danych zdrowotnych.
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
                  <span>Pełna zgodność z RODO i standardami EDM</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
