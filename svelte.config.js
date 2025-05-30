import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Markdown:
import { mdsvex } from 'mdsvex';
import { mdsvexOptions } from './mdsvex.options.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter({
      runtime: 'nodejs18.x',
      regions: ['auto']
    }),
    alias: {
      '@': './src/*'
    },
    prerender: {
      handleMissingId: 'warn',
      handleHttpError: 'warn'
    }
  }
};

export default config;
