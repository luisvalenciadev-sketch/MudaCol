import { steps } from '../content';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function HowItWorks() {
  const last = steps.items.length - 1;
  return (
    <section
      id="como-funciona"
      data-nav="como-funciona"
      aria-labelledby="steps-title"
      className="border-b border-slate-200 bg-brand-light py-20 text-slate-900 lg:py-24"
    >
      <div className="container-page">
        <SectionHeader id="steps-title" eyebrow={steps.eyebrow} title={steps.title} subtitle={steps.subtitle} className="mb-14" />

        <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {/* Línea de tiempo en escritorio */}
          <span aria-hidden="true" className="absolute left-8 right-8 top-[2.5rem] hidden h-0.5 bg-blue-200 lg:block" />
          {steps.items.map((s, i) => {
            const isLast = i === last;
            const n = String(i + 1).padStart(2, '0');
            return (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 70}
                className={`relative flex flex-col justify-between rounded-xl border p-5 shadow-sm ${
                  isLast ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <span
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg font-headline text-lg font-bold text-white ${
                      isLast ? 'bg-emerald-700' : 'bg-brand-action'
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className={`mb-1.5 font-headline text-base font-bold uppercase ${isLast ? 'text-emerald-950' : 'text-slate-900'}`}>
                    <span className="sr-only">Paso {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className={`font-body text-xs leading-relaxed ${isLast ? 'text-emerald-900' : 'text-slate-600'}`}>{s.text}</p>
                </div>
                <span
                  className={`mt-4 font-body text-[11px] font-bold uppercase ${isLast ? 'text-emerald-800' : 'text-blue-700'}`}
                  aria-hidden="true"
                >
                  Paso {n}
                </span>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
