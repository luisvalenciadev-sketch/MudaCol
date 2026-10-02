import { useEffect } from 'react';
import { scrollToSection } from '../utils/scrollToSection';

/** Intercepta los clics en enlaces internos (#seccion) y usa scrollToSection. */
export function useAnchorNavigation() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Respeta clic central y teclas modificadoras (abrir en pestaña nueva, etc.)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const id = link?.getAttribute('href')?.slice(1);
      if (!id) return; // href="#" (enlaces pendientes) mantiene el comportamiento normal
      if (scrollToSection(id)) e.preventDefault();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
