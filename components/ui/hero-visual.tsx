"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Terminal, Layers, ArrowUpRight, Cpu, CheckCircle2 } from "lucide-react";

interface HeroVisualProps {
  locale?: string;
}

export function HeroVisual({ locale = "en" }: HeroVisualProps) {
  const [activeTab, setActiveTab] = useState<"logic" | "arch" | "ai">("logic");
  const isPl = locale === "pl";

  const tabs = [
    {
      id: "logic" as const,
      label: isPl ? "01 // DIAGNOSTYKA" : "01 // DIAGNOSTICS",
      icon: Activity,
      subtitle: isPl ? "ANALIZA I DEKONSTRUKCJA PROBLEMÓW" : "PROBLEM ANALYSIS & DECONSTRUCTION",
      title: isPl ? "Myślenie systemowe i UX" : "Systems Thinking & UX",
      status: isPl ? "ETAP 01: LOGIKA" : "STEP 01: LOGIC",
      specs: [
        {
          badge: isPl ? "DEKONSTRUKCJA" : "DECONSTRUCTION",
          title: isPl ? "Analiza złożonych domen" : "Domain Logic Analysis",
          detail: isPl
            ? "Rozbicie skomplikowanych procesów na jasne reguły biznesowe przed kodowaniem."
            : "Breaking complex real-world workflows into clear business rules before coding.",
        },
        {
          badge: isPl ? "INTUICJA UX" : "UX / UI",
          title: isPl ? "Redukcja tarcia (UX/UI)" : "Cognitive Friction Reduction",
          detail: isPl
            ? "Projektowanie intuicyjnych, czytelnych i odpornych na pomyłki ścieżek użytkownika."
            : "Building intuitive, clean, and error-resistant user journeys.",
        },
        {
          badge: isPl ? "DIAGNOSTYKA" : "DIAGNOSTICS",
          title: isPl ? "Eliminacja błędów u źródła" : "Root-Cause Problem Solving",
          detail: isPl
            ? "Systematyczne wykrywanie wąskich gardeł i precyzyjna optymalizacja logiki."
            : "Systematic bottleneck detection and surgical optimization of system logic.",
        },
      ],
      description: isPl
        ? "Traktuję oprogramowanie jak precyzyjny mechanizm: każdy element interfejsu musi mieć jasne zadanie, działać natychmiastowo i wspierać intuicyjną nawigację bez zbędnego tarcia."
        : "I treat software as a precision mechanism: every interface element must serve a clear purpose, respond instantly, and support intuitive navigation without friction.",
    },
    {
      id: "arch" as const,
      label: isPl ? "02 // ARCHITEKTURA" : "02 // ARCHITECTURE",
      icon: Layers,
      subtitle: isPl ? "PROJEKTOWANIE DANYCH I STANU" : "DATA & STATE ENGINEERING",
      title: isPl ? "Solidne fundamenty aplikacji" : "Robust Software Architecture",
      status: isPl ? "ETAP 02: STRUKTURA" : "STEP 02: STRUCTURE",
      specs: [
        {
          badge: isPl ? "STOS TECH" : "TECH STACK",
          title: "Next.js & Server Components",
          detail: isPl
            ? "Nowoczesny App Router, renderowanie po stronie serwera i zoptymalizowany routing."
            : "Modern App Router, server-side rendering, and optimized data fetching.",
        },
        {
          badge: isPl ? "TYPOWANIE" : "TYPE SAFETY",
          title: "TypeScript & Validation",
          detail: isPl
            ? "Spójne modele danych, typy i walidacja tam, gdzie projekt tego wymaga."
            : "Consistent data models, types, and validation where the product requires it.",
        },
        {
          badge: isPl ? "DANE I STAN" : "DATA & STATE",
          title: isPl ? "Relacyjne bazy & Izolacja" : "Relational DBs & State Isolation",
          detail: isPl
            ? "Czysta architektura danych, przewidywalny stan i bezproblemowa skalowalność."
            : "Clean data modeling, predictable state management, and scalable architecture.",
        },
      ],
      description: isPl
        ? "Zanim powstanie kod, projektuję pełną architekturę systemu, relacje w bazie danych i przepływ stanu. Dzięki temu aplikacje są stabilne, bezpieczne i odporne na regresje."
        : "Before any code is written, I architect data relationships and state flow. This foundation ensures applications are stable, secure, and resilient to regressions.",
    },
    {
      id: "ai" as const,
      label: isPl ? "03 // EGZEKUCJA Z AI" : "03 // AI EXECUTION",
      icon: Cpu,
      subtitle: isPl ? "NOWOCZESNY WORKFLOW INŻYNIERSKI" : "MODERN ENGINEERING WORKFLOW",
      title: isPl ? "AI jako silnik wykonawczy" : "AI as Execution Engine",
      status: isPl ? "ETAP 03: PRĘDKOŚĆ" : "STEP 03: VELOCITY",
      specs: [
        {
          badge: isPl ? "ORKIESTRACJA" : "ORCHESTRATION",
          title: isPl ? "Zaawansowany prompt & LLM" : "Advanced Prompting & LLMs",
          detail: isPl
            ? "Wykorzystanie modeli AI do błyskawicznego tworzenia kodu pod ścisłym nadzorem."
            : "Leveraging AI models for rapid code generation under strict architectural oversight.",
        },
        {
          badge: isPl ? "JAKOŚĆ KODU" : "CODE QUALITY",
          title: "Clean code review",
          detail: isPl
            ? "Weryfikacja wygenerowanego kodu, modularność i ograniczanie zbędnych bibliotek."
            : "Reviewing generated code, keeping modules small, and limiting unnecessary dependencies.",
        },
        {
          badge: isPl ? "WYDAJNOŚĆ" : "PERFORMANCE",
          title: isPl ? "Szybkie interfejsy" : "Fast interfaces",
          detail: isPl
            ? "Lekki frontend, płynne animacje i regularna kontrola wydajności."
            : "Lightweight frontend, smooth transitions, and regular performance checks.",
        },
      ],
      description: isPl
        ? "Korzystam z modeli AI jako wsparcia wykonawczego, ale decyzje projektowe, przegląd kodu i odpowiedzialność za jakość zostają po mojej stronie."
        : "I use AI models as execution support, while product decisions, code review, and quality ownership stay on my side.",
    },
  ];

  const current = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden border border-ink bg-surface p-4 sm:p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
      aria-label="AI Product Builder workflow and engineering specifications"
    >
      {/* Corner Crosshairs (Industrial Brutalist motif) */}
      <span className="pointer-events-none absolute left-1.5 top-1 font-mono text-[10px] text-muted opacity-40">+</span>
      <span className="pointer-events-none absolute right-1.5 top-1 font-mono text-[10px] text-muted opacity-40">+</span>
      <span className="pointer-events-none absolute bottom-1 left-1.5 font-mono text-[10px] text-muted opacity-40">+</span>
      <span className="pointer-events-none absolute bottom-1 right-1.5 font-mono text-[10px] text-muted opacity-40">+</span>

      {/* Top Header Rail */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-ink/20 pb-3 font-mono text-[11px] uppercase tracking-wider text-muted">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-ink shrink-0" />
          <span className="font-semibold text-ink">SYS.ENGINE // AI PRODUCT BUILDER</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-[10px] tracking-widest text-ink font-bold">
            {isPl ? "STATUS: GOTOWY DO PRACY" : "STATUS: ONLINE & READY"}
          </span>
        </div>
      </div>

      {/* Navigation / Step Switcher */}
      <div className="mb-6 grid grid-cols-3 gap-1 border border-ink/20 bg-background/50 p-1 font-mono text-[11px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-1.5 py-2 px-1 text-center transition-all ${
                isActive
                  ? "bg-ink text-inverse-ink font-bold shadow-sm"
                  : "text-muted hover:text-ink hover:bg-ink/5"
              }`}
              type="button"
            >
              <Icon size={13} className={isActive ? "text-inverse-ink shrink-0" : "text-muted shrink-0"} />
              <span className="truncate text-[10px] sm:text-[11px] tracking-tight">{tab.label.split("// ")[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline border-l-2 border-ink pl-3.5">
          <div>
            <span className="micro-label text-[10px] tracking-widest text-muted">{current.subtitle}</span>
            <h3 className="mt-0.5 text-xl sm:text-2xl font-black tracking-tight text-ink">
              {current.title}
            </h3>
          </div>
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 border border-ink/30 bg-ink/5 text-ink self-start sm:self-auto shrink-0">
            [ {current.status} ]
          </span>
        </div>

        {/* Crisp Specs Grid (Replaces random progress bars) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="space-y-2.5 pt-1"
          >
            {current.specs.map((spec, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 p-3 border border-ink/15 bg-background/60 hover:border-ink/30 transition-colors"
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-ink bg-ink/5 px-1.5 py-0.5 border border-ink/20">
                    {spec.badge}
                  </span>
                  <span className="font-semibold text-xs sm:text-sm text-ink">{spec.title}</span>
                </div>
                <span className="text-xs text-muted sm:text-right font-sans leading-relaxed">
                  {spec.detail}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Architecture & Mindset Summary */}
        <p className="border-t border-ink/15 pt-3.5 text-xs sm:text-sm leading-relaxed text-muted font-sans">
          {current.description}
        </p>
      </div>

      {/* Bottom Clean Rail (Replaces barcode) */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-ink/20 pt-3 font-mono text-[10px] text-muted">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
          <span className="font-semibold text-ink tracking-wider">
            {isPl ? "SKUPIENIE: APLIKACJE WEBOWE I PRODUKTY" : "FOCUS: WEB APPLICATIONS & PRODUCT SYSTEMS"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-ink font-bold tracking-tight">
          <span>{isPl ? "WORKFLOW: PRECYZJA & AI" : "WORKFLOW: PRECISION & AI"}</span>
          <ArrowUpRight size={12} />
        </div>
      </div>
    </div>
  );
}
