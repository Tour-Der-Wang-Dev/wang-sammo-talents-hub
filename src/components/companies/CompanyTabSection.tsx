import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/SiteNavigation';
import CompanyCard from '@/components/CompanyCard';
import { Company } from '@/types/Company';
import { usePagination } from '@/hooks/use-pagination';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface CompanyTabSectionProps {
  companies: Company[];
  filteredCompanies: Company[];
  verifiedCompanies: Company[];
}

const CompanyTabSection: React.FC<CompanyTabSectionProps> = ({
  companies,
  filteredCompanies,
  verifiedCompanies
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const activeCompanyList = useMemo(() => {
    switch (activeTab) {
      case 'filtered': return filteredCompanies;
      case 'verified': return verifiedCompanies;
      default: return companies;
    }
  }, [activeTab, companies, filteredCompanies, verifiedCompanies]);

  const {
    currentPage,
    totalPages,
    goToPage,
    goToNext,
    goToPrevious,
    pageNumbers,
    startIndex,
    endIndex,
    reset,
  } = usePagination({ totalItems: activeCompanyList.length, itemsPerPage: 6 });

  const paginatedCompanies = useMemo(() => activeCompanyList.slice(startIndex, endIndex), [activeCompanyList, startIndex, endIndex]);

  useEffect(() => {
    reset();
  }, [activeTab, reset]);

  const translations = {
    all: { th: 'บริษัททั้งหมด', en: 'All Companies' },
    search: { th: 'ผลการค้นหา', en: 'Search Results' },
    verified: { th: 'บริษัทที่ยืนยันแล้ว', en: 'Verified Companies' },
    noResults: { th: 'ไม่พบผลลัพธ์', en: 'No results found' }
  };
  
  const renderCompanyGrid = (companyList: Company[]) => {
    if (companyList.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">{translations.noResults[language]}</p>
        </div>
      );
    }
    
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {companyList.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination className="my-6">
            <PaginationContent>
              <PaginationItem><PaginationPrevious onClick={goToPrevious} className="cursor-pointer" /></PaginationItem>
              {pageNumbers.map((page, index) => (
                <PaginationItem key={index}>
                  {typeof page === 'string' ? (
                    <span className="px-4 py-2">...</span>
                  ) : (
                    <PaginationLink isActive={page === currentPage} onClick={() => goToPage(page)} className="cursor-pointer">
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              <PaginationItem><PaginationNext onClick={goToNext} className="cursor-pointer" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  };
  
  return (
    <div className="mb-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-wang-blue">
            {translations.all[language]} ({companies.length})
          </TabsTrigger>
          {filteredCompanies.length > 0 && (
            <TabsTrigger value="filtered" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-wang-blue">
              {translations.search[language]} ({filteredCompanies.length})
            </TabsTrigger>
          )}
          <TabsTrigger value="verified" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-wang-blue">
            {translations.verified[language]} ({verifiedCompanies.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">{renderCompanyGrid(paginatedCompanies)}</TabsContent>
        <TabsContent value="filtered">{renderCompanyGrid(paginatedCompanies)}</TabsContent>
        <TabsContent value="verified">{renderCompanyGrid(paginatedCompanies)}</TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyTabSection;