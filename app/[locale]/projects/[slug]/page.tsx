import Image from "next/image";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/ui/project-visual";
import { Section } from "@/components/ui/section";
import { dictionary, isLocale, type Locale } from "@/lib/i18n";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return ["pl", "en"].flatMap((locale) =>
    projects
      .filter((project) => project.slug !== "physionotes")
      .map((project) => ({
        locale,
        slug: project.slug,
      })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (slug === "physionotes") {
    return {};
  }
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} Case Study`,
    description: project[locale].summary,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: {
        pl: `/pl/projects/${project.slug}`,
        en: `/en/projects/${project.slug}`,
      },
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (slug === "physionotes") {
    redirect("/physionotes");
  }

  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const t = dictionary[locale];
  const content = project[locale];

  return (
    <>
      <section className="border-b border-ink px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="micro-label mb-5">
              CASE STUDY /{" "}
              {locale === "pl"
                ? project.status === "Completed"
                  ? "UKOŃCZONY"
                  : "W TRAKCIE"
                : project.status.toUpperCase()}
            </p>
            <h1 className="max-w-[9ch] text-[clamp(4rem,13vw,11rem)] font-black leading-[0.82]">
              {project.title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-muted">{content.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
          <ProjectVisual className="technical-shadow" index="CASE" title={project.title} />
        </div>
      </section>

      <Section eyebrow="01 / PROBLEM" title={locale === "pl" ? "Dlaczego powstało?" : "Why it exists"}>
        <p className="max-w-4xl text-2xl leading-10 text-muted">{content.problem}</p>
      </Section>

      <Section dark eyebrow="02 / RESEARCH" title={locale === "pl" ? "Research i Wymagania" : "Research & Requirements"}>
        <p className="max-w-4xl text-2xl leading-10 text-inverse-ink/80">{content.research}</p>
      </Section>

      <Section eyebrow="03 / FEATURES" title={locale === "pl" ? "Najciekawsze funkcje" : "Key features"}>
        <div className="grid gap-5 md:grid-cols-3">
          {content.features.map((feature, index) => (
            <article className="border border-ink p-5" key={feature.title}>
              <p className="micro-label mb-12">00{index + 1}</p>
              <h2 className="text-3xl font-black leading-none">{feature.title}</h2>
              <p className="mt-5 leading-7 text-muted">{feature.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section dark eyebrow="04 / ARCHITECTURE & AI" title={locale === "pl" ? "Wyzwania architektoniczne i logiczne" : "Architecture & logic challenges"}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="border border-inverse-ink p-6">
            <p className="micro-label mb-10">LOGIC / ARCHITECTURE / AI</p>
            <p className="text-2xl leading-10 text-inverse-ink/80">{content.challenges}</p>
          </div>
          <div className="border border-inverse-ink p-6">
            <p className="micro-label mb-10">{locale === "pl" ? "WNIOSKI I ANALIZA" : "LESSONS LEARNED"}</p>
            <p className="text-2xl leading-10 text-inverse-ink/80">{content.lessons}</p>
          </div>
        </div>
      </Section>

      {"images" in project && project.images && project.images.length > 0 && (
        <Section eyebrow="05 / GALLERY" title={locale === "pl" ? "Zrzuty ekranu" : "Screenshots"}>
          <div className="grid gap-8">
            {project.images.map((img, index) => (
              <div key={img} className="relative aspect-[16/9] w-full overflow-hidden border border-ink bg-surface">
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow={"images" in project && project.images && project.images.length > 0 ? "06 / LINKS" : "05 / LINKS"} title={locale === "pl" ? "Demo i kod" : "Demo and code"}>
        <div className="flex flex-wrap gap-3">
          {"demo" in project.links && project.links.demo && (
            <Button href={project.links.demo as string} external>
              {t.actions.demo}
            </Button>
          )}
          {"github" in project.links && project.links.github && (
            <Button href={project.links.github as string} variant="secondary" external>
              {t.actions.github}
            </Button>
          )}
        </div>
      </Section>
    </>
  );
}
