<script module>
  import { img } from '.';
  // eslint-disable-next-line no-import-assign
  export { img };
</script>

<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

{@render children?.()}
