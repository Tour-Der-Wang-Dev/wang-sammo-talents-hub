
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanyCard from '@/components/CompanyCard';
import { Company } from '@/types/Company';
import { useLanguage } from '@/components/SiteNavigation';

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

  // Get top companies (with most open positions)
  const topCompanies = React.useMemo(() => {
    return [...companies]
      .sort((a, b) => b.openPositions - a.openPositions)
      .slice(0, 6);
  }, [companies]);

  const translations = {
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
    }
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="all" className="font-prompt">
          {translations.allCompanies[language]}
        </TabsTrigger>
        <TabsTrigger value="top" className="font-prompt">
          {translations.topCompanies[language]}
        </TabsTrigger>
        <TabsTrigger value="verified" className="font-prompt">
          {translations.verified[language]}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filteredCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2 font-prompt">
              {translations.noResults[language]}
            </h3>
            <p className="text-gray-500 font-sarabun">
              {translations.tryAgain[language]}
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="top">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {topCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="verified">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {verifiedCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CompanyTabSection;
