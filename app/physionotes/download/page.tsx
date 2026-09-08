import React from "react";
import Link from "next/link";
import { Download, MonitorPlay, Laptop, Terminal } from "lucide-react";

export const metadata = {
  title: "Pobierz PhysioNotes | Elektroniczna Dokumentacja Medyczna",
  description: "Zainstaluj aplikację PhysioNotes na swoim komputerze Mac lub Windows.",
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-[#111111] dark:text-white font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header (Minimal) */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/physionotes" className="flex items-center gap-2.5 group">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[#111111] dark:text-white">
              PhysioNotes <span className="text-emerald-600 dark:text-emerald-400 font-medium">V2.0</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-xs sm:text-sm text-[#111111] dark:text-white font-semibold hover:opacity-70 transition-opacity"
            >
              Zaloguj się
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 mb-2">
            <Download className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] dark:text-white">
            Pobierz PhysioNotes
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Zainstaluj aplikację na swoim komputerze, by rozpocząć 7-dniowy darmowy okres próbny.
            Bez podawania karty kredytowej.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
          
          {/* macOS Card */}
          <div className="flex flex-col p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Laptop className="w-24 h-24 text-[#111111] dark:text-white" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-2">macOS</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
              Zoptymalizowane dla Apple Silicon (M1-M4) oraz procesorów Intel. Wymaga macOS 12 lub nowszego.
            </p>
            
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/api/download?platform=mac"
              className="mt-auto w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-neutral-200 font-semibold transition-all shadow-sm"
            >
              <Download className="h-5 w-5" />
              <span>Pobierz dla macOS</span>
            </a>

            <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-semibold mb-4">Instrukcja instalacji:</h4>
              <ol className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 list-decimal list-inside">
                <li>Pobierz plik <strong>.dmg</strong>.</li>
                <li>Kliknij dwukrotnie pobrany plik.</li>
                <li>Przeciągnij ikonę <strong>PhysioNotes</strong> do folderu <strong>Applications</strong>.</li>
                <li>Uruchom program z Launchpada.</li>
              </ol>
            </div>
          </div>

          {/* Windows Card */}
          <div className="flex flex-col p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Terminal className="w-24 h-24 text-blue-600 dark:text-blue-500" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-2">Windows</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
              Oficjalny instalator 64-bit. Wymaga systemu Windows 10 lub Windows 11.
            </p>
            
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/api/download?platform=win"
              className="mt-auto w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm"
            >
              <Download className="h-5 w-5" />
              <span>Pobierz dla Windows</span>
            </a>

            <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <h4 className="text-sm font-semibold mb-4">Instrukcja instalacji:</h4>
              <ol className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 list-decimal list-inside">
                <li>Pobierz plik <strong>.exe</strong>.</li>
                <li>Uruchom pobrany instalator.</li>
                <li>Postępuj zgodnie ze wskazówkami na ekranie.</li>
                <li>Uruchom PhysioNotes ze skrótu na pulpicie.</li>
              </ol>
            </div>
          </div>

        </div>

        {/* Post-install Instructions */}
        <div className="mt-16 p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-center max-w-2xl mx-auto">
          <MonitorPlay className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#111111] dark:text-white mb-2">
            Co po instalacji?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">
            Uruchom zainstalowaną aplikację PhysioNotes, a następnie zaloguj się na swoje nowo utworzone konto, aby automatycznie aktywować wersję próbną.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-medium">
            <span className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-700 text-xs">1</span>
              Pobierz
            </span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">→</span>
            <span className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-700 text-xs">2</span>
              Zainstaluj
            </span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">→</span>
            <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-xs">3</span>
              Zaloguj się w aplikacji
            </span>
          </div>
        </div>

      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-neutral-200/80 dark:border-neutral-800/80 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} PhysioNotes V2.0
      </footer>
    </div>
  );
}
