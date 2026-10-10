# AlltFix – demo-app (Expo)

Klickbar demo av AlltFix. Alla utförare, priser och bokningar är exempeldata.

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
