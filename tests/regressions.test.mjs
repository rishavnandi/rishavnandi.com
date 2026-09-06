import { expect, test } from 'bun:test';
import { load, prerender } from '../src/routes/projects/+page.server';
import { formatDate } from '../src/utils';

const repo = (name) => ({
  name,
  description: null,
  topics: ['one', 'two', 'three', 'four', 'five', 'searchable-sixth-topic'],
  html_url: `https://github.com/rishavnandi/${name}`,
  language: null,
  stargazers_count: 0
});

test('projects stay dynamic, paginate, preserve searchable topics and sort once', async () => {
  expect(prerender).toBe(false);
  const urls = [];
  let headers;
  const result = await load({
    fetch: async (url) => {
      urls.push(url);
      return Response.json(
        url.searchParams.get('page') === '1'
          ? Array.from({ length: 100 }, (_, i) => repo(`repo-${i}`))
          : [{ ...repo('new-repo'), stargazers_count: 10 }]
      );
    },
    setHeaders: (value) => {
      headers = value;
    }
  });
  expect(urls).toHaveLength(2);
  expect(urls[1].searchParams.get('page')).toBe('2');
  expect(result.repos).toHaveLength(101);
  expect(result.repos[0].name).toBe('new-repo');
  expect(result.repos[0].topics).toContain('searchable-sixth-topic');
  expect(result.repos[0].description).toBe('');
  expect(headers['Cache-Control']).toContain('s-maxage=300');
});

test('a new load sees new repositories without a rebuild', async () => {
  let repos = [repo('existing')];
  const event = { fetch: async () => Response.json(repos), setHeaders: () => {} };
  expect((await load(event)).repos).toHaveLength(1);
  repos = [...repos, repo('just-created')];
  expect((await load(event)).repos.map((item) => item.name)).toContain('just-created');
});

test('GitHub HTTP and network failures are retryable and never cached as successful data', async () => {
  for (const fetch of [
    async () => new Response(null, { status: 403 }),
    async () => {
      throw new TypeError('network unavailable');
    }
  ]) {
    let cached = false;
    await expect(
      load({
        fetch,
        setHeaders: () => {
          cached = true;
        }
      })
    ).rejects.toMatchObject({ status: 503 });
    expect(cached).toBe(false);
  }
});

test('post dates accept ISO timestamps and stay consistent across time zones', () => {
  expect(formatDate('2023-01-03')).toBe('Jan 3, 2023');
  expect(formatDate('2023-01-03T00:00:00Z')).toBe('Jan 3, 2023');
});
