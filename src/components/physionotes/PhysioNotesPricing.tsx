'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';

export function PhysioNotesPricing() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const [isYearly, setIsYearly] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Idealny dla małych gabinetów i freelancerów.',
      price: isYearly ? '490 zł' : '49 zł',
      period: isYearly ? '/ rocznie' : '/ mc',
      priceId: isYearly ? 'pri_01m1xpv6seqh7pgrfn7fnzwxd8' : 'pri_01m1xpt3fz6xydh9jgg9wyk3q8',
      features: ['Do 20 pacjentów tygodniowo', 'Wizyty bez limitu', 'Pełen wywiad SOAP & offline', 'Eksport do PDF'],
      recommended: false,
    },
    {
      name: 'Pro',
      description: 'Pełen potencjał dla prężnie działających specjalistów.',
      price: isYearly ? '790 zł' : '79 zł',
      period: isYearly ? '/ rocznie' : '/ mc',
      priceId: isYearly ? 'pri_01m1xpxgr7hb51sj2g4yamkdgz' : 'pri_01m1xpwrk0p57ff3cetavx334w',
      features: ['Bez limitu pacjentów', 'Wizyty bez limitu', 'Baza wiedzy ICD-10 i szablony', 'Automatyczne kopie zapasowe'],
      recommended: true,
    },
    {
      name: 'Klinika',
      description: 'Dla większych placówek z zespołem fizjoterapeutów.',
      price: 'Indywidualna',
      period: '',
      priceId: 'contact',
      features: ['Wiele kont dla personelu', 'Ustandaryzowana dokumentacja', 'Zaawansowane statystyki', 'Dedykowany opiekun'],
      recommended: false,
    }
  ];

  const handleCheckout = async (priceId: string) => {
    if (priceId === 'contact') {
      window.location.href = 'mailto:kontakt@physionotes.com?subject=Zapytanie o plan Klinika';
      return;
    }
    
    if (!isLoaded) return;
    
    // Wymuszenie logowania przed płatnością na stronie głównej
    if (!isSignedIn) {
      openSignIn({ forceRedirectUrl: '/physionotes/activate' });
      return;
    }

    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/hotpay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          email: user?.primaryEmailAddress?.emailAddress || '',
          userId: user?.id || ''
        })
      });
      
      const data = await response.json();
      
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        console.error('Missing redirectUrl from HotPay checkout API');
      }
    } catch (error) {
      console.error('HotPay checkout error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-[#fafafa] dark:bg-[#111111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Przejrzysty Cennik
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">
            Wybierz pakiet dla siebie
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-lg">
            Każdy pakiet zawiera <strong className="text-[#111111] dark:text-white">7 dni za darmo</strong>. Bez haczyków, możesz zrezygnować w każdej chwili.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isYearly ? 'text-[#111111] dark:text-white' : 'text-neutral-500'}`}>Miesięcznie</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-7 w-12 items-center rounded-full bg-neutral-200 dark:bg-neutral-800 transition-colors focus:outline-none"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-emerald-500 transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isYearly ? 'text-[#111111] dark:text-white' : 'text-neutral-500'}`}>
              Rocznie <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] uppercase font-bold tracking-wider">Zniżka</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative p-8 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-2xl flex flex-col ${plan.recommended ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 bg-white dark:bg-[#161616] scale-105 z-10' : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111111]'}`}>
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                  Najpopularniejszy
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-[#111111] dark:text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-neutral-500 min-h-[40px]">{plan.description}</p>
              
              <div className="mt-6 flex items-baseline gap-1">
                {plan.price === 'Indywidualna' ? (
                  <span className="text-3xl font-black tracking-tight text-[#111111] dark:text-white mt-3 mb-1.5">{plan.price}</span>
                ) : (
                  <>
                    <span className="text-5xl font-black tracking-tight text-[#111111] dark:text-white">{plan.price}</span>
                    <span className="text-sm font-medium text-neutral-500">{plan.period}</span>
                  </>
                )}
              </div>
              
              <ul className="mt-8 space-y-4 mb-10 flex-grow">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300 font-medium">
                    <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={isCheckingOut && plan.priceId !== 'contact'}
                className={`w-full py-4 px-4 rounded-xl text-sm font-bold tracking-wide transition-all mt-auto ${plan.recommended ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25' : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-[#111111] dark:text-white'}`}
              >
                {isCheckingOut && plan.priceId !== 'contact' ? 'Otwieranie bramki...' : (plan.priceId === 'contact' ? 'Skontaktuj się' : (isSignedIn ? `Wybierz ${plan.name}` : 'Wypróbuj 7 dni za darmo'))}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
