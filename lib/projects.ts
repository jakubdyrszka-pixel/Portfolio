import { Activity, Calculator, CalendarClock, PanelsTopLeft } from "lucide-react";

export const techStackCategories = [
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "Prisma", "PostgreSQL", "Supabase"] },
  { label: "Auth", items: ["Clerk"] },
  { label: "Infrastructure", items: ["Docker", "Git", "Vercel"] },
  { label: "Integrations", items: ["Resend", "OpenAI"] },
] as const;

// Keep flat export for backwards compat (e.g. project slugs page)
export const techStack = techStackCategories.flatMap((c) => c.items);

export const projects = [
  {
    slug: "physionotes",
    icon: Activity,
    featured: true,
    title: "PhysioNotes",
    category: "Desktop Application",
    status: "Completed",
    role: "AI Product Builder",
    metrics: ["Offline-first", "ICD-10 coding", "PDF export", "Zero cloud"],
    stack: ["React", "Electron", "TypeScript", "Node.js", "Tailwind"],
    links: {
      github: "https://github.com/jakubdyrszka-pixel/PhysioNotes",
    },
    images: [
      "/images/physionotes/Screenshot%202026-07-01%20at%2013.13.58.png",
      "/images/physionotes/Screenshot%202026-07-01%20at%2013.11.10.png",
      "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.16.png",
      "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.24.png",
      "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.46.png",
      "/images/physionotes/Screenshot%202026-07-01%20at%2013.10.57.png"
    ],
    pl: {
      summary:
        "Profesjonalna aplikacja desktopowa do generowania dokumentacji medycznej dla fizjoterapeutów.",
      problem:
        "Fizjoterapeuci potrzebują szybkiego narzędzia do prowadzenia dokumentacji, które działa lokalnie i nie wymaga połączenia z chmurą.",
      research:
        "Wymagania skupiają się na szybkości wprowadzania danych, lokalnym przechowywaniu oraz wsparciu kodów ICD-10.",
      features: [
        {
          title: "Zarządzanie pacjentami",
          body: "Szybkie wyszukiwanie i pełna historia leczenia dostępna na urządzeniu bez opóźnień chmurowych.",
        },
        {
          title: "Edytor medyczny",
          body: "Dokumentacja 7-sekcyjna z obsługą kodów ICD-10 i eksportem do PDF, zaprojektowana pod realny wywiad z pacjentem.",
        },
        {
          title: "Prywatność offline",
          body: "Dane są przechowywane na urządzeniu z wykorzystaniem izolacji kontekstu w Electronie oraz lokalnej bazy danych.",
        },
      ],
      challenges:
        "Integracja Electron z izolacją kontekstu i obsługą lokalnej bazy danych bez zależności od infrastruktury chmurowej.",
      lessons:
        "Architektura offline-first wymaga rygorystycznego zarządzania stanem i synchronizacji błędów bez polegania na infrastrukturze chmurowej.",
    },
    en: {
      summary:
        "Professional desktop application for generating clinical medical documentation.",
      problem:
        "Physiotherapists need a fast documentation tool that works locally and does not depend on a cloud connection.",
      research:
        "Requirements center on rapid data entry, local storage, and ICD-10 coding support.",
      features: [
        {
          title: "Patient Management",
          body: "Fast searching and comprehensive treatment history available on device with zero cloud latency.",
        },
        {
          title: "Medical Editor",
          body: "7-section documentation with ICD-10 code support and PDF export, structured around real clinical interviews.",
        },
        {
          title: "Privacy (Offline)",
          body: "Data is stored on the device using Electron context isolation and a local database.",
        },
      ],
      challenges:
        "Integrating Electron with context isolation and a reliable local data layer without cloud dependencies.",
      lessons:
        "Building offline-first desktop applications enforces rigorous state management and error handling without cloud dependencies.",
    },
  },
  {
    slug: "classflow",
    icon: CalendarClock,
    featured: true,
    title: "ClassFlow",
    category: "SaaS Platform",
    status: "Completed",
    role: "AI Product Builder",
    metrics: ["5 user roles", "20+ DB tables", "RBAC", "QR Check-in", "Realtime"],
    stack: ["Next.js", "React 19", "TypeScript", "Prisma", "Tailwind"],
    links: {
      github: "https://github.com/jakubdyrszka-pixel/ClassFlow",
    },
    pl: {
      summary:
        "Kompleksowa platforma SaaS do zarządzania studiami fitness i harmonogramami zajęć.",
      problem:
        "Zarządzanie studiem wymaga spójnego wsparcia dla 5 ról użytkowników, sprawnych rezerwacji oraz bezbłędnej weryfikacji obecności na zajęciach.",
      research:
        "Aplikacja musi obsługiwać złożone harmonogramy i system odpraw w czasie rzeczywistym. Zaprojektowałem schemat relacyjnej bazy danych (20+ tabel) w Prisma i rygorystyczne reguły biznesowe.",
      features: [
        {
          title: "Rezerwacje na żywo",
          body: "Błyskawiczne zapisy na zajęcia i czytelny harmonogram działający z optymistycznymi aktualizacjami UI.",
        },
        {
          title: "Kontrola dostępu RBAC",
          body: "Osobne interfejsy i rygorystyczne uprawnienia dla klientów, instruktorów, recepcji i administratorów.",
        },
        {
          title: "System Odpraw QR",
          body: "Szybkie rejestrowanie obecności na zajęciach za pomocą generowanych kodów QR i weryfikacji w czasie rzeczywistym.",
        },
      ],
      challenges:
        "Zarządzanie stanem i uprawnieniami w Next.js przy wielu rolach oraz synchronizacja relacyjnych danych za pomocą Prisma.",
      lessons:
        "Projektowanie pełnoskalowego SaaS wymaga przemyślanej architektury bazy danych, ścisłej kontroli dostępu i wydajnych aktualizacji w czasie rzeczywistym.",
    },
    en: {
      summary:
        "Comprehensive SaaS platform for fitness studio management and real-time class scheduling.",
      problem:
        "Managing a modern studio demands seamless support for 5 distinct user roles, fluid class scheduling, and reliable attendance tracking.",
      research:
        "The system must handle intricate scheduling and instant check-ins. I designed a relational database schema (20+ tables) in Prisma enforced by strict business rules.",
      features: [
        {
          title: "Real-Time Booking",
          body: "Fast class enrollment and responsive scheduling powered by optimistic UI updates.",
        },
        {
          title: "Role-Based Access (RBAC)",
          body: "Separate interfaces and strict permission boundaries for clients, instructors, receptionists, and admins.",
        },
        {
          title: "QR Check-in System",
          body: "Instant attendance tracking for classes using dynamically generated QR codes and real-time verification.",
        },
      ],
      challenges:
        "Architecting multi-role state and permissions in Next.js while synchronizing complex relational data via Prisma.",
      lessons:
        "Building a full-scale SaaS demands robust database architecture, strict role-based access control, and real-time state synchronization.",
    },
  },
  {
    slug: "powerlifting-calculator",
    icon: Calculator,
    featured: true,
    title: "Powerlifting Calculator",
    category: "Web Application",
    status: "Completed",
    role: "AI Product Builder",
    metrics: ["Wilks", "IPF GL", "DOTS", "Zero dependencies"],
    stack: ["HTML", "CSS", "JavaScript", "Vanilla"],
    links: {
      github: "https://github.com/jakubdyrszka-pixel/Powerlifting-calculator-with-comparison",
      demo: "https://powerlifting-calculator-zeta.vercel.app",
    },
    pl: {
      summary:
        "Minimalistyczna aplikacja webowa do obliczania i porównywania wyników w trójboju siłowym na żywo.",
      problem:
        "Zawodnicy na pomoście potrzebują natychmiastowego porównania wyników w różnych systemach punktacji (Wilks, IPF GL, DOTS).",
      research:
        "Kluczowe było wyeliminowanie opóźnień sieciowych i zewnętrznych zależności. Cała logika matematyczna działa w czasie rzeczywistym po stronie klienta.",
      features: [
        {
          title: "Wiele systemów punktacji",
          body: "Błyskawiczne przeliczanie wyników w klasyfikacjach Wilks, IPF GL i DOTS z poziomu jednego formularza.",
        },
        {
          title: "Ciężar do pokonania",
          body: "Automatyczne wyliczanie, ile kilogramów trzeba podnieść, by przebić najwyższy aktualny wynik w rankingu.",
        },
        {
          title: "Ranking na żywo",
          body: "Zapisywanie wyników i dynamiczne klasyfikowanie zawodników podczas sesji treningowej lub zawodów.",
        },
      ],
      challenges:
        "Zaimplementowanie złożonej logiki matematycznej i responsywnego interfejsu w czystym Vanilla JavaScript bez frameworków.",
      lessons:
        "Praca bez zewnętrznych bibliotek uczy szacunku do wydajności i dowodzi, że prosty, natywny kod jest często najlepszym rozwiązaniem.",
    },
    en: {
      summary:
        "Minimalist web application for calculating and comparing live powerlifting scores.",
      problem:
        "Powerlifters on the platform need instant score comparison across multiple federations and formulas (Wilks, IPF GL, DOTS).",
      research:
        "Eliminating network latency and dependency overhead was essential. All algorithmic logic executes locally in real time on the client.",
      features: [
        {
          title: "Multi-System Scoring",
          body: "Instantly calculates Wilks, IPF GL, and DOTS scores from a single clean interface.",
        },
        {
          title: "Weight to Beat",
          body: "Automatically shows exactly how many kilograms are needed to beat the current leader in the ranking.",
        },
        {
          title: "Live Comparison",
          body: "Saves results and dynamically ranks multiple athletes during a training session or competition.",
        },
      ],
      challenges:
        "Implementing complex mathematical scoring formulas and a responsive UI in pure Vanilla JavaScript without external frameworks.",
      lessons:
        "Building without dependencies enforces performance discipline and proves that simplicity and native browser APIs often beat complexity.",
    },
  },
  {
    slug: "portfolio",
    icon: PanelsTopLeft,
    featured: false,
    title: "Portfolio",
    category: "Frontend System",
    status: "Ongoing",
    role: "AI Product Builder",
    metrics: ["i18n", "SEO", "Case studies", "Design system"],
    stack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    links: {
      demo: "https://jakubdyrszka.dev",
    },
    pl: {
      summary:
        "System portfolio zaprojektowany jako produkt — dowód na to, jak daleko można zajść z podstawami kodu, silną logiką i AI.",
      problem:
        "Chciałem pokazać nie tylko listę technologii, ale też proces: jak definiuję problem, układam architekturę i wykorzystuję AI jako wsparcie wykonawcze.",
      research:
        "Wymagania obejmują osobne URL-e projektów, responsywność, wydajność, SEO i uczciwą narrację o roli AI w moim warsztacie.",
      features: [
        {
          title: "Design System",
          body: "Spójny, oszczędny styl inspirowany dokumentacją techniczną, utrzymywany bez zbędnych dekoracji.",
        },
        {
          title: "Szczere Case Studies",
          body: "Każdy projekt pokazuje problem, decyzje techniczne, ograniczenia i rolę AI w procesie.",
        },
        {
          title: "SEO i i18n",
          body: "Pełne wsparcie dla dwóch języków (PL/EN) oraz optymalizacja pod silniki wyszukiwania.",
        },
      ],
      challenges:
        "Najważniejsze było zachowanie szczerości bez przesady: AI jest częścią warsztatu, ale projekt, decyzje i odpowiedzialność muszą być czytelne.",
      lessons:
        "Portfolio powinno pokazywać nie tylko efekt wizualny, ale też sposób myślenia, ograniczenia projektu i jakość wykonania.",
    },
    en: {
      summary:
        "A portfolio system designed as a product — proof of how far you can go with coding basics, strong logic, and AI.",
      problem:
        "I wanted to show more than a technology list: how I frame problems, plan architecture, and use AI as execution support.",
      research:
        "Requirements include individual project URLs, responsiveness, performance, SEO, and honest storytelling about AI in my workflow.",
      features: [
        {
          title: "Design System",
          body: "A cohesive, monochrome style inspired by technical systems manuals, keeping focus on structure and content.",
        },
        {
          title: "Transparent Case Studies",
          body: "Every project shows the problem, technical choices, constraints, and the role AI played in the process.",
        },
        {
          title: "SEO & i18n",
          body: "Full bilingual support (PL/EN) and search engine optimization built into the core architecture.",
        },
      ],
      challenges:
        "Keeping the story honest without overstating it: AI is part of the workflow, but product judgment and responsibility need to stay visible.",
      lessons:
        "A portfolio should show more than the visual result: it should reveal thinking, constraints, and execution quality.",
    },
  },
] as const;

export type Project = (typeof projects)[number];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
