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

## Docker på servern

`compose.yaml` startar både API:t och Caddy. Compose skapar deras gemensamma
nätverk automatiskt. Caddy tar emot trafik på port 80 och 443 och skickar den
till API:t på port 3000. Caddys certifikat sparas i Docker-volymer.
API-datan ingår i bygget och behöver ingen egen volym.

### Starta på en ren server

Servern behöver Docker med Compose, Git och en domän som du kan ändra DNS för.
Om gamla Compose-projekt fortfarande körs: kör `docker compose down` i respektive
projekts mapp för att ta bort deras containrar och frigöra portarna. Det behåller
gamla datavolymer och filer; det är ingen fullständig radering av servern.

Lista gamla projekt med `docker compose ls`. Kör sedan följande i varje gammalt
projekts mapp, innan du startar det nya API:t:

```sh
docker compose down --remove-orphans
```

Gamla datavolymer och bind-monterade mappar som `/srv/data/app2` finns kvar.
Identifiera dem separat om även gamla sparade data ska tas bort.

1. Hämta projektet till servern och gå till `api`-mappen.
2. Kopiera `.env.example` till `.env` med `cp .env.example .env`.
3. Kontrollera att `.env` innehåller `API_DOMAIN=quiz-api.varxthebaron.se`.
   Ange bara värdnamnet, utan `https://`. `.env` är ignorerad av Git.
4. Skapa en DNS A-post för subdomänen till serverns publika IPv4-adress.
   I zonen `varxthebaron.se` är postens namn normalt `quiz-api`.
   Om subdomänen har en AAAA-post måste även den peka till rätt server.
5. Se till att TCP-portarna 80 och 443 är öppna och lediga på servern.
6. Kontrollera och starta konfigurationen:

```sh
docker compose config --quiet
docker compose run --rm --no-deps caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
docker compose up -d --build
```

Caddy ordnar HTTPS när domänen pekar rätt och portarna är nåbara.
Testa `https://quiz-api.varxthebaron.se/regions` och använd
`https://quiz-api.varxthebaron.se` som appens API-adress.

### Uppdatera och felsöka

När `deploy.sh` finns på servern uppdaterar du med ett kommando från valfri mapp:

```sh
sh /srv/apps/varxCountryQuiz/api/deploy.sh
```

Skriptet hämtar senaste koden från den aktuella grenens upstream med `git pull --ff-only`,
kontrollerar Compose och Caddy, bygger om och startar containrarna samt laddar om Caddy.
Det avbryter om ett kommando misslyckas. Serverns `.env` behålls.
Ändringar behöver vara committade och pushade innan du kör kommandot.
Första gången behöver du köra `git pull` på servern för att hämta själva skriptet.

Visa status och loggar:

```sh
docker compose ps
docker compose logs --tail=100 country-quiz-api
docker compose logs --tail=100 caddy
```

Om du ändrar `Caddyfile`, ladda om den med:

```sh
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
```
