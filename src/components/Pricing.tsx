import { ctaLabels, pricing } from '../content';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

const formatCOP = (n: number) => n.toLocaleString('es-CO');

export function Pricing() {
  const [priceRef, priceInView] = useInView<HTMLHeadingElement>({ threshold: 0.6 });
  const amount = useCountUp(pricing.priceValue, priceInView);
  return (
    <section
      id="precio"
      data-nav="servicios"
      aria-labelledby="pricing-title"
      className="border-b border-slate-800 bg-brand-navy py-20 text-white lg:py-24"
    >
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-2xl border border-blue-900/60 bg-gradient-to-br from-brand-navy-1 via-brand-navy-2 to-brand-navy-3 p-6 shadow-xl sm:p-12 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-b from-brand-blue/15 to-transparent"
          />
          <div className="relative max-w-3xl">
            <p className="mb-3 inline-block rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-blue-200">
              {pricing.eyebrow}
            </p>
            <h2 ref={priceRef} id="pricing-title" className="font-headline text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
              {pricing.titleStart} <span className="sr-only">{pricing.price}</span>
              <span aria-hidden="true" className="inline-block min-w-[11ch] tabular-nums text-blue-400">
                ${formatCOP(amount)} {pricing.currency}
              </span>
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-slate-300 sm:text-lg">{pricing.text}</p>
            <p className="mt-3 inline-flex items-center gap-2 font-body text-sm font-semibold text-blue-200">
              <Icon name="location_city" className="text-[18px] text-blue-400" />
              {pricing.minNote}
            </p>
          </div>

          <div className="relative mt-8 border-t border-slate-700/60 pt-6">
            <h3 className="mb-4 block font-headline text-sm font-semibold uppercase tracking-wider text-slate-200">{pricing.factorsTitle}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {pricing.factors.map((f, i) => (
                <Reveal
                  as="li"
                  key={f.label}
                  delay={150 + i * 45}
                  variant="scale"
                  className="flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-900/80 px-3.5 py-2 font-body text-xs text-slate-200"
                >
                  <Icon
                    name={f.icon}
                    className={`text-[16px] ${i === pricing.factors.length - 1 ? 'text-emerald-400' : 'text-blue-400'}`}
                  />
                  {f.label}
                </Reveal>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-6 md:flex-row md:items-center">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-xs text-slate-300">
                {pricing.footer.map((f, i) => (
                  <li key={f.label} className="flex items-center gap-1.5">
                    <Icon name={f.icon} className={`text-[18px] ${i === 0 ? 'text-emerald-400' : 'text-blue-400'}`} />
                    {f.label}
                  </li>
                ))}
              </ul>
              <a href="#cotizar" className="btn-primary shrink-0 px-6 py-2.5 text-sm">
                {ctaLabels.quote}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
