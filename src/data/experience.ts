import type { iExperience } from '@/types/experience.type';

export const experienceData: iExperience[] = [
  {
    role: 'Systems Engineer (TCS Prime)',
    aboutRole:
      'Forward-deployed engineer on a Palantir-based enterprise healthcare platform, building LLM-powered data pipelines, Workshop applications, and operational dashboards. Migrated Kafka ingestion and derived-attribute generation workloads to Ray-based distributed services, improving processing performance by up to 30x. Fine-tuned small language models for local inference, built GitLab code-review bots, and developed a LangGraph, Vertex AI, and RAG assistant with an MCP server. Managed Docker and Kubernetes deployments while moving Python and frontend dependency management to uv and Bun, cutting CI/CD execution time by up to 50%.',
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
