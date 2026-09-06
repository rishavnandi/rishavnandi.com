<script lang="ts">
  import Button from '@/ui/button/button.svelte';
  let {
    page,
    totalPages,
    onchange
  }: { page: number; totalPages: number; onchange: (page: number) => void } = $props();
</script>

{#if totalPages > 1}
  <nav aria-label="Pagination" class="mt-5 flex items-center justify-between gap-3">
    <Button variant="outline" size="sm" disabled={page === 1} onclick={() => onchange(page - 1)}
      >Previous</Button
    >
    <p aria-live="polite" class="text-sm text-neutral-600 dark:text-neutral-400">
      Page {page} of {totalPages}
    </p>
    <Button
      variant="outline"
      size="sm"
      disabled={page === totalPages}
      onclick={() => onchange(page + 1)}>Next</Button
    >
  </nav>
{/if}
