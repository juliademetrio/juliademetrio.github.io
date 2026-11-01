import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';

const precreateDirsPlugin = () => ({
  name: 'precreate-dirs-plugin',
  buildStart() {
    fs.mkdirSync('dist/pages/enem/temas-provaveis', { recursive: true });
  },
});

export default defineConfig({
  site: process.env.SITE_URL || 'https://juliademetrio.github.io',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    assets: '_astro',
  },
  vite: {
    plugins: [precreateDirsPlugin()],
  },
});
