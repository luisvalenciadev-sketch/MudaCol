import { useEffect, useState } from 'react';
import { contact, ctaLabels } from '../content';
import { WhatsAppIcon } from './ui/BrandIcons';

/**
 * Botón flotante de WhatsApp, visible en todas las secciones.
 * En móvil se oculta mientras el formulario de cotización está en pantalla:
 * ahí taparía los botones del formulario, que ya incluye "Enviar por WhatsApp".
 */
export function WhatsAppFloat() {
  const [overForm, setOverForm] = useState(false);

  useEffect(() => {
    const form = document.getElementById('cotizar');
    if (!form || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOverForm(entry.isIntersecting), {
      // Solo cuenta cuando el formulario ocupa la parte baja de la pantalla, donde está el botón
      rootMargin: '0px 0px -15% 0px',
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Contacto rápido"
      className={`transition-[opacity,visibility] duration-300 ${overForm ? 'max-sm:invisible max-sm:opacity-0' : ''}`}
    >
      <a
        href={contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${ctaLabels.quoteWhatsapp} al ${contact.whatsappDisplay}`}
        className="float-in group fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
      >
        {/* Etiqueta al pasar el mouse (solo escritorio) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-lg bg-brand-dark px-3 py-2 font-headline text-sm uppercase tracking-wider text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none sm:block"
        >
          {ctaLabels.quoteWhatsapp}
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-lg shadow-black/30 ring-4 ring-white/80 transition-transform duration-300 group-hover:scale-105 group-hover:bg-brand-whatsapp-hover motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-16 sm:w-16">
          {/* Pulso discreto: una onda cada 4 s */}
          <span aria-hidden="true" className="wa-pulse absolute inset-0 rounded-full bg-brand-green" />
          <WhatsAppIcon className="relative h-8 w-8 sm:h-9 sm:w-9" />
        </span>
      </a>
    </aside>
  );
}
