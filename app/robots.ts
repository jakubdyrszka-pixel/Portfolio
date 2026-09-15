import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/account", "/api", "/login", "/sign-in", "/sign-up", "/physionotes/account"],
    },
    sitemap: "https://jakubdyrszka.dev/sitemap.xml",
  };
}
