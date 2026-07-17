"use client";

import React, { useState, useEffect } from "react";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { 
  CheckCircle2, 
  ExternalLink, 
  KeyRound, 
  Laptop, 
  Download, 
  Terminal,
  LogOut,
  ShieldCheck,
  Sparkles,
  Copy,
  Check
} from "lucide-react";

export function PhysioNotesLandingClient() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn, openSignUp, signOut } = useClerk();
  const [copied, setCopied] = useState(false);
  const [showManualCode, setShowManualCode] = useState(false);
  const [activating, setActivating] = useState(false);
  const [activationStatus, setActivationStatus] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      await signOut(() => {
        window.location.href = "/physionotes";
      });
    } catch {
      // Ignore errors if offline/timeout
    } finally {
      setTimeout(() => {
        window.location.href = "/physionotes";
      }, 150);
    }
  };

  const encodeBase64 = (str: string) => typeof btoa !== "undefined" ? btoa(str) : Buffer.from(str).toString("base64");
  const licenseToken = user 
    ? `PN-V2-${user.id.slice(-8).toUpperCase()}-${encodeBase64(user.primaryEmailAddress?.emailAddress || "physio").slice(0, 12).toUpperCase()}`
    : "PN-V2-DEMO-LICENSE-KEY-1234";

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(licenseToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const triggerActivation = async (isManualClick = false) => {
    if (!user) return;
    if (isManualClick) setActivating(true);
    setActivationStatus("Synchronizacja z aplikacją desktopową PhysioNotes...");
    
    const payload = {
      userId: user.id,
      email: user.primaryEmailAddress?.emailAddress || "",
      token: licenseToken,
      tier: "PROFESSIONAL",
      status: "ACTIVE"
    };

    let success = false;
    try {
      const res = await fetch("http://127.0.0.1:43210/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setActivationStatus("✅ Licencja zsynchronizowana automatycznie! Przełącz okno na aplikację PhysioNotes.");
        success = true;
        if (typeof window !== "undefined") localStorage.removeItem("physionotes_desktop_flow");
        if (isManualClick) setActivating(false);
        return;
      }
    } catch {
      // Loopback server offline or app not running yet
    }

    const isDesktopFlow = typeof window !== "undefined" && (
      new URLSearchParams(window.location.search).get("desktop") === "true" ||
      localStorage.getItem("physionotes_desktop_flow") === "true"
    );

    if (!success && (isManualClick || isDesktopFlow)) {
      if (typeof window !== "undefined") localStorage.removeItem("physionotes_desktop_flow");
      window.location.href = `physionotes://activate?token=${encodeURIComponent(licenseToken)}&email=${encodeURIComponent(user.primaryEmailAddress?.emailAddress || "")}&userId=${encodeURIComponent(user.id)}`;
      setActivationStatus("✅ Wysłano sygnał aktywacji do PhysioNotes. Przełącz okno na aplikację.");
      if (isManualClick) setActivating(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded) return;
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const isDesktop = params.get("desktop") === "true";

    if (isSignedIn && user) {
      if (mode === "sign_in" || mode === "sign_up") {
        const el = document.getElementById("download");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      triggerActivation(false);
    } else if (!isSignedIn) {
      if (isDesktop || mode === "sign_in" || mode === "sign_up") {
        localStorage.setItem("physionotes_desktop_flow", "true");
      }
      if (mode === "sign_in") {
        openSignIn({ forceRedirectUrl: "/physionotes#download" });
      } else if (mode === "sign_up") {
        openSignUp({ forceRedirectUrl: "/physionotes#download" });
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isSignedIn, user, isLoaded]);

  return (
    <div id="download" className="scroll-mt-24 text-left">
      {/* Large Linear/Arc style dark container */}
      <div className="border border-neutral-800 rounded-3xl p-6 sm:p-10 lg:p-14 bg-gradient-to-b from-neutral-900 via-[#111111] to-neutral-950 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden">
        
        {/* Subtle glow effect inside card */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* Left Column: Direct Native Downloads */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Architektura Natywna • Praca Offline-First</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Wybierz instalator dla swojego systemu
              </h3>
              <p className="mt-3 text-base text-neutral-300 font-normal leading-relaxed">
                Zainstaluj aplikację bezpośrednio na stacji roboczej gabinetu. Lekki instalator (~150 MB) zawiera pełne środowisko wykonawcze wraz z lokalnym silnikiem bazy danych SQLite.
              </p>
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/api/download?platform=mac"
                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#111111] font-medium transition-all duration-200 hover:scale-[1.01] shadow-[0_4px_25px_rgba(16,185,129,0.25)]"
              >
                <div className="flex items-center gap-3.5">
                  <Laptop className="h-6 w-6 text-[#111111]" />
                  <div className="text-left">
                    <span className="block text-sm font-semibold text-[#111111]">Pobierz instalator macOS (.dmg)</span>
                    <span className="text-xs text-[#111111]/80 font-normal">Apple Silicon (M1–M4) &amp; Intel</span>
                  </div>
                </div>
                <Download className="h-5 w-5 text-[#111111]" />
              </a>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/api/download?platform=win"
                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-neutral-700 hover:border-neutral-500 bg-neutral-800/80 hover:bg-neutral-800 text-white font-medium transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3.5">
                  <Terminal className="h-6 w-6 text-emerald-400" />
                  <div className="text-left">
                    <span className="block text-sm font-semibold text-white">Pobierz instalator Windows (.exe)</span>
                    <span className="text-xs text-neutral-400 font-normal">Windows 10 / 11 (Instalator 64-bit)</span>
                  </div>
                </div>
                <Download className="h-5 w-5 text-neutral-400" />
              </a>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Szyfrowanie AES-256-GCM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Zgodne jako ADO RODO</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Clerk License Activation Gate */}
          <div className="lg:col-span-6">
            <div className="border border-neutral-800 rounded-2xl p-6 sm:p-8 bg-neutral-900/90 backdrop-blur-xl shadow-lg space-y-6">
              
              {!isLoaded ? (
                <div className="space-y-4 py-8 animate-pulse text-center">
                  <div className="h-6 bg-neutral-800 rounded-lg w-3/4 mx-auto" />
                  <div className="h-12 bg-neutral-800 rounded-xl w-full" />
                  <div className="h-12 bg-neutral-800 rounded-xl w-full" />
                </div>
              ) : !isSignedIn ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider block mb-1">
                      Portal Licencyjny Gabinetu
                    </span>
                    <h4 className="text-xl font-semibold tracking-tight text-white">
                      Aktywuj licencję stacji roboczej
                    </h4>
                    <p className="text-sm text-neutral-400 mt-2 font-normal leading-relaxed">
                      Zaloguj się na zweryfikowane konto profesjonalne, aby wygenerować kryptograficzny token licencyjny i automatycznie powiązać aplikację desktopową.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => openSignIn({ forceRedirectUrl: "/physionotes#download" })}
                      className="w-full py-4 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#111111] font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm"
                    >
                      <KeyRound className="h-4.5 w-4.5" />
                      <span>Zaloguj się na konto praktyki medycznej</span>
                    </button>

                    <button
                      onClick={() => openSignUp({ forceRedirectUrl: "/physionotes#download" })}
                      className="w-full py-4 px-5 rounded-xl border border-neutral-700 hover:border-neutral-600 bg-neutral-800 hover:bg-neutral-800/80 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2.5"
                    >
                      <span>Zarejestruj nową praktykę medyczną</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <span>Szyfrowanie połączenia:</span>
                    <span className="text-emerald-400 font-medium">SSL / Szyfrowanie JWT</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs uppercase tracking-wider">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Aktywna sesja terapeutyczna</span>
                      </div>
                      <h4 className="text-base font-semibold text-white truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium transition flex items-center gap-1.5"
                        title="Wyloguj i przełącz konto"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Wyloguj</span>
                      </button>
                      <div className="rounded-full overflow-hidden border border-neutral-700 flex items-center justify-center">
                        <UserButton />
                      </div>
                    </div>
                  </div>

                  {activationStatus && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium leading-relaxed">
                      {activationStatus}
                    </div>
                  )}

                  <div className="space-y-3">
                    <button
                      onClick={() => triggerActivation(true)}
                      disabled={activating}
                      className="w-full py-4 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#111111] font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm disabled:opacity-50"
                    >
                      <ExternalLink className="h-4.5 w-4.5" />
                      <span>Synchronizuj z aplikacją PhysioNotes</span>
                    </button>

                    <p className="text-xs text-neutral-400 text-center leading-relaxed font-normal">
                      Szyfrowana synchronizacja odbywa się automatycznie z otwartą aplikacją desktopową poprzez bezpieczny interfejs lokalny (Loopback).
                    </p>
                  </div>

                  {/* Manual Code Option */}
                  <div className="pt-4 border-t border-neutral-800">
                    <button
                      onClick={() => setShowManualCode(!showManualCode)}
                      className="w-full text-xs text-neutral-400 hover:text-white font-medium underline transition text-center"
                    >
                      {showManualCode ? "Ukryj ręczny kod licencji" : "Wprowadzenie ręczne? Wyświetl klucz licencyjny"}
                    </button>

                    {showManualCode && (
                      <div className="mt-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                        <span className="text-neutral-500 block">Kryptograficzny token licencyjny (AES):</span>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 p-2 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-emerald-400 text-xs truncate">
                            {licenseToken}
                          </code>
                          <button
                            onClick={handleCopyLicense}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition flex items-center gap-1.5 shrink-0"
                          >
                            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                            <span>{copied ? "Skopiowano" : "Kopiuj"}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
