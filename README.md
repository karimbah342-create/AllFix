# AlltFix – demo-app (Expo)

Klickbar demo av AlltFix. Alla utförare, priser och bokningar är exempeldata.

## Ladda ner färdig APK
Varje push till `main` bygger en ny `allfix.apk` automatiskt (GitHub Actions, se `.github/workflows/android-apk.yml`).
Direktlänk (öppna på Android-mobilen): https://github.com/menola8803/AllFix/releases/latest/download/allfix.apk
Alla versioner: https://github.com/menola8803/AllFix/releases
Öppna länken på Android-mobilen, tryck på **allfix.apk** och installera.
Bygget kan också startas manuellt: fliken **Actions → Bygg Android APK → Run workflow**.

## 1. Kör i Expo Go (snabbast)
Kräver Node.js 20+ på datorn och appen **Expo Go** på mobilen (samma wifi).

```bash
npm install
npx expo start
```
Skanna QR-koden i terminalen med Expo Go (Android) eller kameran (iPhone).
Fungerar det inte i ditt nätverk: `npx expo start --tunnel`.

## 2. Bygg en riktig allfix.apk (Android)
Byggs i Expos moln. Gratis Expo-konto krävs: https://expo.dev/signup

```bash
npm install -g eas-cli
eas login
eas build:configure      # bara första gången, svara ja
eas build -p android --profile apk
```
När bygget är klart (ca 10–20 min) får du en länk och QR-kod.
Öppna länken på Android-mobilen, ladda ner .apk-filen och installera
(tillåt "Installera okända appar" för webbläsaren om du blir tillfrågad).
Bygget finns också under https://expo.dev → ditt projekt → Builds.

## Filer
- `App.js` – appens skal (WebView, bakåtknapp, statusrad)
- `appHtml.js` – själva AlltFix-gränssnittet
- `app.json` – namn, ikon, paketnamn `se.alltfix.demo`
- `eas.json` – byggprofil `apk`
# AllFix

## Redigera appen
Hela gränssnittet finns i `web/alltfix.html` (svenska och engelska, karta, bokning, inställningar).
Efter ändringar: kör `npm run build:web` så skapas `appHtml.js`. GitHub gör det också automatiskt vid varje bygge.

## Uppdatera appen
Från version 1.2.0 finns **Inställningar → Uppdateringar** i appen. Appen jämför sin version med senaste releasen här på GitHub och visar en knapp för att ladda ner den nya APK:n. Med "Sök automatiskt" påslaget kollar appen vid start och visar en ruta på startsidan när en ny version finns.
Versionen styrs av `version` i `app.json` plus byggnumret från GitHub Actions (taggen `v<version>-build<nr>`).

## Kartan – ingen installation behövs
Kartan i appen visar **OpenStreetMap**. OpenStreetMap är ingen app och behöver **inte installeras**: kartbilderna hämtas direkt från internet när kartan öppnas.

- Mobilen måste ha internet (wifi eller mobildata), annars visas en ruta om att kartbilderna inte laddas.
- Första gången man öppnar kartan visas en informationsruta om detta. Den kan visas igen med i-knappen uppe till höger på kartan.
- Trycker man på en nål och väljer **Google Maps** öppnas platsen i Google Maps-appen om den finns, annars i webbläsaren. Google Maps behöver alltså inte heller installeras.
- Tekniskt: kartan ritas med Leaflet (ingår i appen) och kartbilder från OpenStreetMaps egen kartserver (tile.openstreetmap.org). Ingen API-nyckel behövs.
- En separat OpenStreetMap-app på mobilen (t.ex. OsmAnd) används inte av AlltFix och behöver inte vara installerad.
