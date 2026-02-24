// // ১. আগে translate helper function বানান
// export const translateText = async (
//   text: string,
//   targetLang: string,
// ): Promise<string> => {
//   if (!text || targetLang === "en") return text;

//   try {
//     const response = await fetch("https://libretranslate.com/translate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         q: text,
//         source: "en",
//         target: targetLang,
//         format: "text",
//       }),
//     });
//     const data = await response.json();
//     return data.translatedText || text;
//   } catch {
//     return text; // error হলে original text রাখো
//   }
// };

// // ২. Batch translate (একসাথে অনেক text)
// export const translateBatch = async (
//   texts: string[],
//   targetLang: string,
// ): Promise<string[]> => {
//   if (targetLang === "en") return texts;
//   return Promise.all(texts.map((text) => translateText(text, targetLang)));
// };

// translations.ts
// export const translations: Record<string, string[]> = {
//   en: [
//     "Personal Information", // [0]
//     "Name", // [1]
//     "Email", // [2]
//     "Address", // [3]
//     "Contact", // [4]
//     "Shift Plan for", // [5]
//     "Remarks", // [6]
//     "Date", // [7]
//     "From", // [8]
//     "Until", // [9]
//     "Shift", // [10]
//   ],
//   de: [
//     "Persönliche Informationen",
//     "Name",
//     "E-Mail",
//     "Adresse",
//     "Kontakt",
//     "Schichtplan für",
//     "Bemerkungen",
//     "Datum",
//     "Von",
//     "Bis",
//     "Schicht",
//   ],
//   fr: [
//     "Informations personnelles",
//     "Nom",
//     "E-mail",
//     "Adresse",
//     "Contact",
//     "Plan de travail pour",
//     "Remarques",
//     "Date",
//     "De",
//     "Jusqu'à",
//     "Quart",
//   ],
//   nl: [
//     "Persoonlijke informatie",
//     "Naam",
//     "E-mail",
//     "Adres",
//     "Contact",
//     "Dienstrooster voor",
//     "Opmerkingen",
//     "Datum",
//     "Van",
//     "Tot",
//     "Dienst",
//   ],
//   ro: [
//     "Informații personale",
//     "Nume",
//     "E-mail",
//     "Adresă",
//     "Contact",
//     "Planul de tură pentru",
//     "Observații",
//     "Dată",
//     "De la",
//     "Până la",
//     "Tură",
//   ],
//   pl: [
//     "Informacje osobiste",
//     "Imię",
//     "E-mail",
//     "Adres",
//     "Kontakt",
//     "Plan zmian dla",
//     "Uwagi",
//     "Data",
//     "Od",
//     "Do",
//     "Zmiana",
//   ],
//   uk: [
//     "Особиста інформація",
//     "Ім'я",
//     "Електронна пошта",
//     "Адреса",
//     "Контакт",
//     "План змін для",
//     "Примітки",
//     "Дата",
//     "Від",
//     "До",
//     "Зміна",
//   ],
//   it: [
//     "Informazioni personali",
//     "Nome",
//     "E-mail",
//     "Indirizzo",
//     "Contatto",
//     "Piano turni per",
//     "Note",
//     "Data",
//     "Dalle",
//     "Alle",
//     "Turno",
//   ],
// };

// src/utils/translations.ts

export const translations: Record<string, string[]> = {
  en: [
    "Personal Information", // [0]
    "Name", // [1]
    "Email", // [2]
    "Address", // [3]
    "Contact", // [4]
    "Plan for", // [5]
    "Remarks", // [6]
    "Date", // [7]
    "From", // [8]
    "Until", // [9]
    "Shift", // [10]
  ],
  de: [
    "Personal Information",
    "Name",
    "Email",
    "Adresse",
    "Kontakt",
    "Schichtplan für",
    "Anmerkungen",
    "Datum",
    "Zu",
    "Bilden",
    "Zeitleiste",
  ],
  fr: [
    "Personal Information",
    "Name",
    "Email",
    "Adresse",
    "Contact",
    "Plan pour",
    "Remarques",
    "Date",
    "À",
    "Formulaire",
    "Chronologie",
  ],
  nl: [
    "Personal Information",
    "Name",
    "Email",
    "Adres",
    "Contact",
    "Plan Voor",
    "Opmerkingen",
    "Datum",
    "Naar",
    "Formulier",
    "Tijdlijn",
  ],
  ro: [
    "Personal Information",
    "Name",
    "Email",
    "Adresă",
    "Contact",
    "Plan Pentru ",
    "Observații",
    "Dată",
    "La",
    "Formă",
    "Cronologie",
  ],
  pl: [
    "Personal Information",
    "Name",
    "Email",
    "Adres",
    "Kontakt",
    "Plan Na",
    "Uwagi",
    "Data",
    "Do",
    "Formularz",
    "Oś czasu",
  ],
  uk: [
    "Personal Information",
    "Name",
    "Еmail",
    "Адреса",
    "Контакт",
    "план Hа",
    "Зауваження",
    "Дата",
    "До",
    "Форма",
    "Хронологія",
  ],
  it: [
    "Personal Information",
    "Name",
    "Еmail",
    "Indirizzo",
    "Contatto",
    "Piano Per ",
    "Osservazioni",
    "Data",
    "A",
    "Modulo",
    "Cronologia",
  ],
};

