// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Páginas estáticas; sólo los endpoints con `prerender = false`
  // (p. ej. /api/contact) corren como serverless functions en Vercel.
  adapter: vercel(),
  env: {
    schema: {
      // Cargar el valor real en Vercel → Project Settings → Environment Variables.
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
