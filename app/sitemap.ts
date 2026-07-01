import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jakubdyrszka.dev";
  const locales = ["pl", "en"];
  const staticRoutes = ["", "/projects", "/about", "/contact"];
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);

  return locales.flatMap((locale) =>
    [...staticRoutes, ...projectRoutes].map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
