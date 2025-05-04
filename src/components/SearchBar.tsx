
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex w-full">
        <div className="relative flex-grow shadow-sm">
          <Input
            type="text"
            placeholder="ค้นหาตำแหน่งงาน, บริษัท หรือคำสำคัญ..."
            className="w-full pl-4 pr-12 py-6 rounded-l-md border-r-0 focus-visible:ring-wang-orange"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <Button 
          type="submit" 
          className="bg-wang-orange hover:bg-orange-600 text-white py-6 px-8 rounded-r-md shadow-sm"
        >
          ค้นหา
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
