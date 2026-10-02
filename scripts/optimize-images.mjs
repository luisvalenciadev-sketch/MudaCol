// Convierte las imágenes fuente (design/stitch/images) a WebP optimizado en public/images.
// Uso: npm run images
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'design/stitch/images';
const OUT = 'public/images';
mkdirSync(OUT, { recursive: true });

const jobs = [
  // Camión furgón (imagen provisional generada en Stitch; reemplazar por camion-1.jpg real)
  { src: 'camion-furgon.jpg', out: 'camion-furgon', widths: [640, 1024, 1376] },
  // La captura de Stitch trae un marco de navegador falso: se recorta solo la foto
  {
    src: 'personal-cargando.jpg',
    out: 'personal-cargando',
    widths: [640, 860],
    extract: { left: 172, top: 58, width: 856, height: 520 },
  },
  { src: 'proteccion-muebles.jpg', out: 'proteccion-muebles', widths: [640, 1200] },
];

for (const job of jobs) {
  for (const w of job.widths) {
    let img = sharp(`${SRC}/${job.src}`);
    if (job.extract) img = img.extract(job.extract);
    await img.resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${OUT}/${job.out}-${w}.webp`);
  }
}

// Imagen Open Graph 1200x630 (JPG para máxima compatibilidad con redes)
await sharp(`${SRC}/camion-furgon.jpg`)
  .resize({ width: 1200, height: 630, fit: 'cover' })
  .jpeg({ quality: 82 })
  .toFile(`${OUT}/og-mudacol.jpg`);

console.log('Imágenes optimizadas en', OUT);
