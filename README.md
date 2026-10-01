# Country Challenge

Country Challenge är ett geografispel för den som vill öva sina kunskaper om länder genom korta quiz.

Spelaren väljer en region, exempelvis Norden, och sedan ett land. Varje land har ett eget quiz. Appen sparar bästa resultat per land och markerar länder som avklarade när spelaren når gränsen för godkänt. När tillräckligt många länder är klara låses nästa region upp. XP finns i spardatan men delas ännu inte ut.

Den huvudsakliga spel-loopen är:

**Start → Region → Land → Quiz → Resultat → Start → Ny region**

Projektet är inspirerat av äldre geografispel och edutainment-spel, med fokus på att göra ett enkelt spel som går snabbt att starta och spela.

## Projektstruktur

Projektet består av två delar:

```text
varxCountryQuiz/
├── mobile/    # React Native-appen
├── api/       # Web API för spelets data
├── README.md
├── ai-log.md
└── .gitignore
```

### App

Mobilappen byggs med:

* React Native
* Expo
* TypeScript
* Expo Router

### Så bygger och kör du appen i Expo Go

Du behöver Git, Node.js 22.13 eller senare och npm på datorn samt en Android-telefon med [Expo Go för SDK 57](https://expo.dev/go). Välj SDK 57 och Android på nedladdningssidan så att Expo Go matchar projektets SDK-version. Mobilappen använder det publicerade API:t som standard, så API:t behöver inte startas lokalt för att prova appen.

1. Klona projektet och gå till mobilappen:

   ```sh
   git clone https://github.com/VarxTheBaron/varxCountryQuiz.git
   cd varxCountryQuiz/mobile
   ```

2. Installera beroenden och starta Expo:

   ```sh
   npm ci
   npm start
   ```

3. Anslut telefonen och datorn till samma nätverk. Öppna Expo Go på Android och skanna QR-koden som visas i terminalen.
4. Välj en region och ett land i appen och starta ett quiz.

En fysisk iPhone kan inte köra SDK 57 med Expo Go från App Store. Se [Expos guide om versionsmatchning](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/) för alternativ på iOS.

För att köra mot det lokala API:t i stället, öppna en andra terminal i projektets rot och kör `cd api`, `npm ci` och `npm run dev`. Kopiera `mobile/.env.example` till `mobile/.env.local` så används `EXPO_PUBLIC_API_URL=auto`. Starta sedan om Expo. Mer om lokalt nätverk, emulator och alternativa adresser finns i [mobilappens README](mobile/README.md).

### Använda React Native-komponenter

| Komponent | Användning |
| --- | --- |
| `View` | Grupperar innehåll i kort, rader och skärmlayouter. |
| `Text` | Visar frågor, svar, poäng och navigeringstexter. |
| `Pressable` | Gör svar, pilar och andra knappar tryckbara. |
| `ScrollView` | Låter längre listor och skärmar rullas på små enheter. |
| `Modal` | Visar bekräftelse innan quizet lämnas eller progress återställs. |

### Expo SDK-moduler för kurskravet

| Modul | Användning eller plan | Status |
| --- | --- | --- |
| `expo-status-bar` | Ställer in statusfältets utseende med `StatusBar` i `mobile/src/app/_layout.tsx`, appens grundlayout. | Används i appen. |
| `expo-haptics` | Ger olika haptisk återkoppling för rätt och fel svar i quizet. | Används i appen. |
| `expo-speech` | Läser upp quizets frågor och svarsalternativ på svenska; uppläsningen kan stoppas och avbryts när ett svar väljs. | Används i appen. |
| `expo-clipboard` | Kopierar antal rätt, land och spelets namn från resultatsidan. | Används i appen för avslutade quiz. |
| `expo-font` | Laddar Source Sans 3 i appens grundlayout för frågor, svar och knappar i quizet. | Används i appen. |

## API

Projektet innehåller ett separat Web API byggt med **Hono**.

API:t använder enkel hårdkodad data för spelets innehåll. Det behövs ingen databas eftersom syftet med API:t främst är att appen ska kunna hämta regioner, länder och quizfrågor via HTTP.

API:t innehåller bland annat:

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
GET /questionpacks/:id
```

Exempelvis kan appen hämta frågorna för Island genom:

```text
GET /questionpacks/iceland
```

API:t ansvarar för spelets statiska innehåll, medan spelarens progression hanteras lokalt i React Native-appen.

## Status

Projektet är under utveckling. Flödet **Start → Region → Land → Quiz → Resultat** finns i appen. Bästa försöket per land och vilka länder som klarats sparas lokalt, och profilen visar progressionen. XP-funktionen återstår.

## AI-användning

Jag har använt **OpenAI Codex** för att diskutera lösningar, få kod förklarad och granskad, felsöka samt skriva delar av mobilappen, API:t och dokumentationen. Exempel är quizets frågor och resultatvy, spelarprogress, lokala API-adresser och användningen av Expo-moduler. Jag har granskat förslagen, valt vilka lösningar som ska användas och ibland skrivit om dem för att hålla koden begriplig. I [ai-log.md](ai-log.md) framgår vad AI respektive jag gjorde i varje steg.

För att verifiera ändringarna har jag granskat koden och skärmarnas utseende och beteende. TypeScript-kontroll och ESLint har körts för mobilappen, och API:t har byggts och dess endpoints testats, även med felaktiga ID:n. Uppläsningen har testats i Android-emulator och på en fysisk Android-mobil; den haptiska återkopplingen har testats på en Samsung Galaxy A56. Ai-loggen anger vilka kontroller som gjordes för varje ändring och när en funktion inte har körtestats. Kodkontrollerna ersätter inte testning av hela appflödet på en enhet.

I presentationens reflekterande del tar jag upp hur AI-stödet påverkade arbetet, varför jag ändrade vissa förslag och hur jag kontrollerade resultatet.

## Krav för godkänt (G)

[x] Projektet använder minst **4 RN-komponenter** och minst **4 moduler från Expo SDK**
[x] De använda komponenterna och modulerna är **antecknade i README.md**, tillsammans med en lista över uppfyllda krav
[x] **Expo Router** används för navigering i appen, och minst en skärm tar emot en parameter
[x] **Git och GitHub** har använts, med commits spridda över arbetets gång
[x] Projektmappen innehåller en **README.md** enligt beskrivningen ovan
[x] Uppgiften är **inlämnad i tid**
[x] **Muntlig presentation** är genomförd

## Krav för väl godkänt (VG)

[x] Alla punkter för godkänt är uppfyllda
[x] **Ytterligare en valfri extern modul** används i projektet från [reactnative.directory](https://reactnative.directory)
[x] Appen **hämtar data från ett Web-API**
[x] **Användningen av AI-verktyg dokumenteras i README** – vilka verktyg du använt, till vad, och hur du verifierat att koden gör det du tror. Ta även upp det i presentationens reflekterande del.
