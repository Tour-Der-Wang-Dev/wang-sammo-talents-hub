
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/components/SiteNavigation';

interface CompanyPageHeaderProps {
  title: Record<string, string>;
  description: Record<string, string>;
  registerLinkText: Record<string, string>;
}

const CompanyPageHeader: React.FC<CompanyPageHeaderProps> = ({
  title,
  description,
  registerLinkText
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-prompt font-bold text-wang-blue">
          {title[language]}
        </h1>
        <p className="text-gray-600 mt-1">
          {description[language]}
        </p>
      </div>
      
      <Link to="/company/register" className="mt-4 md:mt-0">
        <Button className="bg-wang-orange hover:bg-orange-600 flex items-center gap-2">
          <Plus size={16} />
          {registerLinkText[language]}
        </Button>
      </Link>
    </div>
  );
};

export default CompanyPageHeader;
