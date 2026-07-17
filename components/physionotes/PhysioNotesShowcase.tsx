"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  ShieldCheck, 
  Palette, 
  Maximize2,
  X,
  Zap
} from "lucide-react";

interface ShowcaseFeature {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  src: string;
  points: string[];
  clinicalHighlight: string;
}

const mainFeature: ShowcaseFeature = {
  id: "editor-soap",
  badge: "7-Sekcyjny Edytor Medyczny • Szablony SOAP",
  title: "Wywiad kliniczny SOAP gotowy w 60 sekund",
  subtitle:
    "Zamiast nieuporządkowanych notatek tekstowych, aplikacja organizuje badanie w 7 spójnych logicznie sekcji, odzwierciedlających najwyższe standardy wywiadu SOAP oraz diagnostyki funkcjonalnej.",
  src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.57.png",
  points: [
    "Wbudowana biblioteka 500+ szablonów jednostek chorobowych ze słownikowym wyszukiwaniem i natychmiastowym wstrzykiwaniem.",
    "Automatyczna walidacja i podpowiedzi oficjalnej klasyfikacji ICD-10 (np. M75.1, M54.5, M51.1) wraz z terminologią ortopedyczną.",
    "Błyskawiczne formatowanie tekstu medycznego (Rich-Text) za pomocą skrótów klawiszowych, bez odrywania dłoni od klawiatury.",
    "Generowanie 3 wyspecjalizowanych wariantów PDF: kompletna dokumentacja EDM, zalecenia dla pacjenta lub syntetyczny raport."
  ],
  clinicalHighlight: "Zastosowanie predefiniowanych szablonów klinicznych redukuje czas sporządzania pełnej dokumentacji wizyty z 10 minut do niespełna 60 sekund."
};

const secondaryFeatures: ShowcaseFeature[] = [
  {
    id: "patient-timeline",
    badge: "Karta Pacjenta • Oś Czasu Terapii",
    title: "Kompleksowy widok historii leczenia w ułamku sekundy",
    subtitle:
      "Analizuj chronologiczną oś czasu wszystkich odbytych wizyt, weryfikuj postępy funkcjonalne oraz kontroluj parametry obciążeń bez opóźnień sieciowych.",
    src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.24.png",
    points: [
      "Natychmiastowa metryka pacjenta: liczba odbytych sesji, łączny czas trwania rehabilitacji oraz aktualny etap kliniczny.",
      "Dedykowany moduł Planu Leczenia z precyzyjnym określeniem liczby planowanych wizyt oraz celów terapeutycznych.",
      "Czytelna segmentacja typów wizyt ('Konsultacja wstępna', 'Powrót do sportu') z widocznymi przypisanymi kodami ICD-10.",
      "Lokalny silnik wyszukiwania działający w czasie < 5 milisekund niezależnie od objętości bazy danych pacjentów."
    ],
    clinicalHighlight: "Dzięki natywnej architekturze SQLite otwarcie nawet najbardziej rozbudowanej historii klinicznej następuje natychmiast."
  },
  {
    id: "pin-security",
    badge: "Prywatność • Blokada PIN",
    title: "Szyfrowanie AES-256 i poufność danych w gabinecie",
    subtitle:
      "Kartoteka medyczna jest szyfrowana sprzętowo w czasie rzeczywistym, a interfejs automatycznie blokuje dostęp po odejściu terapeuty od stanowiska.",
    src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.16.png",
    points: [
      "Lokalne szyfrowanie bazy danych standardem AES-256-GCM kluczem wywodzącym się z Twojego prywatnego kodu PIN.",
      "Integracja z systemowym pętem kluczy: Apple Keychain (macOS) oraz Windows Credential Locker.",
      "Paradygmat Zero-Knowledge – twórcy oprogramowania nie posiadają dostępu do haseł ani dokumentacji pacjentów.",
      "Automatyczna blokada interfejsu chroni wrażliwe dane zdrowotne w otwartej przestrzeni gabinetu fizjoterapeutycznego."
    ],
    clinicalHighlight: "Gwarancja pełnej suwerenności danych medycznych oraz zwolnienie z procedur i umów powierzenia RODO (DPA)."
  },
  {
    id: "themes-backup",
    badge: "Personalizacja • Suwerenny Backup",
    title: "Ergonomia pracy klinicznej i niezależna migracja",
    subtitle:
      "Dostosuj parametry wizualne do warunków oświetleniowych gabinetu i zarządzaj lokalnymi kopiami zapasowymi z pełną niezależnością.",
    src: "/images/physionotes/Screenshot%202026-07-01%20at%2013.11.10.png",
    points: [
      "Trzy tryby wizualne: Jasny, Ciemny (redukujący zmęczenie wzroku podczas wieczornych sesji) oraz Systemowy.",
      "Cztery profesjonalne palety akcentów oraz płynne skalowanie typografii pod ekrany laptopów i monitory 4K.",
      "Błyskawiczny suwerenny eksport kompletnej bazy pacjentów do zaszyfrowanego pliku JSON lub formatu CSV.",
      "Wysoka wydajność natywna w izolowanym środowisku Electron, bez przeładowywania stron czy opóźnień przeglądarki."
    ],
    clinicalHighlight: "W przypadku modernizacji sprzętu komputerowego migracja kompletnej bazy gabinetu zajmuje mniej niż minutę."
  }
];

