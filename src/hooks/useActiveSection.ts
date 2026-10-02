import { useEffect, useState } from 'react';

/**
 * Devuelve el id del ítem de menú activo. Cada sección declara a qué ítem
 * pertenece con data-nav="…" (p. ej. "Qué incluye" y "Precio" marcan SERVICIOS).
 */
export function useActiveSection(defaultId: string) {
  const [active, setActive] = useState(defaultId);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'));
      const probe = window.innerHeight * 0.35;
      let current = defaultId;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= probe) current = s.dataset.nav ?? current;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length) current = sections[sections.length - 1].dataset.nav ?? current;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [defaultId]);

  return active;
}
