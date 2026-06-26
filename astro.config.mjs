import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Public site URL. For MVP this is the GitHub Pages URL.
// When foolwuilin.com is connected, change this one line.
export default defineConfig({
  site: 'https://foolwuilin.github.io',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
