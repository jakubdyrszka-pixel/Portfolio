import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { PhysioNotesLandingClient } from "@/components/physionotes/PhysioNotesLandingClient";
import { PhysioNotesGallery } from "@/components/physionotes/PhysioNotesGallery";
import { PhysioNotesKnowHow } from "@/components/physionotes/PhysioNotesKnowHow";
import { PhysioNotesFAQ } from "@/components/physionotes/PhysioNotesFAQ";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "PhysioNotes V2.0 | Elektroniczna Dokumentacja Medyczna & Zero-Cloud",
  description:
    "Suwerenna, natywna aplikacja desktopowa dla fizjoterapeutów z lokalnym szyfrowaniem bazy danych AES-256-GCM, biblioteką szablonów i pełną zgodnością RODO jako ADO.",
};

export default function PhysioNotesPage() {
  const project = getProject("physionotes");

  if (!project) {
    return null;
  }

  const content = project.pl;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-ink bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-10">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 text-sm font-bold">
          <Link className="flex items-center gap-2.5" href="/pl">
            <span className="h-3 w-3 rounded-full border border-ink bg-emerald-500" aria-hidden="true" />
            <span className="tracking-tight">Jakub Dyrszka / Portfolio</span>
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link className="text-muted hover:text-ink transition font-extrabold" href="/pl/projects">
              ← Wszystkie projekty
            </Link>
          </div>
        </nav>
      </header>

      {/* Interactive Hero & Licensing/Clerk Portal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-4">
        <PhysioNotesLandingClient />
      </div>

      {/* Quick Architecture Bar */}
      <Section className="border-b border-ink bg-background">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="border-2 border-ink p-5 bg-neutral-50 dark:bg-neutral-900/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Architektura</h3>
            <p className="mt-2 text-sm font-extrabold text-ink">Zero-Cloud / Local-First</p>
          </div>
          <div className="border-2 border-ink p-5 bg-neutral-50 dark:bg-neutral-900/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Szyfrowanie</h3>
            <p className="mt-2 text-sm font-extrabold text-ink">AES-256-GCM + klucz w Keychain</p>
          </div>
          <div className="border-2 border-ink p-5 bg-neutral-50 dark:bg-neutral-900/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Kompatybilność</h3>
            <p className="mt-2 text-sm font-extrabold text-ink">macOS (Apple Silicon &amp; Intel) / Win</p>
          </div>
          <div className="border-2 border-ink p-5 bg-neutral-50 dark:bg-neutral-900/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Status prawny</h3>
            <p className="mt-2 text-sm font-extrabold text-ink">Narzędzie administracyjne EDM</p>
          </div>
        </div>
      </Section>

      {/* Detailed Case Study & Zero-Cloud Philosophy */}
      <Section 
        eyebrow="Filozofia Produktu • RODO & Prywatność"
        title="Dlaczego PhysioNotes działa lokalnie w modelu Zero-Cloud?"
        className="border-b border-ink"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm leading-relaxed text-ink font-semibold bg-neutral-100 dark:bg-neutral-900/60 p-4 border-l-4 border-ink">
              {content.problem}
            </p>
            <p className="text-sm leading-relaxed text-muted">
              W tradycyjnych chmurowych systemach medycznych awaria internetu lub awaria serwera chmurowego oznacza natychmiastową blokadę dostępu do kart pacjentów. Ponadto fizjoterapeuta jako Administrator Danych Osobowych (ADO) musi powierzać wrażliwe dane zdrowotne podmiotom trzecim (złożone umowy DPA / powierzenie RODO).
            </p>
            <p className="text-sm font-extrabold text-ink leading-relaxed">
              PhysioNotes zmienia ten paradygmat: licencja i telemetria są weryfikowane przez Twoje konto na tej stronie (Clerk), ale cała kliniczna baza pacjentów spoczywa WYŁĄCZNIE na Twoim dysku, zabezpieczona Twoim prywatnym kodem PIN.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.features.map((feature, idx) => (
              <div 
                key={idx} 
                className="border-2 border-ink bg-neutral-50 dark:bg-neutral-900/30 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 transition"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 border border-ink bg-ink text-inverse-ink text-[10px] font-bold uppercase mb-3">
                    Moduł 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-extrabold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted font-medium">{feature.body}</p>
                </div>
              </div>
            ))}
            <div className="border-2 border-ink bg-emerald-50 dark:bg-emerald-950/20 p-6 shadow-[6px_6px_0px_0px_rgba(16,185,129,1)] flex flex-col justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 border border-emerald-600 bg-emerald-600 text-white text-[10px] font-bold uppercase mb-3">
                  Zgodność MDR
                </span>
                <h3 className="text-lg font-extrabold text-ink">Wyłączenie MDR 2017/745</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted font-medium">
                  Zgodnie z wytycznymi MDCG 2019-11 oprogramowanie służące wyłącznie do archiwizacji wywiadów, notatek z wizyt i wystawiania dokumentów bez algorytmów diagnozowania nie stanowi wyrobu medycznego.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Interactive Screenshot Showcase & Gallery */}
      <Section
        eyebrow="Przegląd Interfejsu • Właściwości Techniczne"
        title="Galeria Zrzutów Ekranu w Czasie Rzeczywistym"
        className="border-b border-ink"
      >
        <PhysioNotesGallery />
      </Section>

      {/* Comprehensive Know-How & Clinical Practice Guide */}
      <Section
        eyebrow="Podręcznik Praktyki Klinicznej • EDM"
        title="Know-How Fizjoterapeuty w PhysioNotes V2.0"
        className="border-b border-ink"
      >
        <PhysioNotesKnowHow />
      </Section>

      {/* FAQ Section */}
      <Section
        eyebrow="Pytania i Odpowiedzi • Baza Wiedzy"
        title="Najczęściej Zadawane Pytania (FAQ)"
        className="border-b border-ink"
      >
        <PhysioNotesFAQ />
      </Section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center text-xs font-bold text-muted border-t border-ink bg-background">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Jakub Dyrszka. Wszystkie prawa zastrzeżone. PhysioNotes V2.0.</p>
          <div className="flex items-center gap-6">
            <Link href="/pl" className="hover:text-ink transition">Strona główna</Link>
            <Link href="/pl/projects" className="hover:text-ink transition">Portfolio</Link>
            <a href="https://github.com/jakubdyrszka-pixel/PhysioNotes" target="_blank" rel="noreferrer" className="hover:text-ink transition">GitHub Repository</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
