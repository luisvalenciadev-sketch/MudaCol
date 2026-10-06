import type { ReactNode } from 'react';
import { isPending, SHOW_PENDING } from '../../content';

type PendingProps = {
  value: string;
  /** Texto que va antes del valor (p. ej. ", "), solo si el valor se muestra */
  prefix?: ReactNode;
};

/**
 * Muestra un dato que puede estar pendiente de confirmar con el cliente.
 * - Dato confirmado: se muestra normal.
 * - Pendiente ("[CIUDAD]"…): se oculta en lanzamiento, o se ve como etiqueta amarilla
 *   si VITE_SHOW_PENDING=true (modo revisión).
 */
export function Pending({ value, prefix = null }: PendingProps) {
  if (!isPending(value)) {
    return (
      <>
        {prefix}
        {value}
      </>
    );
  }
  if (!SHOW_PENDING) return null;
  return (
    <>
      {prefix}
      <span className="placeholder-tag">{value}</span>
    </>
  );
}
