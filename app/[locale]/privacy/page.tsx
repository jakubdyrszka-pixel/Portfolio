import type { Metadata } from "next";
import { ShieldCheck, Lock, Database, UserCheck, HardDrive, Cookie, Mail, FileText } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Polityka Prywatności | Privacy Policy",
  description: "Polityka prywatności i ochrony danych medycznych — PhysioNotes V2.0 & jakubdyrszka.dev",
};

const privacySections = {
  pl: {
    eyebrow: "DOKUMENTACJA PRAWNA // RODO & COOKIES",
    title: "Polityka Prywatności i Ochrony Danych",
    subtitle: "Wersja dokumentu: 2.1 (Zgodna z RODO, Ustawą o prawach pacjenta i Rzeczniku Praw Pacjenta, Ustawą o zawodzie fizjoterapeuty oraz przepisami łączności elektronicznej).",
    cards: [
      {
        icon: <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "1. Architektura Systemu i Podział Ról",
        body: `Aplikacja PhysioNotes V2.0 wraz z portalem jakubdyrszka.dev funkcjonuje w oparciu o ścisłe rozdzielenie dwóch kategorii danych:

• Dane Medyczne Pacjentów (Lokalna Architektura): Wyłącznym Administratorem Danych Osobowych (ADO) pacjentów wprowadzanych do aplikacji desktopowej jest fizjoterapeuta lub podmiot leczniczy. W standardowym modelu działania dane pacjentów są przechowywane lokalnie na urządzeniu użytkownika i nie są przekazywane do infrastruktury PhysioNotes ani na zewnętrzne serwery chmurowe.
• Dane Konta i Licencji (Portal jakubdyrszka.dev): W odniesieniu do danych licencyjnych (adres e-mail, identyfikator sprzętowy deviceId, status licencji) przesyłanych do portalu, Administratorem Danych jest Jakub Dyrszka (kontakt: contact@jakubdyrszka.dev). Przetwarzanie odbywa się na podstawie art. 6 ust. 1 lit. b RODO (wykonanie umowy) oraz lit. f RODO (prawnie uzasadniony interes – weryfikacja licencji).`
      },
      {
        icon: <Database className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "2. Zakres i Cel Przetwarzania w Aplikacji Desktopowej",
        body: `W ramach aplikacji PhysioNotes V2.0 fizjoterapeuta (ADO) przetwarza lokalnie na swojej stacji roboczej:
• Dane identyfikacyjne i kontaktowe: Imię, nazwisko, PESEL/data urodzenia, adres, telefon, e-mail.
• Dane szczególnej kategorii (art. 9 ust. 1 RODO): Wywiad medyczny, skargi główne, poziom bólu (VAS/NRS), badanie obiektywne, zakresy ruchomości (ROM), rozpoznanie kliniczne i kody ICD-10, plan leczenia oraz notatki z wizyt.
Podstawą prawną dla fizjoterapeuty jest art. 9 ust. 2 lit. h RODO w zw. z art. 24 Ustawy o prawach pacjenta oraz art. 9 Ustawy o zawodzie fizjoterapeuty.`
      },
      {
        icon: <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "3. Bezpieczeństwo Kryptograficzne i Baza Danych",
        body: `• Szyfrowanie bazy: Baza danych pacjentów na komputerze użytkownika jest zabezpieczona szyfrowaniem w standardzie AES-256 (SQLCipher).
• Wyprowadzanie klucza (scrypt): Klucz szyfrujący generowany jest z kodu PIN fizjoterapeuty z użyciem trudnej pamięciowo funkcji scrypt, co chroni przed atakami brute-force w przypadku utraty urządzenia.
• Ochrona sesji i ślad audytowy: Wdrożono blokady czasowe po błędnych próbach PIN, automatyczne blokowanie sesji (Auto-Lock) po bezczynności oraz lokalny rejestr modyfikacji wpisów (audit log).`
      },
      {
        icon: <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "4. Retencja Danych Medycznych (Okres Przechowywania)",
        body: `Zgodnie z art. 29 ust. 1 Ustawy o prawach pacjenta i Rzeczniku Praw Pacjenta dokumentacja medyczna musi być przechowywana przez okres 20 lat, licząc od końca roku kalendarzowego, w którym dokonano ostatniego wpisu. Prawo do usunięcia danych (prawo do bycia zapomnianym z art. 17 RODO) nie ma zastosowania do dokumentacji medycznej w okresie jej obowiązkowej 20-letniej retencji (art. 17 ust. 3 lit. b i c RODO).`
      },
      {
        icon: <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "5. Prawa Pacjenta i Realizacja Obowiązków",
        body: `Fizjoterapeuta jako ADO zapewnia pacjentowi realizację praw z RODO:
• Prawo do informacji (art. 13 RODO) oraz odnotowanie klauzuli w profilu.
• Prawo dostępu i kopii dokumentacji (art. 15 RODO / art. 27 Ustawy o prawach pacjenta) poprzez natychmiastowy eksport do formatu PDF.
• Prawo do sprostowania wpisów (art. 16 RODO) z zachowaniem pełnego śladu audytowego.`
      },
      {
        icon: <HardDrive className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "6. Kopie Zapasowe (Backupy)",
        body: `W modelu lokalnym odpowiedzialność za zabezpieczenie i tworzenie kopii zapasowych bazy danych ponosi fizjoterapeuta. Aplikacja udostępnia narzędzia do tworzenia zaszyfrowanych kopii zapasowych w wybranym folderze. ADO jest zobowiązany do regularnego archiwizowania bazy na bezpiecznym, szyfrowanym nośniku zewnętrznym. Twórca nie posiada kluczy głównych (master key) i w przypadku zapomnienia PIN-u przez użytkownika odzyskanie danych jest technicznie niemożliwe.`
      },
      {
        icon: <Cookie className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "7. Cookies, Pamięć Lokalna i Odbiorcy Danych (Portal)",
        body: `Portal jakubdyrszka.dev przetwarza dane w sposób przejrzysty i ograniczony do niezbędnego minimum:
• Cookies technicznie niezbędne: Wykorzystujemy lokalną pamięć przeglądarki (localStorage) oraz ściśle niezbędne ciasteczka sesyjne infrastruktury uwierzytelniania Clerk (__session, __client_uat) służące wyłącznie do utrzymania sesji zalogowanego użytkownika oraz wybranego języka i motywu.
• Odbiorcy danych (Podmioty przetwarzające):
  - Clerk, Inc. (USA) – bezpieczne uwierzytelnianie kont, obsługa logowania i sesji użytkowników,
  - HotPay (ePłatności sp. z o.o. sp. k., ul. 27 Stycznia 9, 34-120 Andrychów, Polska) – operator płatności internetowych,
  - Vercel Inc. (USA) – hosting aplikacji internetowej oraz bezpieczne serwowanie instalatorów aplikacji (Vercel Blob Storage).
• Brak cookies marketingowych: Nie stosujemy zewnętrznych trackerów reklamowych ani inwazyjnej analityki behawioralnej.`
      },
      {
        icon: <Mail className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "8. Kontakt w Sprawach Prywatności",
        body: `W przypadku pytań dotyczących funkcjonowania portalu, weryfikacji licencji lub przetwarzania danych konta, prosimy o kontakt:
• Administrator Danych (Portal & Licencje): Jakub Dyrszka
• Adres do korespondencji: ul. Szuwarków 24, 43-100 Tychy, Polska
• E-mail: contact@jakubdyrszka.dev | Tel: +48 504 345 289
W sprawach dotyczących dokumentacji konkretnego pacjenta właściwym podmiotem do kontaktu jest wyłącznie fizjoterapeuta prowadzący praktykę.`
      }
    ]
  },
  en: {
    eyebrow: "LEGAL DOCUMENTATION // PRIVACY & COOKIES",
    title: "Privacy & Data Protection Policy",
    subtitle: "Document Version: 2.1 (Compliant with GDPR, EU Data Protection Standards, and Polish Patient Rights Regulations).",
    cards: [
      {
        icon: <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "1. System Architecture & Role Separation",
        body: `PhysioNotes V2.0 desktop application and the jakubdyrszka.dev portal operate under strict architectural role separation:

• Patient Medical Data (Local Architecture): The sole Data Controller (ADO) of patient clinical data entered into the desktop application is the physiotherapist or medical practice. In standard operation, patient records are stored locally on the user's computer and are not transmitted to PhysioNotes infrastructure or external cloud servers.
• Account & License Telemetry (jakubdyrszka.dev Portal): For license validation data (email address, hardware deviceId hash, license status) sent to the portal, the Data Controller is Jakub Dyrszka (contact: contact@jakubdyrszka.dev). Processing is based on Art. 6(1)(b) GDPR (contract performance) and Art. 6(1)(f) GDPR (legitimate interest in license validation).`
      },
      {
        icon: <Database className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "2. Scope & Purpose of Desktop Application Processing",
        body: `Within PhysioNotes V2.0, the practitioner processes locally on the workstation:
• Identification & contact data: Name, national ID/date of birth, address, phone number, email.
• Special category health data (Art. 9(1) GDPR): Medical history, chief complaints, pain scales (VAS/NRS), objective exams, range of motion (ROM), clinical diagnoses, ICD-10 codes, treatment plans, and visit notes.`
      },
      {
        icon: <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "3. Cryptographic Security & Database",
        body: `• Database Encryption: Local patient database is secured with AES-256 standard encryption (SQLCipher).
• Key Derivation (scrypt): The encryption key is derived directly from the practitioner's PIN using the memory-hard scrypt function.
• Session Security & Audit Trail: Features PIN lockout protection, automatic idle screen locking, and local audit logs tracking medical entry changes.`
      },
      {
        icon: <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "4. Medical Data Retention Period (20-Year Mandate)",
        body: `Pursuant to statutory patient rights laws, medical documentation must be retained for 20 years from the end of the calendar year of the last entry. The right to erasure (Art. 17 GDPR) does not apply during this mandatory statutory retention window.`
      },
      {
        icon: <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "5. Patient Rights Compliance",
        body: `The practitioner (Data Controller) facilitates patient GDPR rights locally:
• Right to Information (Art. 13 GDPR) tracked in patient profile.
• Right of Access & Portability (Art. 15 GDPR) via immediate PDF export.
• Right to Rectification (Art. 16 GDPR) with comprehensive chronological audit logging.`
      },
      {
        icon: <HardDrive className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "6. Data Backups",
        body: `In the local storage model, the practitioner holds responsibility for maintaining and securing database backups. The application includes tools to generate encrypted backups. The developer holds no master keys or backdoors.`
      },
      {
        icon: <Cookie className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "7. Cookies, Local Storage & Sub-Processors (Portal)",
        body: `The jakubdyrszka.dev web portal processes data with strict privacy safeguards:
• Essential Session Cookies: We use browser local storage and essential session cookies (__session, __client_uat) managed by Clerk authentication infrastructure strictly to maintain logged-in user sessions, locale, and visual theme.
• Service Providers & Sub-Processors:
  - Clerk, Inc. (USA) – user authentication, account management, and session security,
  - HotPay (ePłatności sp. z o.o. sp. k., Poland) – online payment gateway,
  - Vercel Inc. (USA) – web application hosting and secure binary installer delivery (Vercel Blob Storage).
• No Marketing Trackers: We do not deploy third-party advertising pixels or behavioral tracking scripts.`
      },
      {
        icon: <Mail className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "8. Privacy Inquiries & Contact",
        body: `For questions regarding portal operations, license validation, or account data:
• Data Controller (Portal & Licensing): Jakub Dyrszka
• Address: ul. Szuwarków 24, 43-100 Tychy, Poland
• Email: contact@jakubdyrszka.dev | Phone: +48 504 345 289
For medical inquiries concerning specific patient records, please contact the treating physiotherapist directly.`
      }
    ]
  }
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const content = privacySections[locale] || privacySections.pl;

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-[#111111] dark:text-white font-sans selection:bg-emerald-500 selection:text-[#111111] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
            {content.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111] dark:text-white mb-6">
            {content.title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            {content.subtitle}
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {content.cards.map((card, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] p-6 sm:p-8 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] dark:text-white mb-3 tracking-tight">
                    {card.title}
                  </h3>
                  <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {card.body}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
