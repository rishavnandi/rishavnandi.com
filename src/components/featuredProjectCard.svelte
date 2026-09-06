<script lang="ts">
  import type { iProjects } from '@/types/featuredProjects.types';

  import { ArrowUpRight } from 'lucide-svelte';

  import Github from '@/icons/github.svelte';
  import Badge from '@/ui/badge/badge.svelte';
  import SpotlightBadge from '@/ui/badge/spotlight-badge.svelte';
  import { technologies } from '@/data/technologies';

  let { title, description, icon, url, githubUrl, tags, latest, updated }: iProjects = $props();
  const ProjectIcon = $derived(technologies[tags[0]]);
</script>

<div
  class="relative flex flex-col rounded-md border border-neutral-300 px-3 py-4 shadow-sm transition-colors focus-within:border-neutral-400 hover:border-neutral-400 motion-reduce:transition-none dark:border-neutral-800 dark:focus-within:border-neutral-600 dark:hover:border-neutral-600"
>
  <div class="flex flex-col space-y-3">
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center space-x-[10px]">
        {#if icon}
          <img src={icon} alt="" width="24" height="24" class="h-6 w-6 shrink-0" decoding="async" />
        {:else if ProjectIcon}
          <ProjectIcon width={24} height={24} aria-hidden="true" />
        {/if}
        {#if url}
          <a
            href={url}
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-[6px] font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] hover:underline"
          >
            <span>{title}</span>
            <ArrowUpRight
              size={13}
              strokeWidth={2}
              class="opacity-50 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100"
            />
          </a>
        {:else}
          <p class="font-medium">{title}</p>
        {/if}
      </div>
      <div class="flex items-center gap-2">
        {#if latest || updated}
          <SpotlightBadge>
            {latest ? 'latest' : 'updated'}
          </SpotlightBadge>
        {/if}
        <a
          href={githubUrl}
          title={`View ${title} repository on GitHub`}
          target="_blank"
          rel="noopener"
          class="opacity-75 transition-opacity duration-100 hover:opacity-100"
        >
          <Github height={16} />
        </a>
      </div>
    </div>
    <p class="truncate text-sm dark:text-neutral-400">{description}</p>
    <div class="flex flex-wrap items-center gap-1">
      {#each tags as tag}
        {@const Icon = technologies[tag]}
        <Badge>
          {#if Icon}<Icon width={14} height={14} class="flex-shrink-0" />{/if}
          <span>{tag}</span>
        </Badge>
      {/each}
    </div>
  </div>
</div>
