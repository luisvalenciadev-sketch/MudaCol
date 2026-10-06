// Envío de la solicitud de cotización.
// Decisión del cliente (respuesta #25): las solicitudes llegan por WhatsApp al asesor comercial
// de Bogotá (#26). El formulario arma un mensaje con todos los datos y abre WhatsApp; la persona
// solo pulsa "Enviar" y adjunta sus fotos o videos en el chat (un enlace de WhatsApp no puede
// llevar archivos). Si más adelante se quiere guardar cada solicitud (correo, hoja de cálculo,
// CRM), se agrega aquí, dentro de sendQuote(), sin tocar el formulario.

import { quoteForm as t, whatsappLink } from '../content';
import { trackEvent } from './analytics';

export type YesNo = '' | 'si' | 'no';

export type SpecialItemKey = 'large' | 'special' | 'fragile' | 'valuable';

export type QuoteData = {
  // Datos personales
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  // Información de la mudanza
  originCity: string;
  originCityOther: string;
  originZone: string;
  destCity: string;
  destCityOther: string;
  destZone: string;
  date: string; // AAAA-MM-DD
  // Inmueble
  propertyType: string;
  rooms: string;
  originFloor: string;
  destFloor: string;
  elevator: YesNo;
  stairs: YesNo;
  accessDifficulty: YesNo;
  accessDetail: string;
  // Mudanza
  furnitureCount: string;
  boxesCount: string;
  specialItems: Record<SpecialItemKey, { checked: boolean; detail: string }>;
  disassembly: YesNo;
  packing: YesNo;
  materials: YesNo;
  details: string;
  consent: boolean;
};

/** Ciudad efectiva (si eligió "Otra", usa el texto escrito). */
export const cityOf = (city: string, other: string) => (city === t.otherCity ? other.trim() || t.otherCity : city);

/** Formatea AAAA-MM-DD como fecha legible en español de Colombia. */
export function formatDate(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

const yesNo = (v: YesNo) => (v === 'si' ? t.yes : v === 'no' ? t.no : '');
// "Etiqueta: valor", o "¿Pregunta? valor" cuando la etiqueta es una pregunta
const line = (label: string, value: string) => (value.trim() ? `${label}${label.endsWith('?') ? '' : ':'} ${value.trim()}` : '');
const section = (title: string, lines: string[]) => [`*${title}*`, ...lines.filter(Boolean)].join('\n');

/** Mensaje completo que recibe el asesor. Usa las etiquetas del formulario (src/content.ts). */
export function buildQuoteMessage(d: QuoteData) {
  const m = t.message;
  const L = t.labels;
  const place = (city: string, other: string, zone: string) => [cityOf(city, other), zone.trim()].filter(Boolean).join(' – ');
  const declared = t.specialItems
    .filter((s) => d.specialItems[s.key].checked)
    .map((s) => (d.specialItems[s.key].detail.trim() ? `${s.label} (${d.specialItems[s.key].detail.trim()})` : s.label));

  return [
    m.greeting,
    section(m.contact, [line(L.fullName, d.fullName), line(L.phone, d.phone), line(L.whatsapp, d.whatsapp), line(L.email, d.email)]),
    section(m.move, [
      line('Origen', place(d.originCity, d.originCityOther, d.originZone)),
      line('Destino', place(d.destCity, d.destCityOther, d.destZone)),
      line(L.date, formatDate(d.date)),
    ]),
    section(m.property, [
      line(L.propertyType, d.propertyType),
      line(L.rooms, d.rooms),
      line(L.originFloor, d.originFloor),
      line(L.destFloor, d.destFloor),
      line(L.elevator, yesNo(d.elevator)),
      line(L.stairs, yesNo(d.stairs)),
      line(L.accessDifficulty, [yesNo(d.accessDifficulty), d.accessDifficulty === 'si' ? d.accessDetail.trim() : ''].filter(Boolean).join(' – ')),
    ]),
    section(m.belongings, [
      line(L.furnitureCount, d.furnitureCount),
      line(L.boxesCount, d.boxesCount),
      line(m.special, declared.length ? declared.join('; ') : m.noSpecial),
      line(L.disassembly, yesNo(d.disassembly)),
      line(L.packing, yesNo(d.packing)),
      line(L.materials, yesNo(d.materials)),
      line(m.details, d.details),
    ]),
    m.photos,
    m.consent,
  ].join('\n\n');
}

/** Enlace de WhatsApp con la solicitud completa. */
export const buildWhatsappQuoteLink = (data: QuoteData) => whatsappLink(buildQuoteMessage(data));

/**
 * Envía la solicitud: registra la conversión y abre WhatsApp con el mensaje.
 * Debe llamarse directamente desde el evento del usuario (clic o envío) para que el
 * navegador no bloquee la ventana. Devuelve false si el navegador la bloqueó; en ese
 * caso la pantalla de confirmación ofrece el botón para abrirla.
 */
export function sendQuote(data: QuoteData) {
  trackEvent('generate_lead', {
    origin: cityOf(data.originCity, data.originCityOther),
    destination: cityOf(data.destCity, data.destCityOther),
  });
  // Sin la opción "noopener" (con ella window.open siempre devuelve null y no se detecta el bloqueo);
  // se corta el vínculo con la página manualmente.
  const win = window.open(buildWhatsappQuoteLink(data), '_blank');
  if (win) win.opener = null;
  return win !== null;
}
