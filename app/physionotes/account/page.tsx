import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/database";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { CreditCard, Monitor, Download, ArrowRight, Activity } from "lucide-react";

export const metadata = {
  title: "Konto | PhysioNotes V2.0",
};

export default async function AccountPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await currentUser();

  // Pobieranie licencji i urządzeń z bazy danych
  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      licenses: {
        orderBy: { createdAt: 'desc' }
      },
      devices: true
    }
  });

  const activeLicense = dbUser?.licenses.find(l => l.status === 'ACTIVE' && l.expiresAt > new Date());
  const activeDevices = dbUser?.devices.filter(d => d.isActive) || [];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#111111] text-[#111111] dark:text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#111111] border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/physionotes" className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="font-semibold tracking-tight text-[#111111] dark:text-white">
              PhysioNotes <span className="text-emerald-600 dark:text-emerald-400 font-medium">Cloud</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/physionotes/download"
              className="text-xs font-medium text-neutral-500 hover:text-[#111111] dark:hover:text-white transition"
            >
              Pobierz aplikację
            </Link>
            <UserButton afterSignOutUrl="/physionotes" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
        
        {/* Powitanie */}
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Witaj, {user?.firstName || user?.emailAddresses[0]?.emailAddress}</h1>
            <p className="text-sm text-neutral-500">Zarządzaj swoją subskrypcją i urządzeniami.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Kolumna lewa - Licencja */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Karta Licencji */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                Twoja licencja
              </h2>
              
              {activeLicense ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">Plan</p>
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-lg">
                        {activeLicense.tier === 'PROFESSIONAL' ? 'Pro' : 'Starter'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-500 mb-1">Status</p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-medium">Aktywna</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Ważna do:</span>
                    <span className="font-medium">
                      {new Date(activeLicense.expiresAt).toLocaleDateString('pl-PL')}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex gap-3">
                    <Link
                      href="/physionotes/activate"
                      className="flex-1 text-center py-2.5 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-medium text-sm transition hover:opacity-90"
                    >
                      Aktywuj aplikację desktopową
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-neutral-500 mb-4">Nie masz obecnie aktywnej licencji.</p>
                  <Link
                    href="/physionotes#pricing"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-medium text-sm hover:bg-emerald-600 transition"
                  >
                    Wybierz plan <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Karta Urządzeń */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-500" />
                  Zarejestrowane urządzenia
                </h2>
                {activeLicense && (
                  <span className="text-xs font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                    {activeDevices.length} / {activeLicense.maxDevices}
                  </span>
                )}
              </div>
              
              {activeDevices.length > 0 ? (
                <ul className="space-y-3">
                  {activeDevices.map(device => (
                    <li key={device.id} className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-900/50">
                      <div>
                        <p className="text-sm font-medium">{device.deviceName}</p>
                        <p className="text-xs text-neutral-500">{device.os} • Ostatnio: {new Date(device.lastActiveAt).toLocaleDateString('pl-PL')}</p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Aktywne" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-500 py-4 text-center">Brak aktywnych urządzeń. Zaloguj się w aplikacji desktopowej, aby dodać urządzenie.</p>
              )}
            </div>
            
          </div>

          {/* Kolumna prawa - Szybkie akcje */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Szybkie akcje</h3>
              
              <div className="space-y-3">
                <Link
                  href="/physionotes/download"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
                >
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pobierz instalator</p>
                    <p className="text-xs text-neutral-500">Mac lub Windows</p>
                  </div>
                </Link>
                
                <Link
                  href="/physionotes/activate"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
                >
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Aktywacja ręczna</p>
                    <p className="text-xs text-neutral-500">Wygeneruj kod</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
