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
  | 'Powershell';

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
