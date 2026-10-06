import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Genera robots.txt y sitemap.xml en cada build, y la etiqueta canónica.
 * El sitemap y la canónica necesitan la URL pública (VITE_SITE_URL); sin ella solo se genera robots.txt.
 */
function seoFiles(siteUrl: string): Plugin {
  const site = siteUrl.replace(/\/+$/, '');
  return {
    name: 'mudacol-seo-files',
    apply: 'build',
    // Canónica: evita contenido duplicado entre mudacol.onrender.com y el dominio final
    transformIndexHtml() {
      return site ? [{ tag: 'link', attrs: { rel: 'canonical', href: `${site}/` }, injectTo: 'head' }] : [];
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', site && `Sitemap: ${site}/sitemap.xml`].filter(Boolean).join('\n') + '\n';
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      if (!site) return;
      const today = new Date().toISOString().slice(0, 10);
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [react(), seoFiles(env.VITE_SITE_URL ?? '')],
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
  };
});
