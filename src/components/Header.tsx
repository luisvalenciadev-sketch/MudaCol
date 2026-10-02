import { useEffect, useRef, useState } from 'react';
import { contact, ctaLabels, nav } from '../content';
import { useActiveSection } from '../hooks/useActiveSection';
import { Icon } from './ui/Icon';
import { Logo } from './ui/Logo';
import { WhatsAppIcon } from './ui/BrandIcons';

export function Header() {
  const active = useActiveSection('inicio');
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Cerrar el menú móvil con Escape y al pasar a escritorio
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 1280px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  // Barra de progreso de lectura y sombra al bajar
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty('--progress', String(max > 0 ? window.scrollY / max : 0));
      setScrolled(window.scrollY > 12);
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
  }, []);

  // Subrayado animado: crece al pasar el mouse y queda fijo en la sección activa
  const linkCls = (id: string) =>
    `relative whitespace-nowrap font-headline text-[15px] uppercase tracking-wider transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-blue-400 after:transition-transform after:duration-300 motion-reduce:after:transition-none ${
      active === id ? 'font-bold text-blue-400 after:scale-x-100' : 'text-slate-300 after:scale-x-0 hover:text-white hover:after:scale-x-100'
    }`;

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b bg-brand-dark/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'border-slate-800 shadow-lg shadow-black/40' : 'border-slate-800/80'
      }`}
    >
      <div
        ref={progressRef}
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-brand-blue-deep via-brand-blue to-blue-300"
      />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-20 max-w-page items-center justify-between gap-4 px-4 lg:px-8">
        <a href="#inicio" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <Logo className="h-10 w-auto sm:h-11" title="Mudanzas MudaCol – Inicio" />
        </a>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={linkCls(item.id)} aria-current={active === item.id ? 'location' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#cotizar"
            aria-current={active === 'cotizar' ? 'location' : undefined}
            className={`btn-primary hidden px-5 py-2.5 text-[15px] shadow-sm sm:inline-flex ${
              active === 'cotizar' ? 'ring-2 ring-blue-300 ring-offset-2 ring-offset-brand-dark' : ''
            }`}
          >
            {ctaLabels.quote}
          </a>
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp gap-1.5 px-3.5 py-2.5 text-[14px] shadow-none"
            aria-label={`Escríbenos por WhatsApp al ${contact.whatsappDisplay}`}
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            <span className="hidden md:inline">{contact.whatsappDisplay}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:text-white xl:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} className="text-[28px]" />
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        aria-label="Menú móvil"
        hidden={!open}
        className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-slate-800 bg-brand-dark px-6 py-4 xl:hidden"
      >
        <ul className="flex flex-col gap-1">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'location' : undefined}
                className={`block py-2 font-headline text-base uppercase tracking-wider ${
                  active === item.id ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#cotizar" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full py-3 text-base">
          {ctaLabels.quote}
        </a>
      </nav>
    </header>
  );
}
