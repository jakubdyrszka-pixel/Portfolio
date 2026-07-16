import type { Metadata } from "next";
import { FileCheck, AlertTriangle, Scale, Laptop, ShieldAlert, CheckSquare, Gavel } from "lucide-react";
import { Section } from "@/components/ui/section";
import { isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Regulamin & EULA | Terms & License",
  description: "Umowa Licencyjna Użytkownika Końcowego (EULA) oraz Regulamin Serwisu — PhysioNotes V2.0 & jakubdyrszka.dev",
};

const termsSections = {
  pl: {
    eyebrow: "DOKUMENTACJA PRAWNA // REGULAMIN I EULA",
    title: "Umowa Licencyjna Użytkownika Końcowego (EULA) & Regulamin",
    subtitle: "Wersja dokumentu: 2.0. Prawnie wiążąca umowa pomiędzy Użytkownikiem a Licencjodawcą (Jakub Dyrszka) dotycząca oprogramowania PhysioNotes V2.0 i serwisu.",
    cards: [
      {
        icon: <FileCheck className="h-6 w-6 text-ink" />,
        title: "1. Przedmiot Licencji i Model Offline-First",
        body: `1. Udzielenie licencji: Licencjodawca udziela Użytkownikowi niewyłącznej, nieprzenoszalnej, odwoływalnej licencji na korzystanie z programu PhysioNotes V2.0 w ramach prowadzonej praktyki fizjoterapeutycznej.
2. Architektura Zero-Cloud: Całość bazy danych medycznych pacjentów jest zapisywana wyłącznie lokalnie na urządzeniu Użytkownika w postaci szyfrowanej. Licencjodawca nie posiada do nich dostępu.
3. Komunikacja z portalem (jakubdyrszka.dev): W celu weryfikacji autentyczności licencji i ochrony przed piractwem, oprogramowanie przesyła do serwera licencyjnego wyłącznie dane administracyjne: adres e-mail, zanonimizowany skrót sprzętowy deviceId oraz status licencji.`
      },
      {
        icon: <AlertTriangle className="h-6 w-6 text-ink" />,
        title: "2. Ograniczenia Licencyjne i Prawo Własności",
        body: `Użytkownik zobowiązuje się, że nie będzie:
• Kopiować, modyfikować, adaptować, dokonywać inżynierii wstecznej (reverse engineering), dekompilować ani dezasemblować oprogramowania.
• Odsprzedawać, wydzierżawiać, wypożyczać, sublicencjonować ani udostępniać kodów licencyjnych osobom nieuprawnionym.
• Wykorzystywać oprogramowania w sposób naruszający przepisy prawa (w tym RODO oraz przepisy o EDM).`
      },
      {
        icon: <ShieldAlert className="h-6 w-6 text-ink" />,
        title: "3. Wyłączenie Kwalifikacji jako Wyrób Medyczny (MDR 2017/745)",
        body: `• Charakter administracyjny: PhysioNotes V2.0 jest elektronicznym narzędziem wspierającym organizację pracy gabinetu, prowadzenie EDM i generowanie raportów.
• Brak kwalifikacji wyrobu medycznego: Oprogramowanie nie stanowi wyrobu medycznego w rozumieniu Rozporządzenia (UE) 2017/745 (MDR). Nie dokonuje automatycznego diagnozowania chorób ani sterowania urządzeniami medycznymi.
• Funkcja pomocnicza: Wbudowany słownik kodów ICD-10 PL i szablony stanowią bazy wiedzy przyspieszające redagowanie tekstu. Pełną odpowiedzialność kliniczną ponosi fizjoterapeuta.`
      },
      {
        icon: <Scale className="h-6 w-6 text-ink" />,
        title: "4. Odpowiedzialność Medyczna i Prawna Użytkownika",
        body: `• Wyłączna odpowiedzialność za treści kliniczne: Użytkownik ponosi pełną odpowiedzialność za poprawność diagnoz, parametrów terapii i zaleceń wydawanych pacjentom.
• Obowiązki ADO i tworzenie kopii zapasowych: Użytkownik pełni rolę Administratora Danych Osobowych pacjentów i odpowiada za bezpieczeństwo sprzętowe swojego komputera oraz za regularne wykonywanie i przechowywanie kopii zapasowych (backupów) na bezpiecznych nośnikach zewnętrznych.`
      },
      {
        icon: <Laptop className="h-6 w-6 text-ink" />,
        title: "5. Regulamin Świadczenia Usług Drogą Elektroniczną i Reklamacje",
        body: `Na podstawie art. 8 Ustawy o świadczeniu usług drogą elektroniczną (UŚUDE):
• Usługodawca: Jakub Dyrszka (jakub.dyrszka@gmail.com).
• Wymagania techniczne: Do korzystania z portalu i aktywacji licencji wymagane jest połączenie z Internetem oraz przeglądarka lub system operacyjny obsługujący szyfrowanie HTTPS/TLS.
• Postępowanie reklamacyjne: Wszelkie reklamacje dotyczące działania portalu, aktywacji kluczy licencyjnych lub błędów oprogramowania należy zgłaszać na adres e-mail: jakub.dyrszka@gmail.com. Reklamacje są rozpatrywane w terminie do 14 dni roboczych od daty zgłoszenia.`
      },
      {
        icon: <CheckSquare className="h-6 w-6 text-ink" />,
        title: "6. Wyłączenie Gwarancji (As-Is) i Ograniczenie Odpowiedzialności",
        body: `• Oprogramowanie jest dostarczane w stanie, w jakim się znajduje („as is”), bez jakichkolwiek gwarancji wyraźnych lub dorozumianych.
• W maksymalnym zakresie dopuszczalnym przez prawo Licencjodawca nie ponosi odpowiedzialności za szkody wtórne, utratę zysków lub utratę danych wynikającą z awarii sprzętu użytkownika czy utraty kodu PIN. Łączna odpowiedzialność Licencjodawcy nie przekracza kwoty zapłaconej za opłatę licencyjną w okresie ostatnich 12 miesięcy.`
      },
      {
        icon: <Gavel className="h-6 w-6 text-ink" />,
        title: "7. Postanowienia Końcowe i Prawo Właściwe",
        body: `• Prawo właściwe: Umowa podlega prawu polskiemu.
• Rozwiązanie umowy: W przypadku rażącego naruszenia warunków licencji (np. piractwa, inżynierii wstecznej) Licencjodawca ma prawo wypowiedzieć umowę ze skutkiem natychmiastowym.
• Zmiany EULA: Aktualna wersja regulaminu i licencji jest zawsze dostępna na tej podstronie portalu.`
      }
    ]
  },
  en: {
    eyebrow: "LEGAL DOCUMENTATION // TERMS & EULA",
    title: "End-User License Agreement (EULA) & Terms of Service",
    subtitle: "Document Version: 2.0. Legally binding agreement between the User and Licensor (Jakub Dyrszka) regarding PhysioNotes V2.0 and related web services.",
    cards: [
      {
        icon: <FileCheck className="h-6 w-6 text-ink" />,
        title: "1. Grant of License & Offline-First Architecture",
        body: `1. License Grant: Licensor grants User a non-exclusive, non-transferable, revocable license to use PhysioNotes V2.0 for professional clinical documentation within their medical practice.
2. Zero-Cloud Architecture: All patient medical records are stored exclusively on the User's local hardware in encrypted form. The Licensor has zero access to patient databases.
3. Portal Communication (jakubdyrszka.dev): For license verification and anti-piracy checks, the software communicates over secure HTTPS with the licensing server, transmitting only administrative telemetry: email address, anonymized hardware hash (deviceId), and license status.`
      },
      {
        icon: <AlertTriangle className="h-6 w-6 text-ink" />,
        title: "2. License Restrictions & Intellectual Property",
        body: `The User strictly agrees not to:
• Copy, modify, adapt, reverse engineer, decompile, or disassemble the Software.
• Resell, lease, rent, sublicense, or distribute license keys to unauthorized parties.
• Use the Software in any manner violating applicable laws, including GDPR or medical documentation mandates.`
      },
      {
        icon: <ShieldAlert className="h-6 w-6 text-ink" />,
        title: "3. Not a Medical Device Disclaimer (MDR 2017/745)",
        body: `• Administrative Character: PhysioNotes V2.0 is an electronic administrative tool supporting clinical organization, record-keeping, and report formatting.
• Medical Device Disclaimer: The Software does NOT constitute a medical device under EU Regulation 2017/745 (MDR). It does not automatically diagnose conditions or control therapeutic equipment.
• Auxiliary Templates: Built-in ICD-10 codes and regional templates are reference aids only. The physiotherapist bears sole clinical and legal responsibility for patient diagnosis and treatment.`
      },
      {
        icon: <Scale className="h-6 w-6 text-ink" />,
        title: "4. Practitioner Medical & Legal Responsibility",
        body: `• Clinical Ownership: The practitioner holds full clinical responsibility for all data, treatment decisions, and patient recommendations generated using the Software.
• Data Controller & Backups: The User acts as the sole Data Controller for patient data and is strictly responsible for physical workstation security and maintaining regular, verified local backups on encrypted external drives.`
      },
      {
        icon: <Laptop className="h-6 w-6 text-ink" />,
        title: "5. Electronic Services Terms & Complaint Procedure",
        body: `Under Polish Electronic Services Law (UŚUDE):
• Service Provider: Jakub Dyrszka (jakub.dyrszka@gmail.com).
• Technical Requirements: Internet access and an HTTPS-compatible system are required for license activation.
• Complaint Procedure: Any claims or technical issues regarding portal operation or license activation should be submitted via email to jakub.dyrszka@gmail.com. Complaints are reviewed and answered within 14 business days.`
      },
      {
        icon: <CheckSquare className="h-6 w-6 text-ink" />,
        title: "6. Warranty Disclaimer (As-Is) & Limitation of Liability",
        body: `• The Software is provided "as is" without express or implied warranties of any kind.
• To the maximum extent permitted by law, the Licensor shall not be liable for any indirect, incidental, or consequential damages, including loss of clinical data due to local hardware failure or lost PIN codes. Total cumulative liability shall not exceed the license fee paid during the preceding 12 months.`
      },
      {
        icon: <Gavel className="h-6 w-6 text-ink" />,
        title: "7. Final Provisions & Governing Law",
        body: `• Governing Law: This Agreement is governed by the laws of Poland and the European Union.
• Termination: Licensor reserves the right to terminate the license immediately upon breach of terms (e.g., piracy, reverse engineering).
• Amendments: Current EULA terms are maintained and accessible on this page at all times.`
      }
    ]
  }
};

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const content = termsSections[locale] || termsSections.pl;

  return (
    <>
      <Section eyebrow={content.eyebrow} title={content.title} className="border-t-0">
        <p className="max-w-4xl text-lg leading-8 text-muted md:text-xl">{content.subtitle}</p>
      </Section>

      <Section dark eyebrow="WARUNKI UMOWY // BINDING CLAUSES">
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
