import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

interface iGithubResultAPI {
  name: string;
  description: string;
  topics: string[];
  html_url: string;
  stargazers_count: number;
  language: string;
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'max-age=0, s-maxage=120'
  });

  const githubUrl = 'https://api.github.com/users/rishavnandi/repos?type=owner&sort=stars&per_page=100';

  const res = await fetch(githubUrl);

  if (!res.ok) {
    throw error(res.status, '🚧 Could not fetch GitHub repos.');
  }

  const data = await res.json();

  const projects: iGithubResultAPI[] = data.map((repo: iGithubResultAPI) => ({
    name: repo.name,
    description: repo.description,
    topics: repo.topics.slice(0, 5),
    html_url: repo.html_url,
    icon: repo.language,
    stargazers_count: repo.stargazers_count
  }));

  return { repos: projects };
};
