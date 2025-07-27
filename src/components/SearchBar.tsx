
import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex w-full flex-col sm:flex-row gap-2">
        <div className="relative flex-grow shadow-sm w-full">
          <Input
            type="text"
            placeholder="ค้นหาตำแหน่งงาน, บริษัท หรือคำสำคัญ..."
            className="w-full pl-4 pr-12 py-2 sm:py-3 rounded-md text-base focus-visible:ring-wang-orange"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="ค้นหางาน"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        <Button 
          type="submit" 
          className="bg-wang-orange hover:bg-orange-600 active:bg-orange-700 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-md shadow-sm w-full sm:w-auto"
        >
          ค้นหา
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
