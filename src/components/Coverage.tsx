import { contact, coverage, ctaLabels } from '../content';
import { CoverageMap } from './CoverageMap';
import { WhatsAppIcon } from './ui/BrandIcons';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

export function Coverage() {
  return (
    <section
      id="cobertura"
      data-nav="cobertura"
      aria-labelledby="coverage-title"
      className="border-b border-slate-200 bg-white py-20 text-slate-900 lg:py-24"
    >
      <div className="container-page">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-2 flex items-center gap-1.5">
              <Icon name="hub" className="text-[16px]" /> {coverage.eyebrow}
            </p>
            <h2 id="coverage-title" className="font-headline text-3xl font-bold uppercase tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {coverage.title}
            </h2>
            <p className="mt-2 max-w-2xl font-body text-base leading-relaxed text-slate-600">{coverage.subtitle}</p>
          </div>
          <a href="#cotizar" className="btn-primary shrink-0 px-6 py-3 text-sm shadow-sm">
            <Icon name="route" className="text-[18px]" />
            {ctaLabels.quote}
          </a>
        </Reveal>

        <ul className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {coverage.bases.map((city, i) => (
            <Reveal
              as="li"
              key={city}
              delay={i * 80}
              className="rounded-xl border-2 border-brand-action/30 bg-white p-4 shadow-xs transition-colors hover:border-brand-action"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded bg-blue-100 px-2 py-0.5 font-body text-[11px] font-bold uppercase text-blue-800">
                  {coverage.baseLabel}
                </span>
                <Icon name="location_on" className="text-[20px] text-brand-action" />
              </div>
              <h3 className="font-headline text-xl font-bold uppercase text-slate-900">{city}</h3>
            </Reveal>
          ))}
        </ul>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Mapa (panel oscuro como en Stitch) */}
          <Reveal className="rounded-2xl bg-brand-dark p-6 text-white shadow-xl sm:p-8 lg:col-span-7">
            <h3 className="flex items-center gap-2 font-headline text-xl font-bold uppercase">
              <Icon name="map" className="text-[24px] text-blue-400" /> {coverage.mapTitle}
            </h3>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-body text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-blue" aria-hidden="true" /> {coverage.legendBases}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-white" aria-hidden="true" /> {coverage.legendDestinations}
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-slate-800 bg-brand-card p-4">
              <CoverageMap title={coverage.mapTitle} />
            </div>
          </Reveal>

          {/* Rutas y destinos */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal delay={120} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-headline text-xl font-bold uppercase text-slate-900">
                <Icon name="alt_route" className="text-[22px] text-brand-action" /> {coverage.routesTitle}
              </h3>
              <p className="mt-2 font-body text-sm text-slate-600">{coverage.routesText}</p>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {coverage.destinations.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 font-headline text-base font-semibold uppercase text-slate-900 shadow-xs"
                  >
                    <Icon name="local_shipping" className="text-[20px] text-brand-action" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-body text-sm font-medium text-slate-700">{coverage.others}</p>
            </Reveal>

            <Reveal delay={200} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <Icon name="info" className="mt-0.5 text-[20px] text-amber-700" />
              <p className="font-body text-sm text-amber-950">
                <strong className="block font-headline text-sm uppercase tracking-wider text-amber-800">{coverage.noticeLabel}</strong>
                {coverage.notice}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-md w-full">
                <WhatsAppIcon className="h-5 w-5" />
                {coverage.whatsappCta}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
