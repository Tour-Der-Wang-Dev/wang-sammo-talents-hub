
import React, { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Briefcase } from 'lucide-react';
import { useLanguage } from '@/components/SiteNavigation';
import { Company } from '@/types/Company';

interface CompanyStatisticsProps {
  companies: Company[];
}

const CompanyStatistics: React.FC<CompanyStatisticsProps> = ({ companies }) => {
  const { language } = useLanguage();
  
  // Calculate total open positions
  const totalOpenPositions = useMemo(() => {
    return companies.reduce((total, company) => total + company.openPositions, 0);
  }, [companies]);
  
  // Count unique industries
  const uniqueIndustries = useMemo(() => {
    return new Set(companies.map(company => company.industry)).size;
  }, [companies]);
  
  const translations = useMemo(() => ({
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
    },
    popularIndustries: {
      th: 'อุตสาหกรรมยอดนิยม',
      en: 'Popular Industries'
    }
  }), []);
  
  return (
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
          {translations.popularIndustries[language]}
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
  );
};

export default CompanyStatistics;
