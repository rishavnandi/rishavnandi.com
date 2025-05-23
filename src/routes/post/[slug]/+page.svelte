<script>
  import { cn, formatDate } from '@/utils';
  import {
    ArrowUpRight,
    CalendarIcon,
    TagIcon,
    TriangleAlertIcon,
    Clock4Icon
  } from 'lucide-svelte';

  import Badge from '@/ui/badge/badge.svelte';
  import { routeAnimation } from '@/ui/shared';
  import { buttonVariants } from '@/ui/button';

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.meta.title} - Rishav Nandi</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${data.meta.title} - Rishav Nandi`} />
  <meta property="og:description" content={data.meta.description} />
  <meta name="twitter:image" content={`https://rishavnandi.com/api/og/${data.slug}`} />
  <meta name="og:image" content={`https://rishavnandi.com/api/og/${data.slug}`} />
</svelte:head>

<main class={cn('flex flex-col space-y-5', routeAnimation)}>
  <div class="mt-7 flex flex-col space-y-2">
    <h2 class="text-3xl font-medium tracking-tighter md:text-4xl">
      {data.meta.title}
    </h2>
    <p class="text-neutral-800 dark:text-neutral-400">{data.meta.description}</p>
  </div>
  <div
    class="flex flex-col space-y-2 border-b border-neutral-300 py-3 dark:border-neutral-800 md:py-5"
  >
    <div
      class="flex flex-col space-x-0 space-y-4 text-sm md:flex-row md:justify-between md:space-x-2 md:space-y-0"
    >
      <div class="flex items-center space-x-[6px]">
        <Badge>
          <TagIcon size={12} />
          <span>{data.meta.category}</span>
        </Badge>
        <Badge>
          <CalendarIcon size={12} />
          <time datetime={data.meta.date} title="Published">
            {formatDate(data.meta.date)}
          </time>
        </Badge>
        {#if data.meta.lastUpdated}
          <Badge>
            <Clock4Icon size={12} />
            <time datetime={data.meta.lastUpdated} title="Last updated">
              {formatDate(data.meta.lastUpdated)}
            </time>
          </Badge>
        {/if}
      </div>
      <a
        href={`https://github.com/rishavnandi/rishavnandi.com/blob/main/src/posts/${data.slug}.md`}
        class={buttonVariants({
          variant: 'outline',
          size: 'sm',
          className:
            'flex items-center space-x-1 bg-transparent shadow-none hover:bg-neutral-200/60'
        })}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Edit on GitHub</span>
        <ArrowUpRight size="12" class="text-neutral-500 dark:text-neutral-400" />
      </a>
    </div>
    {#if data.meta.writing}
      <div
        class="flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-200/40 p-2 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300"
      >
        <TriangleAlertIcon size={16} />
        <p class="text-pretty">
          This post is a work in progress. It may be incomplete, contain errors, or be subject to
          breaking changes.
        </p>
      </div>
    {/if}
  </div>

  <article
    class={cn(
      'pb-5',
      'prose prose-neutral prose-quoteless w-full max-w-full text-pretty dark:prose-invert',
      'prose-headings:font-medium prose-h2:tracking-tight',
      'prose-a:decoration-neutral-400 prose-a:decoration-dotted prose-a:decoration-[1.5px] prose-a:underline-offset-[6px] hover:prose-a:opacity-80 dark:prose-a:decoration-neutral-400',
      'prose-pre:my-3',
      'prose-ol:mb-3 prose-ul:mb-3',
      'prose-inline-code:rounded prose-inline-code:border prose-inline-code:border-neutral-300 prose-inline-code:bg-neutral-200/50 prose-inline-code:p-[2px] prose-inline-code:font-mono prose-inline-code:dark:border-neutral-800 prose-inline-code:dark:bg-neutral-800/50',
      'prose-pre:relative prose-pre:rounded prose-pre:border prose-pre:border-neutral-300 prose-pre:dark:border-neutral-800'
    )}
  >
    <data.content />
  </article>
</main>
