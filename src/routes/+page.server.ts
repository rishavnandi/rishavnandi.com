import { getPosts } from '@/server';

// The homepage is static; the shared theme script works without hydration.
export const csr = false;

export async function load() {
  const posts = await getPosts();
  return { posts };
}
