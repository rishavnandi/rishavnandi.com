export const SITE_URL = 'https://www.rishavnandi.com';
export const SITE_NAME = 'Rishav Nandi';
export const DEFAULT_DESCRIPTION =
  'Rishav Nandi is a Gen AI Platform Engineer and DevOps practitioner building AI infrastructure, automation, and self-hosted systems.';
export const SOCIAL_IMAGE = `${SITE_URL}/images/readme_img.png`;

export const absoluteUrl = (path = '/') => new URL(path, `${SITE_URL}/`).toString();
