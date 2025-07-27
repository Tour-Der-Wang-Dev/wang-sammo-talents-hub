
import { jobs } from '@/data/jobs';
import { navigationStructure } from '@/data/navigation';

/**
 * Flatten navigation structure to extract all URLs
 */
const extractUrls = (sections: any[]): string[] => {
  const urls: string[] = [];
  
  sections.forEach(section => {
    if (section.links && Array.isArray(section.links)) {
      section.links.forEach((link: any) => {
        if (link.href && !urls.includes(link.href)) {
          urls.push(link.href);
        }
      });
    }
  });
  
  return urls;
};

/**
 * Generate a comprehensive sitemap XML string
 */
export const generateSitemap = (baseUrl: string): string => {
  const lastMod = new Date().toISOString();
  const baseUrls: string[] = ['/', '/jobs', '/companies', '/settings'];
  const navUrls = extractUrls(navigationStructure);
  
  // Combine base URLs with navigation URLs, removing duplicates
  const allUrls = [...new Set([...baseUrls, ...navUrls])];
  
  const urlSet = allUrls.map(url => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>${url === '/' ? 'daily' : 'weekly'}</changefreq>
      <priority>${url === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `);

  // Add job detail pages
  jobs.forEach(job => {
    urlSet.push(`
    <url>
      <loc>${baseUrl}/job/${job.id}</loc>
      <lastmod>${new Date(job.datePosted).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
    `);
    
    // Add Thai version of job pages with appropriate hreflang
    urlSet.push(`
    <url>
      <loc>${baseUrl}/job/${job.id}?lang=th</loc>
      <lastmod>${new Date(job.datePosted).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
      <xhtml:link rel="alternate" hreflang="th" href="${baseUrl}/job/${job.id}?lang=th" />
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/job/${job.id}?lang=en" />
    </url>
    `);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urlSet.join('')}
</urlset>`;
};

/**
 * Generate a robots.txt content
 */
export const generateRobotsTxt = (baseUrl: string): string => {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Block access to admin areas
Disallow: /admin/
`;
};
