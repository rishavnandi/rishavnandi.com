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
      // Use Node.js runtime for compatibility with @resvg/resvg-js
      runtime: 'nodejs20.x',
      // Split into regions for lower latency
      regions: ['iad1'], // US East - adjust based on your audience
      // Enable split to optimize function cold starts
      split: true
    }),
    alias: {
      '@': './src/*'
    },
    prerender: {
      handleMissingId: 'warn',
      handleHttpError: 'warn',
      // Crawl all links for prerendering
      crawl: true
    },
    // Inline styles for faster first paint
    inlineStyleThreshold: 5000
  }
};

export default config;
