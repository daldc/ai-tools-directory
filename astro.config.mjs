import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ai-tools-directory.vercel.app',
  output: 'static',
  integrations: [sitemap()],
});
