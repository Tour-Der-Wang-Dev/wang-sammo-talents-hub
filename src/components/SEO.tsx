
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component props
 */
interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
  ogImage?: string;
  children?: React.ReactNode;
}

/**
 * SEO component to manage dynamic metadata
 */
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
      <link rel="canonical" href={canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '')} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '')} />
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

export default SEO;
