Enkel API-struktur - 2026-09-24 10:24
Skapade hårdkodad data och Hono-routes för regioner, länder och quizfrågor. Uppdaterade README och verifierade bygge och endpoints.

Fråge-endpoints och dataformat - 2026-09-24 10:39
Lade till endpoints för alla frågor och en enskild fråga. Anpassade datan till specifikationen med fem nordiska länder och verifierade bygge, datasvar och 404-svar.

Manuella API-tester - 2026-09-24 10:46
Lade till api/test.http med anrop för alla endpoints och 404-fall för VS Code REST Client.

Uppdelad API-data - 2026-09-24 10:54
Delade upp data.ts i countries.ts, regions.ts och questions.ts under src/data. Uppdaterade importer och README samt verifierade bygge och oförändrade API-svar.

Docker och Caddy - 2026-09-24 13:07
Lade till Dockerfile, Compose och Caddy-exempel för serverns edge-nätverk. TypeScript-bygget verifierat; Docker saknas lokalt så containerbygget är inte testat.

Fristående serverkonfiguration - 2026-09-24 13:10
Samlade API och Caddy i en Compose-fil med eget nätverk, domän via .env och instruktioner för serverinstallation. Ingen server ändrad; Docker-konfigurationen är ännu inte körtestad.

Domän och gamla Docker-appar - 2026-09-24 13:13
Anpassade serverguiden för quiz-api.varxthebaron.se och borttagning av gamla Compose-appar. Inga ändringar utförda på servern.
