import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateSitemap() {
  console.log('Generating sitemap.xml...');
  
  // Get all markdown files from posts directory
  const postsDirectory = path.join(__dirname, '../src/posts');
  const postFiles = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
  
  // Extract slugs from filenames
  const postSlugs = postFiles.map(file => file.replace('.md', ''));
  
  // Create sitemap XML content
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rishavnandi.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://rishavnandi.com/posts</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rishavnandi.com/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  
  // Add post URLs
  for (const slug of postSlugs) {
    sitemap += `
  <url>
    <loc>https://rishavnandi.com/post/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }
  
  sitemap += `
</urlset>`;
  
  // Write to the static file
  fs.writeFileSync(path.join(__dirname, '../static/sitemap.xml'), sitemap);
  console.log('sitemap.xml generated successfully');
}

generateSitemap();