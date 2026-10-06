// Descarga el subconjunto de Material Symbols que usa la página y lo guarda en
// public/fonts/material-symbols.woff2 (servido desde el propio sitio: más rápido y sin terceros).
// Detecta los íconos en src/ automáticamente. Uso: npm run icons (correrlo al agregar un ícono nuevo).
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const files = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|ts)$/.test(f)) files.push(p);
  }
};
walk('src');

const names = new Set();
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  // <Icon name="x" />, también en varias líneas
  for (const m of src.matchAll(/<Icon[^>]*?\sname=["']([a-z0-9_]+)["']/gs)) names.add(m[1]);
  // <Icon name={cond ? 'a' : 'b'} />: solo los valores del ternario, no lo que se compara
  for (const m of src.matchAll(/<Icon[^>]*?\sname=\{([^}]*)\}/gs)) for (const q of m[1].matchAll(/[?:]\s*'([a-z0-9_]+)'/g)) names.add(q[1]);
  // icon: 'x' en src/content.ts y similares
  for (const m of src.matchAll(/\bicon:\s*'([a-z0-9_]+)'/g)) names.add(m[1]);
}

const list = [...names].sort();
const url = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${list.join(',')}&display=block`;
// Un agente de navegador moderno hace que Google entregue WOFF2
const css = await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36' } })).text();
const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
if (!fontUrl) throw new Error(`Google Fonts no devolvió la fuente. Respuesta:\n${css.slice(0, 300)}`);

const font = Buffer.from(await (await fetch(fontUrl)).arrayBuffer());
mkdirSync('public/fonts', { recursive: true });
writeFileSync('public/fonts/material-symbols.woff2', font);
console.log(`${list.length} íconos → public/fonts/material-symbols.woff2 (${Math.round(font.length / 1024)} KB)`);
console.log(list.join(', '));
