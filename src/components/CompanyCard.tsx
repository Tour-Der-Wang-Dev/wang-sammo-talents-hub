
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Building2, MapPin, Briefcase, Link as LinkIcon, CheckCircle, Users, Calendar } from 'lucide-react';
import { Company } from '@/types/Company';
import { useLanguage } from '@/components/SiteNavigation';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { language } = useLanguage();
  
  const translations = {
    verified: {
      th: 'ยืนยันแล้ว',
      en: 'Verified'
    },
    openPositions: {
      th: 'ตำแหน่งงาน',
      en: 'open positions'
    },
    viewDetails: {
      th: 'ดูรายละเอียด',
      en: 'View details'
    },
    founded: {
      th: 'ก่อตั้ง',
      en: 'Founded'
    },
    employees: {
      th: 'พนักงาน',
      en: 'Employees'
    }
  };
  
  return (
    <Link to={`/company/${company.id}`} className="block transition-transform hover:scale-[1.01] active:scale-[0.99]">
      <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow duration-200">
        <div className="h-32 w-full overflow-hidden relative">
          <img 
            src={company.coverImage} 
            alt={language === 'th' ? company.name : company.nameEn}
            className="w-full h-full object-cover" 
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16"></div>
          
          <div className="absolute bottom-3 left-3 bg-white rounded-full p-2 border-2 border-white shadow-md">
            <img 
              src={company.logo} 
              alt={`โลโก้ ${company.name}`}
              className="w-12 h-12 rounded-full object-contain bg-white" 
              loading="lazy"
            />
          </div>
          
          {company.verified && (
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-wang-blue text-white flex items-center gap-1">
                <CheckCircle size={14} />
                <span className="text-xs">{translations.verified[language]}</span>
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-prompt text-lg font-medium text-gray-900 mb-1">
            {language === 'th' ? company.name : company.nameEn}
          </h3>
          
          <div className="flex items-center mb-3">
            <Badge variant="outline" className="text-[11px] bg-gray-50">
              {company.industry}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span className="line-clamp-1">{company.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase size={16} className="mr-2 flex-shrink-0" />
              <span>
                <span className="font-medium text-wang-blue">{company.openPositions}</span>
                &nbsp;{language === 'th' 
                  ? translations.openPositions.th
                  : translations.openPositions.en}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Users size={16} className="mr-2 flex-shrink-0" />
              <span>{company.employeeCount} {translations.employees[language]}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 px-4 py-3 text-sm border-t flex justify-between">
          <div className="flex items-center text-wang-orange font-medium">
            <LinkIcon size={16} className="mr-1" />
            <span>{translations.viewDetails[language]}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>
              {language === 'th' ? translations.founded.th : translations.founded.en}&nbsp;
              {company.founded}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CompanyCard;
