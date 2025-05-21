
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, Filter } from 'lucide-react';
import { industries, employeeSizes } from '@/data/companies';
import { useLanguage } from '@/components/SiteNavigation';

interface CompanySearchProps {
  onSearch: (query: string, industry: string, size: string) => void;
}

const CompanySearch: React.FC<CompanySearchProps> = ({ onSearch }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, industry, size);
  };
  
  const handleReset = () => {
    setQuery('');
    setIndustry('');
    setSize('');
    onSearch('', '', '');
  };
  
  const translations = {
    search: {
      th: "ค้นหาบริษัท...",
      en: "Search companies..."
    },
    industry: {
      th: "อุตสาหกรรม",
      en: "Industry"
    },
    size: {
      th: "ขนาดบริษัท",
      en: "Company size"
    },
    all: {
      th: "ทั้งหมด",
      en: "All"
    },
    employees: {
      th: "คน",
      en: "employees"
    },
    clear: {
      th: "ล้างการค้นหา",
      en: "Clear"
    },
    searchBtn: {
      th: "ค้นหา",
      en: "Search"
    },
    filters: {
      th: "ตัวกรอง",
      en: "Filters"
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder={translations.search[language]}
              className="w-full pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="text-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-1" />
            {translations.filters[language]}
          </Button>
          
          <Button type="submit" className="bg-wang-blue text-sm">
            <Search size={16} className="mr-1" />
            {translations.searchBtn[language]}
          </Button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t">
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder={translations.industry[language]} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">
                  {translations.all[language]} {translations.industry[language].toLowerCase()}
                </SelectItem>
                {industries.map(ind => (
                  <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue placeholder={translations.size[language]} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">
                  {translations.all[language]} {translations.size[language].toLowerCase()}
                </SelectItem>
                {employeeSizes.map(empSize => (
                  <SelectItem key={empSize} value={empSize}>{empSize} {translations.employees[language]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              type="button" 
              variant="outline" 
              className="text-sm md:col-span-2 w-full md:w-auto md:ml-auto"
              onClick={handleReset}
            >
              <X size={16} className="mr-1" />
              {translations.clear[language]}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default CompanySearch;
