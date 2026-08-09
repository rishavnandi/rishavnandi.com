<script lang="ts">
  // Sections:
  import About from '@/components/about.svelte';
  import Experience from '@/components/experience.svelte';
  import Projects from '@/components/featuredProjects.svelte';
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
  <title>Rishav Nandi - AI Platform Engineer &amp; DevOps | rishavnandi.com</title>
  <meta property="og:title" content="Rishav Nandi - AI Platform Engineer &amp; DevOps" />
  <meta
    property="og:description"
    content="Portfolio of Rishav Nandi, an AI Platform Engineer and DevOps practitioner. Explore my projects, experience, and blog posts."
  />
  <meta name="image" property="og:image" content="https://rishavnandi.com/images/readme_img.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>

<div class="grid items-center gap-14 py-4 md:py-4">
  <About />
  <Projects />
  <Experience />
  <Posts postData={data.posts} limit={3} showViewAll={true} />
</div>
