import type { PageServerLoad } from './$types';
import { getPosts } from '@/server';

export const load: PageServerLoad = async ({ setHeaders }) => {
    setHeaders({
        'Cache-Control': 'max-age=0, s-maxage=120'
    });

    const posts = await getPosts();
    return { posts };
};