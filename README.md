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

## Krav

Projektet utvecklas för kursen **Applikationsutveckling (APP) SUVNET25** och kommer att uppfylla kursens krav för G och VG.

### G

* [ ] Minst 4 React Native-komponenter
* [ ] Minst 4 Expo SDK-moduler
* [ ] Expo Router
* [ ] Parameteriserad navigation
* [ ] Git och GitHub
* [ ] README
* [ ] Presentation

### VG

* [ ] Extern modul från React Native Directory
* [ ] Web API
* [ ] AI-användning dokumenterad

## AI-användning

AI-verktyg kommer att användas som stöd under utvecklingen, exempelvis för idéarbete, felsökning och kodförklaringar.

AI-genererad kod kommer att kontrolleras, testas och förstås innan den används i projektet. En mer detaljerad beskrivning av AI-användningen kommer att läggas till när projektet är färdigutvecklat.
