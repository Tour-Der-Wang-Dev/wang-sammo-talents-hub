
import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex w-full flex-col sm:flex-row">
        <div className="relative flex-grow shadow-sm w-full sm:w-auto">
          <Input
            type="text"
            placeholder="ค้นหาตำแหน่งงาน, บริษัท หรือคำสำคัญ..."
            className="w-full pl-4 pr-12 py-3 sm:py-6 rounded-md sm:rounded-l-md sm:rounded-r-none border-r-0 focus-visible:ring-wang-orange"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <Button 
          type="submit" 
          className="bg-wang-orange hover:bg-orange-600 text-white py-3 px-6 sm:py-6 sm:px-8 mt-2 sm:mt-0 rounded-md sm:rounded-l-none sm:rounded-r-md shadow-sm w-full sm:w-auto"
        >
          ค้นหา
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
