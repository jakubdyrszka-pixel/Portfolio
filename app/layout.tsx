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
  openGraph: {
    title: "Jakub Dyrszka | AI Product Builder",
    description: "Modern applications built through systems logic, domain expertise, and AI.",
    url: "https://jakubdyrszka.dev",
    siteName: "Jakub Dyrszka Portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-ink bg-background antialiased selection:bg-black/10 selection:text-ink">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}