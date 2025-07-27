
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/components/SiteNavigation';

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
  alternateUrls?: {
    [key: string]: string;
  };
}

/**
 * Enhanced SEO component to manage dynamic metadata with improved language support
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  structuredData,
  ogImage = 'https://lovable.dev/opengraph-image-p98pqg.png',
  children,
  alternateUrls,
}) => {
  const { language } = useLanguage();
  
  const siteTitle = language === 'th' ? 'ที่นี่ วังสามหมอ' : 'Wang Sam Mo Jobs';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  const defaultDescription = language === 'th' 
    ? 'แหล่งรวมตำแหน่งงานในพื้นที่วังสามหมอและบริเวณใกล้เคียง เชื่อมต่อคนหางานกับนายจ้างในภาคการท่องเที่ยวและบริการ'
    : 'The premier job board for Wang Sam Mo area, connecting job seekers with employers in tourism and service industries.';
  
  const metaDescription = description || defaultDescription;
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={language === 'th' ? 'th_TH' : 'en_US'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Alternate language links */}
      {alternateUrls && Object.entries(alternateUrls).map(([lang, url]) => (
        <link 
          key={lang} 
          rel="alternate" 
          hrefLang={lang} 
          href={url} 
        />
      ))}
      
      {/* Structured data */}
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
