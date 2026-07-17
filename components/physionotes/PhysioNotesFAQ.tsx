"use client";

import React, { useState } from "react";
import { ChevronDown, Lock, WifiOff, FileSpreadsheet, Laptop, HardDrive, Shield } from "lucide-react";

interface FAQItem {
  category: string;
  question: string;
  answer: string;
  icon: React.ElementType;
}

const faqItems: FAQItem[] = [
  {
    category: "Prywatność & Szyfrowanie",
    icon: Lock,
    question: "W jaki sposób chronione są dane pacjentów i co w przypadku zapomnienia kodu PIN?",
    answer:
      "PhysioNotes działa w paradygmacie Zero-Knowledge. Klucz kryptograficzny zabezpieczający bazę danych AES-256-GCM wywodzi się bezpośrednio z Twojego prywatnego kodu PIN. Twórcy oprogramowania nie posiadają do niego dostępu ani nie przechowują go w infrastrukturze chmurowej. W przypadku utraty kodu PIN odzyskanie kartoteki jest możliwe wyłącznie ze zrzutu kopii zapasowej (Backup JSON). System posiada wbudowane mechanizmy cyklicznego przypominania o archiwizacji lokalnej."
  },
  {
    category: "Praca Offline & Sieć",
    icon: WifiOff,
    question: "Czy aplikacja wymaga stałego dostępu do Internetu podczas pracy z pacjentem?",
    answer:
      "Nie. Cały cykl przetwarzania danych – od przeszukiwania kartotek po generowanie wywiadów SOAP i eksport plików PDF – odbywa się w 100% lokalnie w architekturze Offline-First. Połączenie internetowe jest wymagane wyłącznie podczas autoryzacji licencji stacji roboczej oraz weryfikacji dostępności aktualizacji oprogramowania."
  },
  {
    category: "Migracja & Import Danych",
    icon: FileSpreadsheet,
    question: "Czy możliwe jest wczytanie dotychczasowej bazy pacjentów z arkuszy kalkulacyjnych?",
    answer:
      "Tak. W sekcji 'Synchronizacja -> Import' możesz wczytać kartotekę z pliku w formacie CSV. Jeżeli dotychczas prowadziłeś rejestr wizyt w arkuszu Excel lub zewnętrznym systemie medycznym, wystarczy wyeksportować dane do pliku CSV z kolumnami (Imię, Nazwisko, PESEL, Telefon), aby zaimplementować je do lokalnej bazy PhysioNotes."
  },
  {
    category: "Wymagania Sprzętowe",
    icon: Laptop,
    question: "Z jakimi systemami operacyjnymi jest kompatybilny PhysioNotes?",
    answer:
      "Aplikacja jest w pełni zoptymalizowana pod systemy macOS (wersja uniwersalna dla architektury Apple Silicon M1–M4 oraz procesorów Intel) oraz Windows 10 i Windows 11 (wersja 64-bitowa). Dzięki zastosowaniu natywnego silnika bazy danych SQLite aplikacja wykazuje natychmiastową responsywność również na starszych stacjach roboczych."
  },
  {
    category: "Model Licencyjny & Chmura",
    icon: HardDrive,
    question: "Dlaczego oprogramowanie nie wymaga opłat za liczbę pacjentów ani subskrypcji chmurowych?",
    answer:
      "Tradycyjne systemy medyczne obciążają praktyki wysokimi kosztami utrzymania rozproszonych serwerów chmurowych. PhysioNotes opiera się na architekturze Local-First – dane kliniczne spoczywają wyłącznie na dysku Twojego urządzenia. Eliminacja kosztów serwerowych umożliwia oferowanie licencji bez limitu kartotek i bez ryzyka wycieku z zewnętrznych centrów danych."
  },
  {
    category: "Zgodność Prawna (RODO & MDR)",
    icon: Shield,
    question: "Czy wdrożenie programu wymaga podpisania umowy powierzenia danych osobowych (DPA)?",
    answer:
      "Jako fizjoterapeuta pełnisz rolę Administratora Danych Osobowych (ADO). Ponieważ PhysioNotes nie przesyła kartotek medycznych na zewnętrzne serwery, nie dochodzi do powierzenia przetwarzania podmiotowi trzeciemu. Zwalnia to praktykę z obowiązku zawierania umów DPA. Ponadto oprogramowanie podlega wyłączeniu z klasyfikacji wyrobów medycznych (MDR 2017/745 / MDCG 2019-11) jako narzędzie do EDM bez zautomatyzowanej diagnozy."
  }
];

export function PhysioNotesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-36 border-t border-neutral-200/60 dark:border-neutral-800/60 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Pytania i Odpowiedzi • Baza Wiedzy
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#111111] dark:text-white leading-tight">
            Najczęściej zadawane pytania (FAQ)
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Kompendium wiedzy na temat bezpieczeństwa klinicznego, szyfrowania sprzętowego AES-256 oraz lokalnej architektury aplikacji PhysioNotes.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const ItemIcon = item.icon;
            return (
              <div
                key={index}
                className={`border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl transition-all duration-200 bg-white dark:bg-neutral-900/60 shadow-[0_2px_12px_rgb(0,0,0,0.02)] dark:shadow-[0_2px_12px_rgb(0,0,0,0.2)] overflow-hidden ${
                  isOpen ? "border-neutral-300 dark:border-neutral-700 shadow-sm" : "hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-6 focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mt-0.5 sm:mt-0">
                      <ItemIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111111] dark:text-white leading-snug">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 transition-transform duration-300 ${isOpen ? "rotate-180 bg-neutral-100 dark:bg-neutral-800" : ""}`}>
                    <ChevronDown className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-8 pt-2 sm:px-8 sm:pb-8 sm:pl-22 border-t border-neutral-100 dark:border-neutral-800/60 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal animate-in fade-in duration-200">
                    <p>{item.answer}</p>
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
