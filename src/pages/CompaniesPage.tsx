
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import CompanyCard from '@/components/CompanyCard';
import CompanySearch from '@/components/CompanySearch';
import { useLanguage } from '@/components/SiteNavigation';
import SEO from '@/components/SEO';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/utils/seo';
import { companies } from '@/data/companies';
import { Building2, Users, Briefcase, Plus } from 'lucide-react';

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
    allCompanies: {
      th: 'บริษัททั้งหมด',
      en: 'All Companies'
    },
    topCompanies: {
      th: 'บริษัทยอดนิยม',
      en: 'Top Companies'
    },
    verified: {
      th: 'บริษัทที่ยืนยันแล้ว',
      en: 'Verified Companies'
    },
    noResults: {
      th: 'ไม่พบบริษัทที่ตรงกับการค้นหา',
      en: 'No companies match your search'
    },
    tryAgain: {
      th: 'ลองใช้คำค้นอื่น หรือล้างตัวกรองเพื่อดูผลลัพธ์มากขึ้น',
      en: 'Try different search terms or clear filters to see more results'
    },
    registerCompany: {
      th: 'ลงทะเบียนบริษัท',
      en: 'Register Company'
    },
    statistics: {
      th: 'สถิติ',
      en: 'Statistics'
    },
    totalCompanies: {
      th: 'บริษัททั้งหมด',
      en: 'Total Companies'
    },
    activeJobs: {
      th: 'ตำแหน่งงานที่เปิดรับ',
      en: 'Active Jobs'
    },
    industries: {
      th: 'อุตสาหกรรม',
      en: 'Industries'
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
  
  // Calculate total open positions
  const totalOpenPositions = useMemo(() => {
    return companies.reduce((total, company) => total + company.openPositions, 0);
  }, []);
  
  // Count unique industries
  const uniqueIndustries = useMemo(() => {
    return new Set(companies.map(company => company.industry)).size;
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-prompt font-bold text-wang-blue">
              {translations.pageTitle[language]}
            </h1>
            <p className="text-gray-600 mt-1">
              {translations.pageDescription[language]}
            </p>
          </div>
          
          <Link to="/company/register" className="mt-4 md:mt-0">
            <Button className="bg-wang-orange hover:bg-orange-600 flex items-center gap-2">
              <Plus size={16} />
              {translations.registerCompany[language]}
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with statistics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
              <h2 className="font-prompt text-lg font-medium border-b pb-2 mb-4">
                {translations.statistics[language]}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Building2 className="text-wang-blue h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm">
                      {translations.totalCompanies[language]}
                    </div>
                    <div className="font-medium">{companies.length}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-3">
                    <Briefcase className="text-wang-orange h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm">
                      {translations.activeJobs[language]}
                    </div>
                    <div className="font-medium">{totalOpenPositions}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Users className="text-green-600 h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm">
                      {translations.industries[language]}
                    </div>
                    <div className="font-medium">{uniqueIndustries}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-prompt text-sm font-medium mb-2">
                  {language === 'th' ? 'อุตสาหกรรมยอดนิยม' : 'Popular Industries'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Hospitality', 'Tourism', 'Technology'].map(ind => (
                    <Badge key={ind} variant="secondary" className="text-xs">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <CompanySearch onSearch={handleCompanySearch} />
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">
                  {translations.allCompanies[language]}
                </TabsTrigger>
                <TabsTrigger value="top">
                  {translations.topCompanies[language]}
                </TabsTrigger>
                <TabsTrigger value="verified">
                  {translations.verified[language]}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {filteredCompanies.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {filteredCompanies.map(company => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">
                      {translations.noResults[language]}
                    </h3>
                    <p className="text-gray-500">
                      {translations.tryAgain[language]}
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="top">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {companies.filter(c => c.openPositions > 3).map(company => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="verified">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {verifiedCompanies.map(company => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CompaniesPage;
