
import { jobs } from '@/data/jobs';

/**
 * Generate a sitemap XML string
 */
export const generateSitemap = (baseUrl: string): string => {
  const urlSet = [`
    <url>
      <loc>${baseUrl}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${baseUrl}/jobs</loc>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
  `];

  // Add job detail pages
  jobs.forEach(job => {
    urlSet.push(`
    <url>
      <loc>${baseUrl}/job/${job.id}</loc>
      <lastmod>${new Date(job.datePosted).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlSet.join('')}
</urlset>`;
};
