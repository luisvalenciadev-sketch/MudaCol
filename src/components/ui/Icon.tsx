type IconProps = { name: string; className?: string };

/** Ícono de Material Symbols Outlined (los mismos que usa el diseño de Stitch). Decorativo. */
export function Icon({ name, className = '' }: IconProps) {
  return (
    <span className={`icon ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}
