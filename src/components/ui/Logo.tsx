import { useId } from 'react';

type LogoProps = { className?: string; title?: string };

/**
 * Logo MudaCol recreado en Stitch (pantalla 2): escudo con camión y la banda "MUDANZAS",
 * más el texto "MUDANZAS / MUDACOL". Va en línea para usar la fuente Oswald de la página.
 * Reemplazar por el archivo oficial en vector cuando el cliente lo entregue.
 */
export function Logo({ className = 'h-11 w-auto', title = 'Mudanzas MudaCol' }: LogoProps) {
  const id = useId();
  const shield = `${id}-shield`;
  const silver = `${id}-silver`;
  return (
    <svg className={className} viewBox="10 4 300 88" role="img" aria-label={title}>
      <defs>
        <linearGradient id={shield} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--c-blue-deep)" />
          <stop offset="100%" stopColor="var(--c-blue)" />
        </linearGradient>
        <linearGradient id={silver} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--c-white)" />
          <stop offset="50%" stopColor="var(--c-silver)" />
          <stop offset="100%" stopColor="var(--c-slate-500)" />
        </linearGradient>
      </defs>
      <g transform="translate(10, 8)">
        <path
          d="M42 2 L76 14 C76 52 50 72 42 78 C34 72 8 52 8 14 Z"
          fill="var(--c-dark)"
          stroke={`url(#${silver})`}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M42 6 L72 17 C72 48 48 66 42 72 C36 66 12 48 12 17 Z" fill={`url(#${shield})`} opacity="0.95" />
        <g transform="translate(20, 25) scale(0.75)">
          <rect x="2" y="4" width="34" height="22" rx="2" fill="var(--c-white)" />
          <path d="M37 12 L47 12 L52 20 L52 26 L37 26 Z" fill="var(--c-white)" />
          <path d="M40 14 L46 14 L49 19 L40 19 Z" fill="var(--c-blue-deep)" />
          <circle cx="12" cy="27" r="5" fill="var(--c-dark)" stroke="var(--c-white)" strokeWidth="2" />
          <circle cx="44" cy="27" r="5" fill="var(--c-dark)" stroke="var(--c-white)" strokeWidth="2" />
          <rect x="-4" y="8" width="4" height="2" fill="var(--c-silver)" />
          <rect x="-6" y="14" width="5" height="2" fill="var(--c-silver)" />
        </g>
        <rect x="14" y="49" width="56" height="12" rx="2" fill="var(--c-dark)" stroke="var(--c-blue)" strokeWidth="1" />
        <text
          x="42"
          y="58"
          fontFamily="Oswald, sans-serif"
          fontSize="8.5"
          fontWeight="700"
          fill="var(--c-white)"
          textAnchor="middle"
          letterSpacing="1"
        >
          MUDANZAS
        </text>
      </g>
      <g transform="translate(98, 22)">
        <text x="0" y="24" fontFamily="Oswald, sans-serif" fontSize="20" fontWeight="700" fill="var(--c-white)" letterSpacing="3.5">
          MUDANZAS
        </text>
        <text x="0" y="56" fontFamily="Oswald, sans-serif" fontSize="34" fontWeight="700" fill="var(--c-blue)" letterSpacing="2">
          MUDACOL
        </text>
        <rect x="0" y="64" width="80" height="3" fill="var(--c-silver)" />
      </g>
    </svg>
  );
}
