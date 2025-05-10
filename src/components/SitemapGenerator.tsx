
import React, { useEffect } from 'react';
import { generateSitemap } from '@/utils/sitemap';

const SitemapGenerator: React.FC = () => {
  useEffect(() => {
    // Only run on the client side and in development
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const baseUrl = window.location.origin;
      const sitemap = generateSitemap(baseUrl);
      
      // Log the sitemap for development purposes
      console.log('Generated sitemap:', sitemap);
      
      // In a real production environment, you'd save this to a file
      // or serve it dynamically from a server endpoint
    }
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default SitemapGenerator;
