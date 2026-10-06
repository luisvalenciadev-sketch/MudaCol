# Respuestas del cliente: qué se aplicó y qué falta

Fuente: cuestionario "MudaCol — preguntas para el cliente", respondido el 5 de octubre de 2026.
Los textos están en `src/content.ts`.

## Aplicado en la página

| # | Respuesta | Dónde se ve |
|---|---|---|
| 1 | Razón social y NIT aún no existen; dejar el espacio | Pie de página: marcador `[RAZÓN SOCIAL] · NIT [NIT]` |
| 2 | Llamadas al mismo número del WhatsApp | Botón "Llamar" (304 311 3824) en Contacto y pie de página |
| 3 | Correo `contacto@mudacol.com` | Contacto, pie de página y JSON-LD |
| 4 | Dirección en Usaquén, Bogotá D.C. | Contacto y pie de página ("Calle 156 # 7D-75, Usaquén, Bogotá"), mapa de Google en Contacto y JSON-LD |
| 5 | Sede principal en Bogotá | Cobertura: Bogotá aparece como "Sede principal" |
| 6 | Ciudades principales: Bogotá y Medellín | Cobertura: "Ruta principal: Bogotá ⇄ Medellín", resaltada en el mapa |
| 7 | Vehículos de 25 a 50 m³ | Quiénes somos (cifras) y pie de la foto del inicio |
| 8 | Más de 10 años de experiencia | Insignia del inicio y cifras de Quiénes somos |
| 9 | Tienen póliza de seguro de carga | Quiénes somos, política de daños y nueva pregunta frecuente |
| 10 | El mínimo de $500.000 aplica en todas las ciudades | Sección Precio y pregunta frecuente |
| 11 | Sin precios orientativos ni paquetes | Sin cambios |
| 12 | Atienden domingos y festivos con recargo | Precio, Contacto, pie de página y nueva pregunta frecuente |
| 17–18 | Aceptan imágenes de banco | Las 3 fotos generadas por IA se reemplazaron por fotos de Pexels; créditos en `design/images/pexels/CREDITOS.md` |
| 13 | Responde un asesor comercial | Formulario y confirmación: "Un asesor comercial te responderá…" |
| 14 | Anticipo: 50% entre ciudades; dentro de la ciudad se paga al final | Política "Reserva y anticipo" y nueva pregunta frecuente |
| 22 | Aprueban los textos del documento maestro | Sin cambios |
| 23 | Solo en español | Sin cambios |
| 25–26 | Las solicitudes llegan por WhatsApp al asesor de Bogotá | El formulario abre WhatsApp con la solicitud completa |
| 28 | Fotos y videos sin límite | Se adjuntan en el chat de WhatsApp, sin límite de la página |
| 29 | Todos los campos obligatorios | Todos obligatorios, excepto el campo libre "detalles" (ver nota) |
| 33 | Quieren medir | GA4 y Meta Pixel listos; se activan al poner los ID (ver abajo) |
| 39 | Confirman la política de cancelación | Sin cambios |
| 41 | Al terminar, los auxiliares revisan con el cliente que todo esté bien | Política "Responsabilidad por daños" |
| 42 | Los artículos frágiles y de valor se declaran en el formulario | Formulario (paso 4), política y pregunta frecuente |
| 43 | La autoría "Cicciarella Romanni" no debe aparecer | No aparece en el sitio |

### Notas sobre el formulario

- **Envío por WhatsApp (#25).** Un enlace de WhatsApp solo lleva texto, así que se quitó la carga de fotos de la página. Al enviar se abre WhatsApp con la solicitud ordenada por secciones, y la persona adjunta ahí sus fotos o videos. La página lo indica antes de enviar y en la confirmación.
- **Confirmación al cliente (#27).** Como la conversación ocurre en WhatsApp, la confirmación automática se configura en WhatsApp Business: *Herramientas para la empresa → Mensaje de bienvenida*. Sugerencia: "¡Hola! Recibimos tu solicitud de cotización. Un asesor comercial te responderá en máximo 24 horas."
- **Campos obligatorios (#29).** "Cuéntanos cualquier detalle importante" queda opcional. Obligarlo hace que la gente escriba "ninguno" y aumenta el abandono. Para volverlo obligatorio, agrega `req('details', d.details)` en `validateStep` de `src/components/QuoteForm.tsx`. Las casillas de artículos declarados se marcan solo si aplican, pero si se marca una, su detalle es obligatorio.

## Pendiente: pedir al cliente

| # | Qué falta | Por qué importa |
|---|---|---|
| 15 | Logo en vector (SVG, AI o PDF) | Hoy se usa la recreación de Stitch |
| 17 | Fotos propias de los camiones (las de Instagram) en buena resolución | Reemplazarían la foto de banco del inicio |
| 19 | Enlace de la página de Facebook | Pie de página: `[URL FACEBOOK]` |
| 20 | Textos de los testimonios, con nombre y autorización | La sección muestra `[TESTIMONIOS: pendiente]` |
| 24 | Qué les gusta de Mudanzas Virrey | Referencia de diseño; conviene revisarla con ellos |
| 30 | Mensaje prellenado para WhatsApp (respondieron "sí", sin el texto) | Hoy: "Hola MudaCol, quiero cotizar mi mudanza" |
| 31 | Nombre del dominio | Configurar `VITE_SITE_URL` y el dominio en Render |
| 32 | Qué hosting tienen | Hoy está en Render; decidir si se mueve |
| 33–34 | ID de Google Analytics 4 (G-…), de Google Ads (AW-… y etiquetas de conversión) y de Meta Pixel | Pegarlos en Render → Environment (`VITE_GA_ID`, `VITE_GADS_*`, `VITE_META_PIXEL_ID`) |
| 34–35 | Fechas de pauta y fases siguientes (chat, calculadora, blog) | Planear páginas de aterrizaje y fases |
| 36 | Quién actualizará los contenidos (respondieron "sí") | Definir si se necesita un administrador de contenido |
| 37–38 | Documentos de política de datos y términos (respondieron que sí existen) | Los enlaces del pie de página siguen pendientes |
| 40 | Las 24 h de cancelación: ¿desde la cotización o desde el anticipo? (respondieron "sí") | Por ahora se mantiene "desde la cotización", como dice el documento maestro |

## Medición (GA4 y Meta Pixel)

`src/services/analytics.ts` solo carga los scripts si existen los ID. Eventos registrados:

| Evento GA4 | Evento Meta | Cuándo |
|---|---|---|
| `generate_lead` | `Lead` | Al enviar el formulario |
| `contact` | `Contact` | Clic en cualquier enlace de WhatsApp |
| `click_to_call` | `Contact` | Clic en "Llamar" |

En GA4 conviene marcar `generate_lead` como evento clave (conversión).
