import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['@vercel/speed-insights/sveltekit', 'mode-watcher', 'clsx', 'tailwind-merge']
  },
  build: {
    minify: 'esbuild',
    cssMinify: true
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
