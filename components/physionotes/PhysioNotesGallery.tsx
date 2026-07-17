"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ShieldAlert, 
  UserCheck, 
  FileText, 
  Database, 
  Palette, 
  RefreshCw, 
  Maximize2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  src: string;
  icon: React.ElementType;
  summary: string;
  details: string[];
  clinicalBenefit: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "editor",
    title: "7-Sekcyjny Edytor Medyczny & Szablony",
    category: "Edytor EDM",
    src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.57.png",
    icon: FileText,
    summary: "Zaprojektowany pod realny wywiad z pacjentem: od badania subiektywnego po zalecenia domowe i kody ICD-10.",
    details: [
      "Wbudowana biblioteka 500+ szablonów schorzeń z błyskawicznym wyszukiwaniem po regionie lub nazwie (np. 'Bark - tendinopatia')",
      "Automatyczne podpowiadanie kodów ICD-10 (np. M75.1, M54.5) wraz z pełnym opisem klinicznym",
      "Szybkie formatowanie tekstu skrótami klawiszowymi: Ctrl+B (pogrubienie), Ctrl+I (kursywa), Ctrl+U (podkreślenie)",
      "Jednym kliknięciem generujesz 3 typy dokumentów PDF: pełną dokumentację, zalecenia dla pacjenta lub skrócony raport"
    ],
    clinicalBenefit: "Zmniejsza czas wypełniania karty wizyty z 10 minut do niespełna 60 sekund dzięki wstrzykiwaniu gotowych fraz z biblioteki szablonów."
  },
  {
    id: "patient-card",
    title: "Karta Pacjenta & Oś Czasu Terapii",
    category: "Historia Kliniczna",
    src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.24.png",
    icon: UserCheck,
    summary: "Przejrzysty przegląd całego procesu leczenia: statystyki sesji, plan obciążeń oraz chronologiczna historia wszystkich wizyt.",
    details: [
      "Natychmiastowe statystyki postępu: liczba odbytych wizyt, czas trwania terapii (w dniach) i aktualny etap leczenia",
      "Dedykowane pole na celowany Plan Leczenia (liczba planowanych sesji, progresja obciążeń, cele funkcjonalne)",
      "Chronologiczny zapis wizyt z czytelnym oznaczeniem daty, typu wizyty ('Pierwsza wizyta', 'Powrót do sportu') oraz przypisanego kodu ICD-10",
      "Działanie w 100% lokalne zapewnia zerowy czas ładowania karty nawet przy tysiącach wpisów w bazie"
    ],
    clinicalBenefit: "Pełny ogląd historii pacjenta w ułamku sekundy pozwala na natychmiastową ocenę skuteczności wdrożonych procedur na każdej kolejnej wizycie."
  },
  {
    id: "security",
    title: "Ekran Blokady & Szyfrowanie PIN",
    category: "Prywatność & RODO",
    src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.16.png",
    icon: ShieldAlert,
    summary: "Lokalne szyfrowanie bazy danych kluczem AES-256-GCM wywodzącym się z Twojego prywatnego kodu PIN.",
    details: [
      "Baza pacjentów (SQLite) jest przechowywana wyłącznie na Twoim dysku twardym i zaszyfrowana przed niepowołanym dostępem",
      "Prywatny PIN jest bezpiecznie składowany w systemowym pęku kluczy (macOS Keychain / Windows Credential Locker)",
      "Zasada Zero-Knowledge: my jako twórcy oprogramowania nie posiadamy kopii Twojego PIN-u ani kluczy szyfrujących",
      "Automatyczna blokada interfejsu po odejściu od komputera chroni dane pacjentów przed wzrokiem osób trzecich w gabinecie"
    ],
    clinicalBenefit: "Gwarantuje pełną zgodność z wytycznymi RODO i zwalnia Cię z konieczności powierzania wrażliwych danych zdrowotnych zewnętrznym serwerom chmurowym."
  },
  {
    id: "patients-list",
    title: "Zarządzanie Bazą & Lista Pacjentów",
    category: "Kartoteka",
    src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.46.png",
    icon: Database,
    summary: "Błyskawiczna wyszukiwarka pacjentów z filtrowaniem po kodach ICD-10 i etapach terapii działająca bez opóźnień sieciowych.",
    details: [
      "Wyszukiwanie w czasie rzeczywistym (po imieniu, nazwisku, numerze PESEL lub numerze telefonu) z wynikiem w < 5 milisekund",
      "Zaawansowane filtry kliniczne pozwalające wyizolować pacjentów z konkretnym schorzeniem (np. wszystkie przypadki M75.1)",
      "Szybkie dodawanie nowej kartoteki pacjenta z automatyczną walidacją poprawności danych",
      "Brak limitu liczby pacjentów i wizyt – jedynym ograniczeniem jest pojemność Twojego dysku twardego"
    ],
    clinicalBenefit: "Szybka nawigacja między kartotekami w trakcie intensywnego dnia pracy bez czekania na ładowanie stron w przeglądarce internetowej."
  },
  {
    id: "ui-themes",
    title: "Personalizacja Interfejsu & Motywy",
    category: "Ergonomia Pracy",
    src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.11.10.png",
    icon: Palette,
    summary: "Dopasowanie wyglądu aplikacji do warunków oświetleniowych w gabinecie oraz preferencji wzrokowych terapeuty.",
    details: [
      "Trzy tryby motywu: Jasny (do pracy w świetle dziennym), Ciemny (redukujący zmęczenie oczu podczas wieczornych wizyt) oraz Systemowy",
      "Cztery starannie dobrane kolory przewodnie (Niebieski, Zielony, Indygo, Grafit) porządkujące najważniejsze akcje",
      "Regulacja rozmiaru tekstu interfejsu i edytora medycznego poprawiająca czytelność na ekranach laptopów i monitorach 4K",
      "Natychmiastowe zastosowanie zmian w całej aplikacji bez konieczności restartowania programu"
    ],
    clinicalBenefit: "Ochrona wzroku fizjoterapeuty podczas wielogodzinnej pracy przy komputerze w sztucznym lub przytłumionym oświetleniu gabinetowym."
  },
  {
    id: "migration",
    title: "Kopia Zapasowa & Migracja Bez Chmury",
    category: "Eksport & Backup",
    src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.13.58.png",
    icon: RefreshCw,
    summary: "Pełna kontrola nad danymi: łatwy eksport całej bazy do formatu JSON lub pacjentów do arkusza CSV i odtwarzanie na nowym sprzęcie.",
    details: [
      "Eksport pełnego backupu (JSON) zawierającego pacjentów, wszystkie wizyty, plany leczenia, szablony i ustawienia w jednym pliku",
      "Eksport listy pacjentów do uniwersalnego formatu CSV zgodnego z Excel / Numbers w celach statystycznych lub księgowych",
      "Bezpieczny import kopii zapasowej pozwalający w kilka sekund przenieść całą praktykę na nowy komputer macOS lub Windows",
      "Wskazówki bezpieczeństwa i ostrzeżenia przed nadpisaniem danych gwarantują brak ryzyka utraty kartotek podczas synchronizacji"
    ],
    clinicalBenefit: "Zachowujesz 100% własności nad swoją bazą medyczną. Nie jesteś uzależniony od abonamentów chmurowych ani ryzyka likwidacji serwerów dostawcy."
  }
];

