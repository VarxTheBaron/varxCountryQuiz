# Country Challenge API

Ett enkelt Hono-API med hårdkodad data. Ingen databas behövs.

## Starta

Kör i `api`-mappen:

```sh
npm install
npm run dev
```

API:t körs på http://localhost:3000. `npm run build` bygger projektet
och `npm start` startar den byggda versionen.

## Struktur

```text
src/
  index.ts             # Startar servern och kopplar in routes
  data/
    regions.ts         # Regiontyp och regiondata
    countries.ts       # Landtyp och landdata
    questions.ts       # Frågetyp och frågor grupperade per land
  routes/
    regions.ts         # Hämtar regioner
    countries.ts       # Hämtar länder och frågor
    questions.ts       # Hämtar alla frågor eller en specifik fråga
```

## Endpoints

| Metod | Sökväg | Svar |
| --- | --- | --- |
| GET | `/` | Ett välkomstmeddelande |
| GET | `/regions` | Alla regioner |
| GET | `/regions/norden` | Norden med requiredCountries och en lista med land-id:n |
| GET | `/countries` | Alla länder |
| GET | `/countries/sweden` | Ett land |
| GET | `/countries/sweden/questions` | Landets quizfrågor |
| GET | `/questions` | Alla quizfrågor |
| GET | `/questions/1` | En specifik quizfråga |

Byt ut `norden`, `sweden` eller `1` mot ett annat id i datan.
Okända regioner, länder och frågor ger status 404 med ett JSON-meddelande.

Exempel från appen:

```ts
const response = await fetch('http://localhost:3000/countries/sweden/questions')
const questions = await response.json()
```

På en fysisk mobil ersätter du `localhost` med datorns lokala IP-adress.

## Bygg vidare

Lägg till data i respektive fil under `src/data/`. Varje land kopplas till en region
med `regionId` och läggs även till i regionens `countries`-lista.
Regionens `requiredCountries` anger hur många länder spelaren behöver klara.
Landet innehåller `flag`, `difficulty` (1–3) och en `questions`-lista.
Frågorna skrivs i `questionsByCountry` i `questions.ts` och kopplas till landet
i `countries.ts`, exempelvis med `questions: questionsByCountry.sweden`.
Varje fråga innehåller `id`, `question`, `answers` och `correctAnswer`.
Använd numeriska fråge-id:n som är unika i hela API:t. `correctAnswer` är
index i `answers`, räknat från 0. Alla frågor samlas automatiskt i `/questions`.
Facit skickas med så att appen kan rätta svar lokalt. XP och progression
hanteras också i appen.
