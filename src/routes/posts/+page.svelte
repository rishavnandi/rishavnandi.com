<script lang="ts">
  import Badge from '@/ui/badge/badge.svelte';
  import type { PageData } from './$types';

  import Input from '@/ui/input/input.svelte';
  import { SearchIcon, CalendarIcon, TagIcon, ChevronRightIcon } from 'lucide-svelte';
  import { absoluteUrl, SITE_NAME, SOCIAL_IMAGE } from '@/lib/seo';
  import { formatDate } from '@/utils';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let posts = $derived(data.posts);
  let searchTerm = $state('');
  let term = $derived(searchTerm.trim().toLowerCase());

  let filteredPosts = $derived(
    term
      ? posts.filter((post) => {
          return (
            post.title.toLowerCase().includes(term) ||
            post.description.toLowerCase().includes(term) ||
            // Search in tags if they exist
            (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(term)))
          );
        })
      : posts
  );
</script>

<svelte:head>
  <title>Posts | {SITE_NAME}</title>
  <link rel="canonical" href={absoluteUrl('/posts')} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta
    name="description"
    content="Technical writing by Rishav Nandi about AI platforms, DevOps, automation, and self-hosted systems."
  />
  <meta property="og:title" content={`Posts | ${SITE_NAME}`} />
  <meta
    property="og:description"
    content="Technical writing by Rishav Nandi about AI platforms, DevOps, automation, and self-hosted systems."
  />
  <meta property="og:url" content={absoluteUrl('/posts')} />
  <meta property="og:image" content={SOCIAL_IMAGE} />
  <meta property="og:image:alt" content="Rishav Nandi technical writing" />
  <meta name="twitter:title" content={`Posts | ${SITE_NAME}`} />
  <meta
    name="twitter:description"
    content="Technical writing by Rishav Nandi about AI platforms, DevOps, automation, and self-hosted systems."
  />
  <meta name="twitter:image" content={SOCIAL_IMAGE} />
  <meta name="twitter:image:alt" content="Rishav Nandi technical writing" />
</svelte:head>

<main>
  <div class="relative mb-5">
    <SearchIcon
      class="absolute left-3 top-1/2 -translate-y-1/2 transform text-neutral-500 dark:text-neutral-400"
      size={18}
      strokeWidth={1.5}
    />
    <Input
      type="search"
      autocomplete="off"
      aria-label="Search posts"
      class="h-10 pl-10 shadow-sm"
      placeholder="Search Posts"
      bind:value={searchTerm}
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
    {#each filteredPosts as post (post.slug)}
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
    {:else}
      <p role="status" class="text-sm text-neutral-500 dark:text-neutral-400">
        No posts match your search.
      </p>
    {/each}
  </div>
</main>
