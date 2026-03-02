import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://geelong-stars.pages.dev',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/api/') && !page.includes('/uploads/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
