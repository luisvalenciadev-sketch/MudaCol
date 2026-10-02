import { policies } from '../content';
import { Accordion } from './ui/Accordion';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function Policies() {
  return (
    <section
      id="politicas"
      data-nav="preguntas-frecuentes"
      aria-labelledby="policies-title"
      className="border-b border-slate-200 bg-brand-light py-20 text-slate-900 lg:py-24"
    >
      <div className="mx-auto max-w-form px-4 lg:px-8">
        <SectionHeader id="policies-title" eyebrow={policies.eyebrow} title={policies.title} subtitle={policies.subtitle} className="mb-12" />
        <Reveal>
          <Accordion
            defaultOpen={[0]}
            itemClassName="bg-white shadow-xs"
            titleClassName="font-headline text-base font-bold uppercase text-slate-900"
            panelClassName="border-slate-100"
            items={policies.items.map((p) => ({
              title: p.title,
              icon: <Icon name={p.icon} className={`text-[22px] ${p.tone === 'danger' ? 'text-rose-600' : 'text-brand-action'}`} />,
              content: <p>{p.text}</p>,
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
