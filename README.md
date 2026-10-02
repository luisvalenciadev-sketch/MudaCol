# MudaCol · Landing page

Landing de una sola página para **MudaCol** (mudanzas dentro de Colombia), construida a partir del
diseño de Stitch y del brief `prompt_mudacol.md`.

Stack: Vite + React + TypeScript + Tailwind CSS 3. Íconos de Material Symbols (los mismos del diseño)
y fuentes Oswald + Inter de Google Fonts.

## Cómo correrlo

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # compila TypeScript y genera dist/
npm run preview   # sirve dist/ en http://localhost:4173
```

Requiere Node 20 o superior.

## Dónde editar

| Qué | Dónde |
|---|---|
| **Todos los textos y datos** (menú, hero, servicios, precios, ciudades, pasos, campos del formulario, políticas, FAQ, contacto, footer) | `src/content.ts` |
| Colores, fuentes y tamaños (tokens `brand-*`) | `tailwind.config.ts` |
| Estilos base (botones, campos, foco, animaciones) | `src/index.css` |
| Title, meta description, Open Graph y JSON-LD `MovingCompany` | `index.html` |
| URL pública del sitio (para Open Graph y JSON-LD) | `.env` → `VITE_SITE_URL` |
| Componentes por sección | `src/components/` |

### Imágenes

Las originales están en `design/stitch/images/`. `npm run images` genera los WebP optimizados en
`public/images/` y la imagen `og-mudacol.jpg` (script `scripts/optimize-images.mjs`).

Para usar las fotos reales de la flota:
1. Pon el archivo en `design/stitch/images/`.
2. Agrégalo a `scripts/optimize-images.mjs` y corre `npm run images`.
3. Cambia la ruta y el `alt` en `src/content.ts` (`hero.image`, `about.cards`) y quita el `placeholder`.

Si cambias la imagen del hero, actualiza también el `<link rel="preload">` de `index.html`.

### Íconos

`index.html` carga solo los íconos de Material Symbols que se usan (parámetro `icon_names`, en
orden alfabético). Si agregas un ícono nuevo en `content.ts` o en un componente, añade su nombre
a esa lista o no se va a ver.

## Conectar el formulario

El envío está aislado en **`src/services/quote.ts` → `submitQuote(data)`**, que por ahora es una
simulación (espera 1 segundo y responde OK). Para conectarlo:

- Reemplaza el cuerpo de `submitQuote` con la integración elegida (endpoint propio, servicio de
  correo, Google Sheets vía Apps Script, CRM…). En el comentario de la función hay un ejemplo con
  `fetch` y `FormData`.
- Conserva la firma `submitQuote(data: QuoteData): Promise<QuoteResult>`: el formulario no necesita
  cambios.
- `toPlainObject(data)` devuelve los datos listos para enviar (sin archivos); los archivos van
  en `data.files`.
- Hoy no hay límite de cantidad ni de tamaño de archivos. Defínelo según el servicio que reciba los
  videos.

El botón "Enviar por WhatsApp" arma el mensaje con nombre, origen, destino y fecha
(`buildWhatsappQuoteLink` en el mismo archivo).

## Marcadores pendientes

Se ven en la página como etiquetas amarillas. Se editan en `src/content.ts` (objeto `PLACEHOLDERS`
y `contact`).

| Marcador | Dónde aparece | Qué falta |
|---|---|---|
| `[CIUDAD]` | Contacto, footer | Ciudad de la dirección Calle 156 # 7D-75 (probablemente Bogotá). Al confirmarla, agrega también `addressLocality` al JSON-LD de `index.html`. |
| `[CORREO]` | Contacto, footer | Correo electrónico de contacto |
| `[URL FACEBOOK]` | Footer | Enlace a la página de Facebook |
| `[TESTIMONIOS: pendiente]` | Sección de testimonios | Testimonios reales con autorización del cliente |
| `[MAPA]` | Contacto | Mapa embebido de la dirección, cuando se confirme la ciudad |
| `[FOTO: camion-1.jpg …]` | Hero | Foto real del camión furgón de la flota (la actual es una imagen generada por Stitch) |
| `[FOTO: personal cargando muebles]`, `[FOTO: protección de muebles]` | Quiénes somos | Fotos reales (las actuales son generadas por Stitch y muestran uniformes "MudaCol" que no son reales) |
| Logo | Header, hero, footer | El logo es la recreación en SVG de Stitch (`src/components/ui/Logo.tsx`); reemplazar por el archivo oficial en vector |
| `VITE_SITE_URL` | `.env` | Dominio definitivo (Open Graph y JSON-LD usan rutas relativas mientras tanto) |
| Política de tratamiento de datos / Términos del servicio | Footer | Páginas legales (los enlaces apuntan a `#`) |

## Diseño

- `design/stitch/`: pantallas originales de Stitch (captura, HTML y logo) y sus imágenes.
- `design/comparison/`: comparación por sección entre Stitch y la implementación, con la lista de
  diferencias y su motivo (`design/comparison/README.md`).

## Calidad verificada

- `npm run build` sin errores ni avisos de TypeScript.
- Sin scroll horizontal a 360, 768 y 1280 px.
- axe-core (WCAG 2.1 AA y buenas prácticas): 0 violaciones a 360 y 1280 px.
- Navegación con teclado: enlace "Saltar al contenido", foco visible, acordeones con
  `aria-expanded` (Enter, Espacio, flechas, Inicio y Fin) y menú móvil que se cierra con Escape.
- Animaciones desactivadas con `prefers-reduced-motion`.
