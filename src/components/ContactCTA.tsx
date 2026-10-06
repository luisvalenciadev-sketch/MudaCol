import { contact, contactCta, ctaLabels, PLACEHOLDERS, SHOW_PENDING } from '../content';
import { Pending } from './ui/Pending';
import { InstagramIcon, WhatsAppIcon } from './ui/BrandIcons';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

/** Cierre de contacto (no diseñado en Stitch): degradado azul del brief con el lenguaje visual de la página. */
export function ContactCTA() {
  return (
    <section
      id="contacto"
      data-nav="contacto"
      aria-labelledby="contact-title"
      className="gradient-live relative overflow-hidden bg-gradient-to-br from-brand-blue-deep via-brand-blue to-brand-blue-deep py-20 text-white lg:py-24"
    >
      {/* Capa para asegurar contraste AA del texto blanco sobre el extremo claro del degradado */}
      <div aria-hidden="true" className="absolute inset-0 bg-brand-dark/20" />
      {/* Formas diagonales que sugieren movimiento */}
      <div aria-hidden="true" className="drift pointer-events-none absolute -right-20 top-0 h-full w-[45%] -skew-x-12 bg-gradient-to-b from-white/10 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-0 h-full w-[20%] -skew-x-12 bg-brand-dark/15" />

      <div className="container-page relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <Reveal variant="left" className="lg:col-span-7">
          <h2 id="contact-title" className="font-headline text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
            {contactCta.title}
          </h2>
          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-blue-50">{contactCta.text}</p>
          <p className="mt-4 font-headline text-2xl font-semibold uppercase tracking-wide">{contactCta.closing}</p>
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <a href="#cotizar" className="btn-light btn-lg">
              <Icon name="calculate" className="text-[20px]" />
              {ctaLabels.quote}
            </a>
            <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-lg">
              <WhatsAppIcon className="h-[22px] w-[22px]" />
              {ctaLabels.talk}
            </a>
          </div>
        </Reveal>

        <Reveal variant="right" delay={120} className="lg:col-span-5">
          <ul className="space-y-3 rounded-2xl border border-white/20 bg-brand-dark/40 p-6 font-body text-sm backdrop-blur-sm">
            <li className="flex items-center gap-3">
              <WhatsAppIcon className="h-5 w-5 shrink-0 text-brand-green" />
              <span>
                WhatsApp y llamadas:{' '}
                <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline-offset-2 hover:underline">
                  {contact.whatsappDisplay}
                </a>
              </span>
              <a
                href={contact.telUrl}
                className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-white/40 px-3 py-1 font-headline text-xs uppercase tracking-wider hover:bg-white/10"
              >
                <Icon name="call" className="text-[16px]" />
                {contact.callLabel}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="location_on" className="text-[20px] text-blue-200" />
              <span>
                {contact.address}
                <Pending value={contact.city} prefix=", " />
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="schedule" className="text-[20px] text-blue-200" />
              <span>
                {contact.schedule}
                <span className="block text-xs text-blue-100">{contact.holidays}</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <InstagramIcon className="h-5 w-5 shrink-0 text-blue-200" />
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-2 hover:underline">
                {contact.instagramHandle}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="mail" className="text-[20px] text-blue-200" />
              <a href={`mailto:${contact.email}`} className="font-semibold underline-offset-2 hover:underline">
                {contact.email}
              </a>
            </li>
          </ul>
          {contact.mapEmbedUrl ? (
            <iframe
              title={`Mapa: ${contact.address}`}
              src={contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-4 h-56 w-full rounded-2xl border-0"
            />
          ) : (
            SHOW_PENDING && (
              <div className="mt-4 flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-white/40 bg-brand-dark/30">
                <span className="placeholder-tag">{PLACEHOLDERS.mapa}</span>
              </div>
            )
          )}
        </Reveal>
      </div>
    </section>
  );
}
