import type { Metadata } from "next";
import { ShieldCheck, Lock, Database, UserCheck, HardDrive, Cookie, Mail, FileText } from "lucide-react";
import { Section } from "@/components/ui/section";
import { isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Polityka Prywatności | Privacy Policy",
  description: "Polityka prywatności i ochrony danych medycznych — PhysioNotes V2.0 & jakubdyrszka.dev",
};

const privacySections = {
  pl: {
    eyebrow: "DOKUMENTACJA PRAWNA // RODO & COOKIES",
    title: "Polityka Prywatności i Ochrony Danych Medycznych",
    subtitle: "Wersja dokumentu: 2.0 (Zgodna z RODO, Ustawą o prawach pacjenta i Rzeczniku Praw Pacjenta, Ustawą o zawodzie fizjoterapeuty oraz Prawem Komunikacji Elektronicznej).",
    cards: [
      {
        icon: <ShieldCheck className="h-6 w-6 text-ink" />,
        title: "1. Architektura Systemu i Dwutorowy Podział Ról RODO",
        body: `Aplikacja PhysioNotes V2.0 wraz z portalem jakubdyrszka.dev funkcjonuje w oparciu o ścisłe rozdzielenie dwóch kategorii danych:

• Dane Medyczne Pacjentów (Architektura Zero-Cloud): Wyłącznym Administratorem Danych Osobowych (ADO) pacjentów wprowadzanych do aplikacji desktopowej jest fizjoterapeuta lub podmiot leczniczy. Twórca oprogramowania (Jakub Dyrszka) nie posiada żadnego dostępu do tych danych, nie przechowuje ich na swoich serwerach ani nie świadczy usług chmurowych dla dokumentacji medycznej. W konsekwencji Twórca nie jest Podmiotem Przetwarzającym (art. 28 RODO), a korzystanie z programu nie wymaga zawierania umowy powierzenia danych (DPA).
• Dane Konta i Telemetrii (Portal jakubdyrszka.dev): W odniesieniu do danych licencyjnych (adres e-mail, skrót sprzętowy deviceId, status licencji) przesyłanych do portalu, Administratorem Danych jest Jakub Dyrszka (kontakt: jakub.dyrszka@gmail.com). Przetwarzanie odbywa się na podstawie art. 6 ust. 1 lit. b RODO (wykonanie umowy licencyjnej) oraz lit. f RODO (prawnie uzasadniony interes – ochrona własności intelektualnej i weryfikacja licencji).`
      },
      {
        icon: <Database className="h-6 w-6 text-ink" />,
        title: "2. Zakres i Cel Przetwarzania w Aplikacji Desktopowej",
        body: `W ramach aplikacji PhysioNotes V2.0 fizjoterapeuta (ADO) przetwarza:
• Dane identyfikacyjne i kontaktowe: Imię, nazwisko, PESEL/data urodzenia, adres, telefon, e-mail.
• Dane szczególnej kategorii (art. 9 ust. 1 RODO): Wywiad medyczny, skargi główne, poziom bólu (VAS/NRS), badanie obiektywne, zakresy ruchomości (ROM), rozpoznanie kliniczne i kody ICD-10, plan leczenia oraz notatki z wizyt.
Podstawą prawną dla fizjoterapeuty jest art. 9 ust. 2 lit. h RODO w zw. z art. 24 Ustawy o prawach pacjenta oraz art. 9 Ustawy o zawodzie fizjoterapeuty.`
      },
      {
        icon: <Lock className="h-6 w-6 text-ink" />,
        title: "3. Bezpieczeństwo Kryptograficzne i Izolacja (AES-256-GCM)",
        body: `• Szyfrowanie bazy: Baza danych pacjentów (physionotes-secure.json) jest lokalnie szyfrowana symetrycznym algorytmem uwierzytelnionego szyfrowania AES-256-GCM.
• Wyprowadzanie klucza (scrypt): Klucz szyfrujący generowany jest z kodu PIN fizjoterapeuty z użyciem trudnej pamięciowo funkcji scrypt, co chroni przed atakami brute-force.
• Ochrona sesji i ślad audytowy: Wdrożono blokady czasowe po błędnych próbach PIN, automatyczne blokowanie sesji (Auto-Lock) po bezczynności oraz pełną rozliczalność zmian wpisów medycznych (niezmienna historia modyfikacji spełniająca wymogi EDM).`
      },
      {
        icon: <FileText className="h-6 w-6 text-ink" />,
        title: "4. Retencja Danych Medycznych (Okres Przechowywania)",
        body: `Zgodnie z art. 29 ust. 1 Ustawy o prawach pacjenta i Rzeczniku Praw Pacjenta dokumentacja medyczna musi być przechowywana przez okres 20 lat, licząc od końca roku kalendarzowego, w którym dokonano ostatniego wpisu. Prawo do usunięcia danych (prawo do bycia zapomnianym z art. 17 RODO) nie ma zastosowania do dokumentacji medycznej w okresie jej obowiązkowej 20-letniej retencji (art. 17 ust. 3 lit. b i c RODO).`
      },
      {
        icon: <UserCheck className="h-6 w-6 text-ink" />,
        title: "5. Prawa Pacjenta i Realizacja Obowiązków",
        body: `Fizjoterapeuta jako ADO zapewnia pacjentowi realizację praw z RODO:
• Prawo do informacji (art. 13 RODO) oraz odnotowanie klauzuli w profilu.
• Prawo dostępu i kopii dokumentacji (art. 15 RODO / art. 27 Ustawy o prawach pacjenta) poprzez natychmiastowy eksport do PDF.
• Prawo do sprostowania wpisów (art. 16 RODO) z zachowaniem pełnego śladu audytowego.`
      },
      {
        icon: <HardDrive className="h-6 w-6 text-ink" />,
        title: "6. Kopie Zapasowe (Backupy) w Modelu Zero-Cloud",
        body: `Wyłączną odpowiedzialność za zabezpieczenie i tworzenie kopii zapasowych bazy danych ponosi fizjoterapeuta. Aplikacja automatycznie tworzy zaszyfrowane punkty przywracania w lokalnym folderze backups/. ADO jest zobowiązany do regularnego archiwizowania tego folderu na bezpiecznym, szyfrowanym nośniku zewnętrznym. Twórca nie posiada kluczy zapasowych (master key) i w przypadku utraty PIN-u przez użytkownika odzyskanie danych jest technicznie niemożliwe.`
      },
      {
        icon: <Cookie className="h-6 w-6 text-ink" />,
        title: "7. Polityka Plików Cookies i Pamięci Lokalnej (jakubdyrszka.dev)",
        body: `Nasza strona internetowa oraz portal jakubdyrszka.dev szanują Twoją prywatność:
• Cookies technicznie niezbędne: Wykorzystujemy lokalną pamięć przeglądarki (localStorage / sessionStorage) wyłącznie w celu utrzymania wybranego języka (PL/EN), zapisu preferencji motywu oraz zapisu decyzji o akceptacji komunikatu cookies. Działania te nie wymagają uprzedniej zgody na podstawie art. 173 ust. 3 Prawa telekomunikacyjnego.
• Cookies analityczne/marketingowe: Nie stosujemy inwazyjnych skryptów śledzących, pikseli reklamowych ani nie odsprzedajemy danych telemetrycznych podmiotom trzecim.`
      },
      {
        icon: <Mail className="h-6 w-6 text-ink" />,
        title: "8. Kontakt w Sprawach Bezpieczeństwa i Ochrony Danych",
        body: `W przypadku pytań dotyczących bezpieczeństwa techniczenego aplikacji PhysioNotes V2.0, weryfikacji licencji lub przetwarzania danych na portalu jakubdyrszka.dev, prosimy o kontakt z Twórcą oprogramowania:
• Administrator Danych (Portal/Licencje): Jakub Dyrszka
• E-mail: jakub.dyrszka@gmail.com
W sprawach dotyczących konkretnej dokumentacji medycznej pacjenta właściwym podmiotem do kontaktu jest zawsze fizjoterapeuta prowadzący terapię.`
      }
    ]
  },
  en: {
    eyebrow: "LEGAL DOCUMENTATION // GDPR & COOKIES",
    title: "Privacy & Medical Data Protection Policy",
    subtitle: "Document Version: 2.0 (Compliant with GDPR, EU Data Protection Standards, Polish Patient Rights Act, and Electronic Communications Law).",
    cards: [
      {
        icon: <ShieldCheck className="h-6 w-6 text-ink" />,
        title: "1. System Architecture & Dual GDPR Roles",
        body: `PhysioNotes V2.0 desktop application and the jakubdyrszka.dev web portal operate under a strict separation of two data streams:

• Patient Medical Data (Zero-Cloud Architecture): The sole Data Controller (ADO) of patient data entered into the PhysioNotes V2.0 application is the physiotherapist or medical practice. The software developer (Jakub Dyrszka) has zero access to patient data, stores nothing on remote cloud servers, and does not provide cloud processing for medical records. Consequently, the Developer is not a Data Processor under Art. 28 GDPR, and no Data Processing Agreement (DPA) is required.
• Account & Telemetry Data (jakubdyrszka.dev Portal): For license and activation data (email address, encrypted hardware deviceId hash, license status) sent to the portal, the Data Controller is Jakub Dyrszka (contact: jakub.dyrszka@gmail.com). Processing is based on Art. 6(1)(b) GDPR (license contract performance) and Art. 6(1)(f) GDPR (legitimate interest in software verification and IP protection).`
      },
      {
        icon: <Database className="h-6 w-6 text-ink" />,
        title: "2. Scope & Purpose of Desktop Application Processing",
        body: `Within PhysioNotes V2.0, the physiotherapist processes:
• Identification & contact data: Name, national ID (PESEL)/date of birth, address, phone number, email.
• Special category health data (Art. 9(1) GDPR): Medical history, chief complaints, pain scales (VAS/NRS), objective exams, range of motion (ROM), clinical diagnoses, ICD-10 codes, treatment plans, and clinical notes.
The legal basis for the practitioner is Art. 9(2)(h) GDPR in conjunction with national healthcare regulations.`
      },
      {
        icon: <Lock className="h-6 w-6 text-ink" />,
        title: "3. Cryptographic Security & Isolation (AES-256-GCM)",
        body: `• Local Database Encryption: The local patient database (physionotes-secure.json) is encrypted using authenticated symmetric encryption AES-256-GCM.
• Key Derivation (scrypt): The encryption key is derived directly from the physiotherapist's PIN using the memory-hard scrypt function, preventing brute-force and rainbow table attacks.
• Session Security & Audit Trail: Includes PIN lockout timers, automatic session locking (Auto-Lock) on inactivity, and immutable historical audit trails for every clinical entry modification.`
      },
      {
        icon: <FileText className="h-6 w-6 text-ink" />,
        title: "4. Medical Data Retention Period (20-Year Mandate)",
        body: `In accordance with Polish and European medical documentation laws (Art. 29 of the Patient Rights Act), patient medical documentation must be retained for exactly 20 years from the end of the calendar year in which the last entry was made. The right to erasure ("right to be forgotten" under Art. 17 GDPR) does not apply to mandatory medical records during this 20-year retention window.`
      },
      {
        icon: <UserCheck className="h-6 w-6 text-ink" />,
        title: "5. Patient Rights Compliance",
        body: `The practitioner (Data Controller) enables full patient rights under GDPR through built-in software tools:
• Right to Information (Art. 13 GDPR) tracked in the patient profile.
• Right of Access & Data Portability (Art. 15 GDPR) via instantaneous, comprehensive PDF report generation.
• Right to Rectification (Art. 16 GDPR) with full chronological audit logs.`
      },
      {
        icon: <HardDrive className="h-6 w-6 text-ink" />,
        title: "6. Zero-Cloud Backups & Practitioner Responsibility",
        body: `Because PhysioNotes operates on a Zero-Cloud Offline-First model, the physiotherapist bears sole responsibility for maintaining and securing database backups. The application automatically generates encrypted restore points in the local backups/ directory. The practitioner is required to regularly archive these files to secure external storage (such as hardware-encrypted SSDs). The Developer holds no master keys or backdoors.`
      },
      {
        icon: <Cookie className="h-6 w-6 text-ink" />,
        title: "7. Cookies & Local Storage Policy (jakubdyrszka.dev)",
        body: `Our portal and website strictly respect user privacy:
• Essential Local Storage: We only use local browser mechanisms (localStorage / sessionStorage) to remember language preferences (PL/EN), UI theme preference (Dark/Light), and cookie banner consent state. Under electronic communications law, these technical items do not require prior consent.
• No Tracking/Ad Cookies: We do not deploy invasive third-party tracking scripts, advertising pixels, or sell telemetry data to external vendors.`
      },
      {
        icon: <Mail className="h-6 w-6 text-ink" />,
        title: "8. Contact for Data Protection & Security",
        body: `For questions regarding PhysioNotes V2.0 technical security, portal licensing, or web privacy practices, please contact the software creator:
• Data Controller (Portal & Licensing): Jakub Dyrszka
• Email: jakub.dyrszka@gmail.com
For medical record inquiries concerning a specific patient, please contact the treating physiotherapist directly.`
      }
    ]
  }
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const content = privacySections[locale] || privacySections.pl;

  return (
    <>
      <Section eyebrow={content.eyebrow} title={content.title} className="border-t-0">
        <p className="max-w-4xl text-lg leading-8 text-muted md:text-xl">{content.subtitle}</p>
      </Section>

      <Section dark eyebrow="SZCZEGÓŁOWE ZAPISY // DETAILED CLAUSES">
        <div className="grid gap-6">
          {content.cards.map((card, index) => (
            <div
              key={index}
              className="grid gap-4 border border-inverse-ink p-6 md:grid-cols-[auto_1fr] md:gap-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-inverse-ink md:text-2xl">
                  {card.title}
                </h3>
                <div className="mt-3 whitespace-pre-line text-sm leading-7 text-muted md:text-base">
                  {card.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
