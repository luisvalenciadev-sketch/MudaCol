import { faq } from '../content';
import { Accordion } from './ui/Accordion';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function FAQ() {
  return (
    <section
      id="preguntas-frecuentes"
      data-nav="preguntas-frecuentes"
      aria-labelledby="faq-title"
      className="border-b border-slate-200 bg-white py-20 text-slate-900 lg:py-24"
    >
      <div className="mx-auto max-w-form px-4 lg:px-8">
        <SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} subtitle={faq.subtitle} className="mb-12" />
        <Reveal>
          <Accordion
            itemClassName="bg-slate-50"
            titleClassName="font-headline text-base font-bold uppercase text-slate-900 sm:text-lg"
            chevronClassName="text-brand-action"
            panelClassName="border-slate-200"
            items={faq.items.map((item, i) => ({
              title: `${i + 1}. ${item.q}`,
              content: <p>{item.a}</p>,
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
