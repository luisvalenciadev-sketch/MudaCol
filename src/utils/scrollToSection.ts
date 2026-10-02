// Navegación interna entre secciones.
// El scroll suave nativo recorre toda la página en saltos largos (p. ej. del inicio al
// cotizador, ~8.000 px): es lento y no avisa cuándo termina. Aquí, si el destino está
// lejos, se salta casi hasta él y se anima solo el último tramo.

export const ARRIVE_EVENT = 'section-arrive';
export type ArriveDetail = { id: string };

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

let cancelCurrent: (() => void) | null = null;

/** Desplaza hasta la sección `id`, actualiza la URL y avisa al llegar (evento ARRIVE_EVENT). */
export function scrollToSection(id: string, { pushHash = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  cancelCurrent?.();

  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.max(0, Math.min(maxScroll, el.getBoundingClientRect().top + window.scrollY - margin));

  if (pushHash && window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);

  const arrive = () => {
    cancelCurrent = null;
    // Mueve el punto de partida del teclado a la sección (como hace el ancla nativa)
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    window.dispatchEvent(new CustomEvent<ArriveDetail>(ARRIVE_EVENT, { detail: { id } }));
  };

  if (reducedMotion()) {
    window.scrollTo({ top: target, behavior: 'instant' });
    arrive();
    return true;
  }

  // Saltos largos: aparecer cerca del destino y deslizar solo el último tramo
  const vh = window.innerHeight;
  const distance = target - window.scrollY;
  if (Math.abs(distance) > vh * 1.5) {
    window.scrollTo({ top: target - Math.sign(distance) * vh * 0.8, behavior: 'instant' });
  }

  const from = window.scrollY;
  const delta = target - from;
  const duration = Math.min(700, 300 + Math.abs(delta) * 0.35);
  const t0 = performance.now();
  let frame = 0;

  // Si la persona interviene (rueda, toque, teclado), se respeta y se cancela la animación
  const stop = () => {
    cancelAnimationFrame(frame);
    removeListeners();
    cancelCurrent = null;
  };
  const opts = { passive: true } as const;
  const removeListeners = () => {
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', stop);
  };
  window.addEventListener('wheel', stop, opts);
  window.addEventListener('touchstart', stop, opts);
  window.addEventListener('keydown', stop);
  cancelCurrent = stop;

  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    window.scrollTo({ top: from + delta * easeOutCubic(p), behavior: 'instant' });
    if (p < 1) {
      frame = requestAnimationFrame(step);
    } else {
      removeListeners();
      arrive();
    }
  };
  frame = requestAnimationFrame(step);
  return true;
}
