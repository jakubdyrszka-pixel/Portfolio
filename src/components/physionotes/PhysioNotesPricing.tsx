'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';

export function PhysioNotesPricing() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const [isYearly, setIsYearly] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [serviceRequestAccepted, setServiceRequestAccepted] = useState(false);

  const plan = {
    name: 'Professional',
    description: 'Pełen dostęp do wszystkich funkcji PhysioNotes V2.0, w modelu subskrypcyjnym (płatność jednorazowa na wybrany okres).',
    price: isYearly ? '890 zł' : '89 zł',
    amount: isYearly ? '890.00' : '89.00',
    period: isYearly ? '/ 365 dni' : '/ 30 dni',
    durationLabel: isYearly ? '1 rok (365 dni dostępu)' : '1 miesiąc (30 dni dostępu)',
    priceId: isYearly ? 'pri_01m1xpxgr7hb51sj2g4yamkdgz' : 'pri_01m1xpwrk0p57ff3cetavx334w',
    features: [
      'Pełen wywiad SOAP & dokumentacja offline',
      'Eksport wywiadu i kart badania do PDF',
      'Bez limitu pacjentów i bez limitu wizyt',
      'Baza wiedzy ICD-10 i gotowe szablony',
      'Automatyczne szyfrowane kopie zapasowe'
    ],
  };

  const handleSelectPlan = () => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      openSignIn({ forceRedirectUrl: '/physionotes#pricing' });
      return;
    }

    // Open order confirmation modal
    setIsCheckoutModalOpen(true);
    setTermsAccepted(false);
    setServiceRequestAccepted(false);
  };

  const handleFinalCheckout = async () => {
    if (!termsAccepted || !serviceRequestAccepted) return;

    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/hotpay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          email: user?.primaryEmailAddress?.emailAddress || '',
          userId: user?.id || ''
        })
      });

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        console.error('Missing redirectUrl from HotPay checkout API');
        alert('Nie udało się utworzyć sesji płatności. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('HotPay checkout error:', error);
      alert('Wystąpił błąd podczas połączenia z bramką płatniczą.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-[#fafafa] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Przejrzysty Cennik Dostępu
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
            Wybierz wariant dla siebie
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Płatność jednorazowa za wybrany okres. Brak automatycznego obciążania karty.
            Przed zakupem możesz bezpłatnie pobrać aplikację i testować przez 7 dni bez podawania danych płatniczych.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isYearly ? 'text-[#111111] dark:text-white' : 'text-neutral-600 dark:text-neutral-400'}`}>30 dni (Miesięcznie)</span>
            <button
              type="button"
              aria-label={isYearly ? 'Przełącz na rozliczenie 30-dniowe' : 'Przełącz na rozliczenie roczne'}
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-7 w-12 items-center rounded-full bg-neutral-200 dark:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-emerald-500 transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isYearly ? 'text-[#111111] dark:text-white' : 'text-neutral-600 dark:text-neutral-400'}`}>
              365 dni (Rocznie) <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] uppercase font-bold tracking-wider">Zniżka</span>
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-[#161616] rounded-3xl border border-emerald-500 shadow-xl shadow-emerald-500/10 p-8 sm:p-12">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-[#111111] dark:text-white">Licencja Professional</h3>
              <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">{plan.description}</p>
              <ul className="mt-8 space-y-4">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-start gap-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-medium">
                    <Check className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-80 flex flex-col justify-center items-center text-center p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight text-[#111111] dark:text-white">{plan.price}</span>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{plan.period}</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                {plan.durationLabel}
              </p>
              
              <button
                type="button"
                onClick={handleSelectPlan}
                className="w-full mt-8 py-4 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25 text-sm font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Kup dostęp
              </button>
              {!isSignedIn && (
                <Link
                  href="/physionotes/download"
                  className="w-full mt-4 inline-block text-center py-2 text-xs text-neutral-500 dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white transition"
                >
                  lub pobierz darmowy trial (7 dni)
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Compliant Order Confirmation Modal ── */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#161616] rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 text-[#111111] dark:text-white my-8">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              aria-label="Zamknij podsumowanie"
              className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Podsumowanie zamówienia</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Bezpieczna płatność przez operatora HotPay</p>
              </div>
            </div>

            {/* Plan summary */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 mb-6 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Wybrany pakiet:</span>
                <span className="font-bold text-[#111111] dark:text-white">PhysioNotes {plan.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Czas dostępu:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{plan.durationLabel}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Typ płatności:</span>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Jednorazowa (brak auto-odnowienia)</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-base">
                <span className="font-semibold">Do zapłaty:</span>
                <span className="text-2xl font-black text-[#111111] dark:text-white">{plan.price} brutto</span>
              </div>
            </div>

            {/* Consents & declarations */}
            <div className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400 mb-6">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-emerald-600 focus:ring-emerald-500 shrink-0"
                />
                <span>
                  Oświadczam, że zapoznałem/am się z{' '}
                  <Link href="/pl/terms" target="_blank" className="text-emerald-600 dark:text-emerald-400 underline font-medium hover:opacity-80 inline-flex items-center gap-0.5">
                    Regulaminem sprzedaży i usług <ExternalLink className="h-3 w-3 inline" />
                  </Link>{' '}
                  oraz{' '}
                  <Link href="/pl/privacy" target="_blank" className="text-emerald-600 dark:text-emerald-400 underline font-medium hover:opacity-80 inline-flex items-center gap-0.5">
                    Polityką Prywatności <ExternalLink className="h-3 w-3 inline" />
                  </Link>{' '}
                  i akceptuję ich treść. <strong className="text-red-500">*</strong>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={serviceRequestAccepted}
                  onChange={(e) => setServiceRequestAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-emerald-600 focus:ring-emerald-500 shrink-0"
                />
                <span>
                  Żądam rozpoczęcia świadczenia usługi i udostępnienia licencji przed upływem 14-dniowego terminu do odstąpienia od umowy oraz przyjmuję do wiadomości zasady dotyczące prawa odstąpienia od umowy o dostarczenie treści/usługi cyfrowej. <strong className="text-red-500">*</strong>
                </span>
              </label>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleFinalCheckout}
                disabled={!termsAccepted || !serviceRequestAccepted || isCheckingOut}
                className="w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-300 dark:disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span>{isCheckingOut ? 'Otwieranie bramki HotPay...' : 'Kupuję i płacę (HotPay)'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                disabled={isCheckingOut}
                className="w-full py-2.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition text-center"
              >
                Anuluj i wróć do cennika
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