// Cookie থেকে current language বের করার utility
export const getCurrentLang = (): string => {
  if (typeof document === "undefined") return "en";

  const cookies = document.cookie.split(";");
  const googtrans = cookies
    .find((c) => c.trim().startsWith("googtrans="))
    ?.trim();

  // "/en/de" → "de"
  const lang = googtrans?.split("=")[1]?.split("/")[2];
  return lang && translations[lang] ? lang : "en";
};

export const agreementTranslations: Record<string, Record<string, string>> = {
  en: {
    title: "Personnel Placement Agreement",
    between: "Between:",
    and: "And:",
    recruiter: "Recruiter",
    contentsTitle: "Contents of the Agreement",
    contentsText:
      "The Client commissions the Recruiter to search for suitable candidates for an open position within the Client's company. This agreement governs the conditions of the personnel placement process and the mutual rights and obligations of the contracting parties.",
    jobDetails: "Job Details",
    jobTitle: "Job Title",
    jobType: "Job Type",
    salary: "Salary",
    deadline: "Deadline",
    jobDescription: "Job Description",
    responsibilities: "Responsibilities",
    qualifications: "Qualifications",
    confirmation: "Confirmation",
    place: "Place",
    date: "Date",

    confirmationText:
      "The client confirmed the contract by selecting the checkbox, so no signature was required, and the agreement is now in effect.",
  },
  de: {
    title: "Personalvermittlungsvereinbarung",
    between: "Zwischen:",
    and: "Und:",
    recruiter: "Personalvermittler",
    contentsTitle: "Inhalt der Vereinbarung",
    contentsText:
      "Der Kunde beauftragt den Personalvermittler, geeignete Kandidaten für eine offene Stelle im Unternehmen des Kunden zu suchen. Diese Vereinbarung regelt die Bedingungen des Personalvermittlungsprozesses und die gegenseitigen Rechte und Pflichten der Vertragsparteien.",
    jobDetails: "Stellendetails",
    jobTitle: "Berufsbezeichnung",
    jobType: "Beschäftigungsart",
    salary: "Gehalt",
    deadline: "Frist",
    jobDescription: "Stellenbeschreibung",
    responsibilities: "Verantwortlichkeiten",
    qualifications: "Qualifikationen",
    confirmation: "Bestätigung",
    place: "Ort",
    date: "Datum",
    confirmationText:
      "Der Kunde hat den Vertrag durch Auswahl des Kontrollkästchens bestätigt, sodass keine Unterschrift erforderlich war und die Vereinbarung nun in Kraft ist.",
  },
  fr: {
    title: "Accord de placement du personnel",
    between: "Entre:",
    and: "Et:",
    recruiter: "Recruteur",
    contentsTitle: "Contenu de l'accord",
    contentsText:
      "Le client charge le recruteur de rechercher des candidats appropriés pour un poste vacant au sein de l'entreprise du client. Cet accord régit les conditions du processus de placement du personnel et les droits et obligations mutuels des parties contractantes.",
    jobDetails: "Détails du poste",
    jobTitle: "Intitulé du poste",
    jobType: "Type d'emploi",
    salary: "Salaire",
    deadline: "Date limite",
    jobDescription: "Description de l'emploi",
    responsibilities: "Responsabilités",
    qualifications: "Qualifications",
    confirmation: "Confirmation",
    place: "Lieu",
    date: "Date",
    confirmationText:
      "Le client a confirmé le contrat en cochant la case, aucune signature n'était donc requise, et l'accord est maintenant en vigueur.",
  },
  nl: {
    title: "Personeelsplaatsingsovereenkomst",
    between: "Tussen:",
    and: "En:",
    recruiter: "Recruiter",
    contentsTitle: "Inhoud van de overeenkomst",
    contentsText:
      "De klant geeft de recruiter opdracht geschikte kandidaten te zoeken voor een open functie binnen het bedrijf van de klant. Deze overeenkomst regelt de voorwaarden van het personeelsplaatsingsproces en de wederzijdse rechten en verplichtingen van de contracterende partijen.",
    jobDetails: "Functiedetails",
    jobTitle: "Functietitel",
    jobType: "Dienstverband",
    salary: "Salaris",
    deadline: "Deadline",
    jobDescription: "Functieomschrijving",
    responsibilities: "Verantwoordelijkheden",
    qualifications: "Kwalificaties",
    confirmation: "Bevestiging",
    place: "Plaats",
    date: "Datum",
    confirmationText:
      "De klant heeft het contract bevestigd door het selectievakje aan te vinken, zodat geen handtekening vereist was en de overeenkomst nu van kracht is.",
  },
  ro: {
    title: "Acord de plasare a personalului",
    between: "Între:",
    and: "Și:",
    recruiter: "Recrutor",
    contentsTitle: "Conținutul acordului",
    contentsText:
      "Clientul îl însărcinează pe recrutor să caute candidați potriviți pentru un post vacant în cadrul companiei clientului. Acest acord reglementează condițiile procesului de plasare a personalului și drepturile și obligațiile reciproce ale părților contractante.",
    jobDetails: "Detalii loc de muncă",
    jobTitle: "Titlul postului",
    jobType: "Tip de angajare",
    salary: "Salariu",
    deadline: "Termen limită",
    jobDescription: "Descrierea postului",
    responsibilities: "Responsabilități",
    qualifications: "Calificări",
    confirmation: "Confirmare",
    place: "Loc",
    date: "Dată",
    confirmationText:
      "Clientul a confirmat contractul bifând caseta de selectare, astfel că nu a fost necesară nicio semnătură, iar acordul este acum în vigoare.",
  },
  pl: {
    title: "Umowa o pośrednictwo pracy",
    between: "Pomiędzy:",
    and: "I:",
    recruiter: "Rekruter",
    contentsTitle: "Treść umowy",
    contentsText:
      "Klient zleca rekruterowi poszukiwanie odpowiednich kandydatów na wolne stanowisko w firmie klienta. Niniejsza umowa reguluje warunki procesu pośrednictwa pracy oraz wzajemne prawa i obowiązki stron umowy.",
    jobDetails: "Szczegóły stanowiska",
    jobTitle: "Stanowisko",
    jobType: "Rodzaj zatrudnienia",
    salary: "Wynagrodzenie",
    deadline: "Termin",
    jobDescription: "Opis stanowiska",
    responsibilities: "Obowiązki",
    qualifications: "Kwalifikacje",
    confirmation: "Potwierdzenie",
    place: "Miejsce",
    date: "Data",
    confirmationText:
      "Klient potwierdził umowę, zaznaczając pole wyboru, więc podpis nie był wymagany, a umowa jest teraz w mocy.",
  },
  uk: {
    title: "Угода про підбір персоналу",
    between: "Між:",
    and: "Та:",
    recruiter: "Рекрутер",
    contentsTitle: "Зміст угоди",
    contentsText:
      "Клієнт доручає рекрутеру пошук відповідних кандидатів на відкриту вакансію в компанії клієнта. Ця угода регулює умови процесу підбору персоналу та взаємні права і обов'язки договірних сторін.",
    jobDetails: "Деталі вакансії",
    jobTitle: "Назва посади",
    jobType: "Тип зайнятості",
    salary: "Зарплата",
    deadline: "Термін",
    jobDescription: "Опис вакансії",
    responsibilities: "Обов'язки",
    qualifications: "Кваліфікації",
    confirmation: "Підтвердження",
    place: "Місце",
    date: "Дата",
    confirmationText:
      "Клієнт підтвердив договір, поставивши прапорець, тому підпис не був потрібен, і угода тепер набула чинності.",
  },
  it: {
    title: "Accordo di collocamento del personale",
    between: "Tra:",
    and: "E:",
    recruiter: "Selezionatore",
    contentsTitle: "Contenuto dell'accordo",
    contentsText:
      "Il cliente incarica il selezionatore di cercare candidati idonei per una posizione aperta all'interno dell'azienda del cliente. Il presente accordo disciplina le condizioni del processo di collocamento del personale e i diritti e obblighi reciproci delle parti contraenti.",
    jobDetails: "Dettagli del lavoro",
    jobTitle: "Titolo del lavoro",
    jobType: "Tipo di impiego",
    salary: "Stipendio",
    deadline: "Scadenza",
    jobDescription: "Descrizione del lavoro",
    responsibilities: "Responsabilità",
    qualifications: "Qualifiche",
    confirmation: "Conferma",
    place: "Luogo",
    date: "Data",
    confirmationText:
      "Il cliente ha confermato il contratto selezionando la casella di controllo, quindi non era richiesta alcuna firma e l'accordo è ora in vigore.",
  },
};
