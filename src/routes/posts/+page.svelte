<script lang="ts">
  import Badge from '@/ui/badge/badge.svelte';
  import type { PageData } from './$types';

  import Input from '@/ui/input/input.svelte';
  import { SearchIcon, CalendarIcon, TagIcon, ChevronRightIcon } from 'lucide-svelte';
  import { routeAnimation } from '@/ui/shared';
  import { cn, formatDate } from '@/utils';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const posts = data.posts;
  let searchTerm = $state('');

  let filteredPosts = $derived(
    searchTerm
      ? posts.filter((post) => {
          const term = searchTerm.toLowerCase();
          return (
            post.title.toLowerCase().includes(term) ||
            post.description.toLowerCase().includes(term) ||
            // Search in tags if they exist
            (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(term)))
          );
        })
      : posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  const handleSearch = (e: Event) => {
    searchTerm = (e.target as HTMLInputElement).value.trim();
  };
</script>

<svelte:head>
  <title>Posts - Rishav Nandi</title>
  <meta property="og:title" content="Rishav Nandi" />
  <meta property="og:description" content="Cosplaying as a sysadmin" />
  <meta name="image" property="og:image" content="https://rishavnandi.com/images/readme_img.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>

<main class={routeAnimation}>
  <div class="relative mb-5">
    <SearchIcon
      class="absolute left-3 top-1/2 -translate-y-1/2 transform text-neutral-500 dark:text-neutral-400"
      size={18}
      strokeWidth={1.5}
    />
    <Input
      type="search"
      autocomplete="off"
      autofocus
      class="h-10 pl-10 shadow-sm"
      placeholder="Search Posts"
      on:input={handleSearch}
    />
  </div>
  <div
    class="mb-4 flex w-full items-center justify-between space-x-2 text-neutral-600 dark:text-neutral-400"
  >
    <div class="flex items-center space-x-2">
      <p class="font-mono text-xs">
        {posts.length}
        {posts.length > 1 ? 'posts' : 'post'}
      </p>
    </div>
  </div>
  <div class="flex flex-col space-y-3">
    {#each filteredPosts as post}
      <div
        class="flex flex-col space-y-2 rounded-md border border-neutral-300 p-3 dark:border-neutral-800"
      >
        <div class="mb-2 flex flex-col space-y-1">
          <a href={`/post/${post.slug}`} class="font-medium tracking-tight hover:underline">
            {post.title}
          </a>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">{post.description}</p>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex flex-wrap items-center gap-2">
            <Badge>
              <TagIcon size={12} />
              <span>{post.category}</span>
            </Badge>
            <Badge>
              <CalendarIcon size={12} />
              <time datetime={post.date}>
                {formatDate(post.date)}
              </time>
            </Badge>
            {#if post.tags && post.tags.length > 0}
              <div class="mt-1 flex flex-wrap items-center gap-1">
                {#each post.tags as tag}
                  <Badge class="px-1.5 py-0 text-xs">#{tag}</Badge>
                {/each}
              </div>
            {/if}
          </div>
          <a
            href={`/post/${post.slug}`}
            class="group flex items-center space-x-[4px] text-sm tracking-tight opacity-70 transition-opacity duration-100 hover:opacity-100"
          >
            <span>Read more</span>
            <ChevronRightIcon size={16} class="duration-150 group-hover:translate-x-[2px]" />
          </a>
        </div>
      </div>
    {/each}
  </div>
</main>
