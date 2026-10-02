// Mapa estilizado de Colombia (proyección simple lon/lat → x/y). No es cartografía exacta.
type Point = { name: string; x: number; y: number; anchor: 'start' | 'end'; dx: number; dy: number };

const OUTLINE =
  'M234 6 L219 22 L186 36 L159 39 L135 50 L117 67 L108 90 L87 112 L63 112 L48 151 L60 171 L63 213 L66 241 L51 280 L27 302 L18 316 L63 330 L105 344 L129 356 L165 378 L195 409 L225 420 L267 426 L282 454 L286 470 L303 386 L297 336 L285 322 L309 325 L351 302 L351 241 L360 179 L303 182 L282 157 L228 157 L213 129 L201 95 L195 73 L207 50 L225 39 L246 22 Z';

const BASES: Point[] = [
  { name: 'Cartagena', x: 120, y: 62, anchor: 'end', dx: -14, dy: 4 },
  { name: 'Medellín', x: 118, y: 178, anchor: 'end', dx: -14, dy: 4 },
  { name: 'Bogotá', x: 163, y: 221, anchor: 'end', dx: -14, dy: 0 },
  { name: 'Cali', x: 89, y: 256, anchor: 'end', dx: -14, dy: 4 },
];

const DESTINATIONS: Point[] = [
  { name: 'Barranquilla', x: 141, y: 46, anchor: 'start', dx: 10, dy: -2 },
  { name: 'Bucaramanga', x: 191, y: 153, anchor: 'start', dx: 10, dy: 4 },
  { name: 'Villavicencio', x: 176, y: 237, anchor: 'start', dx: 10, dy: 8 },
];

export function CoverageMap({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 380 480" className="mx-auto h-auto w-full max-w-[320px]" role="img" aria-labelledby="mapa-titulo mapa-desc">
      <title id="mapa-titulo">{title}</title>
      <desc id="mapa-desc">
        Mapa estilizado de Colombia. Ciudades base: Bogotá, Medellín, Cali y Cartagena. Rutas y destinos: Barranquilla,
        Bucaramanga, Villavicencio y la Costa Atlántica.
      </desc>

      {/* Territorio */}
      <path d={OUTLINE} fill="var(--c-blue-deep)" fillOpacity="0.28" stroke="var(--c-blue)" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Costa Atlántica: franja resaltada */}
      <path
        d="M246 22 L225 39 L207 50 L195 73 L159 76 L120 92 L96 108 L108 90 L117 67 L135 50 L159 39 L186 36 L219 22 Z"
        fill="var(--c-blue)"
        fillOpacity="0.22"
        stroke="var(--c-blue)"
        strokeDasharray="4 3"
        strokeWidth="1"
      />
      <text x="232" y="74" fill="var(--c-silver)" fontFamily="Oswald, sans-serif" fontSize="11" letterSpacing="1.2">
        COSTA ATLÁNTICA
      </text>

      {/* Conexiones sugeridas desde Bogotá (decorativas) */}
      {[...BASES, ...DESTINATIONS]
        .filter((p) => p.name !== 'Bogotá')
        .map((p) => (
          <line
            key={`l-${p.name}`}
            x1="163"
            y1="221"
            x2={p.x}
            y2={p.y}
            stroke="var(--c-blue)"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            strokeDasharray="3 4"
          />
        ))}

      {DESTINATIONS.map((p) => (
        <g key={p.name}>
          <circle cx={p.x} cy={p.y} r="5" fill="var(--c-dark)" stroke="var(--c-white)" strokeWidth="2" />
          <text
            x={p.x + p.dx}
            y={p.y + p.dy}
            textAnchor={p.anchor}
            fill="var(--c-silver)"
            fontFamily="Oswald, sans-serif"
            fontSize="12"
          >
            {p.name}
          </text>
        </g>
      ))}

      {BASES.map((p) => (
        <g key={p.name}>
          <circle cx={p.x} cy={p.y} r="15" fill="var(--c-blue)" fillOpacity="0.2" />
          <circle cx={p.x} cy={p.y} r="9" fill="var(--c-blue)" stroke="var(--c-white)" strokeWidth="2.5" />
          <circle cx={p.x} cy={p.y} r="3.5" fill="var(--c-white)" />
          <text
            x={p.x + p.dx}
            y={p.y + p.dy}
            textAnchor={p.anchor}
            fill="var(--c-white)"
            fontFamily="Oswald, sans-serif"
            fontSize="14"
            fontWeight="700"
            letterSpacing="0.6"
          >
            {p.name.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}
