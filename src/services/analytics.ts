// Medición de visitas y conversiones (respuesta del cliente #33).
// Se activa solo si hay identificadores en el entorno (.env o variables de Render):
//   VITE_GA_ID=G-XXXXXXXXXX        → Google Analytics 4
//   VITE_META_PIXEL_ID=1234567890  → Meta Pixel (Facebook / Instagram)
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

  if (GA_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag necesita el objeto arguments tal cual
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`);
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
  const metaEvent = META_EVENTS[name];
  if (metaEvent) window.fbq?.('track', metaEvent, params);
  if (import.meta.env.DEV) console.info('[analytics]', name, params);
}
