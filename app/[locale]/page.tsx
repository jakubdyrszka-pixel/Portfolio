import type { Metadata } from "next";
import {
  Brain,
  FileText,
  Github,
  Instagram,
  Mail,
  Package,
  Puzzle,
} from "lucide-react";
import { MotionDiv, reveal, stagger, transition } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { HeroVisual } from "@/components/ui/hero-visual";
import { ApproachCard } from "@/components/ui/approach-card";
import { TechStackCard } from "@/components/ui/tech-stack-card";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { dictionary, isLocale, type Locale } from "@/lib/i18n";
import { projects, techStackCategories } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const language = isLocale(locale) ? locale : "en";

  return {
    title:
      language === "pl"
        ? "Jakub Dyrszka | AI Product Builder"
        : "Jakub Dyrszka | AI Product Builder",
    description:
      language === "pl"
        ? "Portfolio twórcy produktów cyfrowych — budowanie zaawansowanych aplikacji dzięki logice i AI."
        : "AI Product Builder portfolio — building complex software through systems logic and AI.",
    alternates: {
      canonical: `/${language}`,
      languages: { pl: "/pl", en: "/en" },
    },
  };
}

const timelineEntriesEn: TimelineEntry[] = [
  { label: "Analytical Foundations", note: "Academic background focused on precision diagnostics and systematic problem-solving" },
  { label: "Discovered programming", note: "Mastering web development fundamentals: HTML5, CSS3, and JavaScript" },
  { label: "Built first web applications", note: "Developing standalone web applications without frameworks" },
  { label: "PhysioNotes", note: "Offline-first medical documentation app (React, Electron, TypeScript)" },
  { label: "Powerlifting Analytics", note: "Real-time powerlifting scoring and comparison engine" },
  { label: "ClassFlow", note: "Full-scale SaaS management platform (Next.js, Prisma, TypeScript)" },
  { label: "Next challenge", current: true, note: "Ready to architect and build high-impact digital products with logic and AI" },
];

