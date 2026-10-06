import { useEffect, useState, type CSSProperties } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CITY_POINTS, COLOMBIA_PATH, MAP_HEIGHT, MAP_WIDTH } from './colombiaMap';

export type MapCity = {
  name: string;
  kind: 'base' | 'destination' | 'region';
};

type LabelPos = { dx: number; dy: number; anchor: 'start' | 'end' };

// Posición de las etiquetas para que no se pisen
const LABELS: Record<string, LabelPos> = {
  Bogotá: { dx: -15, dy: 5, anchor: 'end' },
  Medellín: { dx: -15, dy: 5, anchor: 'end' },
  Cali: { dx: -15, dy: 5, anchor: 'end' },
  Cartagena: { dx: -15, dy: 6, anchor: 'end' },
  Barranquilla: { dx: -11, dy: -8, anchor: 'end' },
  Bucaramanga: { dx: 11, dy: 4, anchor: 'start' },
  Villavicencio: { dx: 11, dy: 12, anchor: 'start' },
};

const HUB = 'Bogotá';
// La región "Costa Atlántica" se ubica en Santa Marta para trazar la ruta
const REGION_POINT = 'Santa Marta';

const pointOf = (c: MapCity) => CITY_POINTS[c.kind === 'region' ? REGION_POINT : c.name];

/** Arco suave entre dos puntos (curva cuadrática con control desplazado en perpendicular). */
function arc([x1, y1]: [number, number], [x2, y2]: [number, number], bend: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return `M${x1} ${y1} Q${(mx - dy * bend).toFixed(1)} ${(my + dx * bend).toFixed(1)} ${x2} ${y2}`;
}

type CoverageMapProps = {
  title: string;
  description: string;
  regionLabel: string;
  cities: MapCity[];
  /** Ciudad resaltada (desde la lista o al pasar el cursor por el mapa) */
  active: string | null;
  onHover: (name: string | null) => void;
  /** Dispara las animaciones de dibujo cuando el mapa entra en pantalla */
  drawn: boolean;
  /** Destino de la ruta principal desde Bogotá: se dibuja siempre destacada */
  featured?: string;
};

export function CoverageMap({ title, description, regionLabel, cities, active, onHover, drawn, featured }: CoverageMapProps) {
  const reduced = useReducedMotion();
  // Los puntos de luz que recorren las rutas aparecen cuando ya se dibujaron
  const [flowing, setFlowing] = useState(false);
  useEffect(() => {
    if (!drawn || reduced) return;
    const t = window.setTimeout(() => setFlowing(true), 2600);
    return () => window.clearTimeout(t);
  }, [drawn, reduced]);

  const hub = CITY_POINTS[HUB];
  const routes = cities
    .filter((c) => c.name !== HUB)
    .map((c, i) => ({ city: c, d: arc(hub, pointOf(c), i % 2 ? 0.14 : -0.14) }));

  const isDimmed = (name: string) => active !== null && active !== HUB && name !== active && name !== HUB;
  const region = cities.find((c) => c.kind === 'region');
  const regionActive = region && active === region.name;

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className={`mx-auto h-auto w-full max-w-[460px] lg:max-h-[calc(100vh-23rem)] ${drawn ? 'is-drawn' : ''}`}
      role="img"
      aria-labelledby="mapa-titulo mapa-desc"
    >
      <title id="mapa-titulo">{title}</title>
      <desc id="mapa-desc">{description}</desc>

      <defs>
        <radialGradient id="mapa-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--c-blue)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--c-blue)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mapa-land" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--c-blue)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--c-blue-deep)" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* Resplandor detrás de Bogotá */}
      <circle cx={hub[0]} cy={hub[1]} r="120" fill="url(#mapa-glow)" className="map-land" />

      {/* Territorio */}
      <path d={COLOMBIA_PATH} fill="url(#mapa-land)" className="map-land" />
      <path
        d={COLOMBIA_PATH}
        pathLength={1}
        fill="none"
        stroke="var(--c-blue)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        className="map-outline"
      />

      {/* Costa Atlántica (región) */}
      {region && (
        <g className={`map-city ${isDimmed(region.name) ? 'map-dimmed' : ''}`}>
          <ellipse
            cx="142"
            cy="62"
            rx="52"
            ry="24"
            transform="rotate(-18 142 62)"
            fill="var(--c-blue)"
            fillOpacity={regionActive ? 0.32 : 0.14}
            stroke="var(--c-silver)"
            strokeOpacity="0.7"
            strokeDasharray="4 4"
            className="map-label map-glow"
            style={{ '--i': 6 } as CSSProperties}
          />
          <g className="map-label" style={{ '--i': 7 } as CSSProperties}>
            <text x="62" y="24" textAnchor="start" fill="var(--c-silver)" fontFamily="Oswald, sans-serif" fontSize="11" letterSpacing="1.4">
              {regionLabel.toUpperCase()}
            </text>
          </g>
        </g>
      )}

      {/* Rutas desde Bogotá */}
      {routes.map(({ city, d }, i) => {
        const on = active === city.name || (active === null && featured === city.name);
        return (
          <g key={`r-${city.name}`} className={`map-route-wrap ${isDimmed(city.name) ? 'map-dimmed' : ''}`}>
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="var(--c-blue)"
              strokeWidth={on ? 3 : 1.6}
              strokeOpacity={on ? 1 : 0.75}
              strokeLinecap="round"
              className="map-route map-glow"
              style={{ '--i': i } as CSSProperties}
            />
            {flowing && (
              <circle r={on ? 3.6 : 2.6} fill="var(--c-white)">
                <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}

      {/* Ciudades */}
      {cities
        .filter((c) => c.kind !== 'region')
        .map((c, i) => {
          const [x, y] = CITY_POINTS[c.name];
          const label = LABELS[c.name];
          const base = c.kind === 'base';
          const on = active === c.name;
          return (
            <g
              key={c.name}
              className={`map-city ${isDimmed(c.name) ? 'map-dimmed' : ''}`}
              onMouseEnter={() => onHover(c.name)}
              onMouseLeave={() => onHover(null)}
              style={{ cursor: 'default' }}
            >
              {base && <circle cx={x} cy={y} r="9" fill="var(--c-blue)" className="map-pulse" style={{ '--i': i } as CSSProperties} />}
              <g className="map-pin" style={{ '--i': i } as CSSProperties}>
                {base ? (
                  <>
                    <circle cx={x} cy={y} r={on ? 17 : 14} fill="var(--c-blue)" fillOpacity="0.22" className="map-glow" />
                    <circle cx={x} cy={y} r={on ? 10.5 : 8.5} fill="var(--c-blue)" stroke="var(--c-white)" strokeWidth="2.5" />
                    <circle cx={x} cy={y} r="3.2" fill="var(--c-white)" />
                  </>
                ) : (
                  <circle cx={x} cy={y} r={on ? 6.5 : 5} fill="var(--c-dark)" stroke="var(--c-white)" strokeWidth="2.2" />
                )}
              </g>
              <text
                x={x + label.dx}
                y={y + label.dy}
                textAnchor={label.anchor}
                fill={base || on ? 'var(--c-white)' : 'var(--c-silver)'}
                fontFamily="Oswald, sans-serif"
                fontSize={base ? 14 : 12}
                fontWeight={base || on ? 700 : 500}
                letterSpacing={base ? 0.6 : 0.2}
                className="map-label"
                style={{ '--i': i } as CSSProperties}
              >
                {base ? c.name.toUpperCase() : c.name}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
