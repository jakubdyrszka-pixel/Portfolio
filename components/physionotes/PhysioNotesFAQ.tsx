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
      "Baza pacjentów jest zaszyfrowana algorytmem AES-256. Jako twórcy aplikacji nie mamy do niej żadnego dostępu. Jeśli zapomnisz kodu PIN, aplikacja uniemożliwi odczytanie danych. Możesz jednak zawsze przywrócić kartotekę z wykonanej wcześniej kopii zapasowej na dysku. System będzie Ci o tym regularnie przypominał."
  },
  {
    category: "Praca Offline & Sieć",
    icon: WifiOff,
    question: "Czy aplikacja wymaga stałego dostępu do Internetu podczas pracy z pacjentem?",
    answer:
      "Nie. Cały program – łącznie z wyszukiwarką, szablonami i generowaniem PDF – działa w 100% offline. Internet jest potrzebny tylko sporadycznie, na przykład do weryfikacji licencji lub pobrania aktualizacji."
  },
  {
    category: "Migracja & Import Danych",
    icon: FileSpreadsheet,
    question: "Czy możliwe jest wczytanie dotychczasowej bazy pacjentów z arkuszy kalkulacyjnych?",
    answer:
      "Tak. Z poziomu aplikacji możesz łatwo zaimportować listę pacjentów z pliku CSV (np. wyeksportowanego z Excela). Jeśli masz dużą bazę danych w innym formacie i potrzebujesz pomocy przy imporcie, nasz zespół techniczny może Cię w tym wesprzeć."
  },
  {
    category: "Wymagania Sprzętowe",
    icon: Laptop,
    question: "Z jakimi systemami operacyjnymi jest kompatybilny PhysioNotes?",
    answer:
      "Program zadziała płynnie zarówno na komputerach Mac (Apple Silicon oraz Intel), jak i na komputerach z systemem Windows 10 lub 11."
  },
  {
    category: "Model Licencyjny & Chmura",
    icon: HardDrive,
    question: "Dlaczego oprogramowanie nie wymaga opłat za liczbę pacjentów ani drogich abonamentów?",
    answer:
      "Większość systemów medycznych utrzymuje ogromne, kosztowne serwery chmurowe. PhysioNotes trzyma dane u Ciebie na dysku. Ponieważ nie płacimy za utrzymywanie Twoich danych w zewnętrznej chmurze, nie musimy przerzucać tego kosztu na Ciebie. Dlatego możemy zaoferować bardzo przystępny i prosty model płatności."
  },
  {
    category: "Zgodność z RODO",
    icon: Shield,
    question: "Czy korzystanie z programu wymaga podpisywania umowy powierzenia danych?",
    answer:
      "PhysioNotes nie jest usługą chmurową (SaaS) i nie przetwarza danych medycznych na swoich serwerach – wszystko zostaje na Twoim komputerze. Dzięki temu odpada konieczność podpisywania typowych dla chmury umów powierzenia przetwarzania danych osobowych. Znacznie upraszcza to kwestie prawne w Twoim gabinecie."
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
