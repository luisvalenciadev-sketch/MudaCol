import { includes } from '../content';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

export function Includes() {
  const { included, excluded } = includes;
  return (
    <section
      id="incluye"
      data-nav="servicios"
      aria-labelledby="includes-title"
      className="border-b border-slate-200 bg-white py-20 text-slate-900 lg:py-24"
    >
      <div className="container-page">
        <SectionHeader id="includes-title" eyebrow={includes.eyebrow} title={includes.title} className="mb-14" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Qué incluye */}
          <Reveal className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-9">
            <div>
              <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Icon name="task_alt" className="text-[24px]" />
                </div>
                <div>
                  <p className="block font-body text-xs font-bold uppercase tracking-wider text-emerald-800">{included.eyebrow}</p>
                  <h3 className="font-headline text-2xl font-bold uppercase text-slate-900">{included.title}</h3>
                </div>
              </div>
              <ul className="space-y-3 font-body text-sm text-slate-700">
                {included.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3 shadow-xs">
                    <Icon name="check_circle" className="mt-0.5 text-[20px] text-emerald-600" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-body text-xs text-emerald-900">
              <Icon name="info" className="mt-0.5 text-[18px] text-emerald-700" />
              <span>
                <strong>{included.noteLabel}</strong> {included.note}
              </span>
            </p>
          </Reveal>

          {/* Qué no incluye */}
          <Reveal delay={120} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-9">
            <div>
              <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                  <Icon name="block" className="text-[24px]" />
                </div>
                <div>
                  <p className="block font-body text-xs font-bold uppercase tracking-wider text-rose-800">{excluded.eyebrow}</p>
                  <h3 className="font-headline text-2xl font-bold uppercase text-slate-900">{excluded.title}</h3>
                </div>
              </div>
              <ul className="space-y-3 font-body text-sm text-slate-700">
                {excluded.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3 shadow-xs">
                    <Icon name="close" className="mt-0.5 text-[20px] text-slate-500" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50/50 p-3 shadow-xs">
                  <Icon name="dangerous" className="mt-0.5 text-[20px] text-rose-600" />
                  <span className="font-semibold text-rose-900">{excluded.highlighted}</span>
                </li>
              </ul>
            </div>
            <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-100 p-4 font-body text-xs text-slate-700">
              <Icon name="help_center" className="mt-0.5 text-[18px] text-slate-500" />
              <span>{excluded.note}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
