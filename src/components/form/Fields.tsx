import type { ChangeEvent, ReactNode } from 'react';
import type { YesNo } from '../../services/quote';

type BaseProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
};

const describedBy = (id: string, error?: string, hint?: string) =>
  [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;

function Label({ id, label, required }: Pick<BaseProps, 'id' | 'label' | 'required'>) {
  return (
    <label htmlFor={id} className="field-label">
      {label}
      {required && (
        <span className="text-rose-700" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </label>
  );
}

function Messages({ id, error, hint }: Pick<BaseProps, 'id' | 'error' | 'hint'>) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 font-body text-xs text-slate-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </>
  );
}

type TextFieldProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'tel' | 'email' | 'date' | 'number';
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric';
  min?: string;
  multiline?: boolean;
};

export function TextField({
  id,
  label,
  required,
  error,
  hint,
  className = '',
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  min,
  multiline,
}: TextFieldProps) {
  const common = {
    id,
    name: id,
    value,
    placeholder,
    required,
    'aria-required': required || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy(id, error, hint),
    className: 'field-input',
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
  };
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      {multiline ? (
        <textarea {...common} rows={4} />
      ) : (
        <input {...common} type={type} autoComplete={autoComplete} inputMode={inputMode} min={min} />
      )}
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

type SelectFieldProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
};

export function SelectField({ id, label, required, error, hint, className = '', value, onChange, options, placeholder }: SelectFieldProps) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <select
        id={id}
        name={id}
        value={value}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className="field-input"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

type YesNoFieldProps = {
  id: string;
  legend: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
  yes: string;
  no: string;
  required?: boolean;
  error?: string;
  className?: string;
  children?: ReactNode;
};

/** Pregunta Sí/No como grupo de radios (navegable con flechas). El primer radio lleva el id para recibir el foco. */
export function YesNoField({ id, legend, value, onChange, yes, no, required, error, className = '', children }: YesNoFieldProps) {
  const opt = (v: Exclude<YesNo, ''>, text: string, first: boolean) => (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 font-body text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-blue ${
        value === v
          ? 'border-brand-action bg-blue-50 font-semibold text-blue-900'
          : error
            ? 'border-rose-500 bg-white text-slate-700'
            : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
      }`}
    >
      <input
        type="radio"
        id={first ? id : undefined}
        name={id}
        value={v}
        checked={value === v}
        onChange={() => onChange(v)}
        className="h-4 w-4 accent-brand-action focus:outline-none"
      />
      {text}
    </label>
  );
  return (
    <fieldset className={className}>
      <legend id={`${id}-legend`} className="field-label">
        {legend}
        {required && (
          <span className="text-rose-700" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>
      <div
        role="radiogroup"
        aria-labelledby={`${id}-legend`}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="flex flex-wrap gap-2"
      >
        {opt('si', yes, true)}
        {opt('no', no, false)}
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
      {children}
    </fieldset>
  );
}

type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  error?: string;
  required?: boolean;
};

export function Checkbox({ id, checked, onChange, children, error, required }: CheckboxProps) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 font-body text-sm text-slate-700">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded accent-brand-action"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
