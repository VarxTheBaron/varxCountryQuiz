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
  data.ts              # Typer och hårdkodad exempeldata
  routes/
    regions.ts         # Hämtar regioner
    countries.ts       # Hämtar länder och frågor
```

## Endpoints

| Metod | Sökväg | Svar |
| --- | --- | --- |
| GET | `/` | Ett välkomstmeddelande |
| GET | `/regions` | Alla regioner |
| GET | `/regions/nordics` | Norden med tillhörande länder |
| GET | `/countries` | Alla länder |
| GET | `/countries/sweden` | Ett land |
| GET | `/countries/sweden/questions` | Landets quizfrågor |

Byt ut `nordics` eller `sweden` mot ett annat id i datan.
Okända regioner och länder ger status 404 med ett JSON-meddelande.

Exempel från appen:

```ts
const response = await fetch('http://localhost:3000/countries/sweden/questions')
const questions = await response.json()
```

På en fysisk mobil ersätter du `localhost` med datorns lokala IP-adress.

## Bygg vidare

Lägg till objekt i listorna i `src/data.ts`. Varje land kopplas till en region
med `regionId`, och varje fråga kopplas till ett land med `countryId`.
Använd unika id:n. Frågans `correctAnswer` ska matcha ett värde i `options`.
Facit skickas med så att appen kan rätta svar lokalt. XP och progression
hanteras också i appen.
