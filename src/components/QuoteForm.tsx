import { useEffect, useRef, useState, type FormEvent } from 'react';
import { quoteForm as t } from '../content';
import { ARRIVE_EVENT, type ArriveDetail } from '../utils/scrollToSection';
import { buildWhatsappQuoteLink, sendQuote, type QuoteData, type SpecialItemKey } from '../services/quote';
import { Checkbox, SelectField, TextField, YesNoField } from './form/Fields';
import { WhatsAppIcon } from './ui/BrandIcons';
import { Icon } from './ui/Icon';
import { SectionHeader } from './ui/SectionHeader';

type Errors = Partial<Record<string, string>>;
type Status = 'idle' | 'sent';

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
  consent: false,
});

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const validPhone = (v: string) => v.replace(/\D/g, '').length >= 7;
const validCount = (v: string) => /^\d+$/.test(v.trim());

/**
 * Valida un paso y devuelve los errores en el orden de los campos.
 * Decisión del cliente (respuesta #29): todos los campos son obligatorios. Excepciones:
 * el campo libre "detalles" (opcional) y las casillas de artículos declarados (se marcan solo si aplican;
 * si se marca una, su detalle es obligatorio).
 */
function validateStep(step: number, d: QuoteData): Errors {
  const e: Errors = {};
  const req = (key: keyof QuoteData & string, value: string) => {
    if (!value.trim()) e[key] = t.required;
  };
  const count = (key: keyof QuoteData & string, value: string) => {
    if (!value.trim()) e[key] = t.required;
    else if (!validCount(value)) e[key] = t.invalidNumber;
  };

  if (step === 0) {
    req('fullName', d.fullName);
    if (!d.phone.trim()) e.phone = t.required;
    else if (!validPhone(d.phone)) e.phone = t.invalidPhone;
    if (!d.whatsapp.trim()) e.whatsapp = t.required;
    else if (!validPhone(d.whatsapp)) e.whatsapp = t.invalidPhone;
    if (!d.email.trim()) e.email = t.required;
    else if (!EMAIL_RE.test(d.email.trim())) e.email = t.invalidEmail;
  }
  if (step === 1) {
    req('originCity', d.originCity);
    if (d.originCity === t.otherCity) req('originCityOther', d.originCityOther);
    req('originZone', d.originZone);
    req('destCity', d.destCity);
    if (d.destCity === t.otherCity) req('destCityOther', d.destCityOther);
    req('destZone', d.destZone);
    if (!d.date) e.date = t.required;
    else if (d.date < todayISO()) e.date = t.invalidDate;
  }
  if (step === 2) {
    req('propertyType', d.propertyType);
    count('rooms', d.rooms);
    count('originFloor', d.originFloor);
    count('destFloor', d.destFloor);
    req('elevator', d.elevator);
    req('stairs', d.stairs);
    req('accessDifficulty', d.accessDifficulty);
    if (d.accessDifficulty === 'si') req('accessDetail', d.accessDetail);
  }
  if (step === 3) {
    count('furnitureCount', d.furnitureCount);
    count('boxesCount', d.boxesCount);
    for (const s of t.specialItems) {
      const item = d.specialItems[s.key];
      if (item.checked && !item.detail.trim()) e[`special-${s.key}-detail`] = t.required;
    }
    req('disassembly', d.disassembly);
    req('packing', d.packing);
    req('materials', d.materials);
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [attention, setAttention] = useState(false);

  // Llegada al cotizador (cualquier enlace a #cotizar o la URL ya en #cotizar):
  // resalta la tarjeta y deja el foco listo para empezar.
  useEffect(() => {
    let timer = 0;
    const arrive = () => {
      setAttention(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setAttention(false), 1800);
      // Con mouse y teclado: foco en el primer campo para escribir de inmediato.
      // En pantallas táctiles no se abre el teclado sin que la persona lo pida: foco en el título.
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const field = fine ? cardRef.current?.querySelector<HTMLElement>('input, select, textarea') : null;
      (field ?? headingRef.current ?? successRef.current)?.focus({ preventScroll: true });
    };
    const onArrive = (e: Event) => {
      if ((e as CustomEvent<ArriveDetail>).detail.id === 'cotizar') arrive();
    };
    window.addEventListener(ARRIVE_EVENT, onArrive);
    const initial = window.location.hash === '#cotizar' ? window.setTimeout(arrive, 400) : 0;
    return () => {
      window.removeEventListener(ARRIVE_EVENT, onArrive);
      window.clearTimeout(timer);
      window.clearTimeout(initial);
    };
  }, []);

  // Al cambiar de paso, lleva el foco al título del paso (no en la carga inicial)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

  const set = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key as string]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const setSpecial = (key: SpecialItemKey, patch: Partial<{ checked: boolean; detail: string }>) => {
    setData((d) => ({ ...d, specialItems: { ...d.specialItems, [key]: { ...d.specialItems[key], ...patch } } }));
    const errKey = `special-${key}-detail`;
    if (errors[errKey]) setErrors((e) => ({ ...e, [errKey]: undefined }));
  };

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

  // Sincrónico a propósito: WhatsApp se abre en el mismo gesto del usuario para que el navegador no lo bloquee
  const onSubmit = (e: FormEvent) => {
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
    sendQuote(data);
    setStatus('sent');
  };

  const reset = () => {
    setData(initialData());
    setErrors({});
    setStatus('idle');
    setStep(0);
    setMaxStep(0);
  };

  const hasErrors = Object.values(errors).some(Boolean);
  const field = (k: string) => ({ id: `q-${k}`, error: errors[k] });
  const yesNo = (k: 'elevator' | 'stairs' | 'accessDifficulty' | 'disassembly' | 'packing' | 'materials') => ({
    ...field(k),
    legend: t.labels[k],
    yes: t.yes,
    no: t.no,
    required: true,
    value: data[k],
    onChange: (v: QuoteData[typeof k]) => set(k, v),
  });

  return (
    <section
      id="cotizar"
      data-nav="cotizar"
      aria-labelledby="quote-title"
      className="scroll-mt-6 border-b border-slate-200 bg-white py-20 text-slate-900 lg:py-24"
    >
      <div className="mx-auto max-w-form px-4 lg:px-8">
        {/* Sin animación de aparición: es destino de los botones "Cotiza ahora" y debe verse al llegar */}
        <SectionHeader id="quote-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} className="mb-10" animate={false} />

        <div
          ref={cardRef}
          className={`rounded-2xl border bg-white p-5 shadow-lg transition-colors duration-500 sm:p-10 ${
            attention ? 'form-attention border-brand-action' : 'border-slate-300'
          }`}
        >
          {status === 'sent' ? (
            <div ref={successRef} tabIndex={-1} role="status" className="step-in flex flex-col items-center gap-4 py-8 text-center focus:outline-none">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <WhatsAppIcon className="h-9 w-9" />
              </span>
              <p className="max-w-lg font-headline text-2xl font-bold uppercase text-slate-900">{t.successTitle}</p>
              <p className="max-w-lg font-body text-base text-slate-700">{t.success}</p>
              <p className="flex max-w-lg items-start gap-2 rounded-lg bg-blue-50 p-3 text-left font-body text-sm text-blue-900">
                <Icon name="photo_camera" className="mt-0.5 text-[20px] text-brand-action" />
                {t.successPhotos}
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <a href={buildWhatsappQuoteLink(data)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-md">
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

                {/* key={step}: cada paso entra con una transición corta */}
                <div key={step} className="step-in">
                  {step === 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <TextField {...field('fullName')} label={t.labels.fullName} placeholder={t.placeholders.fullName} required autoComplete="name" value={data.fullName} onChange={(v) => set('fullName', v)} />
                      <TextField {...field('phone')} label={t.labels.phone} placeholder={t.placeholders.phone} required type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={(v) => set('phone', v)} />
                      <TextField {...field('whatsapp')} label={t.labels.whatsapp} placeholder={t.placeholders.whatsapp} required type="tel" inputMode="tel" value={data.whatsapp} onChange={(v) => set('whatsapp', v)} />
                      <TextField {...field('email')} label={t.labels.email} placeholder={t.placeholders.email} required type="email" inputMode="email" autoComplete="email" value={data.email} onChange={(v) => set('email', v)} />
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <SelectField {...field('originCity')} label={t.labels.originCity} required placeholder={t.selectPlaceholder} options={[...t.cities, t.otherCity]} value={data.originCity} onChange={(v) => set('originCity', v)} />
                      {data.originCity === t.otherCity ? (
                        <TextField {...field('originCityOther')} label={t.labels.originCityOther} required value={data.originCityOther} onChange={(v) => set('originCityOther', v)} />
                      ) : (
                        <TextField {...field('originZone')} label={t.labels.originZone} required placeholder={t.zonePlaceholder} value={data.originZone} onChange={(v) => set('originZone', v)} />
                      )}
                      {data.originCity === t.otherCity && (
                        <TextField {...field('originZone')} label={t.labels.originZone} required placeholder={t.zonePlaceholder} className="sm:col-span-2" value={data.originZone} onChange={(v) => set('originZone', v)} />
                      )}
                      <SelectField {...field('destCity')} label={t.labels.destCity} required placeholder={t.selectPlaceholder} options={[...t.cities, t.otherCity]} value={data.destCity} onChange={(v) => set('destCity', v)} />
                      {data.destCity === t.otherCity ? (
                        <TextField {...field('destCityOther')} label={t.labels.destCityOther} required value={data.destCityOther} onChange={(v) => set('destCityOther', v)} />
                      ) : (
                        <TextField {...field('destZone')} label={t.labels.destZone} required placeholder={t.zonePlaceholder} value={data.destZone} onChange={(v) => set('destZone', v)} />
                      )}
                      {data.destCity === t.otherCity && (
                        <TextField {...field('destZone')} label={t.labels.destZone} required placeholder={t.zonePlaceholder} className="sm:col-span-2" value={data.destZone} onChange={(v) => set('destZone', v)} />
                      )}
                      <TextField {...field('date')} label={t.labels.date} required type="date" min={todayISO()} value={data.date} onChange={(v) => set('date', v)} />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <SelectField {...field('propertyType')} label={t.labels.propertyType} required placeholder={t.selectPlaceholder} options={t.propertyTypes} value={data.propertyType} onChange={(v) => set('propertyType', v)} />
                      <TextField {...field('rooms')} label={t.labels.rooms} required type="number" inputMode="numeric" min="0" value={data.rooms} onChange={(v) => set('rooms', v)} />
                      <TextField {...field('originFloor')} label={t.labels.originFloor} required type="number" inputMode="numeric" min="0" value={data.originFloor} onChange={(v) => set('originFloor', v)} />
                      <TextField {...field('destFloor')} label={t.labels.destFloor} required type="number" inputMode="numeric" min="0" value={data.destFloor} onChange={(v) => set('destFloor', v)} />
                      <YesNoField {...yesNo('elevator')} />
                      <YesNoField {...yesNo('stairs')} />
                      <YesNoField {...yesNo('accessDifficulty')} className="sm:col-span-2">
                        {data.accessDifficulty === 'si' && (
                          <TextField {...field('accessDetail')} label={t.labels.accessDetail} required className="mt-3" multiline value={data.accessDetail} onChange={(v) => set('accessDetail', v)} />
                        )}
                      </YesNoField>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <TextField {...field('furnitureCount')} label={t.labels.furnitureCount} required type="number" inputMode="numeric" min="0" value={data.furnitureCount} onChange={(v) => set('furnitureCount', v)} />
                        <TextField {...field('boxesCount')} label={t.labels.boxesCount} required type="number" inputMode="numeric" min="0" value={data.boxesCount} onChange={(v) => set('boxesCount', v)} />
                      </div>

                      {/* Declaración de artículos (respuesta del cliente #42: se declaran en el formulario) */}
                      <fieldset aria-describedby="q-special-hint">
                        <legend className="field-label">{t.labels.specialItems}</legend>
                        <p id="q-special-hint" className="mb-2 font-body text-xs text-slate-600">
                          {t.labels.specialItemsHint}
                        </p>
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
                                    {...field(`special-${s.key}-detail`)}
                                    label={`${t.specialDetailLabel}: ${s.label.toLowerCase()}`}
                                    required
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
                        <YesNoField {...yesNo('disassembly')} />
                        <YesNoField {...yesNo('packing')} />
                        <YesNoField {...yesNo('materials')} />
                      </div>

                      <TextField {...field('details')} label={t.labels.details} multiline value={data.details} onChange={(v) => set('details', v)} />

                      {/* Fotos y videos: se adjuntan en el chat de WhatsApp (respuesta del cliente #25) */}
                      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                        <Icon name="photo_camera" className="mt-0.5 text-[22px] text-brand-action" />
                        <p className="font-body text-sm text-blue-950">
                          <strong className="block font-headline text-sm uppercase tracking-wider text-blue-800">{t.labels.filesTitle}</strong>
                          {t.labels.filesInfo}
                        </p>
                      </div>

                      <Checkbox id="q-consent" required checked={data.consent} onChange={(c) => set('consent', c)} error={errors.consent}>
                        {t.labels.consent} <span className="text-rose-700" aria-hidden="true">*</span>
                      </Checkbox>
                    </div>
                  )}
                </div>

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
                    <button type="submit" className="btn-whatsapp btn-md">
                      <WhatsAppIcon className="h-5 w-5" />
                      {t.submit}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
