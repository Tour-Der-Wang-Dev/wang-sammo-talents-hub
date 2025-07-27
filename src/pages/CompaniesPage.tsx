
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanySearch from '@/components/CompanySearch';
import { useLanguage } from '@/components/SiteNavigation';
import SEO from '@/components/SEO';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/utils/seo';
import { companies } from '@/data/companies';
import { jobs } from '@/data/jobs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

// Imported components
import CompanyPageHeader from '@/components/companies/CompanyPageHeader';
import CompanyStatistics from '@/components/companies/CompanyStatistics';
import CompanyTabSection from '@/components/companies/CompanyTabSection';

const CompaniesPage = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState<string | null>(null);
  
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
    },
    errorTitle: {
      th: 'เกิดข้อผิดพลาด',
      en: 'Error'
    }
  }), []);
  
  // Handle search with validation
  const handleCompanySearch = (query: string, industry: string, size: string) => {
    // Reset error state
    setError(null);
    
    // Validate search parameters
    if (query && query.length < 2) {
      setError(language === 'th' 
        ? 'คำค้นหาต้องมีความยาวอย่างน้อย 2 ตัวอักษร' 
        : 'Search term must be at least 2 characters');
      return;
    }
    
    // Set search parameters if validation passes
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
  
  // Calculate total job positions
  const totalOpenPositions = useMemo(() => {
    return jobs.length;
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
        {/* Display error if any */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{translations.errorTitle[language]}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <CompanyPageHeader
          title={translations.pageTitle}
          description={translations.pageDescription}
          registerLinkText={translations.registerCompany}
          totalCompanies={companies.length}
          totalJobs={totalOpenPositions}
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
