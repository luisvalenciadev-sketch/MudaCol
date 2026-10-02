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
});
