"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Keyboard, 
  Activity, 
  ShieldCheck, 
  FileCheck, 
  Lightbulb, 
  Zap
} from "lucide-react";

interface KnowHowSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge: string;
  content: {
    intro: string;
    steps: {
      heading: string;
      description: string;
      tip?: string;
    }[];
    highlightBox?: {
      title: string;
      text: string;
    };
  };
}

const knowHowSections: KnowHowSection[] = [
  {
    id: "soap-7",
    title: "Metodologia 7-Sekcyjnego Wywiadu Klinicznego",
    subtitle: "Zgodność z wymogami EDM i błyskawiczne prowadzenie wywiadu według standardu SOAP",
    icon: Activity,
    badge: "Praktyka Kliniczna",
    content: {
      intro: "Tradycyjne systemy zmuszają fizjoterapeutę do wypełniania setek niepotrzebnych pól lub pisania chaotycznej notatki w jednym oknie. PhysioNotes V2.0 porządkuje każdą wizytę w 7 logicznych sekcji, które odzwierciedlają realny przebieg badania w gabinecie:",
      steps: [
        {
          heading: "1. Cel wizyty / Powód zgłoszenia",
          description: "Zapisujesz główny problem pacjenta, oczekiwania wobec terapii oraz mechanizm urazu (np. 'Ostry ból lędźwiowo-krzyżowy po dźwignięciu ciężaru, promieniujący do pośladka').",
          tip: "Możesz skorzystać z podpowiedzi szablonowych, wpisując pierwsze litery schorzenia."
        },
        {
          heading: "2. Badanie subiektywne (Wywiad)",
          description: "Historia choroby, charakter i zmienność bólu w ciągu doby, czynniki nasilające/łagodzące (NRS 0-10), dotychczasowe leczenie oraz czerwone/żółte flagi.",
        },
        {
          heading: "3. Badanie obiektywne (Testy kliniczne)",
          description: "Wyniki testów ortopedycznych i funkcjonalnych (np. Lasègue'a, Slump test, zakresy ruchomości goniometrycznej, palpacja struktur tkankowych, ocena postawy).",
        },
        {
          heading: "4. Terapia / Procedury wykonane",
          description: "Działania podjęte podczas bieżącej sesji (np. terapia manualna wg Maitlanda, mobilizacje stawowe, igłowanie suche, kinesiotaping, kinezyterapia celowana).",
          tip: "Sekcja ta jest kluczowa dla obrony przed roszczeniami ubezpieczeniowymi – precyzyjnie dokumentuje wykonaną pracę."
        },
        {
          heading: "5. Ćwiczenia domowe",
          description: "Zestaw ćwiczeń z dokładnym dawkowaniem (serie, powtórzenia, tempo, przerwy) oraz instrukcją prawidłowego wzorca ruchowego.",
        },
        {
          heading: "6. Zalecenia & Edukacja",
          description: "Wskazówki ergonomiczne dla pacjenta na co dzień (np. modyfikacja pozycji siedzącej przy biurku, unikanie zgięcia w fazie ostrej, nawodnienie).",
        },
        {
          heading: "7. Kody ICD-10 & Rozpoznanie",
          description: "Oficjalna klasyfikacja medyczna schorzenia niezbędna przy współpracy z lekarzami prowadzącymi lub ubezpieczycielami.",
        }
      ],
      highlightBox: {
        title: "Dlaczego 7 sekcji to standard złoty?",
        text: "Podział dokumentacji chroni Cię prawnie jako Administratora Danych (ADO) i ułatwia szybkie odnalezienie kluczowych parametrów z poprzednich sesji bez konieczności czytania długich ścian tekstu."
      }
    }
  },
  {
    id: "shortcuts",
    title: "Skróty Klawiszowe i Praca w 60 Sekund",
    subtitle: "Jak wykorzystać 500 wbudowanych szablonów schorzeń, aby skrócić administrację do minimum",
    icon: Keyboard,
    badge: "Produktywność",
    content: {
      intro: "Największą bolączką fizjoterapeutów jest czas poświęcany na papierologię po godzinach pracy. PhysioNotes V2.0 został zaprojektowany w oparciu o ideę 'Keyboard-First', umożliwiającą uzupełnienie pełnej karty wizyty bez odrywania rąk od klawiatury.",
      steps: [
        {
          heading: "Błyskawiczne wyszukiwanie i ładowanie szablonów",
          description: "Wpisz w polu wyszukiwarki szablonów np. 'bark' lub 'kręgosłup'. Aplikacja natychmiast zaproponuje kompletne presety kliniczne zawierające gotowy wywiad, testy obiektywne i zalecenia.",
          tip: "Jednym kliknięciem przycisku 'Wczytaj' wstrzykujesz cały schemat wizyty, który musisz jedynie spersonalizować pod konkretnego pacjenta."
        },
        {
          heading: "Formatowanie tekstu w locie (Rich-Text)",
          description: "Używaj uniwersalnych skrótów klawiszowych, aby wyróżnić najważniejsze informacje dla lekarza lub pacjenta: Ctrl+B (Pogrubienie), Ctrl+I (Kursywa), Ctrl+U (Podkreślenie).",
        },
        {
          heading: "Tworzenie własnej biblioteki presetów",
          description: "Jeśli często pracujesz według autorskich protokołów pooperacyjnych (np. po rekonstrukcji ACL), wypełnij sekcje raz i zapisz je jako własny szablon dostępny w 1 sekundę na każdej kolejnej wizycie.",
        }
      ],
      highlightBox: {
        title: "Oszczędność czasu w praktyce",
        text: "Dzięki szablonom i skrótom średni czas uzupełnienia kompletnej 7-sekcyjnej karty wizyty spada z 8-12 minut do poniżej 60 sekund. Przy 10 pacjentach dziennie oszczędzasz ponad 1,5 godziny każdej doby."
      }
    }
  },
  {
    id: "icd10",
    title: "Kluczowe Kody ICD-10 w Praktyce Fizjoterapeuty",
    subtitle: "Gotowy ściągacz ortopedyczno-neurologiczny z wbudowanej wyszukiwarki aplikacji",
    icon: BookOpen,
    badge: "Wiedza Medyczna",
    content: {
      intro: "PhysioNotes V2.0 posiada wbudowaną bazę klasyfikacji ICD-10 z inteligentnym podpowiadaniem po polskich nazwach schorzeń. Poniżej zestawiliśmy najpopularniejsze kody, które odnajdziesz natychmiast w aplikacji:",
      steps: [
        {
          heading: "M75.1 – Zespół bolesnego barku / Tendinopatia stożka rotatorów",
          description: "Stosowany przy przeciążeniach ścięgien mięśnia nadgrzebieniowego, podgrzebieniowego oraz konfliktach podbarkowych (SAIS).",
        },
        {
          heading: "M54.5 – Ból okolicy lędźwiowo-krzyżowej (Low Back Pain)",
          description: "Uniwersalny kod dla niespecyficznych bólów dolnego odcinka kręgosłupa (LBP), przeciążeń mięśniowo-powięziowych oraz stanów ostrych.",
        },
        {
          heading: "M51.1 – Choroby krążków międzykręgowych z radikulopatią",
          description: "Kluczowy przy przepuklinach jądra miażdżystego (HNP) uciskających korzenie nerwowe, rwie kulszowej oraz rwie udowej.",
        },
        {
          heading: "M25.51 – Ból stawu (Bark) / M25.56 – Ból stawu (Kolano)",
          description: "Stosowany we wczesnych fazach diagnostycznych przed wykonaniem rezonansu magnetycznego (MRI) lub USG tkankowego.",
        },
        {
          heading: "G54.0 – Zaburzenia splotu ramiennego / Rwa barkowa",
          description: "Przydatny w terapii pacjentów z objawami neurologicznymi kończyny górnej, drętwieniem palców i dyskopatią szyjną (C5-C7).",
        }
      ],
      highlightBox: {
        title: "Dlaczego kodowanie ICD-10 jest ważne?",
        text: "Poprawne wpisanie kodu ICD-10 w karcie PhysioNotes nadaje dokumentacji pełną moc prawną przy ubieganiu się pacjenta o odszkodowanie z ZUS/ubezpieczenia prywatnego oraz przy skierowaniach do lekarzy specjalistów."
      }
    }
  },
  {
    id: "rodo-zero-cloud",
    title: "RODO & Bezpieczeństwo Zero-Cloud dla ADO",
    subtitle: "Dlaczego lokalna baza danych przewyższa chmurę pod kątem prawnym i technicznym",
    icon: ShieldCheck,
    badge: "Prawny & RODO",
    content: {
      intro: "W świetle przepisów RODO fizjoterapeuta prowadzący własną praktykę jest Administratorem Danych Osobowych (ADO) pacjentów – w tym danych szczególnie wrażliwych (o stanie zdrowia). Korzystanie z chmury wiąże się z ogromnymi obowiązkami:",
      steps: [
        {
          heading: "Brak konieczności zawierania skomplikowanych umów DPA (Powierzenie RODO)",
          description: "W systemach chmurowych musisz podpisywać i pilnować umów powierzenia przetwarzania danych z dostawcą serwerów. W PhysioNotes V2.0 dane kliniczne nigdy nie opuszczają Twojego komputera, więc nie dochodzi do powierzenia ich osobom trzecim.",
          tip: "To maksymalna uproszczona ścieżka audytowa w razie kontroli UODO."
        },
        {
          heading: "Szyfrowanie AES-256-GCM + Systemowy Pęk Kluczy",
          description: "Każdy wpis w bazie pacjentów jest szyfrowany algorytmem AES-256-GCM. Klucz szyfrujący jest wyliczany z Twojego prywatnego kodu PIN, który trafia do bezpiecznego modułu sprzętowego: macOS Keychain lub Windows Credential Locker.",
        },
        {
          heading: "Ochrona przed kradzieżą fizyczną sprzętu",
          description: "Nawet jeśli Twój laptop zostanie skradziony lub zgubiony w drodze do pacjenta domowego, nikt nie odczyta bazy danych bez podania Twojego kodu PIN. Plik bazy bez PIN-u jest całkowicie nieczytelnym ciągiem znaków.",
        },
        {
          heading: "Wyłączenie z klasyfikacji jako Wyrób Medyczny (MDR 2017/745)",
          description: "Zgodnie z wytycznymi MDCG 2019-11 oprogramowanie służące do rejestracji wywiadów, notatek z wizyt i archiwizacji bez algorytmów automatycznego diagnozowania nie podlega pod restrykcyjne i kosztowne certyfikacje CE wyrobów medycznych.",
        }
      ],
      highlightBox: {
        title: "Pełna Kontrola i Spokój",
        text: "Awaria internetu u dostawców chmurowych potrafi sparaliżować gabinet na cały dzień. Z PhysioNotes V2.0 masz 100% pewności, że otworzysz kartę pacjenta w każdej sekundzie, w piwnicy, w gabinecie czy na wyjeździe sportowym."
      }
    }
  },
  {
    id: "pdf-types",
    title: "Generowanie 3 Typów Dokumentacji PDF",
    subtitle: "Jak profesjonalnie komunikować się z pacjentem i lekarzami ortopedami",
    icon: FileCheck,
    badge: "Wydruki & Eksport",
    content: {
      intro: "Każda wizyta w PhysioNotes V2.0 kończy się możliwością wygenerowania idealnie sformatowanego dokumentu PDF z Twoimi danymi gabinetu, imieniem i nazwiskiem terapeuty oraz datą. Masz do wyboru 3 wyspecjalizowane warianty:",
      steps: [
        {
          heading: "1. Dok. PDF (Pełna Karta Wizyty)",
          description: "Zawiera wszystkie 7 sekcji wywiadu medycznego, testy obiektywne i zastosowane procedury. Idealna do archiwizacji EDM lub jako szczegółowy raport dla lekarza prowadzącego (ortopedy, neurologa).",
        },
        {
          heading: "2. Zalecenia PDF (Dla Pacjenta)",
          description: "Inteligentny wydruk pomijający surowe notatki diagnostyczne, a skupiający się wyłącznie na sekcji 'Ćwiczenia domowe' oraz 'Zalecenia i Edukacja'. Pacjent otrzymuje czytelny plan działania do domu na jedno kliknięcie.",
          tip: "Możesz natychmiast wysłać ten plik pacjentowi na e-mail lub komunikator."
        },
        {
          heading: "3. Raport PDF (Podsumowanie Postępu)",
          description: "Zestawienie postępu z wielu sesji terapeutycznych ukazujące ewolucję objawów i zrealizowane etapy leczenia. Niezastąpione przy ubieganiu się o kontynuację rehabilitacji z funduszy ubezpieczeniowych.",
        }
      ],
      highlightBox: {
        title: "Profesjonalny wizerunek gabinetu",
        text: "Estetyczne, czyste dokumenty PDF z jasnym podziałem na sekcje i kodem ICD-10 budują ogromne zaufanie wśród pacjentów i pozycjonują Cię jako nowoczesnego, rzetelnego specjalistę."
      }
    }
  }
];

