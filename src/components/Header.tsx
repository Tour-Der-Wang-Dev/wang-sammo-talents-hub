
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/dbc20659-751f-4e70-9ce3-49e4dc99bc25.png" 
              alt="ที่นี่ วังสามหมอ" 
              className="h-10" 
            />
            <div className="flex flex-col">
              <span className="text-lg font-prompt font-bold text-wang-blue">ที่นี่ วังสามหมอ</span>
              <span className="text-xs text-gray-500">TOUR DER WANG</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-prompt text-gray-700 hover:text-wang-orange transition-colors">
              หน้าแรก
            </Link>
            <Link to="/jobs" className="font-prompt text-gray-700 hover:text-wang-orange transition-colors">
              ตำแหน่งงาน
            </Link>
            <Link to="/companies" className="font-prompt text-gray-700 hover:text-wang-orange transition-colors">
              บริษัท
            </Link>
            <Link to="/about" className="font-prompt text-gray-700 hover:text-wang-orange transition-colors">
              เกี่ยวกับเรา
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="font-prompt">
              เข้าสู่ระบบ
            </Button>
            <Button className="bg-wang-orange hover:bg-orange-600 font-prompt">
              ลงประกาศงาน
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-prompt text-gray-700 hover:text-wang-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                หน้าแรก
              </Link>
              <Link 
                to="/jobs" 
                className="font-prompt text-gray-700 hover:text-wang-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ตำแหน่งงาน
              </Link>
              <Link 
                to="/companies" 
                className="font-prompt text-gray-700 hover:text-wang-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                บริษัท
              </Link>
              <Link 
                to="/about" 
                className="font-prompt text-gray-700 hover:text-wang-orange transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                เกี่ยวกับเรา
              </Link>
            </nav>
            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t">
              <Button variant="outline" className="font-prompt">
                เข้าสู่ระบบ
              </Button>
              <Button className="bg-wang-orange hover:bg-orange-600 font-prompt">
                ลงประกาศงาน
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
