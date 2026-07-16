"use client";

import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  KeyRound, 
  Laptop, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  HelpCircle,
  Terminal,
  Database
} from "lucide-react";

export function PhysioNotesLandingClient() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn, openSignUp } = useClerk();
  const [copied, setCopied] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [activating, setActivating] = useState(false);
  const [activationStatus, setActivationStatus] = useState<string | null>(null);

  // Generate a mock or real-feeling license token string based on Clerk user ID / email
  const licenseToken = user 
    ? `PN-V2-${user.id.slice(-8).toUpperCase()}-${Buffer.from(user.primaryEmailAddress?.emailAddress || "physio").toString("base64").slice(0, 12).toUpperCase()}`
    : "PN-V2-DEMO-LICENSE-KEY-1234";

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(licenseToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const triggerActivation = async (isManualClick = false) => {
    if (!user) return;
    if (isManualClick) setActivating(true);
    setActivationStatus("Przełączanie i aktywacja w aplikacji PhysioNotes...");
    
    const payload = {
      userId: user.id,
      email: user.primaryEmailAddress?.emailAddress || "",
      token: licenseToken,
      tier: "PROFESSIONAL",
      status: "ACTIVE"
    };

    try {
      // Direct local loopback activation (instant, zero splash screen issues during dev)
      const res = await fetch("http://127.0.0.1:43210/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setActivationStatus("✅ Licencja zsynchronizowana automatycznie! Przełącz okno na aplikację PhysioNotes.");
        if (isManualClick) setActivating(false);
        return;
      }
    } catch (e) {
      // Loopback server not reachable or offline
    }

    if (isManualClick) {
      // Fallback deep link
      window.location.href = `physionotes://activate?token=${encodeURIComponent(licenseToken)}&email=${encodeURIComponent(user.primaryEmailAddress?.emailAddress || "")}&userId=${encodeURIComponent(user.id)}`;
      setActivationStatus("✅ Wysłano sygnał aktywacji do PhysioNotes.");
      setActivating(false);
    }
  };

  // Auto-activate immediately right after login!
  React.useEffect(() => {
    if (isSignedIn && user && isLoaded) {
      triggerActivation(false);
    }
  }, [isSignedIn, user, isLoaded]);

  return (
    <div className="space-y-8">
      {/* Top Hero Card / Auth Orchestrator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-2 border-ink bg-neutral-900 text-inverse-ink p-6 sm:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        
        {/* Decorative Grid Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Left Column: Product Value Prop & Status */}
        <div className="lg:col-span-7 space-y-6 relative z-10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500 text-ink text-xs font-extrabold uppercase tracking-widest border border-ink shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>PhysioNotes V2.0 Desktop</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Suwerenna Dokumentacja Medyczna dla Fizjoterapeuty.
            </h1>
            
            <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-medium max-w-xl">
              Pracuj 100% lokalnie z szyfrowaniem <strong className="text-emerald-400">AES-256 (Zero-Knowledge)</strong> w bazie SQLite na Twoim dysku. Portal służy wyłącznie do weryfikacji licencji i uprawnień – żadna notatka z wizyty nie trafia do chmury.
            </p>
          </div>

          {/* Quick value prop bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-2 text-neutral-200">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Pełna zgodność RODO / brak powierzenia</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Wyłączenie MDR (MDCG 2019-11)</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-200">
              <Laptop className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>30 dni pracy offline (Grace Period)</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-200">
              <Database className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Zarządzanie licencjami z tego portalu</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Login & License Gate */}
        <div className="lg:col-span-5 relative z-10 flex flex-col justify-center">
          
          {!isLoaded ? (
            <div className="p-8 border-2 border-ink bg-neutral-800 text-center animate-pulse shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="h-6 bg-neutral-700 w-3/4 mx-auto mb-4" />
              <div className="h-10 bg-neutral-700 w-full mb-3" />
              <div className="h-10 bg-neutral-700 w-full" />
            </div>
          ) : !isSignedIn ? (
            <div className="p-6 sm:p-8 border-2 border-ink bg-white text-ink shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-ink text-inverse-ink text-[10px] font-extrabold uppercase tracking-wider mb-2">
                  Krok 1 • Weryfikacja
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-ink">
                  Połącz z aplikacją PhysioNotes
                </h3>
                <p className="text-xs text-muted mt-1 font-medium leading-relaxed">
                  Zaloguj się lub utwórz konto profesjonalne, aby aktywować licencję w swojej aplikacji desktopowej.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openSignIn({ forceRedirectUrl: "/physionotes" })}
                  className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-ink font-extrabold text-xs uppercase tracking-wider border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition flex items-center justify-center gap-2"
                >
                  <KeyRound className="h-4 w-4" />
                  <span>Zaloguj się na Konto (Clerk)</span>
                </button>

                <button
                  onClick={() => openSignUp({ forceRedirectUrl: "/physionotes" })}
                  className="w-full py-3.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-ink font-extrabold text-xs uppercase tracking-wider border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition flex items-center justify-center gap-2"
                >
                  <span>Zarejestruj Nowy Gabinet</span>
                </button>
              </div>

              <div className="pt-4 border-t border-ink/10 flex items-center justify-between text-[11px] text-muted font-bold">
                <span>Bezpieczeństwo sesji:</span>
                <span className="text-emerald-700 font-extrabold">Aktywne (SSL/JWT)</span>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 border-2 border-ink bg-white text-ink shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-ink/10">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Aktywne połączenie</span>
                  </div>
                  <h4 className="text-sm font-black truncate max-w-[200px]">
                    {user?.primaryEmailAddress?.emailAddress}
                  </h4>
                </div>
                {user?.imageUrl ? (
                  <div className="w-9 h-9 rounded-full border border-ink overflow-hidden relative shrink-0">
                    <img 
                      src={user.imageUrl} 
                      alt="User avatar" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full border border-ink bg-ink text-inverse-ink flex items-center justify-center font-bold text-xs shrink-0">
                    {user?.firstName?.slice(0, 1) || "P"}
                  </div>
                )}
              </div>

              {activationStatus && (
                <div className="p-3 bg-emerald-50 border border-emerald-500 text-emerald-900 text-xs font-bold rounded-none">
                  {activationStatus}
                </div>
              )}

              <div className="space-y-3 pt-1">
                <button
                  onClick={() => triggerActivation(true)}
                  disabled={activating}
                  className="w-full py-4 px-4 bg-emerald-500 text-ink font-extrabold text-xs uppercase tracking-wider border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>🚀 Otwórz &amp; Aktywuj Aplikację PhysioNotes</span>
                </button>

                <p className="text-[11px] text-slate-600 leading-relaxed text-center font-medium">
                  Twoje konto automatycznie synchronizuje się z otwartą aplikacją desktopową w tle bez wpisywania jakichkolwiek kodów.
                </p>
              </div>

              {/* Collapsible manual code backup just in case */}
              <div className="pt-3 border-t border-ink/10">
                <button 
                  onClick={() => setShowSetupGuide(!showSetupGuide)}
                  className="w-full py-1 text-[11px] text-slate-500 hover:text-slate-900 font-bold underline transition text-center"
                >
                  {showSetupGuide ? "Ukryj opcje ręcznej aktywacji" : "Masz problem z połączeniem? Pokaż kod ręczny"}
                </button>
                {showSetupGuide && (
                  <div className="mt-3 p-2.5 bg-neutral-100 border border-ink space-y-1.5 text-xs">
                    <span className="text-[10px] font-bold text-slate-600 block">Ręczny kod licencyjny:</span>
                    <div className="flex items-center gap-1.5">
                      <code className="flex-1 p-1.5 bg-white border border-ink text-[11px] font-mono font-bold truncate">
                        {licenseToken}
                      </code>
                      <button
                        onClick={handleCopyLicense}
                        className="p-1.5 bg-ink text-white font-bold text-[11px] shrink-0"
                      >
                        {copied ? "OK!" : "Kopiuj"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Expandable Setup & Download Guide */}
      {(showSetupGuide || true) && (
        <div className="border-2 border-ink bg-neutral-50 dark:bg-neutral-900/40 p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-ink/20">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 block mb-1">
                Krok Po Kroku • Szybki Start
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                Pobieranie i Jednorazowa Aktywacja Licencji
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#download-section"
                className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-inverse-ink text-xs font-extrabold uppercase tracking-wider border border-ink shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-600 hover:text-white transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Pobierz macOS / Windows</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2 border border-ink/30 p-4 bg-background">
              <div className="flex items-center gap-2 text-ink font-extrabold text-sm">
                <span className="w-6 h-6 bg-ink text-inverse-ink text-xs font-bold flex items-center justify-center">1</span>
                <span>Zainstaluj Aplikację</span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-medium">
                Pobierz instalator dla swojego systemu (macOS .dmg lub Windows .exe). Uruchom program i ustaw swój prywatny, 4-6 cyfrowy kod PIN bazy danych.
              </p>
            </div>

            <div className="space-y-2 border border-ink/30 p-4 bg-background">
              <div className="flex items-center gap-2 text-ink font-extrabold text-sm">
                <span className="w-6 h-6 bg-ink text-inverse-ink text-xs font-bold flex items-center justify-center">2</span>
                <span>Zaloguj się do Portalu</span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-medium">
                Zaloguj się powyżej w portalu licencyjnym (Clerk). Wygeneruje to Twój unikalny token licencyjny przypisany do konta fizjoterapeuty.
              </p>
            </div>

            <div className="space-y-2 border border-ink/30 p-4 bg-background">
              <div className="flex items-center gap-2 text-ink font-extrabold text-sm">
                <span className="w-6 h-6 bg-ink text-inverse-ink text-xs font-bold flex items-center justify-center">3</span>
                <span>Wklej Token lub Kliknij Deep-Link</span>
              </div>
              <p className="text-xs text-muted leading-relaxed font-medium">
                Kliknij przycisk &quot;🚀 Otwórz &amp; Aktywuj&quot; lub skopiuj kod i wklej go w aplikacji desktopowej w zakładce &quot;Ustawienia -&gt; O programie / Licencja&quot;.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Download Section Bar */}
      <div id="download-section" className="border-2 border-ink bg-neutral-900 text-inverse-ink p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider">
            Natywne Binaria • Zero-Cloud
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            Pobierz PhysioNotes V2.0 na Twój Komputer
          </h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Aplikacja działa w 100% lokalnie. Wymaga około 150 MB wolnego miejsca na dysku na program oraz bazę SQLite.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <a
            href="https://github.com/jakubdyrszka-pixel/PhysioNotes/releases/latest/download/PhysioNotes-macOS-universal.dmg"
            className="flex-1 md:flex-none py-3 px-5 bg-emerald-500 text-ink font-extrabold text-xs uppercase tracking-wider border-2 border-ink shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-emerald-400 transition flex items-center justify-center gap-2"
          >
            <Laptop className="h-4 w-4 shrink-0" />
            <span>macOS (Apple Silicon &amp; Intel .dmg)</span>
          </a>

          <a
            href="https://github.com/jakubdyrszka-pixel/PhysioNotes/releases/latest/download/PhysioNotes-Setup-x64.exe"
            className="flex-1 md:flex-none py-3 px-5 bg-white text-ink font-extrabold text-xs uppercase tracking-wider border-2 border-ink shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-neutral-200 transition flex items-center justify-center gap-2"
          >
            <Terminal className="h-4 w-4 shrink-0" />
            <span>Windows 10/11 (Instalator .exe)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
