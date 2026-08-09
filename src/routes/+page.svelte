<script lang="ts">
  // Sections:
  import About from '@/components/about.svelte';
  import Experience from '@/components/experience.svelte';
  import Projects from '@/components/featuredProjects.svelte';
  import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from '@/lib/seo';
  import Posts from '@/components/posts.svelte';
  import type { Post } from '@/types/post.type';

  interface Props {
    data: {
      posts: Post[];
    };
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>{SITE_NAME} | Gen AI Platform Engineer &amp; DevOps</title>
  <link rel="canonical" href={`${SITE_URL}/`} />
  <meta name="description" content={DEFAULT_DESCRIPTION} />
  <meta property="og:type" content="profile" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={`${SITE_NAME} | Gen AI Platform Engineer & DevOps`} />
  <meta property="og:description" content={DEFAULT_DESCRIPTION} />
  <meta property="og:url" content={`${SITE_URL}/`} />
  <meta property="og:image" content={SOCIAL_IMAGE} />
  <meta property="og:image:alt" content="Rishav Nandi portfolio" />
  <meta name="twitter:title" content={`${SITE_NAME} | Gen AI Platform Engineer & DevOps`} />
  <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
  <meta name="twitter:image" content={SOCIAL_IMAGE} />
  <meta name="twitter:image:alt" content="Rishav Nandi portfolio" />
</svelte:head>

<div class="grid items-center gap-14 py-4 md:py-4">
  <About />
  <Projects />
  <Experience />
  <Posts postData={data.posts} limit={3} showViewAll={true} />
</div>
