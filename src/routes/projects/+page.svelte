<script lang="ts">
  import Badge from '@/ui/badge/badge.svelte';
  import type { PageData } from './$types';

  import Input from '@/ui/input/input.svelte';
  import { ArrowUpRight, GitForkIcon, SearchIcon, StarIcon } from 'lucide-svelte';
  import { absoluteUrl, SITE_NAME, SOCIAL_IMAGE } from '@/lib/seo';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let repos = $derived(data.repos);
  let searchTerm = $state('');
  let normalizedSearch = $derived(searchTerm.trim().toLowerCase());
  let searchIndex = $derived(
    repos.map((repo) => [repo.name, repo.description, ...repo.topics].join(' ').toLowerCase())
  );

  let filteredRepos = $derived(
    repos.filter((_, index) => searchIndex[index].includes(normalizedSearch))
  );
</script>

<svelte:head>
  <title>Projects | {SITE_NAME}</title>
  <link rel="canonical" href={absoluteUrl('/projects')} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta
    name="description"
    content="Open-source AI, platform engineering, DevOps, and self-hosting projects by Rishav Nandi."
  />
  <meta property="og:title" content={`Projects | ${SITE_NAME}`} />
  <meta
    property="og:description"
    content="Open-source AI, platform engineering, DevOps, and self-hosting projects by Rishav Nandi."
  />
  <meta property="og:url" content={absoluteUrl('/projects')} />
  <meta property="og:image" content={SOCIAL_IMAGE} />
  <meta property="og:image:alt" content="Rishav Nandi projects" />
  <meta name="twitter:title" content={`Projects | ${SITE_NAME}`} />
  <meta
    name="twitter:description"
    content="Open-source AI, platform engineering, DevOps, and self-hosting projects by Rishav Nandi."
  />
  <meta name="twitter:image" content={SOCIAL_IMAGE} />
  <meta name="twitter:image:alt" content="Rishav Nandi projects" />
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
      aria-label="Search repositories"
      class="h-10 pl-10 shadow-sm"
      placeholder="Search Repositories"
      bind:value={searchTerm}
    />
  </div>
  <div
    class="mb-4 flex w-full items-center justify-between space-x-2 text-neutral-600 dark:text-neutral-400"
  >
    <div class="flex items-center space-x-2">
      <GitForkIcon size={14} strokeWidth={1.5} />
      <p class="font-mono text-xs">
        {repos.length}
        {repos.length > 1 ? 'repositories' : 'repository'}
      </p>
    </div>
    <a
      href="https://github.com/rishavnandi?tab=repositories"
      class="group flex items-center space-x-1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="font-mono text-xs"> View on GitHub </span>
      <ArrowUpRight
        size={14}
        strokeWidth={1.5}
        class="opacity-70 duration-200 group-hover:translate-x-[1.3px] group-hover:opacity-100"
      />
    </a>
  </div>
  <div class="flex flex-col space-y-3">
    {#each filteredRepos as item (item.html_url)}
      <div
        class="flex flex-col space-y-2 rounded-md border border-neutral-300 p-3 dark:border-neutral-800"
      >
        <div class="flex w-full items-center justify-between">
          <a
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center space-x-2 font-medium duration-100 hover:opacity-80"
          >
            <span>{item.name}</span>
            <ArrowUpRight
              size={12}
              strokeWidth={1.5}
              class="opacity-70 duration-200 group-hover:translate-x-[1.3px] group-hover:opacity-100"
            />
          </a>
          <span
            class="group flex cursor-default items-center space-x-2 text-neutral-600 dark:text-neutral-400"
          >
            <StarIcon
              size={14}
              strokeWidth={1.5}
              class="duration-200 group-hover:text-yellow-600"
            />
            <p class="font-mono text-xs">{item.stargazers_count}</p>
          </span>
        </div>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">{item.description}</p>
        <div class="flex items-center space-x-2 overflow-y-auto">
          {#each item.topics.slice(0, 5) as tag}
            <Badge>
              {tag}
            </Badge>
          {/each}
        </div>
      </div>
    {:else}
      <p role="status" class="text-sm text-neutral-500 dark:text-neutral-400">
        No repositories match your search.
      </p>
    {/each}
  </div>
</main>
