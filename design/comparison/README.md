# Comparación visual: Stitch vs. implementación

Cada imagen `NN-seccion.jpg` muestra a la izquierda el recorte de la pantalla de Stitch
(`design/stitch/screen-1.png`, escritorio a 1280 px × 1,25) y a la derecha la implementación
a la misma escala. En `mobile-360/` están las mismas secciones de la implementación a 360 px,
porque Stitch solo diseñó la versión de escritorio.

Regla aplicada: **Stitch manda en lo visual; el brief (`prompt_mudacol.md`) manda en el contenido.**

## Cambios generales

| Diferencia | Motivo |
|---|---|
| Botones de WhatsApp en un verde más oscuro (`brand-whatsapp`, `#13853F`) con texto blanco | El blanco sobre `#25D366` da 1,98:1 y no cumple AA; sobre `#13853F` da 4,7:1. `#25D366` se usa en íconos y puntos sobre fondo oscuro. |
| Botones de acción en `brand-action` (#2563EB, el `blue-600` que usa Stitch) y no en `#1E88E5` | El blanco sobre `#1E88E5` da 3,6:1 y no cumple AA; `#2563EB` da 5,2:1. `#1E88E5` se mantiene en logo, acentos y bordes. |
| Antetítulos y bajadas de sección reescritos | Los de Stitch hacían afirmaciones que no están en el brief ("sin cobros sorpresa", "flota propia monitoreada", "24 horas hábiles", "Pautas contractuales…"). |
| Fotos de banco (Pexels) en lugar de las de Stitch | Las de Stitch eran generadas por IA y mostraban uniformes "MudaCol" que no existen. El cliente aprobó fotos de banco (respuesta #18). |
| Íconos de WhatsApp, Instagram y Facebook en SVG propio | No existen en Material Symbols (Stitch usaba `chat` y `send`). |
| Animaciones (ver lista abajo) | Las pide el brief. Se desactivan con `prefers-reduced-motion` y solo animan `transform` y `opacity`. |

### Animaciones

- **Header:** barra de progreso de lectura, sombra al bajar y subrayado animado en el menú.
- **Hero:** entrada escalonada al cargar, foto que entra desde la derecha con un leve zoom de asentamiento, diagonal azul con deriva lenta y franja de servicios en cascada.
- **Aparición al hacer scroll:** hacia arriba, desde la izquierda o derecha, o con escala, según la sección.
- **Botones:** elevación y un destello diagonal al pasar el mouse.
- **Tarjetas de servicios:** se elevan, el ícono se rellena de azul, aparece una línea de acento y la flecha se desplaza.
- **Precio:** conteo de $0 a $500.000 (el lector de pantalla recibe siempre el valor final) y factores en cascada.
- **Cobertura:** mapa animado e interactivo (ver la sección 06).
- **Cómo funciona:** la línea de tiempo se dibuja y los pasos aparecen uno tras otro.
- **Formulario:** transición corta entre pasos.
- **Políticas y FAQ:** acordeones con altura animada.
- **Contacto:** degradado que se desplaza lentamente.
- **WhatsApp flotante:** entrada al cargar, un pulso cada 4 s y etiqueta "Cotiza por WhatsApp" al pasar el mouse.

## Por sección

**01 · Header y hero**
- Se quitó "QUIÉNES SOMOS" del menú: el menú del brief es Inicio · Servicios · Cobertura · Cómo funciona · Preguntas frecuentes · Contacto.
- Los ítems del menú ya no se parten en dos líneas (`whitespace-nowrap`).
- Subtítulo exacto del brief, sin "con el respaldo, cuidado y puntualidad que mereces".
- Se quitó el pie de foto "Flota propia custodiada / mantas térmicas / 3.5 TON", que eran datos inventados. Se usan frases del brief: "Servicio exclusivo · Servicio confiable" y "Local & Nacional".
- Horario en el formato del brief ("8:00 a. m. – 7:00 p. m."), por eso la ficha ocupa dos líneas.
- Se agregó una diagonal azul de fondo, como pide el estilo visual del brief.

**02 · Quiénes somos**
- Las tarjetas de foto usan textos del brief ("Carga y descarga" y "Protección básica de muebles"). Las de Stitch hablaban de "operarios capacitados" y "vinipel de alto calibre".
- La firma de la cita pasa de "Filosofía operativa MudaCol" a "MudaCol".
- La foto de personal venía con un marco de navegador falso; se recortó.

**03 · Servicios**
- Títulos y descripciones exactos del brief. Stitch abreviaba los títulos y añadía detalles ("doble pared", "herramienta calificada", "vajilla por ambiente").
- El pie de cada tarjeta ("Hogares y aptos →", "Insumos Pro →"…) parecía un enlace pero no lo era. Ahora es un enlace real, "Cotizar →", que lleva al formulario.

**04 · Qué incluye / no incluye**
- Ítems exactos del brief, sin las ampliaciones de Stitch ("en furgón cerrado", "tripulación dimensionada").
- Antetítulos del brief: "Según lo contratado y cotizado" y "Salvo que se acuerde y cotice".
- La nota de la columna derecha cambia: la de Stitch hablaba de "tu asesor", que no está en el brief.

**05 · Precio**
- Chips con los 13 factores del brief, sin "en kilómetros" ni "m³".
- "CALCULAR MI TARIFA" pasa a "COTIZA AHORA", porque no hay calculadora.
- La figura decorativa es una diagonal.

**06 · Cobertura** (la mayor diferencia)
- Se eliminaron el explorador de rutas por región, los 9 corredores con municipios y tiempos, los "4 grandes corredores troncales", las modalidades exclusiva/compartida, el buscador de municipios y los textos "Red de tránsito activa 100 %" y "Monitoreo satelital GPS". Todo eso era información inventada (tiempos, frecuencias, servicios) que no está en el brief y que MudaCol tendría que cumplir.
- Se conserva el panel oscuro con el mapa, ahora como protagonista. Usa el contorno real de Colombia (Natural Earth) y muestra solo las ciudades del brief.
- Animaciones del mapa al entrar en pantalla: el contorno se dibuja, las ciudades aparecen, las rutas se trazan desde Bogotá y unos puntos de luz las recorren. Las ciudades base emiten un pulso suave.
- Las ciudades base y los destinos son botones: al pasar el cursor, enfocarlos o tocarlos se resalta su ruta en el mapa.
- En escritorio el mapa queda fijo mientras se recorre la lista.
- Las cifras del pie del mapa (4 ciudades base, 4 rutas y destinos) se calculan a partir del propio contenido; no son datos nuevos.
- Se mantienen el aviso "no ofrecemos mudanzas internacionales" y los CTA.

**07 · Cómo funciona**
- Textos de los 7 pasos exactos del brief.
- Línea de tiempo horizontal detrás de las tarjetas, porque el brief pide una "línea de 7 pasos".
- El paso 7 dice "Paso 07" en lugar de "Completado".

**08 · Formulario**
- Se mantiene el asistente de 4 pasos de Stitch, con los campos y bloques del brief: Contacto · Mudanza · Inmueble · Pertenencias.
- Se agregaron "Otra" ciudad (con su campo de texto), las preguntas sí/no, las casillas de artículos especiales con detalle, la carga de fotos y videos con vista previa, la aceptación de datos y "Enviar por WhatsApp".
- Los placeholders ya no usan el número de MudaCol como ejemplo.

**09 · Políticas**
- Textos exactos del brief. Stitch añadía "cilindros con gas presurizado, corrosivas, inflamables".
- "Visita técnica a domicilio" pasa a "Visita a domicilio".
- Acordeón accesible (botón con `aria-expanded`) en lugar de `<details>`.

**10 · FAQ**
- Las 17 preguntas y respuestas del brief. Stitch tenía 14, con preguntas propias ("¿Hacen desinstalación de calentadores?") y respuestas con datos que no están en el brief.

**11 · Testimonios**
- Los tres testimonios con nombres eran inventados y el brief lo prohíbe. Se reemplazaron por el marcador `[TESTIMONIOS: pendiente]`.

**12 · Contacto (cierre)**
- Stitch no diseñó esta sección. Se creó con el degradado azul del brief (`#0D47A1` → `#1E88E5`, con una capa oscura del 20 % para el contraste AA) y las diagonales y botones del resto de la página.
- Lleva los marcadores `[CIUDAD]` y `[MAPA]`. El correo ya es el real (contacto@mudacol.com).

**13 · Footer**
- Columnas según el brief: marca con lema y redes, navegación, contacto (dirección, horario, correo) y formas de pago.
- Se agregaron los enlaces legales (páginas pendientes) y Facebook con `[URL FACEBOOK]`.
- "© 2025 MudaCol Mudanzas Colombia" pasa a "© 2026 MudaCol. Todos los derechos reservados."
