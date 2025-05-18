
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
import { Search, X } from 'lucide-react';
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
  
  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder={language === 'th' ? "ค้นหาชื่อบริษัท..." : "Search company name..."}
            className="w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder={language === 'th' ? "อุตสาหกรรม" : "Industry"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">
              {language === 'th' ? 'ทั้งหมด' : 'All Industries'}
            </SelectItem>
            {industries.map(ind => (
              <SelectItem key={ind} value={ind}>{ind}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger>
            <SelectValue placeholder={language === 'th' ? "ขนาดบริษัท" : "Company size"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">
              {language === 'th' ? 'ทั้งหมด' : 'All Sizes'}
            </SelectItem>
            {employeeSizes.map(empSize => (
              <SelectItem key={empSize} value={empSize}>{empSize} {language === 'th' ? 'คน' : 'employees'}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-between mt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="text-sm"
          onClick={handleReset}
        >
          <X size={16} className="mr-1" />
          {language === 'th' ? 'ล้างการค้นหา' : 'Clear'}
        </Button>
        
        <Button type="submit" className="bg-wang-blue text-sm">
          <Search size={16} className="mr-1" />
          {language === 'th' ? 'ค้นหา' : 'Search'}
        </Button>
      </div>
    </form>
  );
};

export default CompanySearch;
