import type { Metadata } from "next";
import {
  FileCheck,
  Scale,
  Laptop,
  ShieldAlert,
  CheckSquare,
  Gavel,
  ShieldCheck,
  RefreshCw,
  CreditCard,
  Download,
  FileText,
  Ban,
  HardDrive,
  UserCheck,
  Building,
  HelpCircle,
} from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Regulamin Sprzedaży i Usług Cyfrowych | PhysioNotes 1.0",
  description:
    "Regulamin sprzedaży licencji, subskrypcji oraz świadczenia usług cyfrowych PhysioNotes V1.0 / V2.0 — Jakub Dyrszka & jakubdyrszka.dev",
};

const termsSections = {
  pl: {
    eyebrow: "DOKUMENTACJA PRAWNA // REGULAMIN SPRZEDAŻY I USŁUG",
    title: "Regulamin Sprzedaży i Świadczenia Usług Cyfrowych PhysioNotes",
    subtitle:
      "Wersja dokumentu: 1.0 • Obowiązuje od 16 lipca 2026 r. • Sprzedawca: Jakub Dyrszka, ul. Szuwarków 24, 43-100 Tychy (contact@jakubdyrszka.dev, tel. +48 504 345 289).",
    cards: [
      {
        icon: <Building className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 1. Postanowienia Ogólne i Dane Sprzedawcy",
        body: `1. Niniejszy Regulamin określa warunki i zasady:
a) zawierania i wykonywania umów sprzedaży licencji oraz subskrypcji na oprogramowanie komputerowe PhysioNotes,
b) świadczenia usług drogą elektroniczną przez Sprzedawcę na rzecz Klientów za pośrednictwem Serwisu internetowego,
c) prawa i obowiązki Sprzedawcy oraz Klientów, w tym uprawnienia z tytułu ustawowej zgodności treści i usług cyfrowych z umową oraz prawo odstąpienia od umowy.

2. Sprzedawcą oraz Usługodawcą jest:
Jakub Dyrszka
Adres do korespondencji i doręczeń: ul. Szuwarków 24, 43-100 Tychy, Polska
E-mail: contact@jakubdyrszka.dev | Tel: +48 504 345 289.

3. Regulamin skierowany jest do Konsumentów, Przedsiębiorców na prawach konsumenta oraz Przedsiębiorców (w szczególności fizjoterapeutów i podmiotów leczniczych).
4. Regulamin jest udostępniony nieodpłatnie w Serwisie w formie umożliwiającej jego pobranie, odtworzenie, utrwalenie oraz wydrukowanie.`
      },
      {
        icon: <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 2. Definicje",
        body: `• Aplikacja / Oprogramowanie / PhysioNotes – program komputerowy w wersji desktopowej o nazwie PhysioNotes (w tym PhysioNotes V2.0 lub nowsze), do którego autorskie prawa majątkowe posiada Sprzedawca.
• Cena – wartość brutto w PLN (z uwzględnieniem podatku VAT, o ile ma zastosowanie), należna za Licencję lub Subskrypcję.
• Dni robocze – dni od poniedziałku do piątku, z wyłączeniem dni ustawowo wolnych od pracy w Polsce.
• Klient / Użytkownik – podmiot zawierający Umowę ze Sprzedawcą lub korzystający z usług elektronicznych.
• Konsument – osoba fizyczna dokonująca czynności niezwiązanej bezpośrednio z jej działalnością gospodarczą/zawodową (art. 22¹ k.c.).
• Przedsiębiorca na prawach konsumenta – osoba fizyczna prowadząca działalność gospodarczą, gdy umowa nie posiada dla niej charakteru zawodowego (art. 385⁵ k.c., art. 7aa Ustawy o prawach konsumenta).
• Przedsiębiorca – podmiot prowadzący działalność gospodarczą we własnym imieniu, niebędący Konsumentem ani Przedsiębiorcą na prawach konsumenta.
• Serwis – serwis internetowy jakubdyrszka.dev (w tym podstrony PhysioNotes) służący do prezentacji programu, składania Zamówień i obsługi licencji.
• Zamówienie – oświadczenie woli Klienta zmierzające bezpośrednio do zawarcia Umowy sprzedaży.
• Konto / Panel Użytkownika – usługa cyfrowa umożliwiająca zarządzanie licencjami i pobieranie instalatorów.
• Klucz Licencyjny / Licencja – uprawnienie do korzystania z Oprogramowania na zasadach określonych w Regulaminie.
• Subskrypcja – model sprzedaży prawa do korzystania z Oprogramowania i usług cyfrowych na oznaczony czas (miesiąc lub rok), odnawialny automatycznie.
• Treść cyfrowa – dane dostarczane w postaci cyfrowej (instalatory, klucze, szablony).
• Usługa cyfrowa – usługa pozwalająca na dostęp do danych lub zarządzanie licencjami drogą elektroniczną.`
      },
      {
        icon: <Laptop className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 3. Dokładny Opis i Zakres Funkcjonalny PhysioNotes",
        body: `1. Charakterystyka oprogramowania:
PhysioNotes jest oprogramowaniem desktopowym (instalowanym lokalnie na stacji roboczej Użytkownika), stworzonym do wspomagania czynności organizacyjnych, administracyjnych i dokumentacyjnych gabinetu fizjoterapeutycznego. Oprogramowanie służy do:
a) organizacji pracy gabinetu fizjoterapeutycznego i kalendarza wizyt,
b) tworzenia, redagowania i systematyzowania wpisów dotyczących przebiegu wizyt pacjentów,
c) wspierania procesu sporządzania dokumentacji zabiegowej oraz zaleceń dla pacjenta,
d) generowania i eksportu podsumowań oraz kart badania do formatów przenośnych (np. PDF),
e) ułatwiania edycji wpisów za pomocą zintegrowanych słowników referencyjnych (w tym kodów ICD-10 PL) i edytowalnych szablonów wywiadu.

2. Zastrzeżenie prawne dotyczące dokumentacji medycznej:
PhysioNotes stanowi informatyczne narzędzie wspomagające pracę Użytkownika. Oprogramowanie nie zastępuje obowiązków Użytkownika wynikających z bezwzględnie obowiązujących przepisów prawa dotyczących zasad, formy, zabezpieczenia, autoryzacji, integralności oraz ustawowych okresów przechowywania i archiwizacji dokumentacji medycznej (w tym Elektronicznej Dokumentacji Medycznej – EDM). Wyłączna odpowiedzialność spoczywa na Użytkowniku.`
      },
      {
        icon: <ShieldAlert className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 4. Przeznaczenie Oprogramowania, Wyłączenie MDR i Odpowiedzialność Kliniczna",
        body: `1. Przeznaczenie oprogramowania:
PhysioNotes jest oprogramowaniem przeznaczonym do wspomagania czynności organizacyjnych, administracyjnych i dokumentacyjnych związanych z prowadzeniem gabinetu fizjoterapeutycznego. Oprogramowanie nie jest przeznaczone do samodzielnego diagnozowania, podejmowania decyzji klinicznych lub terapeutycznych, monitorowania parametrów fizjologicznych ani sterowania urządzeniami medycznymi.

2. Wyłączenie funkcji wyrobu medycznego:
Na podstawie określonego powyżej przeznaczenia oraz funkcjonalności Oprogramowania Sprzedawca nie przeznacza PhysioNotes do pełnienia funkcji wyrobu medycznego w rozumieniu Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2017/745 z dnia 5 kwietnia 2017 r. w sprawie wyrobów medycznych (MDR).

3. Charakter materiałów pomocniczych:
Wszelkie szablony, słowniki (w tym kody ICD-10), skale oraz inne materiały referencyjne dostępne w Oprogramowaniu mają charakter wyłącznie informacyjny i redakcyjny oraz nie stanowią automatycznie generowanych rekomendacji diagnostycznych ani terapeutycznych.

4. Wyłączna odpowiedzialność kliniczna i zawodowa Użytkownika:
PhysioNotes jest narzędziem informatycznym wspomagającym pracę Użytkownika. Ostateczna decyzja dotycząca rozpoznania, sposobu prowadzenia dokumentacji, przebiegu terapii, kwalifikacji do zabiegów, doboru ćwiczeń, wykluczenia przeciwwskazań, zaleceń oraz innych czynności związanych ze świadczeniem usług zdrowotnych należy wyłącznie do Użytkownika.`
      },
      {
        icon: <Laptop className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 5. Wymagania Techniczne, Kompatybilność i Interoperacyjność",
        body: `1. Minimalne wymagania techniczne Środowiska cyfrowego Klienta:
• Urządzenie: komputer stacjonarny lub przenośny (PC / Mac) wyposażony w procesor wielordzeniowy (64-bit x64 lub Apple Silicon).
• Pamięć RAM: minimum 4 GB pamięci operacyjnej (zalecane 8 GB).
• Miejsce na dysku: minimum 500 MB na instalację oraz dodatkowe miejsce na rosnącą lokalną bazę danych.
• Obsługiwane systemy operacyjne:
  - Microsoft Windows 10 (64-bit x64) / Windows 11 (64-bit x64) lub nowszy,
  - Apple macOS (wersja 12 Monterey lub nowsza; architektura Intel x64 lub Apple Silicon ARM64).
• Połączenie sieciowe: dostęp do Internetu (TLS/HTTPS) – wymagany jednorazowo do aktywacji licencji oraz okresowo do weryfikacji subskrypcji i aktualizacji. Codzienna praca z bazą pacjentów odbywa się całkowicie offline.
• Poczta elektroniczna: aktywne konto e-mail niezbędne do otrzymania klucza i powiadomień.
• Czytnik plików PDF w celu odczytu wygenerowanych raportów.

2. Sprzedawca nie gwarantuje działania Oprogramowania na urządzeniach mobilnych (smartfony/tablety) ani w emulatorach bez akceleracji sprzętowej.`
      },
      {
        icon: <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 6. Konto Klienta i Usługi Świadczone Drogą Elektroniczną",
        body: `1. Sprzedawca świadczy nieodpłatnie usługi prowadzenia Konta w Serwisie, formularza Zamówienia oraz weryfikacji licencji.
2. Rejestracja jest dobrowolna i następuje poprzez formularz w Serwisie oraz akceptację Regulaminu.
3. Umowa o prowadzenie Konta zawierana jest na czas nieoznaczony i może zostać wypowiedziana przez Klienta w każdym czasie bez opłat poprzez żądanie wysłane na contact@jakubdyrszka.dev. Usunięcie następuje w terminie do 14 Dni roboczych.
4. Klient zobowiązany jest do ochrony hasła przed dostępem osób nieuprawnionych.`
      },
      {
        icon: <FileCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 7. Zasady Licencjonowania Oprogramowania",
        body: `1. Udzielenie licencji: Z chwilą zawarcia Umowy i opłacenia Ceny Sprzedawca udziela Klientowi niewyłącznej, ograniczonej, czasowej (na okres trwania Subskrypcji) i nieprzenoszalnej licencji na korzystanie z PhysioNotes zgodnie z przeznaczeniem.
2. Stanowiska: Licencja uprawnia do korzystania na liczbie stanowisk określonej w zakupionym planie (domyślnie: 1 stanowisko). Przeniesienie licencji na inne urządzenie wymaga uprzedniej dezaktywacji na starym urządzeniu.
3. Ograniczenia: Zakaz odsprzedaży, sublicencjonowania, publicznego udostępniania klucza, inżynierii wstecznej (poza bezwzględnie obowiązującymi wyjątkami prawnymi dla interoperacyjności) oraz usuwania oznaczeń praw autorskich.
4. Skutki wygaśnięcia licencji: Wygaśnięcie licencji powoduje zablokowanie funkcji dodawania nowych wizyt i pacjentów. Wygaśnięcie licencji nie powoduje usunięcia lokalnego pliku bazy danych zapisanego na urządzeniu Użytkownika – Użytkownik zachowuje dostęp do zgromadzonych wcześniej lokalnych danych w zakresie technicznym umożliwionym przez architekturę bazy danych i Oprogramowanie.`
      },
      {
        icon: <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 8. Plany Dostępu, Ceny i Płatności",
        body: `1. Oprogramowanie oferowane jest w planach czasowych (Plan 30 dni / miesięczny, Plan 365 dni / roczny). Ceny podawane w Serwisie są cenami brutto w PLN.
2. Okres dostępu i brak automatycznego obciążania: Płatność za Licencję i usługi cyfrowe w Serwisie ma charakter jednorazowej opłaty za oznaczony czas korzystania (30 dni lub 365 dni). Płatności realizowane za pośrednictwem operatora HotPay nie podlegają automatycznemu odnowieniu w tle (brak cyklicznego obciążania karty bez wiedzy Klienta).
3. Przedłużenie i wygaśnięcie: Przedłużenie dostępu na kolejny okres następuje poprzez ponowne opłacenie wybranego planu w Serwisie. Po upływie opłaconego okresu Klient nie ponosi żadnych ukrytych kosztów, a aplikacja umożliwia dalszy wgląd w dotychczas utworzoną dokumentację w trybie odczytu.
4. Obsługa płatności: Płatności elektroniczne są obsługiwane przez zewnętrznego operatora płatności HotPay (ePłatności sp. z o.o. sp. k., ul. 27 Stycznia 9, 34-120 Andrychów).
5. Zawarcie Umowy: Zawarcie Umowy następuje po prawidłowym złożeniu Zamówienia przez Klienta w Serwisie oraz potwierdzeniu jego przyjęcia przez Sprzedawcę.
6. Dokumenty sprzedaży: Na życzenie Klienta Sprzedawca wystawia dokument sprzedaży zgodnie z obowiązującymi przepisami prawa podatkowego, przesyłany drogą elektroniczną.`
      },
      {
        icon: <Download className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 9. Dostarczenie Treści Cyfrowej (Realizacja Zamówienia)",
        body: `1. Przedmiotem świadczenia są Treści i Usługi cyfrowe (instalator oprogramowania, klucz/uprawnienie licencyjne).
2. Sprzedawca udostępnia licencję niezwłocznie po zaksięgowaniu płatności (co do zasady natychmiast drogą elektroniczną) w Panelu Użytkownika lub na adres e-mail.
3. Świadczenie uważa się za spełnione w chwili uzyskania dostępu do licencji/konta przez Klienta.
4. W przypadku problemów technicznych z aktywacją Sprzedawca zapewnia pomoc techniczną pod adresem contact@jakubdyrszka.dev.`
      },
      {
        icon: <Scale className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 10. Prawo Odstąpienia od Umowy i Zgody w Procesie Zamówienia",
        body: `1. Konsument oraz Przedsiębiorca na prawach konsumenta ma prawo odstąpić od Umowy w terminie 14 dni bez podawania przyczyny, z zastrzeżeniem ustawowych zasad dotyczących treści i usług cyfrowych.
2. Żądanie rozpoczęcia świadczenia przed upływem terminu do odstąpienia: Podczas składania Zamówienia Klient może wyrazić żądanie natychmiastowego rozpoczęcia świadczenia usługi i udostępnienia licencji przed upływem 14-dniowego terminu do odstąpienia od umowy.
3. Skutki rozpoczęcia świadczenia: W przypadku pełnego wykonania usługi lub dostarczenia treści cyfrowej za uprzednią zgodą Klienta, prawo odstąpienia podlega ograniczeniom wynikającym z art. 35 oraz art. 38 pkt 13 Ustawy o prawach konsumenta.
4. Oświadczenie o odstąpieniu można złożyć na adres contact@jakubdyrszka.dev lub listownie (ul. Szuwarków 24, 43-100 Tychy). Wzór formularza stanowi Załącznik nr 1.
5. Zwrot należnych płatności następuje w terminie do 14 dni przy użyciu tego samego sposobu zapłaty.`
      },
      {
        icon: <CheckSquare className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 11. Zgodność Treści i Usług Cyfrowych z Umową oraz Reklamacje",
        body: `1. Odpowiedzialność ustawowa: Sprzedawca ponosi odpowiedzialność za zgodność Oprogramowania i Usług cyfrowych z Umową na zasadach określonych w Rozdziale 5b Ustawy o prawach konsumenta. Postanowienia Regulaminu nie wyłączają praw konsumenckich.
2. Reklamacje: Zgłoszenia dotyczące niezgodności z Umową należy przesyłać na contact@jakubdyrszka.dev lub listownie.
3. Termin: Odpowiedź na reklamację Konsumenta udzielana jest w terminie 14 dni na Trwałym nośniku.
4. Uprawnienia: Konsument może żądać doprowadzenia do zgodności z Umową, obniżenia ceny lub odstąpienia od Umowy (jeżeli brak zgodności jest istotny).
5. Wsparcie techniczne (support): Pytania konfiguracyjne i zgłoszenia serwisowe nie stanowią formalnej reklamacji i są realizowane sukcesywnie.`
      },
      {
        icon: <RefreshCw className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 12. Aktualizacje Oprogramowania",
        body: `1. Sprzedawca może okresowo udostępniać aktualizacje Oprogramowania obejmujące poprawki bezpieczeństwa, stabilności, dostosowanie do nowych wersji systemów operacyjnych oraz rozwój funkcji.
2. W ramach aktywnej Subskrypcji aktualizacje udostępniane są bez dodatkowych opłat.
3. Obowiązki ustawowe: Postanowienia niniejszego paragrafu nie ograniczają obowiązków Sprzedawcy wynikających z przepisów dotyczących zgodności świadczenia z Umową (w tym dostarczania aktualizacji niezbędnych do zachowania zgodności z art. 43k Ustawy o prawach konsumenta).
4. Sprzedawca nie ponosi odpowiedzialności za brak zgodności wynikający wyłącznie z niezainstalowania przez Klienta udostępnionej aktualizacji, o której Klient został należycie poinformowany.`
      },
      {
        icon: <HardDrive className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 13. Architektura Danych, Prywatność Pacjentów i Obowiązek Tworzenia Kopii Zapasowych (Backup)",
        body: `1. Architektura Lokalna (Zero-Cloud / Local-First dla danych medycznych):
a) Oprogramowanie PhysioNotes funkcjonuje w modelu bazy lokalnej. Wszelkie dane wprowadzane przez Użytkownika – w tym dane osobowe pacjentów, wywiady, opisy zabiegów, diagnozy i historia wizyt – są zapisywane i przetwarzane wyłącznie lokalnie na urządzeniu Użytkownika w postaci zaszyfrowanej bazy danych.
b) W ramach standardowego działania Oprogramowania Sprzedawca nie uzyskuje dostępu do danych pacjentów wprowadzanych przez Użytkownika do lokalnej bazy danych, nie przechowuje ich na swoich serwerach, nie synchronizuje ich w chmurze ani ich nie podgląda.

2. Status Użytkownika jako Administratora Danych Osobowych (ADO):
Użytkownik jest wyłącznym Administratorem Danych Osobowych swoich pacjentów (art. 4 pkt 7 RODO) i ponosi pełną odpowiedzialność za wdrożenie właściwych środków ochrony (silne hasło/PIN, szyfrowanie dysku BitLocker/FileVault, blokada ekranu, antywirus).

3. Obowiązek backupu:
a) PhysioNotes nie stanowi usługi automatycznego tworzenia kopii zapasowych w chmurze.
b) Użytkownik jest bezpośrednio odpowiedzialny za regularne wykonywanie kopii zapasowych lokalnej bazy danych oraz ich przechowywanie w sposób bezpieczny.
c) Sprzedawca nie odpowiada za utratę danych wynikającą z awarii sprzętu Użytkownika, złośliwego oprogramowania, kradzieży urządzenia czy zapomnienia hasła/kodu PIN.

4. Dane licencyjne i telemetria administracyjna:
W celu aktywacji licencji Oprogramowanie przesyła do serwera licencyjnego wyłącznie dane techniczne: adres e-mail przypisany do licencji, zanonimizowany skrót sprzętowy deviceId, status licencji oraz numer wersji. Żadne dane pacjentów nie opuszczają urządzenia Użytkownika.`
      },
      {
        icon: <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 14. Ochrona Danych Osobowych Klientów",
        body: `1. Sprzedawca przetwarza dane osobowe Klientów jako Administrator Danych Osobowych w celach zawarcia i realizacji Umowy, obsługi Konta, rozliczeń podatkowych oraz rozpatrywania reklamacji (zgodnie z RODO).
2. Szczegółowe zasady określa Polityka Prywatności dostępna w Serwisie.`
      },
      {
        icon: <Ban className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 15. Zawieszenie i Zakończenie Licencji",
        body: `1. Sprzedawca może zawiesić lub wypowiedzieć Licencję z ważnych przyczyn (piractwo, obchodzenie zabezpieczeń, brak płatności).
2. W przypadku braku płatności Sprzedawca wysyła upomnienie e-mail z terminem uregulowania należności; dopiero po bezskutecznym upływie tego terminu dostęp ulega zawieszeniu.
3. Uprawnienie to nie narusza praw Klienta wynikających z bezwzględnie obowiązujących przepisów prawa ani nie wpływa na obowiązki dotyczące zgodności świadczenia z Umową.
4. Zawieszenie licencji nie usuwa lokalnego pliku bazy danych z urządzenia Użytkownika.`
      },
      {
        icon: <Gavel className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 16. Postanowienia Dotyczące Przedsiębiorców (B2B)",
        body: `1. Niniejszy paragraf stosuje się wyłącznie do Klientów będących zwykłymi Przedsiębiorcami (z wyłączeniem Konsumentów i Przedsiębiorców na prawach konsumenta).
2. Wyłączenie rękojmi: Odpowiedzialność Sprzedawcy z tytułu rękojmi za wady oraz za brak zgodności Treści lub Usługi cyfrowej z Umową zostaje wobec Przedsiębiorców całkowicie wyłączona.
3. Ograniczenie odszkodowawcze: Odpowiedzialność odszkodowawcza Sprzedawcy ograniczona jest wyłącznie do rzeczywistej szkody (damnum emergens), z wyłączeniem utraconych korzyści, oraz do łącznej kwoty uiszczonej przez Przedsiębiorcę z tytułu subskrypcji w okresie ostatnich 12 miesięcy.
4. Klauzula salwatoryjna: Powyższe ograniczenia nie dotyczą Konsumentów ani Przedsiębiorców na prawach konsumenta.`
      },
      {
        icon: <RefreshCw className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 17. Zmiana Regulaminu",
        body: `1. Sprzedawca może zmienić Regulamin z ważnych przyczyn prawnych lub technicznych (zmiana prawa, funkcji Oprogramowania, operatorów płatności, bezpieczeństwa).
2. Klienci z aktywną Subskrypcją są powiadamiani mailowo z wyprzedzeniem min. 14 dni.
3. Zmiana Regulaminu nie narusza praw nabytych przed datą wejścia w życie zmian.
4. W przypadku braku akceptacji nowej treści Klient ma prawo wypowiedzieć subskrypcję ze skutkiem na koniec bieżącego opłaconego okresu.`
      },
      {
        icon: <HelpCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 18. Pozasądowe Rozwiązywanie Sporów Konsumenckich",
        body: `1. Klient będący Konsumentem ma możliwość skorzystania z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń (m.in. powiatowi/miejscy rzecznicy konsumentów, Wojewódzkie Inspektoraty Inspekcji Handlowej oraz Urząd Ochrony Konkurencji i Konsumentów UOKiK).
2. Skorzystanie z pozasądowych metod rozwiązywania sporów ma charakter dobrowolny.`
      },
      {
        icon: <Scale className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 19. Postanowienia Końcowe & Wzór Formularza Odstąpienia",
        body: `1. Prawo właściwe: Umowy podlegają prawu polskiemu, bez uszczerbku dla bezwzględnie obowiązujących przepisów ochrony konsumenckiej kraju pobytu Konsumenta.
2. Sąd właściwy: Spory z podmiotami B2B rozstrzyga sąd powszechny właściwy dla adresu Sprzedawcy. Wobec Konsumentów właściwość określają przepisy ogólne k.p.c.
3. Data wejścia w życie: 16 lipca 2026 r.

---
ZAŁĄCZNIK NR 1: WZÓR ODSTĄPIENIA OD UMOWY
(do przesłania na adres: Jakub Dyrszka, ul. Szuwarków 24, 43-100 Tychy lub contact@jakubdyrszka.dev)
„Niniejszym informuję o odstąpieniu od Umowy o dostarczanie: PhysioNotes [plan].
Numer zamówienia: [...] | Data zawarcia: [...]
Imię i nazwisko: [...] | Adres: [...] | E-mail: [...]
Data: [...] | Podpis (przy wersji papierowej): [...]”`
      }
    ]
  },
  en: {
    eyebrow: "LEGAL DOCUMENTATION // TERMS OF SALE & DIGITAL SERVICES",
    title: "Terms of Sale and Digital Services for PhysioNotes",
    subtitle:
      "Document Version: 1.0 • Effective Date: July 16, 2026 • Seller: Jakub Dyrszka, ul. Szuwarków 24, 43-100 Tychy, Poland (contact@jakubdyrszka.dev, phone +48 504 345 289).",
    cards: [
      {
        icon: <Building className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 1. General Provisions & Seller Identification",
        body: `1. These Terms set out the rules and conditions for:
a) concluding and performing contracts for the sale of licenses and subscriptions for the PhysioNotes desktop software,
b) providing electronic services via the jakubdyrszka.dev portal,
c) consumer statutory non-conformity rights and right of withdrawal.

2. Seller and Service Provider:
Jakub Dyrszka
Registered address: ul. Szuwarków 24, 43-100 Tychy, Poland
Email: contact@jakubdyrszka.dev | Phone: +48 504 345 289.

3. Applicable to individual consumers, sole traders with consumer protection, and commercial entities (physiotherapists, clinics).`
      },
      {
        icon: <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 2. Definitions",
        body: `• Application / Software / PhysioNotes – desktop software owned exclusively by Jakub Dyrszka.
• Price – gross price in PLN including all applicable taxes.
• Customer / User – any legal or physical person entering into an agreement with the Seller.
• Consumer – natural person acting outside their commercial or professional capacity.
• Portal – jakubdyrszka.dev web services for downloading, ordering, and license verification.
• Order – customer declaration initiating contract conclusion.
• License / Subscription – non-exclusive right to use the software on a monthly or annual basis.
• Digital Content & Services – desktop installer files, activation keys, licensing telemetry.`
      },
      {
        icon: <Laptop className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 3. Software Description & Scope",
        body: `1. PhysioNotes is a desktop application installed locally on the User's computer, engineered to support scheduling, organizing, drafting visit notes, generating clinical summaries (PDF), and editing text using reference classifications (ICD-10).
2. Medical Records Disclaimer: PhysioNotes is a workflow aid and does not substitute statutory obligations of the practitioner regarding proper maintenance, archiving, and legal compliance of medical records.`
      },
      {
        icon: <ShieldAlert className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 4. Intended Purpose, MDR Exclusion & Clinical Responsibility",
        body: `1. Intended Purpose:
PhysioNotes is intended solely to support organizational, administrative, and clinical documentation workflows of physical therapy practices. It is not intended for automated diagnostics, physiological monitoring, clinical decision-making, or medical hardware control.

2. Medical Device Exclusion (EU MDR 2017/745):
Based on the defined intended purpose and features, the Seller does not intend PhysioNotes to function as a medical device under Regulation (EU) 2017/745 (MDR).

3. Reference Materials:
Templates, ICD-10 lists, and clinical scales are auxiliary drafting aids and do not constitute automated diagnostic or therapeutic recommendations.

4. Sole Clinical Responsibility:
The licensed physical therapist bears exclusive clinical and professional responsibility for all diagnostic assessments, treatment decisions, exercise choices, and patient instructions.`
      },
      {
        icon: <Laptop className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 5. Technical Requirements & Interoperability",
        body: `1. Hardware & OS Requirements:
• Multicore 64-bit PC or Mac (x64 Intel or Apple Silicon ARM64).
• RAM: minimum 4 GB (8 GB recommended).
• Disk: minimum 500 MB free storage + space for local database.
• Supported OS: Windows 10/11 64-bit; macOS 12 Monterey or newer.
• Network: HTTPS/TLS connection required for one-time activation and periodic subscription validation. Daily clinical work runs completely offline.
• Active email address and PDF viewer.
2. Mobile platforms (Android/iOS) and emulators are not supported.`
      },
      {
        icon: <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 6. User Account & Electronic Services",
        body: `1. Free digital services include account maintenance, ordering forms, and license validation.
2. Registration is voluntary via the portal.
3. Users can terminate their account at any time free of charge by contacting contact@jakubdyrszka.dev.
4. Users are responsible for safeguarding login credentials.`
      },
      {
        icon: <FileCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 7. Licensing Terms & Device Limits",
        body: `1. License Grant: Non-exclusive, non-transferable, time-limited subscription license for professional practice use.
2. Device Seats: Valid for 1 workstation seat by default. Migration to a new machine requires prior deactivation on the existing one.
3. Restrictions: Reselling, sublicensing, public key sharing, and unauthorized reverse engineering are strictly prohibited.
4. Expiration: Subscription lapse restricts editing of new entries. Local database files on User's disk remain intact and accessible.`
      },
      {
        icon: <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 8. Access Plans, Pricing & Payments",
        body: `1. Offered in defined access plans (30-Day Plan / Monthly, 365-Day Plan / Annual). Prices shown are gross amounts in PLN.
2. Fixed Access Period (No Silent Recurring Billing): Payment grants access for the specified duration (30 or 365 days). Payments handled via HotPay do not automatically recharge customer payment methods without explicit order placement.
3. Renewal & Expiration: Prolonging access requires placing a renewal order. Upon expiration, users retain read-only access to existing local clinical records and PDF export capabilities.
4. Payment Processing: Processed by licensed payment operator HotPay (ePłatności sp. z o.o. sp. k., ul. 27 Stycznia 9, 34-120 Andrychów, Poland).
5. Contract Conclusion: Concluded upon customer order confirmation in the Service.`
      },
      {
        icon: <Download className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 9. Digital Delivery",
        body: `1. Digital content and services (installer, license credential) are delivered electronically immediately upon payment confirmation.
2. Delivery is deemed complete upon transmission of access credentials to user account or email.
3. Technical activation assistance is available at contact@jakubdyrszka.dev.`
      },
      {
        icon: <Scale className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 10. Right of Withdrawal",
        body: `1. 14-day statutory right of withdrawal applies to Consumers in accordance with applicable consumer law.
2. Immediate service request: Customers may request immediate commencement of digital services and license provisioning before expiration of the 14-day cancellation window during checkout.
3. Statutory consequences: Once digital services are fully initiated or digital content is delivered upon express consumer request, right of withdrawal is governed by statutory limitations under consumer rights regulations.
4. Written notice can be sent to contact@jakubdyrszka.dev.`
      },
      {
        icon: <CheckSquare className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 11. Statutory Conformity & Complaints",
        body: `1. Seller is liable for conformity of digital content and services under EU Consumer Rights Directive provisions.
2. Complaints submitted to contact@jakubdyrszka.dev are reviewed within 14 days on a durable medium.
3. Technical support requests do not constitute formal consumer complaints and are answered consecutively.`
      },
      {
        icon: <RefreshCw className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 12. Software Updates",
        body: `1. Periodic updates provide security fixes, OS compatibility, and stability enhancements at no extra charge during an active subscription.
2. Statutory updates necessary to maintain conformity are provided pursuant to legal standards.
3. The Seller is not liable for issues arising solely from User failure to install notified updates.`
      },
      {
        icon: <HardDrive className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 13. Data Architecture, Patient Privacy & Backup Mandate",
        body: `1. Offline-First Architecture:
All patient medical records are stored exclusively on the User's local hardware in encrypted form. In standard operation, the Seller never accesses, stores, syncs, or inspects patient clinical records.

2. User as Sole Data Controller (GDPR):
The practitioner acts as sole Data Controller (Art. 4(7) GDPR) and must maintain local workstation safeguards (PIN, BitLocker/FileVault, antivirus).

3. Backup Responsibility:
PhysioNotes does not provide cloud backup. The User is strictly responsible for maintaining independent encrypted local backups.

4. Administrative Telemetry:
Software communicates with jakubdyrszka.dev only for license checks (email, anonymized deviceId hash, license status, app version). No patient data is ever transmitted.`
      },
      {
        icon: <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 14. Customer Data Protection",
        body: `1. Seller processes buyer account data strictly for order processing, billing, and support under GDPR.
2. Complete details are available in the Privacy Policy.`
      },
      {
        icon: <Ban className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 15. License Suspension & Termination",
        body: `1. Seller may suspend access for cause (piracy, security threats, non-payment after email reminder).
2. Suspension does not delete local patient database files from the User's computer.`
      },
      {
        icon: <Gavel className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 16. Commercial Business Terms (B2B)",
        body: `1. Applied solely to commercial B2B clients (excluding consumers and sole traders with consumer privileges).
2. Statutory warranties for non-conformity are excluded to the fullest extent permitted by law.
3. Liability is strictly limited to direct damages (damnum emergens) and capped at fees paid in the preceding 12 months.`
      },
      {
        icon: <RefreshCw className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 17. Terms Amendments",
        body: `1. Amendments occur for legitimate technical or legal reasons with 14 days advance email notice.
2. Subscribed users may terminate their subscription before new terms take effect.`
      },
      {
        icon: <HelpCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 18. Consumer Dispute Resolution",
        body: `1. Polish and EU consumers can access statutory alternative dispute resolution through municipal consumer ombudsmen and Trade Inspection bodies on a voluntary basis.`
      },
      {
        icon: <Scale className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
        title: "§ 19. Governing Law & Jurisdiction",
        body: `1. Governed by Polish law without depriving consumers of mandatory protections of their country of habitual residence.
2. Effective as of July 16, 2026.
3. Includes statutory withdrawal form template.`
      }
    ]
  }
};

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const content = termsSections[locale] || termsSections.pl;

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
