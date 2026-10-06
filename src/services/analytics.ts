// Medición de visitas y conversiones (respuestas del cliente #33 y #34).
// Se activa solo si hay identificadores en el entorno (.env o variables de Render):
//   VITE_GA_ID=G-XXXXXXXXXX            → Google Analytics 4
//   VITE_GADS_ID=AW-XXXXXXXXXX         → Google Ads (etiqueta de conversiones)
//   VITE_GADS_LEAD_LABEL=xxxxxxxx      → etiqueta de la conversión "Solicitud de cotización"
//   VITE_GADS_CONTACT_LABEL=xxxxxxxx   → etiqueta de la conversión "Clic en WhatsApp / Llamar"
//   VITE_META_PIXEL_ID=1234567890      → Meta Pixel (Facebook / Instagram)
// Sin identificadores no se carga ningún script de terceros.
//
// Conversiones que se registran:
//   generate_lead  → envío del formulario de cotización (Meta: Lead)
//   contact        → clic en cualquier enlace de WhatsApp (Meta: Contact)
//   click_to_call  → clic en un enlace "tel:" (Meta: Contact)

type Params = Record<string, string | number>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const GADS_ID = import.meta.env.VITE_GADS_ID as string | undefined;
const GADS_LABELS: Record<string, string | undefined> = {
  generate_lead: import.meta.env.VITE_GADS_LEAD_LABEL as string | undefined,
  contact: import.meta.env.VITE_GADS_CONTACT_LABEL as string | undefined,
  click_to_call: import.meta.env.VITE_GADS_CONTACT_LABEL as string | undefined,
};

// --- Origen de la visita (anuncios y campañas) ---------------------------------
// Se guarda al llegar para incluirlo en la solicitud de WhatsApp: así el asesor sabe
// si el cliente vino de Google Ads y de qué campaña.
const SOURCE_KEY = 'mudacol_source';
const SOURCE_PARAMS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign'] as const;
type VisitSource = Partial<Record<(typeof SOURCE_PARAMS)[number], string>>;

function captureSource() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: VisitSource = {};
    for (const p of SOURCE_PARAMS) {
      const v = params.get(p);
      if (v) found[p] = v.slice(0, 120);
    }
    // Solo se reemplaza si la visita actual trae parámetros (la primera fuente de la sesión se conserva)
    if (Object.keys(found).length) sessionStorage.setItem(SOURCE_KEY, JSON.stringify(found));
  } catch {
    // Sin almacenamiento disponible (modo privado estricto): no pasa nada
  }
}

/** Texto corto del origen de la visita, p. ej. "Google Ads – campaña mudanzas-bogota". Vacío si es directa. */
export function getVisitSource(): string {
  try {
    const s = JSON.parse(sessionStorage.getItem(SOURCE_KEY) || '{}') as VisitSource;
    const campaign = s.utm_campaign ? ` – campaña ${s.utm_campaign}` : '';
    if (s.gclid || s.gbraid || s.wbraid) return `Google Ads${campaign}`;
    if (s.fbclid) return `Facebook / Instagram${campaign}`;
    if (s.utm_source) return `${s.utm_source}${s.utm_medium ? ` / ${s.utm_medium}` : ''}${campaign}`;
  } catch {
    // ignorar
  }
  return '';
}

const META_EVENTS: Record<string, string> = {
  generate_lead: 'Lead',
  contact: 'Contact',
  click_to_call: 'Contact',
};

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

let started = false;

/** Carga GA4 y/o Meta Pixel si hay identificadores, y escucha los clics de contacto. */
export function initAnalytics() {
  if (started || typeof window === 'undefined') return;
  started = true;
  captureSource();

  // gtag.js sirve tanto para GA4 como para Google Ads
  const googleIds = [GA_ID, GADS_ID].filter(Boolean) as string[];
  if (googleIds.length) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag necesita el objeto arguments tal cual
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    for (const id of googleIds) window.gtag('config', id);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleIds[0])}`);
  }

  if (PIXEL_ID) {
    // Fragmento oficial de Meta Pixel, sin minificar
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void)(...args);
      else fbq.queue!.push(args);
    } as NonNullable<Window['fbq']>;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // Clics en WhatsApp y llamadas desde cualquier parte de la página
  document.addEventListener('click', (e) => {
    const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!link) return;
    const href = link.getAttribute('href') ?? '';
    if (href.includes('wa.me/')) trackEvent('contact', { method: 'whatsapp' });
    else if (href.startsWith('tel:')) trackEvent('click_to_call', { method: 'phone' });
  });
}

/** Registra un evento en las herramientas activas (no hace nada si no hay ninguna). */
export function trackEvent(name: string, params: Params = {}) {
  window.gtag?.('event', name, params);
  const adsLabel = GADS_LABELS[name];
  if (GADS_ID && adsLabel) window.gtag?.('event', 'conversion', { send_to: `${GADS_ID}/${adsLabel}` });
  const metaEvent = META_EVENTS[name];
  if (metaEvent) window.fbq?.('track', metaEvent, params);
  if (import.meta.env.DEV) console.info('[analytics]', name, params);
}
