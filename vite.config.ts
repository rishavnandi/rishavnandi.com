import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte'],
          ui: ['bits-ui', 'lucide-svelte']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@vercel/speed-insights/sveltekit', 'mode-watcher']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
