import type { iExperience } from '@/types/experience.type';

export const experienceData: iExperience[] = [
  {
    role: 'Gen AI Platform Engineer',
    aboutRole:
      'Gen AI platform engineer building LLM data pipelines, SLM fine-tuning, agentic assistants, and distributed data services, including Ray workloads that improved processing by up to 30x. On a Palantir-based healthcare engagement, built GitLab review bots and a LangGraph, Vertex AI, RAG, and MCP assistant, and managed Docker and Kubernetes deployments. Adopted uv and Bun to cut CI/CD execution time by up to 50%.',
    company: 'Tata Consultancy Services',
    companyUrl: 'https://tcs.com/',
    startDate: 'Jul 2025',
    endDate: 'Present',
    latest: true
  },
  {
    role: 'Open-Source Maintainer',
    aboutRole:
      'Maintain infrastructure and automation projects across Ansible, Docker, Terraform, and shell scripting, with more than 530 combined GitHub stars.',
    company: 'GitHub',
    companyUrl: 'https://github.com/rishavnandi',
    startDate: 'Aug 2021',
    endDate: 'Present',
    latest: false
  },
  {
    role: 'Machine Learning Co-Lead',
    aboutRole:
      'Ran machine learning boot camps and workshops for more than 200 students, covering exploratory data analysis, model training, and deployment.',
    company: 'Google Developer Club Bhubaneswar',
    companyUrl: 'https://developers.google.com/community/gdg',
    startDate: 'Aug 2022',
    endDate: 'Aug 2023',
    latest: false
  }
];
