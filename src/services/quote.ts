// Envío de la solicitud de cotización.
// Por ahora es una SIMULACIÓN. Para conectarlo de verdad, reemplaza el cuerpo de
// submitQuote() por la integración elegida (correo, hoja de cálculo, CRM, API propia…)
// y conserva la misma firma para no tocar el formulario.

import { whatsappLink } from '../content';

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
  files: File[];
  consent: boolean;
};

export type QuoteResult = { ok: true; id: string } | { ok: false; error: string };

/**
 * Envía la solicitud. Simulada: espera ~1 s y responde OK.
 *
 * Ejemplo de conexión real (endpoint propio que acepta multipart/form-data):
 *
 *   const body = new FormData();
 *   Object.entries(toPlainObject(data)).forEach(([k, v]) => body.append(k, String(v)));
 *   data.files.forEach((f) => body.append('files', f));
 *   const res = await fetch('/api/cotizacion', { method: 'POST', body });
 *   return res.ok ? { ok: true, id: (await res.json()).id } : { ok: false, error: res.statusText };
 */
export async function submitQuote(data: QuoteData): Promise<QuoteResult> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (import.meta.env.DEV) {
    console.info('[submitQuote] Solicitud simulada', toPlainObject(data), data.files);
  }
  return { ok: true, id: `SIM-${Date.now()}` };
}

/** Ciudad efectiva (si eligió "Otra", usa el texto escrito). */
export const cityOf = (city: string, other: string) => (city === 'Otra' ? other.trim() || 'Otra' : city);

/** Formatea AAAA-MM-DD como fecha legible en español de Colombia. */
export function formatDate(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Enlace de WhatsApp con un resumen de origen, destino y fecha. */
export function buildWhatsappQuoteLink(data: Pick<QuoteData, 'fullName' | 'originCity' | 'originCityOther' | 'originZone' | 'destCity' | 'destCityOther' | 'destZone' | 'date'>) {
  const origin = [cityOf(data.originCity, data.originCityOther), data.originZone.trim()].filter(Boolean).join(' – ');
  const dest = [cityOf(data.destCity, data.destCityOther), data.destZone.trim()].filter(Boolean).join(' – ');
  const lines = [
    'Hola MudaCol, quiero cotizar mi mudanza.',
    data.fullName.trim() && `Mi nombre es ${data.fullName.trim()}.`,
    origin && `Origen: ${origin}`,
    dest && `Destino: ${dest}`,
    data.date && `Fecha deseada: ${formatDate(data.date)}`,
  ].filter(Boolean);
  return whatsappLink(lines.join('\n'));
}

/** Versión serializable (sin archivos) de la solicitud. */
export function toPlainObject(data: QuoteData) {
  const { files, specialItems, ...rest } = data;
  const special = Object.entries(specialItems)
    .filter(([, v]) => v.checked)
    .map(([k, v]) => `${k}${v.detail ? `: ${v.detail}` : ''}`)
    .join(' | ');
  return {
    ...rest,
    originCity: cityOf(data.originCity, data.originCityOther),
    destCity: cityOf(data.destCity, data.destCityOther),
    specialItems: special,
    filesCount: files.length,
  };
}
