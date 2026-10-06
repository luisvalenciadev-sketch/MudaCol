import { brand, contact, footer, isPending, nav, SHOW_PENDING } from '../content';
import { Pending } from './ui/Pending';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './ui/BrandIcons';
import { Icon } from './ui/Icon';
import { Logo } from './ui/Logo';

export function Footer() {
  const fbPending = isPending(contact.facebookUrl);
  const legalLinks = footer.legal.filter((l) => !l.pending || SHOW_PENDING);
  const showEntity = !isPending(footer.razonSocial) || SHOW_PENDING;
  return (
    <footer className="bg-brand-dark pb-24 pt-14 text-slate-300 sm:pb-10">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 border-b border-slate-800 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo className="h-10 w-auto" />
            <p className="font-body text-sm leading-relaxed text-slate-300">{brand.slogan}</p>
            <ul className="flex items-center gap-3" aria-label="Redes sociales">
              <li>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 transition-colors hover:border-brand-blue hover:text-white"
                  aria-label={`Instagram ${contact.instagramHandle}`}
                >
                  <InstagramIcon />
                </a>
              </li>
              {(!fbPending || SHOW_PENDING) && (
              <li className="flex items-center gap-2">
                <a
                  href={fbPending ? '#' : contact.facebookUrl}
                  target={fbPending ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 transition-colors hover:border-brand-blue hover:text-white"
                  aria-label={`Facebook ${contact.facebookName}${fbPending ? ' (enlace pendiente)' : ''}`}
                >
                  <FacebookIcon />
                </a>
                {fbPending && <span className="placeholder-tag">{contact.facebookUrl}</span>}
              </li>
              )}
            </ul>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="mb-3 font-headline text-sm font-bold uppercase tracking-wider text-blue-400">{footer.navTitle}</h2>
            <ul className="space-y-2 font-body text-sm">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 font-headline text-sm font-bold uppercase tracking-wider text-blue-400">{footer.contactTitle}</h2>
            <ul className="space-y-2.5 font-body text-sm">
              <li className="flex items-start gap-2">
                <WhatsAppIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-green" />
                <span>
                  WhatsApp y llamadas:{' '}
                  <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">
                    {contact.whatsappDisplay}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="call" className="mt-0.5 text-[18px] text-blue-400" />
                <a href={contact.telUrl} className="hover:text-white hover:underline">
                  {contact.callLabel} al {contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="location_on" className="mt-0.5 text-[18px] text-blue-400" />
                <span>
                  {contact.address}
                  <Pending value={contact.city} prefix=", " />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="schedule" className="mt-0.5 text-[18px] text-blue-400" />
                <span>
                  {contact.schedule}
                  <span className="block text-xs text-slate-400">{contact.holidays}</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="mail" className="mt-0.5 text-[18px] text-blue-400" />
                <a href={`mailto:${contact.email}`} className="hover:text-white hover:underline">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-headline text-sm font-bold uppercase tracking-wider text-blue-400">{footer.paymentTitle}</h2>
            <p className="flex items-start gap-2 font-body text-sm">
              <Icon name="payments" className="mt-0.5 text-[18px] text-blue-400" />
              {contact.payment}
            </p>
            <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5 px-4 py-2.5 text-xs shadow-none">
              <WhatsAppIcon className="h-4 w-4" />
              {footer.whatsappCta}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center font-body text-xs text-slate-400 sm:flex-row sm:text-left">
          <div className="space-y-1">
            <p>{footer.copyright}</p>
            {/* Razón social y NIT: pendientes hasta que la empresa quede registrada (respuesta del cliente #1) */}
            {showEntity && (
              <p>
                <Pending value={footer.razonSocial} /> · NIT <Pending value={footer.nit} />
              </p>
            )}
          </div>
          {legalLinks.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white">
                  {l.label}
                </a>{' '}
                {l.pending && <span className="text-slate-400">{footer.pendingLabel}</span>}
              </li>
            ))}
          </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
