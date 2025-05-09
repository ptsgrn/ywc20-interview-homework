// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ptsgrn.github.io',
  base: 'ywc20-interview-homework',
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()],
  },
});