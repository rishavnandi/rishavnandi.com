export type Stack =
  | 'Ansible'
  | 'Docker'
  | 'Git'
  | 'Linux'
  | 'Wireguard'
  | 'Jenkins'
  | 'AWS'
  | 'Terraform'
  | 'Windows'
  | 'WSL2'
  | 'Powershell'
  | 'Turborepo'
  | 'Hono'
  | 'Upstash'
  | 'Next.js'
  | 'Tailwind CSS'
  | 'Remix'
  | 'Svelte'
  | 'Tauri'
  | 'T3 Stack'
  | 'Astro'
  | 'Trpc'
  | 'React'
  | 'Prisma'
  | 'shadcn/ui';

export interface iProjects {
  title: string;
  description: string;
  tags: Stack[];
  url?: string;
  githubUrl?: string;
  icon?: string;
  latest?: boolean;
  updated?: boolean;
}
