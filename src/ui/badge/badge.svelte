<script lang="ts">
  import { cn } from '@/utils';

  interface Props {
    extraClasses?: string;
    children?: import('svelte').Snippet;
  }

  let { extraClasses = '', children }: Props = $props();
</script>

<span
  class={cn(
    'inline-flex cursor-default items-center space-x-2 rounded-md border border-neutral-300 bg-neutral-200/50 px-2 py-1 font-mono text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300',
    extraClasses
  )}
>
  {@render children?.()}
</span>
