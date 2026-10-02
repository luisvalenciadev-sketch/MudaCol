import { about } from '../content';
import { Picture } from './ui/Picture';
import { Reveal } from './ui/Reveal';

export function About() {
  return (
    <section
      id="quienes-somos"
      data-nav="inicio"
      aria-labelledby="about-title"
      className="border-b border-slate-200 bg-white py-20 text-slate-900 lg:py-24"
    >
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <Reveal variant="left" className="space-y-6 lg:col-span-7">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-blue-700">
              <span className="h-2 w-2 rounded-full bg-brand-action" aria-hidden="true" />
              {about.eyebrow}
            </p>
            <h2 id="about-title" className="font-headline text-3xl font-bold uppercase tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {about.title}
            </h2>
            <div className="mt-3 h-1 w-20 rounded bg-brand-action" aria-hidden="true" />
          </div>
          <p className="font-body text-lg leading-relaxed text-slate-700">{about.text}</p>
          <figure className="rounded-r-xl border-l-4 border-brand-action bg-slate-50 p-6 shadow-sm sm:p-7">
            <span className="mb-1 block select-none font-headline text-4xl leading-none text-brand-action" aria-hidden="true">
              “
            </span>
            <blockquote className="font-headline text-2xl font-semibold uppercase leading-snug text-slate-900 sm:text-[26px]">
              {about.quote}
            </blockquote>
            <figcaption className="mt-3 block font-body text-xs font-bold uppercase tracking-widest text-slate-600">
              — {about.quoteFooter}
            </figcaption>
          </figure>
        </Reveal>

        <div className="space-y-5 lg:col-span-5">
          {about.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 150}
              variant="right"
              as="article"
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-lg"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Picture
                  base={card.image}
                  widths={card.widths}
                  width={card.width}
                  height={card.height}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  alt={card.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
                <span className="placeholder-tag absolute left-3 top-3">{card.placeholder}</span>
              </div>
              <div className="p-5">
                <h3 className="font-headline text-lg font-bold uppercase text-slate-900">{card.title}</h3>
                <p className="mt-1 font-body text-sm leading-relaxed text-slate-600">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
