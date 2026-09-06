import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['clsx', 'tailwind-merge']
  },
  build: {
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    target: 'esnext',
    modulePreload: {
      polyfill: false // Modern browsers don't need the polyfill
    },
    // Inline small assets
    assetsInlineLimit: 4096
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false
  }
});
