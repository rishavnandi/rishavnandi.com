import type { iProjects } from '@/types/featuredProjects.types';

export const featuredProjects: iProjects[] = [
  {
    title: 'Kusama',
    description:
      'Agent-native data and machine-learning studio for datasets, training, and model serving',
    tags: ['Docker', 'Next.js', 'Git'],
    latest: true,
    url: 'https://app.kusama.autos',
    githubUrl: 'https://github.com/rishavnandi/kusama',
    icon: '/images/kusama-logo.svg'
  },
  {
    title: 'TSDeck',
    description:
      'Self-hosted app catalog that generates one-line Docker and Tailscale setup commands',
    tags: ['Hono', 'Docker', 'Git'],
    latest: true,
    url: 'https://tsdeck.rishavnandi.workers.dev',
    githubUrl: 'https://github.com/rishavnandi/tsdeck',
    icon: '/images/tailscale-logo.svg'
  },
  {
    title: 'Ansible Homelab',
    description: 'Ansible playbooks for deploying Docker homelab services',
    tags: ['Ansible', 'Docker', 'Git', 'Linux'],
    updated: true,
    githubUrl: 'https://github.com/rishavnandi/ansible_homelab',
    icon: 'https://img.icons8.com/plasticine/512/stack.png'
  },
  {
    title: 'Docker Compose Boilerplates',
    description: 'Reusable Docker Compose templates for self-hosted services',
    tags: ['Docker', 'Git', 'Linux'],
    githubUrl: 'https://github.com/rishavnandi/boiler_plates',
    icon: 'https://img.icons8.com/color/512/docker.png'
  }
];
