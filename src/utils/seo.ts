
import { Job } from '@/data/jobs';
import { Helmet } from 'react-helmet-async';
import React from 'react';

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
    url: window.location.origin,
  };
};

/**
 * SEO component to manage dynamic metadata
 */
interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  ogImage?: string;
  children?: React.ReactNode;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  structuredData,
  ogImage = 'https://lovable.dev/opengraph-image-p98pqg.png',
  children,
}) => {
  const siteTitle = 'ที่นี่ วังสามหมอ';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'แหล่งรวมตำแหน่งงานในพื้นที่วังสามหมอและบริเวณใกล้เคียง เชื่อมต่อคนหางานกับนายจ้างในภาคการท่องเที่ยวและบริการ';
  const metaDescription = description || defaultDescription;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl || window.location.href} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || window.location.href} />
      <meta property="og:image" content={ogImage} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {structuredData && Array.isArray(structuredData) ? (
        structuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))
      ) : (
        structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
      
      {children}
    </Helmet>
  );
};
