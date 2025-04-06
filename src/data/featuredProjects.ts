import type { iProjects } from '@/types/featuredProjects.types';

export const featuredProjects: iProjects[] = [
  {
    title: 'Ansible Homelab',
    description: '🏠 Ansible playbooks that setup Docker deploy popular homelab services',
    tags: ['Ansible', 'Docker', 'Git', 'Linux'],
    updated: true,
    githubUrl: 'https://github.com/rishavnandi/ansible_homelab',
    icon: 'https://img.icons8.com/plasticine/512/stack.png'
  },
  {
    title: 'Ansible Self-Hosted VPN',
    description: '🔒 Ansible playbooks that setup a self-hosted VPN with Wireguard and a simple GUI',
    tags: ['Ansible', 'Wireguard', 'Docker', 'Git'],
    githubUrl: 'https://github.com/rishavnandi/ansible_selfhost_vpn',
    icon: 'https://www.svgrepo.com/download/349569/wireguard.svg'
  },
  {
    title: 'Jenkins Pipeline',
    description: '🚀 Jenkins pipeline that builds and deploys a simple flask app to AWS',
    tags: ['Jenkins', 'AWS', 'Linux', 'Terraform'],
    githubUrl: 'https://github.com/rishavnandi/jenkins_pipeline',
    icon: 'https://img.icons8.com/color/512/jenkins.png'
  },
  {
    title: 'WSL2 Automation Scripts',
    description: '⚙️ Scripts to automate the setup of WSL2 on Windows 10/11',
    tags: ['WSL2', 'Git', 'Linux', 'Powershell'],
    githubUrl: 'https://github.com/rishavnandi/wsl_dotfiles',
    icon: 'https://img.icons8.com/fluency/512/fedora.png'
  }
];