export function PhysioNotesGallery() {
  const [activeId, setActiveId] = useState<string>("editor");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const currentItem = galleryItems.find((item) => item.id === activeId) || galleryItems[0];
  const IconComponent = currentItem.icon;

  return (
    <div className="space-y-8">
      {/* Category / Screen Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ink/20 pb-4">
        {galleryItems.map((item) => {
          const TabIcon = item.icon;
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveId(item.id);
                setIsZoomed(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold transition border ${
                isActive
                  ? "border-ink bg-ink text-inverse-ink shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
                  : "border-ink/40 bg-background text-muted hover:border-ink hover:text-ink"
              }`}
            >
              <TabIcon className="h-3.5 w-3.5 shrink-0" />
              <span>{item.category}</span>
            </button>
          );
        })}
      </div>

      {/* Main Preview & Technical Breakdown Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Top: Interactive Screenshot */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative border-2 border-ink bg-neutral-900 overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group">
            <div className="aspect-[16/10] w-full relative">
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                className={`object-contain transition-transform duration-500 ${
                  isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            
            {/* Zoom Hint Banner */}
            <div className="absolute bottom-3 right-3 bg-ink/90 backdrop-blur text-inverse-ink px-3 py-1.5 text-[11px] font-bold border border-inverse-ink/20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition pointer-events-none">
              <Maximize2 className="h-3 w-3" />
              <span>{isZoomed ? "Kliknij, aby pomniejszyć" : "Kliknij zrzut, aby powiększyć"}</span>
            </div>

            {/* Screen Badge */}
            <div className="absolute top-3 left-3 bg-emerald-600 text-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider border border-ink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {currentItem.category}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted font-semibold px-1">
            <span>Widok rzeczywisty aplikacji desktopowej PhysioNotes V2.0</span>
            <span className="text-ink font-bold">Zrzut {galleryItems.findIndex(i => i.id === activeId) + 1} z {galleryItems.length}</span>
          </div>
        </div>

        {/* Right / Bottom: Deep Dive Descriptions */}
        <div className="lg:col-span-5 border-2 border-ink bg-neutral-50 dark:bg-neutral-900/40 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-xs uppercase tracking-wider mb-2">
              <IconComponent className="h-4 w-4 shrink-0" />
              <span>Moduł: {currentItem.category}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-ink tracking-tight">
              {currentItem.title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed font-medium">
              {currentItem.summary}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-ink/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Kluczowe możliwości techniczne:</span>
            </h4>
            <ul className="space-y-2.5">
              {currentItem.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-ink leading-relaxed font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border border-emerald-600/60 bg-emerald-500/10 dark:bg-emerald-950/30 text-xs">
            <h5 className="font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              <span>Praktyczna korzyść w gabinecie:</span>
            </h5>
            <p className="text-ink font-semibold leading-relaxed">
              {currentItem.clinicalBenefit}
            </p>
          </div>
        </div>

      </div>

      {/* Thumbnail Bar */}
      <div className="pt-6 border-t border-ink/20">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-4">
          Wszystkie ekrany aplikacji (kliknij, aby przełączyć):
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {galleryItems.map((item, index) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveId(item.id);
                  setIsZoomed(false);
                }}
                className={`group text-left border-2 transition overflow-hidden p-2 flex flex-col justify-between ${
                  isActive
                    ? "border-ink bg-ink text-inverse-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.02]"
                    : "border-ink/30 bg-background hover:border-ink hover:bg-neutral-100 dark:hover:bg-neutral-900/50"
                }`}
              >
                <div className="relative aspect-[16/10] w-full border border-ink/20 overflow-hidden mb-2 bg-neutral-900">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="150px"
                  />
                </div>
                <div>
                  <span className={`block text-[10px] font-extrabold uppercase ${isActive ? "text-emerald-400" : "text-muted"}`}>
                    0{index + 1} • {item.category}
                  </span>
                  <p className={`text-xs font-bold line-clamp-1 mt-0.5 ${isActive ? "text-inverse-ink" : "text-ink"}`}>
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
