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

Deploy-kommando - 2026-09-24 13:46
Lade till api/deploy.sh för att hämta kod, validera konfiguration och uppdatera Docker-tjänsterna med ett kommando. Dokumenterade användningen och säkrade LF-radslut för shellskript.

Fler regioner och quizfrågor - 2026-09-24 14:20
Utökade till fem regioner och 13 länder med två frågor vardera. Kopplade upplåsningskrav till föregående region och verifierade bygge, progression och API-svar.

Enklare spelarprogress - 2026-09-24 15:33
Flyttade atomen utanför hooken och kopplade inläsning och sparning till AsyncStorage med två useEffect. Lade till enkel kontroll av lagrad data, felmeddelande och laddningsstatus. Bytte till includes för dubbletter och ignorerar tomma lands-ID:n. Progress ändras först efter inläsning för att skydda sparad data. Behöll lösningen enkel för skolprojektet, utan sparningskö eller nya beroenden. TypeScript och lint för båda filerna passerar; lagringsfunktionerna verifierade med simulerad lagring för standardvärden, sparning/inläsning, ogiltig data och lagringsfel. Inte körtestat på mobil.
