import { useState } from 'react';
import { contact, coverage, ctaLabels } from '../content';
import { useInView } from '../hooks/useInView';
import { CoverageMap, type MapCity } from './coverage/CoverageMap';
import { WhatsAppIcon } from './ui/BrandIcons';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

const CITIES: MapCity[] = [
  ...coverage.bases.map((name) => ({ name, kind: 'base' as const })),
  ...coverage.destinations.map((name) => ({
    name,
    kind: name === coverage.regionLabel ? ('region' as const) : ('destination' as const),
  })),
];

export function Coverage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [mapRef, mapInView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const active = hovered ?? selected;
  const activeCity = CITIES.find((c) => c.name === active);

  const cityButton = (name: string, kind: 'base' | 'destination', i: number) => {
    const on = active === name;
    const pressed = selected === name;
    return (
      <Reveal as="li" key={name} delay={i * 70} variant="scale">
        <button
          type="button"
          aria-pressed={pressed}
          onClick={() => setSelected(pressed ? null : name)}
          onMouseEnter={() => setHovered(name)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(name)}
          onBlur={() => setHovered(null)}
          className={`lift group flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left shadow-xs ${
            on ? 'border-brand-action bg-blue-50 shadow-lg shadow-blue-900/10' : 'border-slate-200 bg-white hover:border-blue-300'
          }`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
              on ? 'bg-brand-action text-white' : 'bg-blue-50 text-brand-action'
            }`}
          >
            <Icon name={kind === 'base' ? 'location_on' : 'local_shipping'} className="text-[22px]" />
          </span>
          <span className="min-w-0">
            <span className="block font-body text-[11px] font-bold uppercase tracking-wider text-blue-700">
              {kind === 'base' ? coverage.selectedBase : coverage.selectedDestination}
            </span>
            <span className="block font-headline text-lg font-bold uppercase leading-tight text-slate-900">{name}</span>
          </span>
        </button>
      </Reveal>
    );
  };

  return (
    <section
      id="cobertura"
      data-nav="cobertura"
      aria-labelledby="coverage-title"
      className="relative overflow-clip border-b border-slate-200 bg-white py-20 text-slate-900 lg:py-28"
    >
      {/* Fondo: resplandores azules suaves */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-blue/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 h-[420px] w-[420px] rounded-full bg-brand-blue-deep/10 blur-3xl" />

      <div className="container-page relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Encabezado */}
        <Reveal variant="left" className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <p className="eyebrow mb-2 flex items-center gap-1.5">
            <Icon name="hub" className="text-[16px]" /> {coverage.eyebrow}
          </p>
          <h2 id="coverage-title" className="font-headline text-4xl font-bold uppercase leading-[1.05] tracking-tight text-slate-950 sm:text-5xl">
            {coverage.title}
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed text-slate-600 sm:text-lg">{coverage.subtitle}</p>
        </Reveal>

        {/* Mapa */}
        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <Reveal variant="right" className="lg:sticky lg:top-28">
            <div
              ref={mapRef}
              className="relative overflow-hidden rounded-3xl border border-slate-800 bg-brand-dark p-5 text-white shadow-2xl shadow-blue-950/30 sm:p-8"
            >
              {/* Retícula de puntos */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:18px_18px]"
              />
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-b from-brand-blue-deep/30 to-transparent" />

              <div className="relative flex flex-wrap items-start justify-between gap-3">
                <div>
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
                </div>
                {/* Ciudad activa */}
                <p
                  className={`rounded-full border px-3 py-1 font-headline text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeCity ? 'border-blue-500/50 bg-blue-500/15 text-blue-200 opacity-100' : 'border-transparent opacity-0'
                  }`}
                >
                  {activeCity ? `${activeCity.name} · ${activeCity.kind === 'base' ? coverage.selectedBase : coverage.selectedDestination}` : ''}
                </p>
              </div>

              <div className="relative mt-4">
                <CoverageMap
                  title={coverage.mapTitle}
                  description={`Mapa estilizado de Colombia. ${coverage.legendBases}: ${coverage.bases.join(', ')}. ${coverage.legendDestinations}: ${coverage.destinations.join(', ')}.`}
                  regionLabel={coverage.regionLabel}
                  cities={CITIES}
                  active={active}
                  onHover={setHovered}
                  drawn={mapInView}
                />
              </div>

              {/* Cifras tomadas del propio contenido (no inventadas) */}
              <dl className="relative mt-4 grid grid-cols-3 divide-x divide-slate-800 rounded-2xl border border-slate-800 bg-brand-card/80 backdrop-blur-sm">
                <div className="flex flex-col-reverse px-3 py-3 text-center sm:py-4">
                  <dt className="font-body text-[11px] uppercase tracking-wider text-slate-300 sm:text-xs">{coverage.stats.bases}</dt>
                  <dd className="font-headline text-2xl font-bold text-blue-400 sm:text-3xl">{coverage.bases.length}</dd>
                </div>
                <div className="flex flex-col-reverse px-3 py-3 text-center sm:py-4">
                  <dt className="font-body text-[11px] uppercase tracking-wider text-slate-300 sm:text-xs">{coverage.stats.destinations}</dt>
                  <dd className="font-headline text-2xl font-bold text-blue-400 sm:text-3xl">{coverage.destinations.length}</dd>
                </div>
                <div className="flex flex-col items-center justify-center px-3 py-3 text-center sm:py-4">
                  <dt className="sr-only">{coverage.stats.scopeLabel}</dt>
                  <dd className="flex flex-col items-center gap-1">
                    <Icon name="route" className="text-[26px] text-blue-400" />
                    <span className="font-body text-[11px] uppercase tracking-wider text-slate-300 sm:text-xs">{coverage.stats.scope}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Ciudades y acciones */}
        <div className="space-y-8 lg:col-span-5 lg:col-start-1 lg:row-start-2">
          <p className="flex items-center gap-2 font-body text-sm text-slate-600">
            <Icon name="touch_app" className="text-[20px] text-brand-action" />
            {coverage.mapHint}
          </p>

          <div>
            <h3 className="mb-3 font-headline text-lg font-bold uppercase tracking-wide text-slate-900">{coverage.legendBases}</h3>
            <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              {coverage.bases.map((name, i) => cityButton(name, 'base', i))}
            </ul>
          </div>

          <div>
            <h3 className="mb-1 font-headline text-lg font-bold uppercase tracking-wide text-slate-900">{coverage.routesTitle}</h3>
            <p className="mb-3 font-body text-sm text-slate-600">{coverage.routesText}</p>
            <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              {coverage.destinations.map((name, i) => cityButton(name, 'destination', i + 4))}
            </ul>
            <p className="mt-4 flex items-start gap-2 font-body text-sm font-medium text-slate-700">
              <Icon name="add_location_alt" className="mt-0.5 text-[20px] text-brand-action" />
              {coverage.others}
            </p>
          </div>

          <Reveal className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <Icon name="info" className="mt-0.5 text-[20px] text-amber-700" />
            <p className="font-body text-sm text-amber-950">
              <strong className="block font-headline text-sm uppercase tracking-wider text-amber-800">{coverage.noticeLabel}</strong>
              {coverage.notice}
            </p>
          </Reveal>

          <Reveal className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href="#cotizar" className="btn-primary btn-md flex-1">
              <Icon name="calculate" className="text-[18px]" />
              {ctaLabels.quote}
            </a>
            <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-md flex-1">
              <WhatsAppIcon className="h-5 w-5" />
              {coverage.whatsappCta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
