import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'fade';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Retraso en ms para escalonar elementos de una cuadrícula */
  delay?: number;
  /** Dirección de la entrada */
  variant?: RevealVariant;
};

/**
 * Aparición sutil al entrar en pantalla. Con prefers-reduced-motion el CSS
 * deja el contenido visible sin transición (ver .reveal en index.css).
 */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0, variant = 'up' }: RevealProps) {
  const [ref, visible] = useInView<HTMLElement>({ rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