const timelineEntriesPl: TimelineEntry[] = [
  { label: "Analityczne fundamenty", note: "Studia z naciskiem na precyzyjną diagnostykę i systemowe rozwiązywanie problemów" },
  { label: "Odkrycie programowania", note: "Fundamenty web developmentu: HTML5, CSS3 i Vanilla JavaScript" },
  { label: "Pierwsze aplikacje", note: "Samodzielne aplikacje webowe bez użycia frameworków" },
  { label: "PhysioNotes", note: "Aplikacja desktopowa dla fizjoterapeutów (React, Electron, TypeScript)" },
  { label: "Powerlifting Analytics", note: "Kalkulator trójbojowy z porównywaniem wyników na żywo" },
  { label: "ClassFlow", note: "Platforma SaaS dla studiów fitness (Next.js, Prisma, TypeScript)" },
  { label: "Następne wyzwanie", current: true, note: "Gotowy do budowania zaawansowanych produktów przy użyciu AI i silnej logiki" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = dictionary[locale];
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const timelineEntries = locale === "pl" ? timelineEntriesPl : timelineEntriesEn;

  const approachIcons = [Puzzle, Brain, Package] as const;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-36">
        <MotionDiv
          className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Left */}
          <MotionDiv className="flex flex-col gap-7" variants={reveal} transition={transition}>
            <div>
              <p className="micro-label mb-3">{t.home.role}</p>
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Jakub Dyrszka
              </h1>
              <p className="mt-4 text-xl font-medium tracking-tight text-muted sm:text-2xl">
                {t.home.tagline}
              </p>
            </div>

            <p className="max-w-lg text-base leading-relaxed text-muted">
              {t.home.intro}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button href={`/${locale}/projects`}>{t.actions.viewProjects}</Button>
              <Button href={`/${locale}/contact`} variant="secondary">
                {t.actions.contactMe}
              </Button>
              <Button href="/cv.pdf" variant="ghost" external>
                <FileText size={14} aria-hidden="true" />
                {t.actions.downloadCv}
              </Button>
            </div>
          </MotionDiv>

          {/* Right — interactive systems telemetry visual */}
          <MotionDiv
            variants={reveal}
            transition={{ ...transition, delay: 0.12 }}
            className="w-full mt-6 lg:mt-0"
          >
            <HeroVisual locale={locale} />
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* ─── ABOUT ─── */}
      <Section
        id="about"
        eyebrow={`01 / ${t.about.eyebrow.toUpperCase()}`}
        title={t.about.title}
      >
        <p className="max-w-3xl text-xl leading-relaxed text-muted">{t.about.body}</p>
      </Section>

      {/* ─── HOW I WORK ─── */}
      <Section
        id="approach"
        eyebrow={`02 / ${t.approach.eyebrow.toUpperCase()}`}
        title={t.approach.title}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.approach.cards.map((card, i) => (
            <ApproachCard
              key={card.title}
              icon={approachIcons[i]}
              title={card.title}
              body={card.body}
              index={i + 1}
            />
          ))}
        </div>
      </Section>

      {/* ─── AI-ASSISTED ENGINEERING ─── */}
      <Section
        id="ai"
        eyebrow={`03 / ${t.aiSection.eyebrow.toUpperCase()}`}
        title={t.aiSection.title}
        dark
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_0.5fr]">
          <p className="max-w-2xl text-xl leading-relaxed opacity-80">{t.aiSection.body}</p>
          <div className="flex flex-col justify-center gap-3 self-center">
            {[
              locale === "en" ? "Domain logic over syntax" : "Logika domeny ponad składnią",
              locale === "en" ? "System architecture & workflows" : "Projektowanie architektury i procesów",
              locale === "en" ? "AI-driven code generation" : "Generowanie kodu przez AI",
              locale === "en" ? "Strict logic verification" : "Rygorystyczna weryfikacja logiki",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" aria-hidden="true" />
                <span className="text-sm font-medium opacity-80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── TECH STACK ─── */}
      <Section
        id="stack"
        eyebrow={`04 / STACK`}
        title={t.home.stack}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStackCategories.map((category) => (
            <TechStackCard
              key={category.label}
              label={category.label}
              items={category.items}
            />
          ))}
        </div>
      </Section>

      {/* ─── FEATURED PROJECTS ─── */}
      <Section
        id="projects"
        eyebrow={`05 / SELECTED`}
        title={t.home.featured}
      >
        <div className="grid gap-10">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              index={index}
              key={project.slug}
              locale={locale}
              project={project}
            />
          ))}
        </div>
      </Section>

      {/* ─── TIMELINE ─── */}
      <Section
        id="timeline"
        eyebrow={`06 / ${t.timeline.eyebrow.toUpperCase()}`}
        title={t.timeline.title}
      >
        <div className="max-w-sm">
          <Timeline entries={timelineEntries} />
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section
        id="contact"
        eyebrow={`07 / CONTACT`}
        title={t.contact.title}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          <p className="max-w-lg text-xl leading-relaxed text-muted">
            {t.contact.subtitle}
          </p>
          <div className="flex flex-wrap items-start gap-3">
            <Button href="mailto:jakub.dyrszka@gmail.com" external>
              <Mail size={14} aria-hidden="true" />
              Email
            </Button>
            <Button href="https://github.com/jakubdyrszka-pixel" variant="secondary" external>
              <Github size={14} aria-hidden="true" />
              GitHub
            </Button>
            <Button href="https://instagram.com/pwrlft.kubus" variant="secondary" external>
              <Instagram size={14} aria-hidden="true" />
              Instagram
            </Button>
            <Button href="/cv.pdf" variant="ghost" external>
              <FileText size={14} aria-hidden="true" />
              {t.actions.downloadCv}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
