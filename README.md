# Country Challenge

Country Challenge är ett geografispel där spelaren får testa sina kunskaper om olika länder genom quiz.

Spelaren börjar i en region, exempelvis Norden, och väljer själv vilket land den vill spela. Varje land har ett eget quiz med frågor anpassade efter landets svårighetsgrad. När ett land klaras får spelaren XP och landet markeras som avklarat. När tillräckligt många länder i en region är klara låses nästa region upp.

Den huvudsakliga spel-loopen är:

**Världskarta → Region → Land → Quiz → Resultat → XP → Ny region**

Projektet är inspirerat av äldre geografispel och edutainment-spel, med fokus på att göra ett enkelt spel som går snabbt att starta och spela.

## Projektstruktur

Projektet består av två delar:

```text
country-challenge/
├── app/       # React Native-applikationen
├── api/       # Web API för spelets data
├── README.md
└── .gitignore
```

### App

Mobilappen byggs med:

* React Native
* Expo
* TypeScript
* Expo Router

## API

Projektet innehåller ett separat Web API byggt med **Hono**.

API:t använder enkel hårdkodad data för spelets innehåll. Det behövs ingen databas eftersom syftet med API:t främst är att appen ska kunna hämta regioner, länder och quizfrågor via HTTP.

API:t kommer bland annat att innehålla:

* Regioner
* Länder
* Svårighetsgrader
* Quizfrågor
* Svarsalternativ

Exempel på endpoints:

```text
GET /regions
GET /regions/:id
GET /countries/:id
GET /countries/:id/questions
```

Exempelvis kan appen hämta frågorna för Island genom:

```text
GET /countries/iceland/questions
```

API:t ansvarar för spelets statiska innehåll, medan spelarens XP och progression hanteras lokalt i React Native-appen.

## Status

Projektet är under utveckling.

Just nu är projektets grundstruktur uppsatt och nästa steg är att bygga den första fungerande versionen av spel-loopen:

**Region → Land → Quiz → Resultat**

## Krav för godkänt (G)

[] Projektet använder minst **4 RN-komponenter** och minst **4 moduler från Expo SDK**
[] De använda komponenterna och modulerna är **antecknade i README.md**, tillsammans med en lista över uppfyllda krav
[] **Expo Router** används för navigering i appen, och minst en skärm tar emot en parameter
[] **Git och GitHub** har använts, med commits spridda över arbetets gång
[] Projektmappen innehåller en **README.md** enligt beskrivningen ovan
[] Uppgiften är **inlämnad i tid**
[] **Muntlig presentation** är genomförd

## Krav för väl godkänt (VG)

[] Alla punkter för godkänt är uppfyllda
[x] **Ytterligare en valfri extern modul** används i projektet från [reactnative.directory](https://reactnative.directory)
[] Appen **hämtar data från ett Web-API**
[] **Användningen av AI-verktyg dokumenteras i README** – vilka verktyg du använt, till vad, och hur du verifierat att koden gör det du tror. Ta även upp det i presentationens reflekterande del.

## AI-användning

AI-verktyg kommer att användas som stöd under utvecklingen, exempelvis för idéarbete, felsökning och kodförklaringar.

AI-genererad kod kommer att kontrolleras, testas och förstås innan den används i projektet. En mer detaljerad beskrivning av AI-användningen kommer att läggas till när projektet är färdigutvecklat.
