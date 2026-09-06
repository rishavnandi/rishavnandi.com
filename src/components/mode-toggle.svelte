<script lang="ts">
  import Button from '@/ui/button/button.svelte';

  import { Sun, Moon } from 'lucide-svelte';

  interface Props {
    iconSize?: number;
    strokeWidth?: number;
  }

  let { iconSize = 20, strokeWidth = 1.8 }: Props = $props();
</script>

<Button
  data-theme-toggle
  title="Change theme"
  variant="ghost"
  size="icon"
  class="group opacity-80 transition-opacity duration-150 [@media(hover:hover)]:hover:opacity-100"
>
  <Sun size={iconSize} {strokeWidth} class="hidden dark:block" />
  <Moon
    size={iconSize}
    {strokeWidth}
    class="block dark:hidden"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
