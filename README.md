# Country Challenge

Country Challenge är ett geografispel för den som vill öva sina kunskaper om länder genom korta quiz. Välj en region och ett land, spela ett quiz och se ditt resultat. Bästa resultat och avklarade länder sparas lokalt, och nya regioner låses upp när tillräckligt många länder är klara. Profilen visar din progression. XP delas ännu inte ut.

**Start → Region → Land → Quiz → Resultat**

## Projektstruktur

* `mobile/` – appen, byggd med React Native, Expo, TypeScript och Expo Router.
* `api/` – Web-API byggt med Hono.
* `ai-log.md` – dokumentation av AI-stöd och verifiering.

## Så kör du appen i Expo Go

Du behöver Git, Node.js 22.13 eller senare, npm och en Android-telefon med [Expo Go för SDK 57](https://expo.dev/go). Välj SDK 57 och Android på nedladdningssidan. Appen använder det publicerade API:t som standard.

1. Klona projektet:

   ```sh
   git clone https://github.com/VarxTheBaron/varxCountryQuiz.git
   cd varxCountryQuiz/mobile
   ```

2. Installera beroenden och starta Expo:

   ```sh
   npm ci
   npm start
   ```

3. Anslut telefonen och datorn till samma nätverk och skanna terminalens QR-kod med Expo Go.
4. Välj en region och ett land och starta ett quiz.

En fysisk iPhone kan inte köra SDK 57 med Expo Go från App Store. Se [Expos guide om versionsmatchning](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/) för iOS-alternativ.

**Lokalt API:** kör `cd api`, `npm ci` och `npm run dev` i en andra terminal från projektets rot. Kopiera `mobile/.env.example` till `mobile/.env.local` för `EXPO_PUBLIC_API_URL=auto` och starta om Expo. Fler nätverks- och emulatorinställningar finns i [mobilappens README](mobile/README.md).

## Använda React Native-komponenter

| Komponent | Användning |
| --- | --- |
| `View` | Grupperar innehåll i kort, rader och skärmlayouter. |
| `Text` | Visar frågor, svar, poäng och navigeringstexter. |
| `Pressable` | Gör svar och knappar tryckbara. |
| `ScrollView` | Låter längre listor och skärmar rullas. |
| `Modal` | Bekräftar att quizet ska lämnas eller progressionen återställas. |

## Använda Expo SDK-moduler

| Modul | Användning |
| --- | --- |
| `expo-status-bar` | Ställer in statusfältets utseende i appens grundlayout. |
| `expo-haptics` | Ger haptisk återkoppling för rätt och fel svar. |
| `expo-speech` | Läser upp frågor och svar på svenska; stoppas när ett svar väljs. |
| `expo-clipboard` | Kopierar quizresultatet från resultatsidan. |
| `expo-font` | Laddar Source Sans 3 för frågor, svar och knappar. |

## Externa paket

| Paket | Användning |
| --- | --- |
| `@react-native-async-storage/async-storage` | Sparar progression, bästa resultat och avklarade länder mellan appstarter. |
| `@tanstack/react-query` (TanStack Query) | Hämtar och cachar API-data samt hanterar laddnings- och feltillstånd. |
| `jotai` | Delar progression och tillstånd för laddning och sparfel mellan skärmar. |
| `react-native-safe-area-context` | Använder `SafeAreaView` på appens skärmar för att hålla innehållet inom skärmens säkra område. |

Både [AsyncStorage](https://reactnative.directory/package/%40react-native-async-storage/async-storage/score) och [react-native-safe-area-context](https://reactnative.directory/packages?search=react-native-safe-area-context) finns på reactnative.directory och uppfyller VG-kravet på en extern modul. `SafeAreaView` importeras här från det externa paketet och räknas därför inte bland de fyra RN-komponenterna eller Expo SDK-modulerna.

## Web-API

Appen hämtar regioner, länder och quizfrågor via HTTP från Hono-API:t. Innehållet är hårdkodat och kräver ingen databas; spelarens progression sparas i appen.

Exempel på endpoints:

```text
GET /regions
GET /regions/:id
GET /countries/:id
GET /questionpacks/:id
```

## AI-användning

Jag har använt **OpenAI Codex** för lösningsdiskussioner, kodförklaringar, granskning, felsökning och delar av koden och dokumentationen. Det omfattar bland annat quiz, progression, API-adresser och Expo-moduler. Jag har granskat och valt förslag samt skrivit om vissa lösningar för att hålla koden begriplig.

Verifieringen omfattar kodgranskning, kontroll av skärmarnas utseende och beteende, TypeScript och ESLint samt API-bygge och endpointtester med giltiga och felaktiga ID:n. Uppläsning har testats i Android-emulator och på fysisk mobil, och haptik på Samsung Galaxy A56. [ai-log.md](ai-log.md) beskriver vad AI respektive jag gjorde, vilka kontroller som kördes och vad som inte körtestats.

I presentationen reflekterar jag över AI-stödet, ändrade förslag och verifieringen.

## Krav för godkänt (G)

- [x] Projektet använder minst **4 RN-komponenter** och minst **4 moduler från Expo SDK**
- [x] De använda komponenterna och modulerna är **antecknade i README.md**, tillsammans med en lista över uppfyllda krav
- [x] **Expo Router** används för navigering i appen, och minst en skärm tar emot en parameter
- [x] **Git och GitHub** har använts, med commits spridda över arbetets gång
- [x] Projektmappen innehåller en **README.md** enligt beskrivningen ovan
- [x] Uppgiften är **inlämnad i tid**
- [x] **Muntlig presentation** är genomförd

## Krav för väl godkänt (VG)

- [x] Alla punkter för godkänt är uppfyllda
- [x] **Ytterligare en valfri extern modul** används i projektet från [reactnative.directory](https://reactnative.directory)
- [x] Appen **hämtar data från ett Web-API**
- [x] **Användningen av AI-verktyg dokumenteras i README** – vilka verktyg du använt, till vad, och hur du verifierat att koden gör det du tror. Ta även upp det i presentationens reflekterande del.
