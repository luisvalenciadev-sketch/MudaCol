// Convierte las fotos fuente (design/images/pexels) a WebP optimizado en public/images.
// Uso: npm run images
// Fotos de Pexels (licencia libre de uso comercial, sin atribución obligatoria); créditos en
// design/images/pexels/CREDITOS.md.
import sharp from 'sharp';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';

const SRC = 'design/images/pexels';
const OUT = 'public/images';
mkdirSync(OUT, { recursive: true });

// Limpia las versiones anteriores para no publicar imágenes que ya no se usan
for (const f of readdirSync(OUT)) {
  if (f.endsWith('.webp') || f === 'og-mudacol.jpg') rmSync(`${OUT}/${f}`);
}

const jobs = [
  // Inicio: camión furgón blanco (Nadine Ginzel)
  { src: 'camion-furgon.jpg', out: 'camion-furgon', widths: [480, 768, 1024, 1376] },
  // Quiénes somos: personal cargando un sofá (RDNE Stock project)
  { src: 'personal-cargando.jpg', out: 'personal-cargando', widths: [640, 960] },
  // Quiénes somos: protección de un sofá con plástico (Blue Bird)
  { src: 'proteccion-muebles.jpg', out: 'proteccion-muebles', widths: [640, 960] },
];

for (const job of jobs) {
  for (const w of job.widths) {
    await sharp(`${SRC}/${job.src}`).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${OUT}/${job.out}-${w}.webp`);
  }
}

// Imagen Open Graph 1200x630 (JPG para máxima compatibilidad con redes)
await sharp(`${SRC}/camion-furgon.jpg`)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82 })
  .toFile(`${OUT}/og-mudacol.jpg`);

console.log('Imágenes optimizadas en', OUT);
