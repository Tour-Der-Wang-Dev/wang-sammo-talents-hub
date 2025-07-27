import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/hooks/use-language';
import { 
  Search, User, Bookmark, Bell, Briefcase, Package, Building, Info, Mail, Shield, ChevronDown, Languages 
} from 'lucide-react';
import { NavigationSection } from '@/data/navigation';

const getIconForLink = (href: string) => {
  switch (href) {
    case '/jobs': return <Search className="h-4 w-4" />;
    case '/profile': return <User className="h-4 w-4" />;
    case '/saved-jobs': return <Bookmark className="h-4 w-4" />;
    case '/job-alerts': return <Bell className="h-4 w-4" />;
    case '/post-job': return <Briefcase className="h-4 w-4" />;
    case '/pricing': return <Package className="h-4 w-4" />;
    case '/company-profile': return <Building className="h-4 w-4" />;
    case '/about': return <Info className="h-4 w-4" />;
    case '/contact': return <Mail className="h-4 w-4" />;
    case '/privacy': case '/terms': return <Shield className="h-4 w-4" />;
    default: return null;
  }
};

const DesktopNavigation: React.FC<{ sections: NavigationSection[] }> = ({ sections }) => {
  const { language } = useLanguage();
  
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {sections.map((section) => (
          <NavigationMenuItem key={section.title}>
            <NavigationMenuTrigger className="font-prompt">
              {language === 'th' ? section.title : section.titleEn}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[250px]">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={link.href}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          "flex items-center gap-2 font-prompt",
                          link.isHighlighted && "text-wang-orange font-medium"
                        )}
                      >
                        {getIconForLink(link.href)}
                        <span>{language === 'th' ? link.text : link.textEn}</span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MobileNavigation: React.FC<{ sections: NavigationSection[] }> = ({ sections }) => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const { language } = useLanguage();

  const toggleSection = (title: string) => {
    setOpenSections(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <span className="sr-only">Toggle menu</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="pt-10 overflow-y-auto max-h-[80vh]">
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <button
                className="flex items-center justify-between w-full text-left font-prompt font-medium text-lg"
                onClick={() => toggleSection(section.title)}
                aria-expanded={openSections.includes(section.title)}
              >
                {language === 'th' ? section.title : section.titleEn}
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.includes(section.title) && "rotate-180")} />
              </button>
              {openSections.includes(section.title) && (
                <div className="pl-4 space-y-2 border-l-2 border-wang-orange">
                  {section.links.map((link) => (
                    <Link
                      key={link.text}
                      to={link.href}
                      className={cn("flex items-center gap-2 py-2 hover:text-wang-orange font-sarabun", link.isHighlighted && "text-wang-orange font-medium")}
                    >
                      {getIconForLink(link.href)}
                      <span>{language === 'th' ? link.text : link.textEn}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SiteNavigation: React.FC<{ sections: NavigationSection[] }> = ({ sections }) => {
  const isMobile = useIsMobile();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-4">
      {isMobile ? <MobileNavigation sections={sections} /> : <DesktopNavigation sections={sections} />}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
        className="ml-2"
        aria-label={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
      >
        <Languages className="h-4 w-4 mr-1" />
        {language === 'th' ? 'EN' : 'TH'}
      </Button>
    </div>
  );
};

export default SiteNavigation;