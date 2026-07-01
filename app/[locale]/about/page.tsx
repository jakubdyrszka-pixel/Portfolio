import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { dictionary, isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description: "About Jakub Dyrszka — building digital products with AI and systems logic.",
};

const processSteps = {
  en: [
    { title: "Observe & Logic", desc: "Understanding the core domain problem without getting lost in syntax." },
    { title: "System Architecture", desc: "Designing relational models, workflows, and clean data structures." },
    { title: "AI Generation", desc: "Leveraging modern AI to write high-quality, maintainable code rapidly." },
    { title: "Verify & Test", desc: "Strictly testing edge cases and validating business logic in production." },
  ],
  pl: [
    { title: "Obserwacja i Logika", desc: "Zrozumienie istoty problemu bez gubienia się w zawiłościach składni." },
    { title: "Architektura Systemu", desc: "Projektowanie modeli relacyjnych, przepływów i struktury danych." },
    { title: "Generowanie z AI", desc: "Wykorzystanie nowoczesnego AI do błyskawicznego pisania czystego kodu." },
    { title: "Weryfikacja i Testy", desc: "Rygorystyczne testowanie logiki biznesowej i przypadków brzegowych." },
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = dictionary[locale];
  const steps = processSteps[locale];

  return (
    <>
      <Section eyebrow="ABOUT / STORY" title={t.about.title} className="border-t-0">
        <p className="max-w-4xl text-2xl leading-10 text-muted">{t.about.body}</p>
      </Section>
      <Section dark eyebrow="TIMELINE / PROCESS" title={locale === "pl" ? "Moja ścieżka: od pomysłu do produktu z AI" : "My journey: from concepts to AI-built products"}>
        <div className="grid gap-5">
          {steps.map((step, index) => (
            <div className="grid gap-4 border border-inverse-ink p-5 md:grid-cols-[8rem_1fr]" key={step.title}>
              <p className="micro-label">00{index + 1}</p>
              <div>
                <h3 className="text-2xl font-black md:text-3xl">{step.title}</h3>
                <p className="mt-2 text-base font-normal text-muted md:text-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

