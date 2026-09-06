import { getPosts } from '@/server';

export async function load() {
  const posts = await getPosts();
  return { posts };
}
