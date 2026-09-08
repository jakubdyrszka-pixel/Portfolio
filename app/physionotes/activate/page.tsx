'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Check, Copy, Loader2, AlertTriangle, Monitor, Download } from 'lucide-react';

type ActivationState = 'loading' | 'activating' | 'success' | 'expired' | 'error';

interface LicenseData {
  id: string;
  tier: string;
  status: string;
  expiresAt: string;
  signedProof: string;
}

interface UserData {
  id: string;
  email: string;
  name: string | null;
}

function PricingTable({ userData, activateDesktop }: { userData: UserData | null, activateDesktop: () => void }) {
  const [isYearly, setIsYearly] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Idealny dla małych gabinetów i freelancerów.',
      price: isYearly ? '$180' : '$17',
      period: isYearly ? '/ rocznie' : '/ mc',
      priceId: isYearly ? 'pri_01m1xpv6seqh7pgrfn7fnzwxd8' : 'pri_01m1xpt3fz6xydh9jgg9wyk3q8',
      features: ['Do 5 pacjentów / tydzień', 'Pełen wywiad SOAP', 'Szyfrowanie AES-256', 'Eksport do PDF'],
      recommended: false,
    },
    {
      name: 'Pro',
      description: 'Pełen potencjał dla prężnie działających specjalistów.',
      price: isYearly ? '$285' : '$27',
      period: isYearly ? '/ rocznie' : '/ mc',
      priceId: isYearly ? 'pri_01m1xpxgr7hb51sj2g4yamkdgz' : 'pri_01m1xpwrk0p57ff3cetavx334w',
      features: ['Bez limitu pacjentów', 'Baza wiedzy ICD-10', 'Synchronizacja wielu urządzeń', 'Priorytetowe wsparcie'],
      recommended: true,
    },
    {
      name: 'Klinika',
      description: 'Dla większych placówek z zespołem fizjoterapeutów.',
      price: 'Indywidualna',
      period: '',
      priceId: 'contact',
      features: ['Wiele kont dla personelu', 'Współdzielona baza pacjentów', 'Zaawansowane statystyki', 'Dedykowany opiekun'],
      recommended: false,
    }
  ];

  const handleCheckout = async (priceId: string) => {
    if (priceId === 'contact') {
      window.location.href = 'mailto:kontakt@physionotes.com?subject=Zapytanie o plan Klinika';
      return;
    }
    
    setIsCheckingOut(true);
    try {
      const { initializePaddle } = await import('@paddle/paddle-js');
      const paddle = await initializePaddle({
        environment: 'production',
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
      });

      if (paddle) {
        paddle.Checkout.open({
          items: [{ priceId, quantity: 1 }],
          customer: { email: userData?.email || '' },
          customData: { userId: userData?.id || '' },
          settings: {
            successUrl: window.location.href, // Redirects back here so activateDesktop runs
          }
        });
      }
    } catch (error) {
      console.error('Paddle error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111111] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#111111] dark:text-white">Odblokuj PhysioNotes</h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">Twój okres próbny dobiegł końca. Wybierz pakiet, aby kontynuować.</p>
          
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isYearly ? 'text-[#111111] dark:text-white' : 'text-neutral-500'}`}>Miesięcznie</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-200 dark:bg-neutral-800 transition-colors focus:outline-none"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-emerald-500 transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isYearly ? 'text-[#111111] dark:text-white' : 'text-neutral-500'}`}>
              Rocznie <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] uppercase font-bold tracking-wider">Zniżka</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative p-8 rounded-3xl border transition-all flex flex-col ${plan.recommended ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 bg-white dark:bg-[#161616] scale-105 z-10' : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111111]'}`}>
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full">
                  Najpopularniejszy
                </div>
              )}
              
              <h3 className="text-xl font-bold text-[#111111] dark:text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-neutral-500 min-h-[40px]">{plan.description}</p>
              
              <div className="mt-6 flex items-baseline gap-1">
                {plan.price === 'Indywidualna' ? (
                  <span className="text-3xl font-black tracking-tight text-[#111111] dark:text-white mt-1 mb-1.5">{plan.price}</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold tracking-tight text-[#111111] dark:text-white">{plan.price}</span>
                    <span className="text-sm font-medium text-neutral-500">{plan.period}</span>
                  </>
                )}
              </div>
              
              <ul className="mt-8 space-y-4 mb-8 flex-grow">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={isCheckingOut && plan.priceId !== 'contact'}
                className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold transition-all mt-auto ${plan.recommended ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25' : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-[#111111] dark:text-white'}`}
              >
                {isCheckingOut && plan.priceId !== 'contact' ? 'Otwieranie bramki...' : (plan.priceId === 'contact' ? 'Skontaktuj się' : `Wybierz ${plan.name}`)}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button onClick={activateDesktop} className="text-xs text-neutral-500 hover:text-[#111111] dark:hover:text-white transition underline underline-offset-4">
            Już opłaciłeś? Odśwież status licencji
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PhysioNotesActivatePage() {
  const { isSignedIn, isLoaded } = useUser();
  const [state, setState] = useState<ActivationState>('loading');
  const [license, setLicense] = useState<LicenseData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  const [deepLinkSent, setDeepLinkSent] = useState(false);
  const [loopbackSent, setLoopbackSent] = useState(false);

  const activateDesktop = useCallback(async () => {
    setState('activating');
    try {
      const res = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId: 'desktop-pending' }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.code === 'LICENSE_EXPIRED') {
          setState('expired');
          setUserData(data.user);
          return;
        }
        throw new Error(data.error || 'Activation failed');
      }

      setLicense(data.license);
      setUserData(data.user);

      // Build activation payload for the desktop app
      const payload = {
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        tier: data.license.tier,
        status: data.license.status,
        expiresAt: data.license.expiresAt,
        signedProof: data.license.signedProof,
        token: data.license.signedProof,
      };

      // Generate fallback code (PN-V2-userId-base64email)
      const emailB64 = btoa(data.user.email);
      const shortId = data.user.id.slice(0, 8);
      setActivationCode(`PN-V2-${shortId}-${emailB64}`);

      // Method 1: Try deep link (physionotes:// protocol)
      try {
        const params = new URLSearchParams({
          token: data.license.signedProof,
          email: data.user.email,
          userId: data.user.id,
        });
        const deepLinkUrl = `physionotes://activate?${params.toString()}`;
        window.location.href = deepLinkUrl;
        setDeepLinkSent(true);
      } catch (e) {
        console.warn('[Activate] Deep link failed:', e);
      }

      // Method 2: Try loopback POST to Electron local server
      try {
        const loopbackRes = await fetch('http://127.0.0.1:43210/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(3000),
        });
        if (loopbackRes.ok) {
          setLoopbackSent(true);
        }
      } catch (e) {
        console.warn('[Activate] Loopback failed (app may not be running):', e);
      }

      setState('success');
    } catch (err: unknown) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Nieznany błąd aktywacji');
    }
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      activateDesktop();
    } else if (isLoaded && !isSignedIn) {
      setState('loading');
    }
  }, [isLoaded, isSignedIn, activateDesktop]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activationCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = activationCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 3000);
    }
  };

  // ── Not signed in ──
  if (isLoaded && !isSignedIn) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login?redirect_url=/physionotes/activate';
    }
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  // ── Loading / Activating ──
  if (state === 'loading' || state === 'activating') {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-500 mx-auto" />
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {state === 'loading' ? 'Ładowanie...' : 'Aktywacja licencji...'}
          </p>
        </div>
      </div>
    );
  }

  // ── License Expired (Pricing Table) ──
  if (state === 'expired') {
    return <PricingTable userData={userData} activateDesktop={activateDesktop} />;
  }

  // ── Error ──
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
          <div>
            <h1 className="text-2xl font-bold text-[#111111] dark:text-white">
              Błąd aktywacji
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm">{errorMsg}</p>
          </div>
          <button
            onClick={activateDesktop}
            className="px-6 py-3 bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-xl text-sm font-semibold hover:opacity-90 transition"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  // ── Success ──
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center space-y-8">
        {/* Success header */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 mx-auto">
            <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#111111] dark:text-white">
            Licencja aktywowana!
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            {(deepLinkSent || loopbackSent)
              ? 'PhysioNotes powinien się automatycznie aktywować. Wróć do aplikacji.'
              : 'Skopiuj poniższy kod i wklej go w aplikacji PhysioNotes.'}
          </p>
        </div>

        {/* License info */}
        <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Monitor className="h-4 w-4 text-neutral-500" />
            <span className="text-neutral-600 dark:text-neutral-400">Konto:</span>
            <span className="font-semibold text-[#111111] dark:text-white">{userData?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-neutral-600 dark:text-neutral-400">Pakiet:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{license?.tier}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-neutral-600 dark:text-neutral-400">Ważna do:</span>
            <span className="font-semibold text-[#111111] dark:text-white">
              {license?.expiresAt
                ? new Date(license.expiresAt).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' })
                : 'Bezterminowa'}
            </span>
          </div>
        </div>

        {/* Status indicators */}
        <div className="space-y-2">
          {(deepLinkSent || loopbackSent) && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
              ✅ Dane licencji zostały automatycznie przesłane do aplikacji PhysioNotes.
              Wróć do aplikacji — powinna być już odblokowana.
            </div>
          )}

          {!deepLinkSent && !loopbackSent && activationCode && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-500">
                Nie udało się automatycznie połączyć z aplikacją. Skopiuj kod poniżej i wklej go w PhysioNotes:
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-mono text-[#111111] dark:text-white text-center tracking-wider">
                  {activationCode}
                </code>
                <button
                  onClick={handleCopyCode}
                  className="p-3 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:opacity-90 transition shrink-0"
                  title="Kopiuj kod"
                >
                  {codeCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── SEKCJA POBIERANIA INSTALATORA ── */}
        <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800/80">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-sm font-medium text-[#111111] dark:text-white flex items-center gap-2">
              <Download className="h-4 w-4 text-emerald-500" />
              Nie masz jeszcze aplikacji?
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm">
              Zainstaluj PhysioNotes na swoim komputerze, by móc z niej korzystać i wkleić kod aktywacyjny.
            </p>
            <div className="flex justify-center mt-2">
              <Link 
                href="/physionotes/download"
                className="px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-sm font-semibold transition flex items-center gap-2"
              >
                Przejdź do pobierania instalatora
              </Link>
            </div>
          </div>
        </div>

        <Link href="/physionotes/account" className="inline-block text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition mt-6">
          ← Przejdź do konta
        </Link>
      </div>
    </div>
  );
}
