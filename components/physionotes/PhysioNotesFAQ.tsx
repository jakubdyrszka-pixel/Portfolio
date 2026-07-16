"use client";

import React, { useState } from "react";
import { ChevronDown, Shield, WifiOff, HardDrive, Laptop, FileSpreadsheet, Lock } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: React.ElementType;
}

const faqItems: FAQItem[] = [
  {
    category: "Prywatność & Szyfrowanie",
    icon: Lock,
    question: "Co jeśli zapomnę swojego kodu PIN? Czy twórcy aplikacji mogą odzyskać moje dane?",
    answer: "Nie. PhysioNotes V2.0 działa w architekturze Zero-Knowledge. Klucz szyfrujący bazę danych AES-256-GCM wywodzi się bezpośrednio z Twojego prywatnego kodu PIN. My, jako twórcy oprogramowania, nie posiadamy do niego dostępu ani nie przechowujemy go na żadnych serwerach. W przypadku zapomnienia kodu PIN odzyskanie danych jest możliwe wyłącznie z wcześniej wygenerowanego i zaszyfrowanego pliku kopii zapasowej (Backup JSON). Dlatego aplikacja regularnie przypomina o tworzeniu lokalnych kopii zapasowych."
  },
  {
    category: "Praca Offline & Internet",
    icon: WifiOff,
    question: "Czy PhysioNotes V2.0 wymaga stałego połączenia z Internetem podczas wizyt w gabinecie?",
    answer: "Absolutnie nie! Całe przetwarzanie – od ładowania kartotek po wyszukiwanie w bazie szablonów i generowanie plików PDF – odbywa się w 100% lokalnie na Twoim komputerze. Połączenie z Internetem jest wymagane jedynie krótko podczas pierwszego logowania i aktywacji licencji przez konto Clerk, a także do sprawdzania dostępności nowych aktualizacji programu."
  },
  {
    category: "Migracja & Import Danych",
    icon: FileSpreadsheet,
    question: "Czy mogę przenieść moją dotychczasową listę pacjentów z arkusza Excel lub innego programu?",
    answer: "Tak. W zakładce 'Synchronizacja -> Import' możesz wczytać listę pacjentów w uniwersalnym formacie CSV. Jeżeli dotychczas prowadziłeś kartoteki w Excelu, wystarczy zapisać arkusz do pliku CSV z odpowiednimi nagłówkami (Imię, Nazwisko, PESEL, Telefon itd.), aby w kilka sekund wczytać wszystkich pacjentów do bazy PhysioNotes."
  },
  {
    category: "Wymagania Sprzętowe",
    icon: Laptop,
    question: "Na jakich systemach operacyjnych i komputerach działa PhysioNotes V2.0?",
    answer: "Aplikacja jest w pełni natywna i zoptymalizowana pod dwa najpopularniejsze systemy: macOS (wersje natywne dla procesorów Apple Silicon M1/M2/M3/M4 oraz procesorów Intel) oraz Windows 10 i Windows 11 (64-bit). Dzięki zastosowaniu lekkiej bazy SQLite program działa płynnie nawet na starszych lub tańszych laptopach."
  },
  {
    category: "Własność Danych & Chmura",
    icon: HardDrive,
    question: "Dlaczego w PhysioNotes nie ma opłaty od liczby pacjentów ani przymusowej chmury?",
    answer: "Większość systemów medycznych na rynku utrzymuje bazy danych na drogich serwerach w chmurze, co generuje wysokie koszty stałe przenoszone na terapeutę. PhysioNotes V2.0 przyjmuje filozofię 'Local-First' – Twoje dane leżą na Twoim dysku twardym. Nie ponosimy kosztów utrzymania petabajtów danych medycznych w chmurze, dzięki czemu możemy zaoferować program bez limitów pacjentów i bez ryzyka wycieku z serwerów dostawcy."
  },
  {
    category: "Zgodność Prawna (RODO & MDR)",
    icon: Shield,
    question: "Czy aplikacja spełnia wymogi RODO i czy potrzebuję umowy powierzenia danych (DPA)?",
    answer: "Jako fizjoterapeuta jesteś Administratorem Danych Osobowych (ADO) swoich pacjentów. Ponieważ PhysioNotes nie przesyła Twoich kartotek medycznych na zewnętrzne serwery, nie dochodzi do powierzenia przetwarzania danych podmiotowi trzeciemu (dostawcy chmury). Zwalnia Cię to z obowiązku zawierania i nadzorowania umów DPA. Ponadto program podlega pod wyłączenie z klasyfikacji wyrobów medycznych (MDR 2017/745 / MDCG 2019-11) jako oprogramowanie do elektronicznej dokumentacji medycznej (EDM) bez funkcji automatycznego diagnozowania."
  }
];

export function PhysioNotesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        const ItemIcon = item.icon;
        return (
          <div
            key={index}
            className={`border-2 transition bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              isOpen ? "border-ink bg-neutral-50 dark:bg-neutral-900/40" : "border-ink/40 hover:border-ink"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 border border-ink ${isOpen ? "bg-ink text-inverse-ink" : "bg-neutral-200 dark:bg-neutral-800 text-ink"}`}>
                  <ItemIcon className="h-4 w-4 shrink-0" />
                </div>
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-ink tracking-tight">
                    {item.question}
                  </h3>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform duration-300 text-ink ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-6 pt-2 sm:px-6 sm:pb-6 border-t border-ink/10 text-xs sm:text-sm text-muted leading-relaxed font-medium">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
