import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Icon } from './Icon';

export type AccordionItem = {
  title: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Índices abiertos al inicio */
  defaultOpen?: number[];
  /** Nivel del encabezado que envuelve cada botón */
  headingLevel?: 3 | 4;
  itemClassName?: string;
  titleClassName?: string;
  chevronClassName?: string;
  panelClassName?: string;
};

/**
 * Acordeón accesible (patrón WAI-ARIA): cada encabezado es un <button> con
 * aria-expanded y aria-controls; el panel es una región etiquetada por su botón.
 * Teclado: Tab entre botones, Enter/Espacio abre o cierra, flechas ↑/↓, Inicio y Fin.
 */
export function Accordion({
  items,
  defaultOpen = [],
  headingLevel = 3,
  itemClassName = '',
  titleClassName = '',
  chevronClassName = 'text-slate-500',
  panelClassName = '',
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen));
  const Heading = `h${headingLevel}` as 'h3' | 'h4';

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const focusAt = (idx: number) => document.getElementById(`${baseId}-btn-${idx}`)?.focus();
    const last = items.length - 1;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        focusAt(i === last ? 0 : i + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusAt(i === 0 ? last : i - 1);
        break;
      case 'Home':
        e.preventDefault();
        focusAt(0);
        break;
      case 'End':
        e.preventDefault();
        focusAt(last);
        break;
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i} className={`rounded-xl border border-slate-200 ${itemClassName}`}>
            <Heading className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`flex w-full items-center justify-between gap-4 rounded-xl p-4 text-left sm:p-5 ${titleClassName}`}
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.title}</span>
                </span>
                <Icon
                  name="expand_more"
                  className={`text-[22px] transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''} ${chevronClassName}`}
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className={`mx-4 border-t pb-4 pt-3 font-body text-sm leading-relaxed text-slate-700 sm:mx-5 sm:pb-5 ${panelClassName}`}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
