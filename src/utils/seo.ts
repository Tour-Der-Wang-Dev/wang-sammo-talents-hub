
import { Job } from '@/data/jobs';

/**
 * Generate structured data for a job posting according to schema.org
 */
export const generateJobPostingSchema = (job: Job): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.titleThai || job.title,
    description: job.descriptionThai || job.description,
    datePosted: job.datePosted,
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      logo: job.companyLogo || undefined,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressRegion: 'Udon Thani',
        addressCountry: 'TH',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'THB',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: 'MONTH',
      },
    },
    skills: job.requirements.join(', '),
    industry: job.categories.join(', '),
  };
};

/**
 * Generate structured data for an organization (company)
 */
export const generateOrganizationSchema = (companyName: string, logo?: string): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    logo: logo || undefined,
  };
};

/**
 * Generate structured data for a job listing webpage
 */
export const generateJobListingSchema = (jobs: Job[]): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: jobs.map((job, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'JobPosting',
          title: job.titleThai || job.title,
          description: job.descriptionThai || job.description,
          datePosted: job.datePosted,
          hiringOrganization: {
            '@type': 'Organization',
            name: job.company,
          },
          jobLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: job.location,
            },
          },
          url: `/job/${job.id}`,
        },
      })),
    },
  };
};

/**
 * Generate website structured data
 */
export const generateWebsiteSchema = (): Record<string, any> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ที่นี่ วังสามหมอ',
    description: 'แหล่งรวมตำแหน่งงานในพื้นที่วังสามหมอและบริเวณใกล้เคียง',
    url: typeof window !== 'undefined' ? window.location.origin : '',
  };
};
