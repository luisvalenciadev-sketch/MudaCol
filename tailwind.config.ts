import type { Config } from 'tailwindcss';

// Tokens extraídos del HTML de Stitch (design/stitch/screen-1.html) y de la paleta del brief.
// Los componentes usan solo estos nombres (o la paleta estándar de Tailwind que usa Stitch),
// nunca valores hex sueltos.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Paleta de marca (Stitch "primary"/"primary-dark" + brief)
          blue: '#1E88E5', // azul eléctrico: logo, acentos, bordes
          'blue-deep': '#0D47A1', // azul intenso: degradados
          silver: '#C9D1DC', // plateado: borde del escudo, líneas
          // Fondos oscuros (Stitch "surface-dark", "surface-card-dark" y degradados del hero / precio)
          dark: '#0A0E17',
          'dark-mid': '#0D182E',
          card: '#121826',
          navy: '#0A162D',
          'navy-1': '#0D2554',
          'navy-2': '#0E1E3D',
          'navy-3': '#0A1224',
          // Fondo gris claro de secciones (Stitch usa #F8FAFC)
          light: '#F8FAFC',
          // Botones de acción: Stitch usa blue-600/700 (contraste AA con texto blanco)
          action: '#2563EB',
          'action-hover': '#1D4ED8',
          // WhatsApp: verde de marca para íconos y detalles sobre fondo oscuro
          green: '#25D366',
          // Botones de WhatsApp con texto blanco: verde más oscuro para contraste AA (4,7:1).
          // El blanco sobre #25D366 solo da 1,98:1.
          whatsapp: '#13853F',
          'whatsapp-hover': '#0E6E34',
        },
      },
      fontFamily: {
        headline: ['Oswald', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1280px',
        form: '960px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
