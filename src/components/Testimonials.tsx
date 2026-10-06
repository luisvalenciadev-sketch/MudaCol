import { SHOW_PENDING, testimonials } from '../content';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

/**
 * Prueba social. Solo muestra testimonios reales (el brief prohíbe inventarlos).
 * Sin testimonios cargados en src/content.ts la sección no aparece, salvo en modo revisión.
 */
export function Testimonials() {
  const { items } = testimonials;
  if (items.length === 0 && !SHOW_PENDING) return null;

  return (
    <section
      id="testimonios"
      data-nav="preguntas-frecuentes"
      aria-labelledby="testimonials-title"
      className="border-b border-slate-200 bg-brand-light py-20 text-slate-900 lg:py-24"
    >
      <div className="container-page">
        <SectionHeader id="testimonials-title" eyebrow={testimonials.eyebrow} title={testimonials.title} className="mb-12" />
        {items.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <Reveal as="li" key={item.name} delay={i * 100} className="flex">
                <figure className="flex w-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon name="format_quote" className="mb-3 text-[28px] text-brand-action" />
                  <blockquote className="font-body text-sm leading-relaxed text-slate-700">“{item.text}”</blockquote>
                  <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="font-headline text-sm font-bold uppercase text-slate-900">{item.name}</span>
                    {item.service && <span className="text-right font-body text-xs text-slate-600">{item.service}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal variant="scale" className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-xl border-2 border-dashed border-amber-400 bg-white p-8 text-center shadow-sm">
            <Icon name="format_quote" className="text-[32px] text-brand-action" />
            <p className="font-headline text-xl font-bold uppercase text-amber-900">{testimonials.placeholder}</p>
            <p className="font-body text-sm text-slate-600">{testimonials.note}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
