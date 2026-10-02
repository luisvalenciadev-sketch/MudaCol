import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      // Aviso informativo de tiempos de plugins (Tailwind vía PostCSS); no afecta el resultado
      checks: { pluginTimings: false },
    },
  },
  // `npm start` sirve dist/ para hostings tipo Web Service (Render, Railway…):
  // escucha en 0.0.0.0 y en el puerto que asigna la plataforma ($PORT).
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
    // Dominios permitidos además de localhost. Agrega aquí el dominio propio cuando exista.
    allowedHosts: ['.onrender.com'],
  },
});
