import { useEffect, useRef, useState, type FormEvent } from 'react';
import { quoteForm as t } from '../content';
import { buildWhatsappQuoteLink, submitQuote, type QuoteData, type SpecialItemKey } from '../services/quote';
import { Checkbox, SelectField, TextField, YesNoField } from './form/Fields';
import { FileUpload } from './form/FileUpload';
import { WhatsAppIcon } from './ui/BrandIcons';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

type Errors = Partial<Record<string, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const initialData = (): QuoteData => ({
  fullName: '',
  phone: '',
  whatsapp: '',
  email: '',
  originCity: '',
  originCityOther: '',
  originZone: '',
  destCity: '',
  destCityOther: '',
  destZone: '',
  date: '',
  propertyType: '',
  rooms: '',
  originFloor: '',
  destFloor: '',
  elevator: '',
  stairs: '',
  accessDifficulty: '',
  accessDetail: '',
  furnitureCount: '',
  boxesCount: '',
  specialItems: {
    large: { checked: false, detail: '' },
    special: { checked: false, detail: '' },
    fragile: { checked: false, detail: '' },
    valuable: { checked: false, detail: '' },
  },
  disassembly: '',
  packing: '',
  materials: '',
  details: '',
  files: [],
  consent: false,
});

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const validPhone = (v: string) => v.replace(/\D/g, '').length >= 7;

/** Valida un paso y devuelve los errores en el orden de los campos. */
function validateStep(step: number, d: QuoteData): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!d.fullName.trim()) e.fullName = t.required;
    if (!d.phone.trim()) e.phone = t.required;
    else if (!validPhone(d.phone)) e.phone = t.invalidPhone;
    if (!d.whatsapp.trim()) e.whatsapp = t.required;
    else if (!validPhone(d.whatsapp)) e.whatsapp = t.invalidPhone;
    if (d.email.trim() && !EMAIL_RE.test(d.email.trim())) e.email = t.invalidEmail;
  }
  if (step === 1) {
    if (!d.originCity) e.originCity = t.required;
    else if (d.originCity === t.otherCity && !d.originCityOther.trim()) e.originCityOther = t.required;
    if (!d.destCity) e.destCity = t.required;
    else if (d.destCity === t.otherCity && !d.destCityOther.trim()) e.destCityOther = t.required;
    if (!d.date) e.date = t.required;
    else if (d.date < todayISO()) e.date = t.invalidDate;
  }
  if (step === 3) {
    if (!d.consent) e.consent = t.consentRequired;
  }
  return e;
}

const STEP_COUNT = t.steps.length;

