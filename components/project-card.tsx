import { ExternalLink, Github } from "lucide-react";
import { dictionary, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/ui/project-visual";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  index: number;
};

export function ProjectCard({ project, locale, index }: ProjectCardProps) {
  const t = dictionary[locale];
  const content = project[locale];

  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-ink/20 hover:shadow-sm lg:grid-cols-[0.85fr_1fr]">
      <ProjectVisual index={String(index + 1).padStart(3, "0")} title={project.title} />

      <div className="flex min-h-full flex-col justify-between gap-8 p-6 sm:p-10">
        {/* Header */}
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="micro-label rounded-md border border-border bg-surface px-2.5 py-1">
                {project.category}
              </span>
              <span
                className={`micro-label rounded-md px-2.5 py-1 ${
                  project.status === "Completed"
                    ? "border border-border bg-surface text-muted"
                    : "border border-ink/20 bg-ink/5 text-ink"
                }`}
              >
                {locale === "pl"
                  ? project.status === "Completed"
                    ? "Ukończony"
                    : "W trakcie"
                  : project.status}
              </span>
            </div>
            <project.icon size={18} strokeWidth={1.5} aria-hidden="true" className="text-muted" />
          </div>

          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
          <p className="mt-3 text-sm text-muted">
            {locale === "pl" ? "Rola" : "Role"}: {project.role}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{content.summary}</p>
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium tabular-nums text-muted"
              >
                {metric}
              </span>
            ))}
          </div>
        )}

        {/* Stack + Actions */}
        <div className="grid gap-5">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-ink/20 hover:bg-background"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {"demo" in project.links && project.links.demo && (
              <Button href={project.links.demo as string} external>
                <ExternalLink size={14} aria-hidden="true" />
                {t.actions.demo}
              </Button>
            )}
            {"github" in project.links && project.links.github && (
              <Button href={project.links.github as string} variant="secondary" external>
                <Github size={14} aria-hidden="true" />
                {t.actions.github}
              </Button>
            )}
            <Button
              href={project.slug === "physionotes" ? "/physionotes" : `/${locale}/projects/${project.slug}`}
              variant="ghost"
            >
              {project.slug === "physionotes"
                ? locale === "pl"
                  ? "Strona produktu"
                  : "Product page"
                : t.actions.readCaseStudy}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
