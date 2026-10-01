# Country Challenge

Country Challenge är ett geografispel för den som vill öva sina kunskaper om länder genom korta quiz.

Spelaren väljer en region, exempelvis Norden, och sedan ett land. Varje land har ett eget quiz. Appen sparar bästa resultat per land och markerar länder som avklarade när spelaren når gränsen för godkänt. När tillräckligt många länder är klara låses nästa region upp. XP finns i spardatan men delas ännu inte ut.

Den huvudsakliga spel-loopen är:

**Start → Region → Land → Quiz → Resultat → Ny region**

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
| `expo-status-bar` | Ställer in statusfältets utseende. | Fanns som beroende från start men lades senare till i appens kod och konfiguration. |
| `expo-haptics` | Ska ge vibration som återkoppling på svar i quizet. | Installerad, ännu inte använd. |
| `expo-speech` | Ska kunna läsa upp frågor och svarsalternativ. | Installerad, ännu inte använd. |
| `expo-clipboard` | Kopierar antal rätt, land och spelets namn från resultatsidan. | Används i appen för avslutade quiz. |
| `expo-font` | Ska ladda en egen font för spelets text. | Fanns som beroende från start och har nu lagts till som plugin, men ingen font används ännu. |

`expo-constants` och `expo-splash-screen` fanns i startprojektet. Constants används för att hitta det lokala API:t och SplashScreen konfigurerar startbilden. De räknas inte med bland modulerna i tabellen ovan, som fokuserar på kurskravet. `expo-router` sköter navigeringen mellan appens skärmar och är enligt uppgiftsbeskrivningen ett separat krav. Git-historiken visar att endast Haptics, Speech och Clipboard är nya paket; StatusBar och Font fanns som beroenden från start. Om läraren kräver fyra separat installerade paket behövs alltså ytterligare ett. Kravet på fyra använda moduler är fortfarande öppet tills de planerade funktionerna har byggts.

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

Projektet är under utveckling. Flödet **Start → Region → Land → Quiz → Resultat** finns i appen. Spelresultat och bästa försök sparas lokalt, och profilen visar progressionen. XP-funktionen återstår.

## AI-användning

OpenAI Codex har använts som stöd för idéer, kodgranskning, förklaringar, felsökning och kodändringar i mobilappen och API:t. Arbetet och vem som gjorde ändringarna finns beskrivet steg för steg i [ai-log.md](ai-log.md).

Koden har kontrollerats mot projektets datatyper och flöden. TypeScript-kontroll, ESLint och API-bygge har körts vid relevanta ändringar; resultaten och eventuella begränsningar står i ai-loggen. Användaren har även granskat skärmarnas utseende och beteende under arbetet. En fullständig körtestning på en fysisk enhet är inte dokumenterad.

## Krav för godkänt (G)

[] Projektet använder minst **4 RN-komponenter** och minst **4 moduler från Expo SDK**
[x] De använda komponenterna och modulerna är **antecknade i README.md**, tillsammans med en lista över uppfyllda krav
[x] **Expo Router** används för navigering i appen, och minst en skärm tar emot en parameter
[x] **Git och GitHub** har använts, med commits spridda över arbetets gång
[x] Projektmappen innehåller en **README.md** enligt beskrivningen ovan
[x] Uppgiften är **inlämnad i tid**
[x] **Muntlig presentation** är genomförd

## Krav för väl godkänt (VG)

[] Alla punkter för godkänt är uppfyllda
[x] **Ytterligare en valfri extern modul** används i projektet från [reactnative.directory](https://reactnative.directory)
[x] Appen **hämtar data från ett Web-API**
[] **Användningen av AI-verktyg dokumenteras i README** – vilka verktyg du använt, till vad, och hur du verifierat att koden gör det du tror. Ta även upp det i presentationens reflekterande del.
