import type { Component } from 'svelte';
import type { Stack } from '@/types/featuredProjects.types';
import Nextjs from '@/icons/nextjs.svelte';
import Hono from '@/icons/hono.svelte';
import Ansible from '@/icons/ansible.svelte';
import Docker from '@/icons/docker.svelte';
import Git from '@/icons/git.svelte';
import Linux from '@/icons/linux.svelte';

export const technologies: Partial<Record<Stack, Component>> = {
  Hono: Hono,
  'Next.js': Nextjs,
  Ansible: Ansible,
  Docker: Docker,
  Git: Git,
  Linux: Linux
};
