import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

interface GithubRepo {
  name: string;
  description: string | null;
  topics?: string[];
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

interface GithubProject {
  name: string;
  description: string;
  topics: string[];
  html_url: string;
  icon: string | null;
  stargazers_count: number;
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=60'
  });

  const repos: GithubRepo[] = [];

  for (let page = 1; ; page += 1) {
    const githubUrl = new URL('https://api.github.com/users/rishavnandi/repos');
    githubUrl.searchParams.set('type', 'owner');
    githubUrl.searchParams.set('sort', 'updated');
    githubUrl.searchParams.set('direction', 'desc');
    githubUrl.searchParams.set('per_page', '100');
    githubUrl.searchParams.set('page', page.toString());

    const res = await fetch(githubUrl, {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    });

    if (!res.ok) {
      throw error(res.status, 'Could not fetch GitHub repositories.');
    }

    const data: GithubRepo[] = await res.json();
    repos.push(...data);

    if (data.length < 100) break;
  }

  const projects: GithubProject[] = repos.map((repo) => ({
    name: repo.name,
    description: repo.description ?? '',
    topics: (repo.topics ?? []).slice(0, 5),
    html_url: repo.html_url,
    icon: repo.language,
    stargazers_count: repo.stargazers_count
  }));

  return { repos: projects };
};
