
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanySearch from '@/components/CompanySearch';
import { useLanguage } from '@/components/SiteNavigation';
import SEO from '@/components/SEO';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/utils/seo';
import { companies } from '@/data/companies';

// Newly imported component
import CompanyPageHeader from '@/components/companies/CompanyPageHeader';
import CompanyStatistics from '@/components/companies/CompanyStatistics';
import CompanyTabSection from '@/components/companies/CompanyTabSection';

const CompaniesPage = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
  // Memoized structured data for better performance
  const structuredData = useMemo(() => [
    generateWebsiteSchema(),
    generateOrganizationSchema('ที่นี่ วังสามหมอ', 'https://lovable.dev/opengraph-image-p98pqg.png')
  ], []);

  // Memoized translations for better performance
  const translations = useMemo(() => ({
    pageTitle: {
      th: 'บริษัทที่เปิดรับสมัครงาน',
      en: 'Companies Hiring'
    },
    pageDescription: {
      th: 'ค้นหาบริษัทที่กำลังเปิดรับสมัครงานในวังสามหมอ',
      en: 'Find companies currently hiring in Wang Sam Mo'
    },
    registerCompany: {
      th: 'ลงทะเบียนบริษัท',
      en: 'Register Company'
    }
  }), []);
  
  // Handle search
  const handleCompanySearch = (query: string, industry: string, size: string) => {
    setSearchQuery(query);
    setSelectedIndustry(industry);
    setSelectedSize(size);
  };
  
  // Filter companies based on search criteria
  const filteredCompanies = useMemo(() => {
    let results = [...companies];
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      results = results.filter(company => 
        company.name.toLowerCase().includes(lowerQuery) || 
        company.nameEn.toLowerCase().includes(lowerQuery) ||
        company.description.toLowerCase().includes(lowerQuery) ||
        company.descriptionEn.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (selectedIndustry) {
      results = results.filter(company => company.industry === selectedIndustry);
    }
    
    if (selectedSize) {
      results = results.filter(company => company.employeeCount === selectedSize);
    }
    
    return results;
  }, [searchQuery, selectedIndustry, selectedSize]);
  
  // Get verified companies
  const verifiedCompanies = useMemo(() => {
    return companies.filter(company => company.verified);
  }, []);
  
  // Create SEO alternate URLs for language variants
  const alternateUrls = useMemo(() => ({
    th: window.location.origin + '/companies?lang=th',
    en: window.location.origin + '/companies?lang=en'
  }), []);
  
  return (
    <>
      <SEO
        title={translations.pageTitle[language]}
        description={translations.pageDescription[language]}
        structuredData={structuredData}
        alternateUrls={alternateUrls}
      />

      <Header />

      <div className="container mx-auto px-4 py-8">
        <CompanyPageHeader
          title={translations.pageTitle}
          description={translations.pageDescription}
          registerLinkText={translations.registerCompany}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with statistics */}
          <div className="lg:col-span-1">
            <CompanyStatistics companies={companies} />
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <CompanySearch onSearch={handleCompanySearch} />
            
            <CompanyTabSection
              companies={companies}
              filteredCompanies={filteredCompanies}
              verifiedCompanies={verifiedCompanies}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CompaniesPage;