export function PhysioNotesShowcase() {
  const [activeSecondaryIndex, setActiveSecondaryIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const activeSecondary = secondaryFeatures[activeSecondaryIndex];

  return (
    <div className="space-y-28 sm:space-y-36">
      {/* Lightbox Modal for Zooming Screenshots */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 transition-opacity duration-200"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Zamknij powiększenie"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full max-w-6xl aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src={zoomedImage}
              alt="PhysioNotes V2.0 - Podgląd w pełnym rozmiarze"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* SECTION 3: Screenshot + korzyści (Main Feature Deep Dive: 7-Section SOAP Editor) */}
      <section id="showcase" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Główny Moduł Kliniczny
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111] dark:text-white leading-tight">
              {mainFeature.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
              {mainFeature.subtitle}
            </p>
          </div>

          {/* Large Card Layout (Screenshot + 3-4 points side-by-side on large screens) */}
          <div className="border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 bg-white dark:bg-neutral-900/40 shadow-sm transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left / Top: Huge Interactive Screenshot */}
            <div className="lg:col-span-7 relative group">
              <div 
                onClick={() => setZoomedImage(mainFeature.src)}
                className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 cursor-zoom-in shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
              >
                <Image
                  src={mainFeature.src}
                  alt={mainFeature.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-top"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur text-white text-xs font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition pointer-events-none border border-white/10">
                  <Maximize2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Powiększ zrzut</span>
                </div>
              </div>
              <div className="mt-3.5 flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400 px-1">
                <span>Rzeczywisty interfejs 7-sekcyjnego edytora medycznego</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{mainFeature.badge}</span>
              </div>
            </div>

            {/* Right / Bottom: 3-4 Crisp Benefit Points (Not trapped in separate boxes!) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Oszczędność czasu i pełna precyzja</span>
              </div>

              <ul className="space-y-4">
                {mainFeature.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Dlaczego to zmienia codzienną praktykę?</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {mainFeature.clinicalHighlight}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: Kolejne screenshoty (Patient Card, PIN Lock, Personalization) */}
      <section className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Kompleksowy Przegląd Możliwości
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111] dark:text-white leading-tight">
              Wszystkie narzędzia gabinetu w jednym płynnym ekosystemie.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
              Przełączaj między kluczowymi widokami aplikacji i sprawdź, jak PhysioNotes dba o bezpieczeństwo i ergonomię Twojej pracy.
            </p>
          </div>

          {/* Sleek Feature Switcher Tabs (Linear / Arc style) */}
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-neutral-200/80 dark:border-neutral-800 pb-4">
            {secondaryFeatures.map((feat, idx) => {
              const isActive = idx === activeSecondaryIndex;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveSecondaryIndex(idx)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#111111] dark:bg-white text-white dark:text-[#111111] shadow-sm"
                      : "bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:text-[#111111] dark:hover:text-white"
                  }`}
                >
                  {idx === 0 && <UserCheck className={`h-4 w-4 ${isActive ? "text-emerald-400 dark:text-emerald-600" : ""}`} />}
                  {idx === 1 && <ShieldCheck className={`h-4 w-4 ${isActive ? "text-emerald-400 dark:text-emerald-600" : ""}`} />}
                  {idx === 2 && <Palette className={`h-4 w-4 ${isActive ? "text-emerald-400 dark:text-emerald-600" : ""}`} />}
                  <span>{feat.badge.split("•")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Large Feature Showcase Card for Active Tab */}
          <div className="border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 bg-white dark:bg-neutral-900/40 shadow-sm transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Interactive Screenshot */}
            <div className="lg:col-span-7 relative group">
              <div 
                onClick={() => setZoomedImage(activeSecondary.src)}
                className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 cursor-zoom-in shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
              >
                <Image
                  src={activeSecondary.src}
                  alt={activeSecondary.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-top transition-all duration-300"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur text-white text-xs font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition pointer-events-none border border-white/10">
                  <Maximize2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Powiększ zrzut</span>
                </div>
              </div>
              <div className="mt-3.5 flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400 px-1">
                <span>Widok aplikacji desktopowej • {activeSecondary.badge}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Moduł {activeSecondaryIndex + 2} z 4</span>
              </div>
            </div>

            {/* Right: 3-4 Crisp Points */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {activeSecondary.badge}
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111] dark:text-white">
                  {activeSecondary.title}
                </h3>
                <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {activeSecondary.subtitle}
                </p>
              </div>

              <ul className="space-y-3.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                {activeSecondary.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 text-xs">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                  Praktyczna korzyść dla fizjoterapeuty:
                </span>
                <p className="text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
                  {activeSecondary.clinicalHighlight}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
