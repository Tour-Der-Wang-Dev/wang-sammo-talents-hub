
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import NavigationMenu from './NavigationMenu';

const navigationSections = [
  {
    title: 'Job Seeker',
    links: [
      { text: 'ค้นหางาน', href: '/jobs' },
      { text: 'สร้างโปรไฟล์', href: '/profile' },
    ],
  },
  {
    title: 'Employers',
    links: [
      { text: 'ลงประกาศงาน', href: '/post-job' },
      { text: 'ราคาและแพ็คเกจ', href: '/pricing' },
    ],
  },
  {
    title: 'About',
    links: [
      { text: 'เกี่ยวกับเรา', href: '/about' },
      { text: 'ติดต่อเรา', href: '/contact' },
      { text: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
      { text: 'ข้อกำหนดการใช้งาน', href: '/terms' },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add scroll detection for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/dbc20659-751f-4e70-9ce3-49e4dc99bc25.png" 
              alt="ที่นี่ วังสามหมอ" 
              className="h-8 md:h-10" 
              loading="eager"
              width="40"
              height="40"
            />
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-prompt font-bold text-wang-blue">ที่นี่ วังสามหมอ</span>
              <span className="text-xs text-gray-500">TOUR DER WANG</span>
            </div>
          </Link>

          {/* Desktop Navigation with Navigation Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`font-prompt text-gray-700 hover:text-wang-orange transition-colors ${location.pathname === '/' ? 'text-wang-orange font-semibold' : ''}`}>
              หน้าแรก
            </Link>
            <Link to="/jobs" className={`font-prompt text-gray-700 hover:text-wang-orange transition-colors ${location.pathname === '/jobs' ? 'text-wang-orange font-semibold' : ''}`}>
              ตำแหน่งงาน
            </Link>
            <Link to="/companies" className={`font-prompt text-gray-700 hover:text-wang-orange transition-colors ${location.pathname === '/companies' ? 'text-wang-orange font-semibold' : ''}`}>
              บริษัท
            </Link>
            <NavigationMenu sections={navigationSections} />
          </div>

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
            aria-label={isMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation with Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 animate-fade-in border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-prompt text-gray-700 hover:text-wang-orange transition-colors py-2 ${location.pathname === '/' ? 'text-wang-orange font-semibold' : ''}`}
              >
                หน้าแรก
              </Link>
              <Link 
                to="/jobs" 
                className={`font-prompt text-gray-700 hover:text-wang-orange transition-colors py-2 ${location.pathname === '/jobs' ? 'text-wang-orange font-semibold' : ''}`}
              >
                ตำแหน่งงาน
              </Link>
              <Link 
                to="/companies" 
                className={`font-prompt text-gray-700 hover:text-wang-orange transition-colors py-2 ${location.pathname === '/companies' ? 'text-wang-orange font-semibold' : ''}`}
              >
                บริษัท
              </Link>
            </nav>
            
            <div className="mt-4 pt-4 border-t">
              <NavigationMenu sections={navigationSections} />
            </div>
            
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
