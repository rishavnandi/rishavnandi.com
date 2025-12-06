<script lang="ts">
  // Styles:
  import '@/styles/globals.css';

  // Light/Dark mode:
  import { ModeWatcher } from 'mode-watcher';

  // Layout:
  import Header from '@/components/header.svelte';
  import { onMount } from 'svelte';

  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  // Current year (computed once at build time for prerendered pages)
  const currentYear = new Date().getFullYear();

  // Lazy load speed insights after page is interactive
  onMount(() => {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      // Use requestIdleCallback with fallback to setTimeout
      const scheduleTask = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));
      scheduleTask(() => {
        import('@vercel/speed-insights/sveltekit').then(({ injectSpeedInsights }) => {
          injectSpeedInsights();
        });
      });
    }
  });
</script>

<ModeWatcher />

<main class="relative flex min-h-screen flex-col py-4 md:py-6">
  <Header />
  <div class="container max-w-4xl flex-1">
    {@render children?.()}
  </div>
  <footer
    class="container mt-10 flex max-w-4xl flex-col items-center justify-center space-y-1 md:flex-row md:justify-between md:space-y-0"
  >
    <p class="font-gambarino">✨ Cosplaying as a sysadmin</p>
    <div class="md:text-md flex items-center space-x-1 text-sm">
      <h2>Rishav Nandi</h2>
      <span class="text-gray-500 dark:text-gray-400">-</span>
      <p>{currentYear}</p>
    </div>
  </footer>
</main>
