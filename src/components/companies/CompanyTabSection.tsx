
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/SiteNavigation';
import CompanyCard from '@/components/CompanyCard';
import { Company } from '@/types/Company';
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Translations
  const translations = {
    all: {
      th: 'บริษัททั้งหมด',
      en: 'All Companies'
    },
    search: {
      th: 'ผลการค้นหา',
      en: 'Search Results'
    },
    verified: {
      th: 'บริษัทที่ยืนยันแล้ว',
      en: 'Verified Companies'
    },
    noResults: {
      th: 'ไม่พบผลลัพธ์',
      en: 'No results found'
    }
  };
  
  // Helper function to paginate any company list
  const paginateCompanies = (companyList: Company[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return companyList.slice(startIndex, endIndex);
  };
  
  // Calculate total pages for the active tab
  const calculateTotalPages = (activeTabCompanies: Company[]) => {
    return Math.ceil(activeTabCompanies.length / itemsPerPage);
  };
  
  // Generate pagination numbers
  const generatePaginationNumbers = (totalPages: number) => {
    const pages = [];
    
    // For small number of pages, show all
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    // For larger sets, show first, last, current and surrounding
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  };
  
  // Render companies grid with empty state
  const renderCompanyGrid = (companyList: Company[]) => {
    const paginatedCompanies = paginateCompanies(companyList);
    const totalPages = calculateTotalPages(companyList);
    
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
          {paginatedCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination className="my-6">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
              
              {generatePaginationNumbers(totalPages).map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <span className="px-4 py-2">...</span>
                  ) : (
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => typeof page === 'number' && setCurrentPage(page)}
                      className={typeof page === 'number' ? 'cursor-pointer' : ''}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  };
  
  // Reset pagination when changing tabs
  const handleTabChange = () => {
    setCurrentPage(1);
  };
  
  return (
    <div className="mb-6">
      <Tabs defaultValue="all" onValueChange={handleTabChange}>
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
        
        <TabsContent value="all">
          {renderCompanyGrid(companies)}
        </TabsContent>
        
        <TabsContent value="filtered">
          {renderCompanyGrid(filteredCompanies)}
        </TabsContent>
        
        <TabsContent value="verified">
          {renderCompanyGrid(verifiedCompanies)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyTabSection;
