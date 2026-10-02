import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  id?: string;
  align?: 'center' | 'left';
  className?: string;
  /** false: visible de inmediato, sin animación de aparición (p. ej. destino de un enlace) */
  animate?: boolean;
};

/** Encabezado de sección de Stitch: antetítulo azul, H2 en Oswald y bajada en Inter. */
export function SectionHeader({ eyebrow, title, subtitle, id, align = 'center', className = '', animate = true }: SectionHeaderProps) {
  const alignCls = align === 'center' ? 'mx-auto max-w-2xl text-center' : '';
  const content = (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h2 mt-2">
        {title}
      </h2>
      {subtitle && <p className="mt-2 font-body text-base text-slate-600">{subtitle}</p>}
    </>
  );
  return animate ? (
    <Reveal className={`${alignCls} ${className}`}>{content}</Reveal>
  ) : (
    <div className={`${alignCls} ${className}`}>{content}</div>
  );
}
