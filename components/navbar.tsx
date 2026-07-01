import Link from "next/link";
import { alternateLocale, dictionary, type Locale } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const t = dictionary[locale];
  const alternate = alternateLocale(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-10">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 text-sm font-bold">
        <Link className="flex items-center gap-2" href={`/${locale}`}>
          <span className="h-3 w-3 rounded-full border border-ink" aria-hidden="true" />
          <span>Jakub Dyrszka</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href={`/${locale}/projects`}>{t.nav.projects}</Link>
          <Link href={`/${locale}/about`}>{t.nav.about}</Link>
          <Link href={`/${locale}/contact`}>{t.nav.contact}</Link>
        </div>
        <Link
          className="border border-ink px-3 py-1.5 uppercase transition hover:bg-ink hover:text-inverse-ink"
          href={`/${alternate}`}
        >
          {alternate}
        </Link>
      </nav>
    </header>
  );
}
