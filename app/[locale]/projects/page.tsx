import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/ui/section";
import { dictionary, isLocale, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const language = isLocale(locale) ? locale : "en";

  return {
    title: language === "pl" ? "Projekty" : "Projects",
    description:
      language === "pl"
        ? "Projekty i case studies Jakuba Dyrszki — budowanie zaawansowanych systemów z użyciem AI i logiki."
        : "Jakub Dyrszka projects & case studies — building complex software through systems logic and AI.",
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = dictionary[locale];

  return (
    <Section eyebrow="PROJECTS / GRID" title={t.projects.title} className="border-t-0">
      <p className="mb-10 max-w-3xl text-xl leading-8 text-muted">{t.projects.subtitle}</p>
      <div className="grid gap-8">
        {projects.map((project, index) => (
          <ProjectCard index={index} key={project.slug} locale={locale} project={project} />
        ))}
      </div>
    </Section>
  );
}
