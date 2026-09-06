import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

// GitHub data must refresh independently of website deployments.
export const prerender = false;

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
  const repos: GithubRepo[] = [];

  for (let page = 1; ; page += 1) {
    const githubUrl = new URL('https://api.github.com/users/rishavnandi/repos');
    githubUrl.searchParams.set('type', 'owner');
    githubUrl.searchParams.set('sort', 'updated');
    githubUrl.searchParams.set('direction', 'desc');
    githubUrl.searchParams.set('per_page', '100');
    githubUrl.searchParams.set('page', page.toString());

    const res = await fetch(githubUrl, {
      signal: AbortSignal.timeout(10000),
      headers: {
        Accept: 'application/vnd.github+json'
      }
    }).catch(() => {
      error(503, 'GitHub repositories are temporarily unavailable. Please try again shortly.');
    });

    if (!res.ok) {
      error(503, 'GitHub repositories are temporarily unavailable. Please try again shortly.');
    }

    const data: GithubRepo[] = await res.json();
    repos.push(...data);

    if (data.length < 100) break;
  }

  const projects: GithubProject[] = repos.map((repo) => ({
    name: repo.name,
    description: repo.description ?? '',
    topics: repo.topics ?? [],
    html_url: repo.html_url,
    icon: repo.language,
    stargazers_count: repo.stargazers_count
  }));

  setHeaders({
    'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=60'
  });

  return { repos: projects.sort((a, b) => b.stargazers_count - a.stargazers_count) };
};
