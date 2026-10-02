import { contact } from '../content';
import { WhatsAppIcon } from './ui/BrandIcons';

/** Botón flotante de WhatsApp, visible en todas las secciones. */
export function WhatsAppFloat() {
  return (
    <aside aria-label="Contacto rápido">
      <a
        href={contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Cotiza por WhatsApp al ${contact.whatsappDisplay}`}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-lg shadow-black/30 ring-4 ring-white/80 transition-transform hover:scale-105 hover:bg-brand-whatsapp-hover motion-reduce:transition-none motion-reduce:hover:scale-100 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      >
        <WhatsAppIcon className="h-8 w-8 sm:h-9 sm:w-9" />
      </a>
    </aside>
  );
}
