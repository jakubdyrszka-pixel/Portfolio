"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const isPhysioNotes = pathname.includes("/physionotes");

  if (isPhysioNotes) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 dark:bg-[#111111]/90 backdrop-blur-lg border-t border-neutral-200/60 dark:border-neutral-800/60 p-4 transition-all duration-300">
        <a
          href="#pricing"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-white shadow-lg"
        >
          <span>Pobierz PhysioNotes</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  // Portfolio CTA
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-lg border-t border-black/5 p-4 transition-all duration-300">
      <Link
        href="/contact"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-sm font-medium text-white shadow-lg"
      >
        <Mail className="h-4 w-4" />
        <span>Contact Me</span>
      </Link>
    </div>
  );
}
