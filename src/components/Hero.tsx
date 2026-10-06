import { brand, contact, ctaLabels, hero } from '../content';
import { Icon } from './ui/Icon';
import { Logo } from './ui/Logo';
import { Picture } from './ui/Picture';
import { WhatsAppIcon } from './ui/BrandIcons';
import { Reveal } from './ui/Reveal';
import type { CSSProperties } from 'react';

/** Índice para escalonar la entrada del hero (ver .hero-in en index.css) */
const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

const badgeTone = {
  neutral: 'bg-slate-800/90 border-slate-700/80 text-slate-200',
  blue: 'bg-blue-950/80 border-blue-800/60 text-blue-300',
  green: 'bg-emerald-950/70 border-emerald-800/60 text-emerald-300',
} as const;

export function Hero() {
  return (
    <section
      id="inicio"
      data-nav="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-brand-dark via-brand-dark-mid to-brand-dark pb-16 pt-10 text-white sm:pt-14 lg:pb-24 lg:pt-16"
    >
      {/* Forma diagonal azul que sugiere movimiento (lenguaje de las piezas de Instagram) */}
      <div
        aria-hidden="true"
        className="drift pointer-events-none absolute -right-40 top-0 h-full w-[60%] -skew-x-12 bg-gradient-to-b from-brand-blue-deep/25 to-transparent"
      />

      <div className="container-page relative">
        <ul className="hero-in mb-8 flex flex-wrap items-center gap-2.5" style={stagger(0)} aria-label="Lo esencial">
          {hero.badges.map((b) => (
            <li
              key={b.label}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-wider ${badgeTone[b.tone]}`}
            >
              {b.icon ? (
                <Icon name={b.icon} className="text-[15px]" />
              ) : (
                <span className="mr-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
              )}
              {b.label}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="hero-in self-start" style={stagger(1)}>
              <Logo className="h-14 w-auto drop-shadow-md sm:h-16" title="Mudanzas MudaCol" />
            </div>

            <h1
              id="hero-title"
              className="hero-in font-headline text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[1.1]"
              style={stagger(2)}
            >
              {brand.sloganLine1} <br className="hidden sm:inline" />
              <span className="text-blue-400">{brand.sloganLine2}</span>
            </h1>

            <p className="hero-in max-w-2xl font-body text-lg leading-relaxed text-slate-300 sm:text-xl" style={stagger(3)}>{hero.subtitle}</p>

            <p className="hero-in inline-flex items-center gap-2 font-body text-sm font-medium text-slate-300" style={stagger(4)}>
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-green" aria-hidden="true" />
              {brand.pillars}
            </p>

            <div className="hero-in flex flex-col items-stretch gap-3.5 pt-2 sm:flex-row sm:items-center" style={stagger(5)}>
              <a href="#cotizar" className="btn-primary btn-lg">
                <Icon name="calculate" className="text-[20px]" />
                {ctaLabels.quote}
              </a>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-lg">
                <WhatsAppIcon className="h-[22px] w-[22px]" />
                {ctaLabels.quoteWhatsapp}
              </a>
            </div>

            <ul className="hero-in grid grid-cols-1 gap-3 pt-3 sm:grid-cols-3" style={stagger(6)}>
              <li className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/90 p-3">
                <WhatsAppIcon className="h-5 w-5 shrink-0 text-brand-green" />
                <span className="font-body text-xs text-slate-300">
                  WhatsApp:{' '}
                  <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">
                    {contact.whatsappDisplay}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/90 p-3">
                <Icon name="schedule" className="text-[20px] text-blue-400" />
                <span className="font-body text-xs text-slate-300">
                  Lun a Sáb: <strong className="text-white">8:00 a. m. – 7:00 p. m.</strong>
                </span>
              </li>
              <li className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/90 p-3">
                <Icon name="bolt" className="text-[20px] text-blue-400" />
                <span className="font-body text-xs text-slate-300">
                  Respuesta en <strong className="text-white">máx. 24 horas</strong>
                </span>
              </li>
            </ul>
          </div>

          <figure className="hero-photo-in relative lg:col-span-5">
            {/* Halo azul detrás de la foto */}
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-brand-blue/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="relative overflow-hidden">
                <Picture
                  base={hero.image.base}
                  widths={hero.image.widths}
                  width={hero.image.width}
                  height={hero.image.height}
                  sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                  alt={hero.image.alt}
                  priority
                  className="photo-settle aspect-[16/10] h-auto w-full object-cover object-[50%_75%]"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-3 border-t border-slate-800 bg-slate-900/95 p-4">
                <span>
                  <span className="block font-headline text-sm font-bold uppercase tracking-wider text-blue-400">
                    {hero.image.captionTitle}
                  </span>
                  <span className="font-body text-xs text-slate-300">{hero.image.captionText}</span>
                </span>
                <span className="shrink-0 rounded border border-blue-700/50 bg-blue-900/40 px-2.5 py-1 text-xs font-semibold uppercase text-blue-300">
                  {hero.image.captionChip}
                </span>
              </figcaption>
            </div>
          </figure>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 border-t border-slate-800 pt-6 md:grid-cols-5" aria-label="Servicios principales">
          {hero.features.map((f, i) => (
            <Reveal
              as="li"
              key={f.label}
              delay={i * 90}
              className={`group flex items-center gap-3 rounded-lg border border-slate-800/80 bg-slate-900/60 p-3 hover:border-blue-500/50 hover:bg-slate-900 ${
                i === hero.features.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <Icon name={f.icon} className="text-[24px] text-blue-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-headline text-xs font-semibold uppercase leading-tight text-slate-200 sm:text-sm">{f.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
