<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { cn } from '@/utils';

  interface Props extends HTMLInputAttributes {
    class?: string;
    value?: string;
    oninput?: (e: Event) => void;
  }

  let { class: className = '', value = $bindable(''), oninput, ...rest }: Props = $props();
</script>

<input
  class={cn(
    'flex h-9 w-full rounded-md border border-neutral-300 bg-transparent px-4 py-1 text-sm shadow-sm transition-colors duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:focus-visible:ring-neutral-700',
    className
  )}
  bind:value
  {oninput}
  {...rest}
/>
