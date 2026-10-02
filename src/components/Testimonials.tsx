import { testimonials } from '../content';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

/** Prueba social: marcador hasta tener testimonios reales (el brief prohíbe inventarlos). */
export function Testimonials() {
  return (
    <section
      id="testimonios"
      data-nav="preguntas-frecuentes"
      aria-labelledby="testimonials-title"
      className="border-b border-slate-200 bg-brand-light py-20 text-slate-900 lg:py-24"
    >
      <div className="container-page">
        <SectionHeader id="testimonials-title" eyebrow={testimonials.eyebrow} title={testimonials.title} className="mb-12" />
        <Reveal variant="scale" className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-xl border-2 border-dashed border-amber-400 bg-white p-8 text-center shadow-sm">
          <Icon name="format_quote" className="text-[32px] text-brand-action" />
          <p className="font-headline text-xl font-bold uppercase text-amber-900">{testimonials.placeholder}</p>
          <p className="font-body text-sm text-slate-600">{testimonials.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
