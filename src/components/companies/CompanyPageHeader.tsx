import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Building2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';

interface CompanyPageHeaderProps {
  title: Record<string, string>;
  description: Record<string, string>;
  registerLinkText: Record<string, string>;
  totalCompanies?: number;
  totalJobs?: number;
}

const CompanyPageHeader: React.FC<CompanyPageHeaderProps> = ({
  title,
  description,
  registerLinkText,
  totalCompanies = 0,
  totalJobs = 0
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="relative mb-8 bg-gradient-to-r from-wang-blue/10 to-wang-blue/5 rounded-xl p-6">
      <div className="absolute top-0 right-0 h-full w-1/3 pointer-events-none opacity-10">
        <Building2 className="h-full w-full text-wang-blue" />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 relative">
        <div>
          <h1 className="text-2xl md:text-3xl font-prompt font-bold text-wang-blue">
            {title[language]}
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl font-sarabun">
            {description[language]}
          </p>
          
          {/* Display company and job counts */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="bg-white/80">
              <Building2 className="mr-1 h-3 w-3" /> 
              {totalCompanies} {language === 'th' ? 'บริษัท' : 'Companies'}
            </Badge>
            <Badge variant="outline" className="bg-white/80">
              {totalJobs} {language === 'th' ? 'ตำแหน่งงาน' : 'Open Positions'}
            </Badge>
          </div>
        </div>
        
        <Link to="/company/register" className="mt-4 md:mt-0">
          <Button className="bg-wang-orange hover:bg-orange-600 flex items-center gap-2 shadow-sm">
            <Plus size={16} />
            <span className="font-prompt">{registerLinkText[language]}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyPageHeader;