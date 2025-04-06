import type { PageServerLoad } from './$types';
import type { Post } from '@/types/post.type';

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch('/api/posts');
    const posts: Post[] = await response.json();

    return {
        posts,
        headers: {
            'Cache-Control': 'max-age=0, s-maxage=120'
        }
    };
};