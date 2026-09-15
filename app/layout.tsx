import {ClerkProvider} from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jakubdyrszka.dev"),
  title: {
    default: "Jakub Dyrszka | AI Product Builder",
    template: "%s | Jakub Dyrszka",
  },
  description: "AI Product Builder portfolio — shipping complex applications through systems logic and AI.",
  keywords: ["AI Product Builder", "Full-Stack Developer", "Next.js", "AI Integrations", "Software Engineer", "Jakub Dyrszka", "PhysioNotes", "Portfolio"],
  openGraph: {
    title: "Jakub Dyrszka | AI Product Builder",
    description: "Modern applications built through systems logic, domain expertise, and AI.",
    url: "https://jakubdyrszka.dev",
    siteName: "Jakub Dyrszka Portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jakub Dyrszka | AI Product Builder",
    description: "Modern applications built through systems logic, domain expertise, and AI.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { GoogleAnalytics } from "@next/third-parties/google";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jakub Dyrszka",
    "jobTitle": "AI Product Builder & Software Engineer",
    "url": "https://jakubdyrszka.dev",
    "sameAs": [
      "https://github.com/jakubdyrszka-pixel",
      "https://instagram.com/pwrlft.kubus"
    ],
    "email": "mailto:jakub.dyrszka@gmail.com",
    "worksFor": {
      "@type": "Organization",
      "name": "PhysioNotes",
      "url": "https://jakubdyrszka.dev/physionotes"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans text-ink bg-background antialiased selection:bg-black/10 selection:text-ink pb-[76px] md:pb-0">
        <ClerkProvider>
          {children}
        </ClerkProvider>
        <StickyMobileCTA />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}