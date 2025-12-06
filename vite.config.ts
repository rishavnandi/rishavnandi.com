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
    rollupOptions: {
      output: {
        // Optimize chunking for better caching
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Group lucide icons together
            if (id.includes('lucide-svelte')) return 'icons';
            // Group shiki (syntax highlighting) separately - it's large
            if (id.includes('shiki')) return 'shiki';
            // Other vendor code
            return 'vendor';
          }
        }
      }
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
