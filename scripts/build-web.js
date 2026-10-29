// Bygger appens gränssnitt: web/alltfix.html -> appHtml.js (för Expo-appen) och dist/alltfix.html (fristående sida).
// Kör: npm run build:web
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'web/alltfix.html'), 'utf8');
const lf = path.join(root, 'node_modules/leaflet/dist');
const css = fs.readFileSync(path.join(lf, 'leaflet.css'), 'utf8');
const js = fs.readFileSync(path.join(lf, 'leaflet.js'), 'utf8').replace(/<\/script/gi, '<\\/script');
const app = JSON.parse(fs.readFileSync(path.join(root, 'app.json'), 'utf8')).expo;
const build = process.env.GITHUB_RUN_NUMBER || '0'; // samma nummer som GitHub-releasens tagg v<version>-build<nr>
const body = src.replace('/*@LEAFLET_CSS@*/', () => css).replace('/*@LEAFLET_JS@*/', () => js)
  .split('@APP_VERSION@').join(app.version).split('@APP_BUILD@').join(build);
const doc = `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#ffffff">
</head>
<body>
${body}
</body>
</html>
`;
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/alltfix.html'), doc);
fs.writeFileSync(path.join(root, 'appHtml.js'), '// Genererad av scripts/build-web.js från web/alltfix.html. Redigera inte för hand.\nexport default ' + JSON.stringify(doc) + ';\n');
console.log('appHtml.js och dist/alltfix.html skapade, version ' + app.version + ' build ' + build + ' (' + Math.round(doc.length / 1024) + ' kB)');
