import { ctaLabels, services } from '../content';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

export function Services() {
  return (
    <section
      id="servicios"
      data-nav="servicios"
      aria-labelledby="services-title"
      className="border-b border-slate-200 bg-brand-light py-20 text-slate-900 lg:py-24"
    >
      <div className="container-page">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-2 flex items-center gap-1.5">
              <Icon name="widgets" className="text-[16px]" /> {services.eyebrow}
            </p>
            <h2 id="services-title" className="h2">
              {services.title}
            </h2>
            <p className="mt-2 max-w-2xl font-body text-base text-slate-600">{services.subtitle}</p>
          </div>
          <a href="#cotizar" className="btn-primary btn-md shrink-0 shadow-sm">
            {ctaLabels.quoteFree}
          </a>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 4) * 90} className="flex">
              <div className="lift group relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10">
                {/* Línea de acento superior */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-blue-deep to-brand-blue transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand-action transition-colors duration-300 group-hover:bg-brand-action group-hover:text-white">
                    <Icon name={s.icon} className="text-[26px] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none" />
                  </div>
                  <h3 className="mb-2 font-headline text-lg font-bold uppercase text-slate-900">{s.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-slate-600">{s.text}</p>
                </div>
                <a
                  href="#cotizar"
                  className="mt-5 inline-flex items-center gap-1 self-start font-headline text-xs font-bold uppercase tracking-wider text-blue-700 hover:text-blue-900"
                >
                  {services.cardLink} <span className="sr-only">{s.title.toLowerCase()}</span>
                  <Icon name="arrow_forward" className="text-[14px] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
