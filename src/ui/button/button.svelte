<script lang="ts">
  import { Button as ButtonPrimitive } from 'bits-ui';
  import { type Props, buttonVariants } from './index.js';
  import { cn } from '@/utils';

  type $$Props = Props;

  interface Props_1 {
    class?: string;
    variant?: $$Props['variant'];
    size?: $$Props['size'];
    builders?: $$Props['builders'];
    children?: import('svelte').Snippet;
    onclick?: (e: MouseEvent) => void;
    [key: string]: unknown;
  }

  let {
    class: className = '',
    variant = 'default',
    size = 'default',
    builders = [],
    children,
    ...rest
  }: Props_1 = $props();
  
</script>

<ButtonPrimitive.Root
  {builders}
  type="button"
  class={cn(buttonVariants({ variant, size }), className)}
  {...rest}
>
  {@render children?.()}
</ButtonPrimitive.Root>
