---
title: Remix v2 Snippets
description: Code snippets for Remix.
date: '2024-5-28'
lastUpdated: '2024-10-07'
category: 'Snippets'
writing: false
published: true
---

## Custom Alias

When you create a new project with Remix, the default template installs the [`vite-tsconfig-paths`](https://www.npmjs.com/package/vite-tsconfig-paths) dependency so there is no need to configure it manually. If you want to configure it without the dependency, follow these steps:

1. Install the types of Node.js:

```bash
pnpm i @types/node -E -D
```

2. In your `vite.config.ts` file, add the following:

```ts
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app') // 👈 /app or /src, your app directory.
    }
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      }
    })
  ]
});
```

3. In your `tsconfig.json` file, add the following:

```json
{
  "compilerOptions": {
    // 👀 your other config...
    "baseUrl": ".",
    "paths": {
      "@/": ["./app/*"] // 👈 /app or /src, your app directory.
    }
  }
}
```

> 💡 If you're using VSCode, I recommend restart the editor to apply the changes.

## Import any CSS styles

If you're using Remix with **Vite**, you can import styles like this:

```jsx
import type { LinksFunction } from "@remix-run/node";

import stylesheet from "@/styles/globals.css?url"; // 👈

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
```

and that the Vite compiler does not interpret `.css` files as paths:

```jsx
export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.css'] // 👈
    })
  ]
});
```

## Routes

All your routes should be inside the `app/routes` folder:

```bash
📂 app
  📂 routes
```

| 📂  | File              | Description                                                                                                                                      |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| ⚛️  | app.tsx           | Layout that wraps all the paths of /app. You need to add [`<Outlet />`](https://remix.run/docs/en/main/components/outlet) from @remix-run/react. |
| 🟦  | action.name.ts    | Route /action/name. Exports a server-side `action`.                                                                                              |
| ⚛️  | app.\_index.tsx   | /app (main page)                                                                                                                                 |
| ⚛️  | app.settings.tsx  | /app/settings                                                                                                                                    |
| ⚛️  | app.$username.tsx | /app/pheralb or /app/midudev. To obtain the _$username_: [loader#params](https://remix.run/docs/en/main/route/loader#params)                     |
| ⚛️  | root.tsx          | Layout that wraps the entire application.                                                                                                        |

## How to use Remix on Vercel

1. Install `@vercel/remix` package:

```bash
pnpm i @vercel/remix -E
```

2. Add Vercel Vite Preset to your `vite.config.ts`:

```ts
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

// Plugins:
import tsconfigPaths from 'vite-tsconfig-paths';
import { vercelPreset } from '@vercel/remix/vite'; // 👈

export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()], // 👈
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      }
    }),
    tsconfigPaths()
  ]
});
```

3. Replace all `@remix-run/node` imports with `@vercel/remix`. Example:

```tsx
import type { MetaFunction } from '@vercel/remix';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};
```

- 💡 Check [`@vercel/remix` documentation](https://vercel.com/docs/frameworks/remix).

## Install & configure Tailwind CSS with Prettier

1. Install Tailwind CSS, Prettier & Autoprefixer:

```bash
pnpm i tailwindcss prettier prettier-plugin-tailwindcss autoprefixer -E -D
```

2. Create a `global.css` or `styles.css` in the `app/` folder:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Import the styles in the `app/routes/root.tsx`:

```jsx
import type { LinksFunction } from "@remix-run/node";

import stylesheet from "@/styles/globals.css?url"; // or styles.css 👀

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
```

4. Create a `tailwind.config.ts` file:

```bash
npx tailwindcss init --ts
```

5. In the `tailwind.config.ts` file, add the following:

```ts
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'], // 👈
  ...
} satisfies Config
```

6. Create a `postcss.config.js` file:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

7. Create a `prettier.config.js` file:

```js
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  ...
};
```

## Dark mode

> 💡 Here we wil use `remix-themes` library, but you can create all utilities and providers manually. Check [remix/examples - dark mode](https://github.com/remix-run/examples/tree/main/dark-mode) repository.

1. Install [**remix-themes**](https://github.com/abereghici/remix-themes) and [**clsx**](https://github.com/lukeed/clsx#readme):

```bash
pnpm i remix-themes clsx -E
```

2. Enable `darkMode` option in the `tailwind.config.ts` file:

```ts
const config = {
  darkMode: ['class']
  //...
} satisfies Config;
```

3. Create a `session.server.tsx` file in /app folder with the following content:

```tsx
import { createCookieSessionStorage } from '@remix-run/node'; //
import { createThemeSessionResolver } from 'remix-themes';

// You can default to 'development' if process.env.NODE_ENV is not set:
const isProduction = process.env.NODE_ENV === 'production';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'website-theme', // 👈 Cookie name.
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secrets: ['s3cr3t'],
    ...(isProduction ? { domain: 'my-website.com', secure: true } : {}) // 👈 Website URL.
  }
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
```

4. In `app/routes` folder, create a `action.set-theme.ts` file with the following content:

```ts
import { createThemeAction } from 'remix-themes';
import { themeSessionResolver } from '@/sessions.server'; // 👈 Import your session.server.tsx.

export const action = createThemeAction(themeSessionResolver);
```

5. In `app/routes/root.tsx`...

- ☁️ Use the loader to get the theme from server-side:

```tsx
import type { LoaderFunctionArgs } from '@remix/node';
import { themeSessionResolver } from './sessions.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme()
  };
}
```

- 📦 Wrap the entire app using `ThemeProvider`:

```tsx
import { ThemeProvider } from 'remix-themes';
import { useLoaderData } from '@remix-run/react';

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

function App() {
    return (
        <html lang="en">
            <!-- ... -->
        </html>
    );
}
```

- ✨ In your `<App />` component, use the `useTheme` hook:

```tsx
import { useLoaderData } from '@remix-run/react';
import { PreventFlashOnWrongTheme, useTheme } from 'remix-themes';
import clsx from 'clsx';

function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

6. Create a simple `theme-toggle.tsx` component:

```tsx
import { Moon, Sun } from 'lucide-react'; // 🥹 Icons from lucide.dev
import { Theme, useTheme } from 'remix-themes';

export function ModeToggle() {
  const [theme, setTheme] = useTheme();
  return (
    <>
      <button onClick={() => setTheme(Theme.LIGHT)}>
        <Sun size={22} strokeWidth={1.4} />
        <span>Light Theme</span>
      </button>
      <button onClick={() => setTheme(Theme.DARK)}>
        <Moon size={22} strokeWidth={1.4} />
        <span>Dark Theme</span>
      </button>
    </>
  );
}
```

## Utility to check environment variables (updated)

A utility to check if the environment variables are set in the `.env` file. It's like a [`t3/env`](https://github.com/t3-oss/t3-env) library:

- Install [Zod](https://github.com/colinhacks/zod):

```bash
pnpm i zod -E
```

- Create a `env.server.ts` file:

```ts
import * as z from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MY_ENV_VARIABLE: z.string().min(1)
});

const environment = () => environmentSchema.parse(process.env);

export { environment };
```

- Usage example with `loader`:

```ts
export function loader() {
  return json({
    publicKeys: {
      MY_ENV_VARIABLE: environment().MY_ENV_VARIABLE
    }
  });
}
```

> 💡 Other method without Zod:

```ts
function getRequiredEnvVarFromObj(
  obj: Record<string, string | undefined>,
  key: string,
  devValue: string = `${key}-dev-value`
) {
  let value = devValue;
  const envVal = obj[key];
  if (envVal) {
    value = envVal;
  } else if (obj.NODE_ENV === 'production') {
    throw new Error(`${key} is a required env variable`);
  }
  return value;
}

export function getRequiredServerEnvVar(key: string, devValue?: string) {
  return getRequiredEnvVarFromObj(process.env, key, devValue);
}
```