export function PhysioNotesKnowHow() {
  const [activeTab, setActiveTab] = useState<string>("soap-7");

  const currentSection = knowHowSections.find((s) => s.id === activeTab) || knowHowSections[0];
  const SectionIcon = currentSection.icon;

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {knowHowSections.map((section) => {
          const TabIcon = section.icon;
          const isActive = section.id === activeTab;
          return (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`text-left p-4 border-2 transition flex flex-col justify-between h-full ${
                isActive
                  ? "border-ink bg-ink text-inverse-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.02]"
                  : "border-ink/30 bg-background hover:border-ink hover:bg-neutral-100 dark:hover:bg-neutral-900/40"
              }`}
            >
              <div>
                <span className={`inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase mb-2 ${
                  isActive ? "bg-emerald-500 text-ink" : "bg-neutral-200 dark:bg-neutral-800 text-muted"
                }`}>
                  {section.badge}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <TabIcon className={`h-4 w-4 shrink-0 ${isActive ? "text-emerald-400" : "text-ink"}`} />
                  <h3 className={`text-xs font-extrabold leading-snug ${isActive ? "text-inverse-ink" : "text-ink"}`}>
                    {section.title}
                  </h3>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content Card */}
      <div className="border-2 border-ink bg-background p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-ink/20">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-ink bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-3">
              <SectionIcon className="h-4 w-4 shrink-0" />
              <span>Know-How &amp; Podręcznik: {currentSection.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              {currentSection.title}
            </h2>
            <p className="mt-1 text-sm font-semibold text-muted">
              {currentSection.subtitle}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-ink font-medium mt-6 mb-8 bg-neutral-100 dark:bg-neutral-900/60 p-4 border-l-4 border-emerald-600">
          {currentSection.content.intro}
        </p>

        {/* Steps / Guide Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {currentSection.content.steps.map((step, idx) => (
            <div 
              key={idx} 
              className="border border-ink/40 p-5 bg-neutral-50 dark:bg-neutral-900/30 flex flex-col justify-between hover:border-ink transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <div>
                <h3 className="text-sm font-extrabold text-ink flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-ink text-inverse-ink text-[11px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step.heading}</span>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted font-medium">
                  {step.description}
                </p>
              </div>
              
              {step.tip && (
                <div className="mt-4 pt-3 border-t border-ink/10 flex items-start gap-2 text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5">
                  <Lightbulb className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>Wskazówka:</strong> {step.tip}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Highlight Box */}
        {currentSection.content.highlightBox && (
          <div className="mt-8 border-2 border-ink bg-ink text-inverse-ink p-6 shadow-[6px_6px_0px_0px_rgba(16,185,129,1)]">
            <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Zap className="h-4 w-4 shrink-0" />
              <span>Podsumowanie Eksperta</span>
            </div>
            <h4 className="text-lg font-bold text-inverse-ink">
              {currentSection.content.highlightBox.title}
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-inverse-ink/80 leading-relaxed font-medium">
              {currentSection.content.highlightBox.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
