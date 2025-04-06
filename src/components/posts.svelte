<script lang="ts">
  import type { Post } from '@/types/post.type';
  import Badge from '@/ui/badge/badge.svelte';
  import { cn, formatDate } from '@/utils';

  import { CalendarIcon, TagIcon, ChevronRightIcon, ArrowUpRight, ArrowRight } from 'lucide-svelte';

  interface Props {
    postData?: Post[];
    limit?: number;
    showViewAll?: boolean;
  }

  let { postData = [], limit, showViewAll = false }: Props = $props();

  // Limit posts if limit is provided
  const limitedPosts = $derived(limit ? postData.slice(0, limit) : postData);
</script>

<section
  class={cn(
    'flex flex-col space-y-4',
    'delay-300 duration-500 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards'
  )}
>
  <div class="flex w-full items-center justify-between">
    <h2 class="text-xl font-medium">Posts</h2>

    {#if showViewAll}
      <a
        href="/posts"
        class="group flex items-center space-x-2 text-sm font-medium text-neutral-500 duration-100 hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        <span>View all</span>
        <ArrowRight
          size={14}
          strokeWidth={2}
          class="opacity-70 duration-200 group-hover:translate-x-[2px] group-hover:opacity-100"
        />
      </a>
    {/if}
  </div>

  {#each limitedPosts as post}
    <div class="w-full rounded-md border border-neutral-300 p-3 dark:border-neutral-800">
      <div class="mb-3 flex flex-col space-y-1">
        <a
          href={`/post/${post.slug}`}
          class="text-md flex items-center space-x-2 font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] duration-150 hover:underline hover:opacity-80 md:text-lg"
        >
          <span>{post.title}</span>
          <ChevronRightIcon
            size={14}
            class="block flex-shrink-0 text-neutral-500 dark:text-neutral-400 md:hidden"
          />
        </a>
        <p class="text-pretty text-sm dark:text-neutral-400">
          {post.description}
        </p>
      </div>
      <div class="flex w-full items-center justify-between">
        <div class="flex items-center space-x-1">
          <Badge>
            <TagIcon size={12} />
            <span>{post.category}</span>
          </Badge>
          <Badge>
            <CalendarIcon size={12} />
            <time datetime={formatDate(post.date)}>
              {formatDate(post.date)}
            </time>
          </Badge>
        </div>
        <a
          href={`/post/${post.slug}`}
          class="group hidden items-center space-x-[4px] text-sm tracking-tight opacity-70 transition-opacity duration-100 hover:opacity-100 md:flex"
        >
          <span>Read more</span>
          <ChevronRightIcon size={16} class="duration-150 group-hover:translate-x-[2px]" />
        </a>
      </div>
    </div>
  {/each}
</section>