export function QuoteForm() {
  const [data, setData] = useState<QuoteData>(initialData);
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Al cambiar de paso, lleva el foco al título del paso (no en la carga inicial)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const set = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key as string]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setSpecial = (key: SpecialItemKey, patch: Partial<{ checked: boolean; detail: string }>) =>
    setData((d) => ({ ...d, specialItems: { ...d.specialItems, [key]: { ...d.specialItems[key], ...patch } } }));

  const focusFirstError = (errs: Errors) => {
    const first = Object.keys(errs).find((k) => errs[k]);
    if (first) requestAnimationFrame(() => document.getElementById(`q-${first}`)?.focus());
  };

  const goTo = (target: number) => {
    setErrors({});
    setStep(target);
    setMaxStep((m) => Math.max(m, target));
  };

  const next = () => {
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    goTo(step + 1);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < STEP_COUNT - 1) return next();
    // Valida todos los pasos; si alguno falla, vuelve a ese paso
    for (let s = 0; s < STEP_COUNT; s++) {
      const errs = validateStep(s, data);
      if (Object.keys(errs).length) {
        if (s !== step) setStep(s);
        setErrors(errs);
        return focusFirstError(errs);
      }
    }
    setStatus('sending');
    try {
      const res = await submitQuote(data);
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setData(initialData());
    setErrors({});
    setStatus('idle');
    setStep(0);
    setMaxStep(0);
  };

  const whatsappHref = buildWhatsappQuoteLink(data);
  const hasErrors = Object.values(errors).some(Boolean);
  const field = (k: string) => ({ id: `q-${k}`, error: errors[k] });

  return (
    <section
      id="cotizar"
      data-nav="cotizar"
      aria-labelledby="quote-title"
      className="border-b border-slate-200 bg-white py-20 text-slate-900 lg:py-24"
    >
      <div className="mx-auto max-w-form px-4 lg:px-8">
        <SectionHeader id="quote-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} className="mb-10" />

        <Reveal className="rounded-2xl border border-slate-300 bg-white p-5 shadow-lg sm:p-10">
          {status === 'success' ? (
            <div ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-center gap-5 py-8 text-center focus:outline-none">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Icon name="task_alt" className="text-[36px]" />
              </span>
              <p className="max-w-lg font-headline text-2xl font-bold uppercase text-slate-900">{t.success}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-md">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.successWhatsapp}
                </a>
                <button type="button" onClick={reset} className="btn btn-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-50">
                  {t.newRequest}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Indicador de pasos */}
              <div className="mb-8 border-b border-slate-200 pb-6">
                <ol className="mb-4 grid grid-cols-4 gap-2 sm:gap-4" aria-label="Pasos del formulario">
                  {t.steps.map((label, i) => {
                    const current = i === step;
                    const reachable = i <= maxStep && i !== step;
                    const cls = current
                      ? 'border-blue-300 bg-blue-50 font-semibold text-blue-900'
                      : i < step || i <= maxStep
                        ? 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                        : 'border-transparent bg-slate-100 text-slate-600';
                    const content = (
                      <>
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            current ? 'bg-brand-action text-white' : i < step ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-800'
                          }`}
                          aria-hidden="true"
                        >
                          {i < step ? <Icon name="check" className="text-[14px]" /> : i + 1}
                        </span>
                        <span className="truncate font-body text-xs">{label}</span>
                      </>
                    );
                    const base = `flex w-full flex-col items-center gap-2 rounded-lg border p-2.5 transition-colors sm:flex-row ${cls}`;
                    return (
                      <li key={label} aria-current={current ? 'step' : undefined}>
                        {reachable ? (
                          <button type="button" className={base} onClick={() => goTo(i)}>
                            <span className="sr-only">Ir al paso {i + 1}: </span>
                            {content}
                          </button>
                        ) : (
                          <div className={base}>{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ol>
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
                  role="progressbar"
                  aria-label="Progreso del formulario"
                  aria-valuemin={1}
                  aria-valuemax={STEP_COUNT}
                  aria-valuenow={step + 1}
                  aria-valuetext={`Paso ${step + 1} de ${STEP_COUNT}`}
                >
                  <div
                    className="h-full bg-brand-action transition-all duration-300 motion-reduce:transition-none"
                    style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }}
                  />
                </div>
              </div>

              <form noValidate onSubmit={onSubmit} aria-labelledby="quote-step-title">
                <div className="mb-5 border-b border-slate-200 pb-2">
                  <h3 id="quote-step-title" ref={headingRef} tabIndex={-1} className="font-headline text-xl font-bold uppercase text-slate-900 focus:outline-none">
                    {t.stepTitles[step].title}
                  </h3>
                  <p className="font-body text-xs text-slate-600">
                    {t.stepTitles[step].text} {t.requiredHint}
                  </p>
                </div>

                {hasErrors && (
                  <p role="alert" className="mb-5 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 font-body text-sm text-rose-800">
                    <Icon name="error" className="text-[20px]" />
                    {t.errorSummary}
                  </p>
                )}

                {step === 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField {...field('fullName')} label={t.labels.fullName} placeholder={t.placeholders.fullName} required autoComplete="name" value={data.fullName} onChange={(v) => set('fullName', v)} />
                    <TextField {...field('phone')} label={t.labels.phone} placeholder={t.placeholders.phone} required type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={(v) => set('phone', v)} />
                    <TextField {...field('whatsapp')} label={t.labels.whatsapp} placeholder={t.placeholders.whatsapp} required type="tel" inputMode="tel" value={data.whatsapp} onChange={(v) => set('whatsapp', v)} />
                    <TextField {...field('email')} label={t.labels.email} placeholder={t.placeholders.email} type="email" inputMode="email" autoComplete="email" value={data.email} onChange={(v) => set('email', v)} />
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SelectField {...field('originCity')} label={t.labels.originCity} required placeholder={t.selectPlaceholder} options={[...t.cities, t.otherCity]} value={data.originCity} onChange={(v) => set('originCity', v)} />
                    {data.originCity === t.otherCity ? (
                      <TextField {...field('originCityOther')} label={t.labels.originCityOther} required value={data.originCityOther} onChange={(v) => set('originCityOther', v)} />
                    ) : (
                      <TextField {...field('originZone')} label={t.labels.originZone} placeholder={t.zonePlaceholder} value={data.originZone} onChange={(v) => set('originZone', v)} />
                    )}
                    {data.originCity === t.otherCity && (
                      <TextField {...field('originZone')} label={t.labels.originZone} placeholder={t.zonePlaceholder} className="sm:col-span-2" value={data.originZone} onChange={(v) => set('originZone', v)} />
                    )}
                    <SelectField {...field('destCity')} label={t.labels.destCity} required placeholder={t.selectPlaceholder} options={[...t.cities, t.otherCity]} value={data.destCity} onChange={(v) => set('destCity', v)} />
                    {data.destCity === t.otherCity ? (
                      <TextField {...field('destCityOther')} label={t.labels.destCityOther} required value={data.destCityOther} onChange={(v) => set('destCityOther', v)} />
                    ) : (
                      <TextField {...field('destZone')} label={t.labels.destZone} placeholder={t.zonePlaceholder} value={data.destZone} onChange={(v) => set('destZone', v)} />
                    )}
                    {data.destCity === t.otherCity && (
                      <TextField {...field('destZone')} label={t.labels.destZone} placeholder={t.zonePlaceholder} className="sm:col-span-2" value={data.destZone} onChange={(v) => set('destZone', v)} />
                    )}
                    <TextField {...field('date')} label={t.labels.date} required type="date" min={todayISO()} value={data.date} onChange={(v) => set('date', v)} />
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <SelectField {...field('propertyType')} label={t.labels.propertyType} placeholder={t.selectPlaceholder} options={t.propertyTypes} value={data.propertyType} onChange={(v) => set('propertyType', v)} />
                    <TextField {...field('rooms')} label={t.labels.rooms} type="number" inputMode="numeric" min="0" value={data.rooms} onChange={(v) => set('rooms', v)} />
                    <TextField {...field('originFloor')} label={t.labels.originFloor} type="number" inputMode="numeric" min="0" value={data.originFloor} onChange={(v) => set('originFloor', v)} />
                    <TextField {...field('destFloor')} label={t.labels.destFloor} type="number" inputMode="numeric" min="0" value={data.destFloor} onChange={(v) => set('destFloor', v)} />
                    <YesNoField id="q-elevator" legend={t.labels.elevator} yes={t.yes} no={t.no} value={data.elevator} onChange={(v) => set('elevator', v)} />
                    <YesNoField id="q-stairs" legend={t.labels.stairs} yes={t.yes} no={t.no} value={data.stairs} onChange={(v) => set('stairs', v)} />
                    <YesNoField id="q-accessDifficulty" legend={t.labels.accessDifficulty} yes={t.yes} no={t.no} value={data.accessDifficulty} onChange={(v) => set('accessDifficulty', v)} className="sm:col-span-2">
                      {data.accessDifficulty === 'si' && (
                        <TextField {...field('accessDetail')} label={t.labels.accessDetail} className="mt-3" multiline value={data.accessDetail} onChange={(v) => set('accessDetail', v)} />
                      )}
                    </YesNoField>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <TextField {...field('furnitureCount')} label={t.labels.furnitureCount} type="number" inputMode="numeric" min="0" value={data.furnitureCount} onChange={(v) => set('furnitureCount', v)} />
                      <TextField {...field('boxesCount')} label={t.labels.boxesCount} type="number" inputMode="numeric" min="0" value={data.boxesCount} onChange={(v) => set('boxesCount', v)} />
                    </div>

                    <fieldset>
                      <legend className="field-label">{t.labels.specialItems}</legend>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {t.specialItems.map((s) => {
                          const item = data.specialItems[s.key];
                          return (
                            <div key={s.key} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                              <Checkbox id={`q-special-${s.key}`} checked={item.checked} onChange={(c) => setSpecial(s.key, { checked: c })}>
                                {s.label}
                              </Checkbox>
                              {item.checked && (
                                <TextField
                                  id={`q-special-${s.key}-detail`}
                                  label={`${t.specialDetailLabel}: ${s.label.toLowerCase()}`}
                                  className="mt-2"
                                  value={item.detail}
                                  onChange={(v) => setSpecial(s.key, { detail: v })}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <YesNoField id="q-disassembly" legend={t.labels.disassembly} yes={t.yes} no={t.no} value={data.disassembly} onChange={(v) => set('disassembly', v)} />
                      <YesNoField id="q-packing" legend={t.labels.packing} yes={t.yes} no={t.no} value={data.packing} onChange={(v) => set('packing', v)} />
                      <YesNoField id="q-materials" legend={t.labels.materials} yes={t.yes} no={t.no} value={data.materials} onChange={(v) => set('materials', v)} />
                    </div>

                    <TextField {...field('details')} label={t.labels.details} multiline value={data.details} onChange={(v) => set('details', v)} />

                    <FileUpload
                      id="q-files"
                      label={t.labels.files}
                      hint={t.labels.filesHint}
                      buttonLabel={t.labels.filesButton}
                      removeLabel={t.removeFile}
                      files={data.files}
                      onChange={(f) => set('files', f)}
                    />

                    <Checkbox id="q-consent" required checked={data.consent} onChange={(c) => set('consent', c)} error={errors.consent}>
                      {t.labels.consent} <span className="text-rose-700" aria-hidden="true">*</span>
                    </Checkbox>
                  </div>
                )}

                {status === 'error' && (
                  <p role="alert" className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-3 font-body text-sm text-rose-800">
                    {t.submitError}
                  </p>
                )}

                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  {step > 0 ? (
                    <button type="button" onClick={() => goTo(step - 1)} className="btn btn-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-50">
                      <Icon name="arrow_back" className="text-[18px]" />
                      {t.back}
                    </button>
                  ) : (
                    <span className="hidden sm:block" />
                  )}

                  {step < STEP_COUNT - 1 ? (
                    <button type="submit" className="btn-primary btn-md shadow-sm">
                      {t.next}: {t.steps[step + 1]}
                      <Icon name="arrow_forward" className="text-[18px]" />
                    </button>
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-md">
                        <WhatsAppIcon className="h-5 w-5" />
                        {t.sendWhatsapp}
                      </a>
                      <button type="submit" disabled={status === 'sending'} className="btn-primary btn-md shadow-sm disabled:cursor-wait disabled:opacity-70">
                        {status === 'sending' ? t.sending : t.submit}
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
