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

## Despliegue en Render

**Opción recomendada: Static Site** (gratis, servido desde CDN, sin servidor que mantener).

- Con el Blueprint: *New → Blueprint* y elige este repositorio; usa `render.yaml`.
- A mano: *New → Static Site* con:
  - Build command: `npm ci && npm run build`
  - Publish directory: `dist`

**Opción Web Service** (si ya creaste uno):

- Build command: `npm ci && npm run build`
- Start command: `npm start` (sirve `dist/` en `0.0.0.0:$PORT`)

No uses `npm run dev` en producción: levanta el servidor de desarrollo en `localhost:5173` y Render no lo detecta ("No open ports detected"). Si usas un dominio propio con Web Service, agrégalo en `preview.allowedHosts` de `vite.config.ts`.

En ambos casos define `VITE_SITE_URL` en *Environment* cuando tengas el dominio final.

## Dónde editar

| Qué | Dónde |
|---|---|
| **Todos los textos y datos** (menú, hero, servicios, precios, ciudades, pasos, campos del formulario, políticas, FAQ, contacto, footer) | `src/content.ts` |
| Colores, fuentes y tamaños (tokens `brand-*`) | `tailwind.config.ts` |
| Estilos base (botones, campos, foco) y todas las animaciones (bloque "Animaciones") | `src/index.css` |
| Mapa de cobertura (contorno de Colombia y coordenadas de ciudades) | `src/components/coverage/` |
| Navegación entre secciones (salto + deslizamiento corto) | `src/utils/scrollToSection.ts` |
| Title, meta description, Open Graph y JSON-LD `MovingCompany` | `index.html` |
| URL pública del sitio (para Open Graph y JSON-LD) | `.env` → `VITE_SITE_URL` |
| Componentes por sección | `src/components/` |

### Imágenes

Las fuentes están en `design/images/pexels/` (fotos de banco de Pexels; créditos en `CREDITOS.md`). Las imágenes generadas por Stitch quedan en `design/stitch/images/` solo como registro del diseño. `npm run images` genera los WebP optimizados en
`public/images/` y la imagen `og-mudacol.jpg` (script `scripts/optimize-images.mjs`).

Para usar fotos propias de MudaCol:
1. Reemplaza el archivo en `design/images/pexels/` con el mismo nombre (`camion-furgon.jpg`, `personal-cargando.jpg` o `proteccion-muebles.jpg`).
2. Corre `npm run images`.
3. Ajusta el `alt` y las medidas (`width`/`height`) en `src/content.ts` (`hero.image`, `about.cards`) y actualiza `CREDITOS.md`.

Si cambias la imagen del hero, actualiza también el `<link rel="preload">` de `index.html`.

### Íconos

`index.html` carga solo los íconos de Material Symbols que se usan (parámetro `icon_names`, en
orden alfabético). Si agregas un ícono nuevo en `content.ts` o en un componente, añade su nombre
a esa lista o no se va a ver.

## Formulario de cotización

Por decisión del cliente, las solicitudes llegan **por WhatsApp** al asesor comercial de Bogotá.
El envío está en **`src/services/quote.ts` → `sendQuote(data)`**:

1. Valida los 4 pasos. Todos los campos son obligatorios salvo "detalles"; ver `validateStep` en `src/components/QuoteForm.tsx`.
2. Registra la conversión `generate_lead` (ver Medición).
3. Abre WhatsApp con la solicitud completa, ordenada por secciones (`buildQuoteMessage`). La persona solo pulsa "Enviar" y adjunta sus fotos o videos en el chat; un enlace de WhatsApp no puede llevar archivos.

Los encabezados del mensaje se editan en `quoteForm.message` de `src/content.ts`. Si más adelante se quiere guardar cada solicitud (correo, Google Sheets, CRM), se agrega dentro de `sendQuote` sin tocar el formulario.

La confirmación automática al cliente se configura en WhatsApp Business (*Mensaje de bienvenida*).

## Medición

GA4 y Meta Pixel se activan solo si hay identificadores en `.env` (local) o en *Environment* de Render:

```
VITE_GA_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=1234567890
```

Eventos: `generate_lead` (envío del formulario), `contact` (clic en WhatsApp) y `click_to_call` (clic en "Llamar"). Detalle en `src/services/analytics.ts`.

## Marcadores pendientes

Resumen completo de las respuestas del cliente y lo que falta pedir: [`docs/respuestas-cliente.md`](docs/respuestas-cliente.md).

Se ven en la página como etiquetas amarillas. Se editan en `src/content.ts` (objeto `PLACEHOLDERS`
y `contact`).

| Marcador | Dónde aparece | Qué falta |
|---|---|---|
| `[CIUDAD]` | Contacto, footer | Ciudad de la dirección Calle 156 # 7D-75 (probablemente Bogotá). Al confirmarla, agrega también `addressLocality` al JSON-LD de `index.html`. |
| `[RAZÓN SOCIAL] · NIT [NIT]` | Footer | Datos de la empresa cuando quede registrada |
| `[URL FACEBOOK]` | Footer | Enlace a la página de Facebook |
| `[TESTIMONIOS: pendiente]` | Sección de testimonios | Testimonios reales con autorización del cliente |
| `[MAPA]` | Contacto | Mapa embebido de la dirección, cuando se confirme la ciudad |
| Fotos | Inicio, Quiénes somos | Hoy son fotos de banco de Pexels aprobadas por el cliente (`design/images/pexels/CREDITOS.md`); reemplazar por fotos propias cuando existan |
| Logo | Header, hero, footer | El logo es la recreación en SVG de Stitch (`src/components/ui/Logo.tsx`); reemplazar por el archivo oficial en vector |
| `VITE_SITE_URL` | `.env` / Render | Dominio definitivo (Open Graph y JSON-LD usan rutas relativas mientras tanto) |
| `VITE_GA_ID`, `VITE_META_PIXEL_ID` | `.env` / Render | ID de Google Analytics 4 y Meta Pixel |
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
- Animaciones solo con `transform` y `opacity`, todas desactivadas con `prefers-reduced-motion` (el contenido se muestra completo y el precio aparece con su valor final).

Para agregar una ciudad al mapa de cobertura, añádela en `coverage.bases` o `coverage.destinations` de `src/content.ts`. Después agrega sus coordenadas en `CITY_POINTS` (`src/components/coverage/colombiaMap.ts`) y la posición de su etiqueta en `LABELS` (`src/components/coverage/CoverageMap.tsx`).
