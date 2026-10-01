# Mobile

Expo-appen hämtar regioner, länder och frågepaket från samma API-basadress.
Utan inställning används `https://quiz-api.varxthebaron.se`.

## Kör mot lokalt API

Starta API:t i `api`-mappen med `npm run dev`. Kopiera `.env.example` till `.env.local` i `mobile`-mappen innan du startar Expo där med `npm start`:

```env
EXPO_PUBLIC_API_URL=auto
```

`auto` tar värdnamnet från Expo-utvecklingsservern och använder port 3000 för API:t. Med Expo i LAN-läge följer adressen därför datorns aktuella nätverk, utan att du behöver skriva om IP-adressen när nätverket byts. Starta om Expo och ladda om appen om `.env.local` ändras eller Expo-serverns värdadress byts.

Mobilen och datorn behöver kunna nå varandra över nätverket. Om Expo körs via tunnel, eller om den automatiska adressen inte fungerar, ange i stället en adress som enheten kan nå:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.42:3000
```

På en fysisk telefon betyder `localhost` telefonen själv. `auto` byter `localhost` till `10.0.2.2` på Android, vilket fungerar i Android-emulatorn men inte på en fysisk telefon; använd då Expo i LAN-läge eller ange datorns IP-adress explicit. För iOS-simulator och webbläsare kan `localhost` fungera. Datorns brandvägg måste tillåta anslutningar till API:t på port 3000. Testa gärna `http://<datorns-ip>:3000/regions` i telefonens webbläsare om anslutningen misslyckas.

Ta bort inställningen för att använda live-API:t igen. En explicit URL kan också användas för en annan miljö. `EXPO_PUBLIC_`-värden byggs in i appens JavaScript och ska aldrig innehålla hemligheter.
