<script>
  /** @type {{children?: import('svelte').Snippet}} */
  let { children } = $props();
</script>

<div
  class="inline-flex cursor-default items-center justify-center rounded-full border border-neutral-300 bg-[linear-gradient(110deg,#f5f5f5,45%,#d4d4d4,55%,#f5f5f5)] bg-[length:200%_100%] px-2 py-0.5 text-[10px] font-medium text-neutral-700 transition-colors dark:border-neutral-800 dark:bg-[linear-gradient(110deg,#000,45%,#171717,55%,#000)] dark:text-neutral-200"
>
  {@render children?.()}
</div>
