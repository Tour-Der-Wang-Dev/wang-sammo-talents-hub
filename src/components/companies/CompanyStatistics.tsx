import React, { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Briefcase, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Company } from '@/types/Company';

interface CompanyStatisticsProps {
  companies: Company[];
}

const CompanyStatistics: React.FC<CompanyStatisticsProps> = ({ companies }) => {
  const { language } = useLanguage();
  
  const totalOpenPositions = useMemo(() => companies.reduce((total, company) => total + company.openPositions, 0), [companies]);
  
  const industryStats = useMemo(() => {
    const industries = companies.map(company => company.industry);
    const counts: Record<string, number> = {};
    industries.forEach(industry => { counts[industry] = (counts[industry] || 0) + 1; });
    const sortedIndustries = [...new Set(industries)].sort((a, b) => counts[b] - counts[a]);
    return { count: new Set(industries).size, top: sortedIndustries.slice(0, 5), counts };
  }, [companies]);
  
  const verifiedCount = useMemo(() => companies.filter(company => company.verified).length, [companies]);
  
  const translations = useMemo(() => ({
    statistics: { th: 'สถิติ', en: 'Statistics' },
    totalCompanies: { th: 'บริษัททั้งหมด', en: 'Total Companies' },
    activeJobs: { th: 'ตำแหน่งงานที่เปิดรับ', en: 'Active Jobs' },
    industries: { th: 'อุตสาหกรรม', en: 'Industries' },
    popularIndustries: { th: 'อุตสาหกรรมยอดนิยม', en: 'Popular Industries' },
    verifiedCompanies: { th: 'บริษัทที่ยืนยันแล้ว', en: 'Verified Companies' },
  }), []);
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
      <h2 className="font-prompt text-lg font-medium border-b pb-2 mb-4">{translations.statistics[language]}</h2>
      <div className="space-y-4">
        <div className="flex items-center"><div className="bg-blue-100 p-2 rounded-full mr-3"><Building2 className="text-wang-blue h-5 w-5" /></div><div><div className="text-gray-600 text-sm">{translations.totalCompanies[language]}</div><div className="font-medium">{companies.length}</div></div></div>
        <div className="flex items-center"><div className="bg-orange-100 p-2 rounded-full mr-3"><Briefcase className="text-wang-orange h-5 w-5" /></div><div><div className="text-gray-600 text-sm">{translations.activeJobs[language]}</div><div className="font-medium">{totalOpenPositions}</div></div></div>
        <div className="flex items-center"><div className="bg-green-100 p-2 rounded-full mr-3"><Users className="text-green-600 h-5 w-5" /></div><div><div className="text-gray-600 text-sm">{translations.industries[language]}</div><div className="font-medium">{industryStats.count}</div></div></div>
        <div className="flex items-center"><div className="bg-purple-100 p-2 rounded-full mr-3"><CheckCircle2 className="text-purple-600 h-5 w-5" /></div><div><div className="text-gray-600 text-sm">{translations.verifiedCompanies[language]}</div><div className="font-medium">{verifiedCount} / {companies.length}</div></div></div>
      </div>
      <div className="mt-6">
        <h3 className="font-prompt text-sm font-medium mb-2">{translations.popularIndustries[language]}</h3>
        <div className="flex flex-wrap gap-2">
          {industryStats.top.map(ind => (
            <Badge key={ind} variant="secondary" className="text-xs flex items-center gap-1">{ind}<span className="bg-gray-200 text-gray-700 rounded-full text-[10px] px-1.5">{industryStats.counts[ind]}</span></Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyStatistics;