export const locales = ["pl", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function alternateLocale(locale: Locale) {
  return locale === "pl" ? "en" : "pl";
}

export const dictionary = {
  pl: {
    nav: {
      home: "Start",
      projects: "Projekty",
      about: "O mnie",
      contact: "Kontakt",
    },
    legal: {
      privacy: "Polityka Prywatności",
      terms: "Regulamin i EULA",
      cookies: "Ustawienia Cookies",
    },
    cookiesBanner: {
      title: "Prywatność i pliki cookies",
      body: "Ta strona wykorzystuje wyłącznie niezbędne mechanizmy pamięci lokalnej do prawidłowego działania serwisu oraz weryfikacji preferencji i sesji. Nie śledzimy Twojej aktywności do celów reklamowych ani nie przekazujemy danych podmiotom trzecim.",
      accept: "Rozumiem i akceptuję",
      settings: "Polityka prywatności",
    },
    actions: {
      viewProjects: "Zobacz projekty",
      contactMe: "Kontakt",
      demo: "Demo",
      github: "GitHub",
      caseStudy: "Case study",
      readCaseStudy: "Czytaj case study",
      downloadCv: "Pobierz CV",
    },
    home: {
      eyebrow: "Portfolio // Architektura & AI",
      title: "Jakub Dyrszka",
      role: "Frontend Engineer",
      tagline: "Buduję szybkie, czytelne i praktyczne aplikacje webowe.",
      intro:
        "Tworzę aplikacje, które zaczynają się od dobrze zrozumianego problemu: workflow użytkownika, ograniczeń technicznych i decyzji, które naprawdę wpływają na produkt. AI przyspiesza wykonanie, ale kierunek, architektura i kontrola jakości pozostają po mojej stronie.",
      featured: "Wybrane projekty",
      stack: "Tech Stack",
      approach: "Jak pracuję",
      aiSection: "Nowoczesny warsztat inżynieryjny",
      timeline: "Historia",
      contact: "Kontakt",
    },
    about: {
      eyebrow: "O mnie",
      title: "Architektura systemów i intuicyjny interfejs",
      body: "Do projektowania aplikacji podchodzę analitycznie: badam workflow, szukam przyczyn problemów i dopiero potem dobieram rozwiązania techniczne. Buduję interfejsy i systemy frontendowe nastawione na czytelność, wydajność i codzienną użyteczność.",
    },
    approach: {
      eyebrow: "Podejście",
      title: "Jak pracuję",
      cards: [
        {
          title: "Diagnoza przed kodem",
          body: "Analizuję workflow użytkownika i ograniczenia techniczne przed napisaniem pierwszej linii kodu. Dobra architektura oszczędza tygodnie kosztownej refaktoryzacji.",
        },
        {
          title: "Akceleracja i weryfikacja AI",
          body: "Wykorzystuję modele językowe do szybkiego prototypowania, porównywania wariantów i znajdowania edge case'ów. Oszczędzony czas inwestuję w przegląd kodu, dostępność i optymalizację wydajności.",
        },
        {
          title: "Odpowiedzialność za produkt",
          body: "Prowadzę projekt od pomysłu do działającego wdrożenia. Decyzje techniczne oceniam przez wpływ na użytkownika, stabilność i łatwość dalszego rozwoju.",
        },
      ],
    },
    aiSection: {
      eyebrow: "AI & Architektura",
      title: "Nowoczesny warsztat AI Product Buildera",
      body: "Sztuczna inteligencja przyspiesza wykonanie, ale nie zastępuje odpowiedzialności za produkt. Używam modeli AI do prototypowania, automatyzacji powtarzalnych zadań i analizy edge case'ów. Projektowanie systemu, bezpieczeństwo danych i kontrola jakości traktuję jako część pracy człowieka, nie modelu.",
    },
    timeline: {
      eyebrow: "Historia",
      title: "Moja ścieżka: od pomysłu do cyfrowych produktów z AI",
    },
    projects: {
      title: "Projekty",
      subtitle:
        "Każdy projekt ma osobny adres URL, szczegółowy opis procesu oraz dokumentację decyzji architektonicznych.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Kontakt",
      subtitle: "Najlepsze projekty zaczynają się od precyzyjnie zdefiniowanego problemu. Porozmawiajmy o rozwiązaniach.",
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms & EULA",
      cookies: "Cookie Settings",
    },
    cookiesBanner: {
      title: "Privacy & Cookies",
      body: "This website uses only essential local storage mechanisms required for proper operation, preferences, and session verification. We do not track your activity for advertising purposes nor sell your data to third parties.",
      accept: "Got it & Accept",
      settings: "Privacy Policy",
    },
    actions: {
      viewProjects: "View Projects",
      contactMe: "Contact",
      demo: "Demo",
      github: "GitHub",
      caseStudy: "Case Study",
      readCaseStudy: "Read Case Study",
      downloadCv: "Download CV",
    },
    home: {
      eyebrow: "Portfolio // Architecture & AI",
      title: "Jakub Dyrszka",
      role: "Frontend Engineer",
      tagline: "Building fast, clear, and practical web applications.",
      intro:
        "I build applications by starting with the real problem: user workflows, technical constraints, and product decisions that matter. AI speeds up execution, while direction, architecture, and quality control stay with me.",
      featured: "Featured Projects",
      stack: "Tech Stack",
      approach: "How I Work",
      aiSection: "Modern Engineering Workflow",
      timeline: "Timeline",
      contact: "Contact",
    },
    about: {
      eyebrow: "Background",
      title: "Systems Architecture & Intuitive Interfaces",
      body: "I approach software development through systematic diagnosis: user workflows, root causes, and technical constraints before implementation. The result is frontend software designed for clarity, speed, accessibility, and daily use.",
    },
    approach: {
      eyebrow: "Approach",
      title: "How I work",
      cards: [
        {
          title: "Diagnosis Before Code",
          body: "I map user workflows and technical constraints before touching the keyboard. Solid architectural planning prevents costly refactoring later.",
        },
        {
          title: "AI Acceleration & Verification",
          body: "I use language models to prototype quickly, compare options, and uncover edge cases. The saved implementation time goes back into code review, accessibility, and performance work.",
        },
        {
          title: "End-to-End Ownership",
          body: "I take projects from initial concept to working deployment. Technical decisions are measured by their effect on users, reliability, and future maintainability.",
        },
      ],
    },
    aiSection: {
      eyebrow: "AI & Architecture",
      title: "Modern AI Product Builder Workflow",
      body: "Artificial intelligence speeds up execution, but it does not replace product responsibility. I use LLMs for prototyping, repetitive tasks, and edge-case analysis. System design, data safety, and code quality stay on the human side of the workflow.",
    },
    timeline: {
      eyebrow: "Journey",
      title: "My journey: from concepts to AI-built products",
    },
    projects: {
      title: "Projects",
      subtitle:
        "Every project has its own dedicated URL, process documentation, and architectural decision log.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact",
      subtitle: "The best projects start with a well-defined problem. Let's discuss solutions.",
    },
  },
} as const;
