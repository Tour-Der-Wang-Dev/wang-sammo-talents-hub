import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import CompanySearch from '@/components/CompanySearch';
import { useLanguage } from '@/components/SiteNavigation';
import SEO from '@/components/SEO';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/utils/seo';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useCompanySearch } from '@/hooks/use-company-search';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanies, fetchJobs } from '@/api/mockApi';
import { Company } from '@/types/Company';
import CompanyCardSkeleton from '@/components/CompanyCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import CompanyPageHeader from '@/components/companies/CompanyPageHeader';
import CompanyStatistics from '@/components/companies/CompanyStatistics';
import CompanyTabSection from '@/components/companies/CompanyTabSection';

const CompaniesPage = () => {
  const { language } = useLanguage();
  const [error, setError] = useState<string | null>(null);

  const { data: companies, isLoading: isLoadingCompanies } = useQuery<Company[], Error>({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  });

  const { data: jobs } = useQuery({ queryKey: ['jobs'], queryFn: fetchJobs });

  const { filteredCompanies, verifiedCompanies, handleSearch } = useCompanySearch({ companies: companies || [] });
  
  const structuredData = useMemo(() => [
    generateWebsiteSchema(),
    generateOrganizationSchema('ที่นี่ วังสามหมอ', 'https://lovable.dev/opengraph-image-p98pqg.png')
  ], []);

  const translations = useMemo(() => ({
    pageTitle: { th: 'บริษัทที่เปิดรับสมัครงาน', en: 'Companies Hiring' },
    pageDescription: { th: 'ค้นหาบริษัทที่กำลังเปิดรับสมัครงานในวังสามหมอ', en: 'Find companies currently hiring in Wang Sam Mo' },
    registerCompany: { th: 'ลงทะเบียนบริษัท', en: 'Register Company' },
    errorTitle: { th: 'เกิดข้อผิดพลาด', en: 'Error' }
  }), []);
  
  const handleCompanySearch = (query: string, industry: string, size: string) => {
    setError(null);
    if (query && query.length < 2) {
      setError(language === 'th' ? 'คำค้นหาต้องมีความยาวอย่างน้อย 2 ตัวอักษร' : 'Search term must be at least 2 characters');
      return;
    }
    handleSearch(query, industry, size);
  };
  
  const totalOpenPositions = useMemo(() => (jobs || []).length, [jobs]);
  
  const alternateUrls = useMemo(() => ({
    th: (typeof window !== 'undefined' ? window.location.origin : '') + '/companies?lang=th',
    en: (typeof window !== 'undefined' ? window.location.origin : '') + '/companies?lang=en'
  }), []);
  
  return (
    <Layout>
      <SEO
        title={translations.pageTitle[language]}
        description={translations.pageDescription[language]}
        structuredData={structuredData}
        alternateUrls={alternateUrls}
      />

      <div className="container mx-auto px-4 py-8">
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
          totalCompanies={(companies || []).length}
          totalJobs={totalOpenPositions}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            {isLoadingCompanies ? <Skeleton className="h-96 w-full" /> : <CompanyStatistics companies={companies || []} />}
          </div>
          
          <div className="lg:col-span-3">
            <CompanySearch onSearch={handleCompanySearch} />
            
            {isLoadingCompanies ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <CompanyCardSkeleton key={i} />)}
              </div>
            ) : (
              <CompanyTabSection
                companies={companies || []}
                filteredCompanies={filteredCompanies}
                verifiedCompanies={verifiedCompanies}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompaniesPage;