import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import { navigationStructure } from '@/data/navigation';
import { useLanguage } from '@/hooks/use-language';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/jobs', label: t('nav.jobs') },
    { to: '/companies', label: t('nav.companies') },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/dbc20659-751f-4e70-9ce3-49e4dc99bc25.png" alt={t('siteTitle')} className="h-8 md:h-10" loading="eager" width="40" height="40" />
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-prompt font-bold text-wang-blue">{t('siteTitle')}</span>
              <span className="text-xs text-gray-500">TOUR DER WANG</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className={`font-prompt text-gray-700 hover:text-wang-orange transition-colors ${location.pathname === link.to ? 'text-wang-orange font-semibold' : ''}`}>
                {link.label}
              </Link>
            ))}
            <SiteNavigation sections={navigationStructure} />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="font-prompt" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              {t('nav.login')}
            </Button>
            <Button className="bg-wang-orange hover:bg-orange-600 font-prompt">
              {t('nav.postJob')}
            </Button>
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <SiteNavigation sections={navigationStructure} />
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 animate-fade-in border-t">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} className={`font-prompt text-gray-700 hover:text-wang-orange transition-colors py-2 ${location.pathname === link.to ? 'text-wang-orange font-semibold' : ''}`}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t">
              <Button variant="outline" className="font-prompt w-full">
                <LogIn className="h-4 w-4 mr-2" />
                {t('nav.login')}
              </Button>
              <Button className="bg-wang-orange hover:bg-orange-600 font-prompt w-full">
                {t('nav.postJob')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;