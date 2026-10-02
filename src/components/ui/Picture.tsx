type PictureProps = {
  /** Ruta base sin sufijo, p. ej. /images/camion-furgon → /images/camion-furgon-640.webp */
  base: string;
  widths: readonly number[];
  sizes: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/** Imagen WebP responsive. Carga diferida salvo que sea prioritaria (hero). */
export function Picture({ base, widths, sizes, alt, width, height, className = '', priority = false }: PictureProps) {
  const srcSet = widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
  const fallback = `${base}-${widths[Math.min(1, widths.length - 1)]}.webp`;
  return (
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  );
}
