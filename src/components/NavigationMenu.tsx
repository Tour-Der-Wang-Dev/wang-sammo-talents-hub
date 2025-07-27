
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu as ShadcnNavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, Search, UserRound, BriefcaseBusiness, Receipt, Info, Mail, Shield } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

// Define the types for our component props
export interface NavigationMenuProps {
  sections: {
    title: string;
    links: {
      text: string;
      href: string;
      icon?: React.ReactNode;
    }[];
  }[];
}

// Map navigation item titles to their respective icons
const getIconForLink = (text: string) => {
  switch (text) {
    case 'ค้นหางาน':
      return <Search className="h-4 w-4" />;
    case 'สร้างโปรไฟล์':
      return <UserRound className="h-4 w-4" />;
    case 'ลงประกาศงาน':
      return <BriefcaseBusiness className="h-4 w-4" />;
    case 'ราคาและแพ็คเกจ':
      return <Receipt className="h-4 w-4" />;
    case 'เกี่ยวกับเรา':
      return <Info className="h-4 w-4" />;
    case 'ติดต่อเรา':
      return <Mail className="h-4 w-4" />;
    case 'นโยบายความเป็นส่วนตัว':
    case 'ข้อกำหนดการใช้งาน':
      return <Shield className="h-4 w-4" />;
    default:
      return null;
  }
};

// Navigation menu for desktop
export const DesktopNavigationMenu: React.FC<NavigationMenuProps> = ({ sections }) => {
  return (
    <ShadcnNavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {sections.map((section) => (
          <NavigationMenuItem key={section.title}>
            <NavigationMenuTrigger className="font-prompt">
              {section.title} <ChevronDown className="h-4 w-4 ml-1" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[220px]">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={link.href}
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          "flex items-center gap-2 font-prompt"
                        )}
                      >
                        {link.icon || getIconForLink(link.text)}
                        <span>{link.text}</span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </ShadcnNavigationMenu>
  );
};

// Navigation menu for mobile (using Sheet component)
export const MobileNavigationMenu: React.FC<NavigationMenuProps> = ({ sections }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
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
              >
                {section.title}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    openSection === section.title ? "transform rotate-180" : ""
                  )}
                />
              </button>
              {openSection === section.title && (
                <div className="pl-4 space-y-2 border-l-2 border-wang-orange">
                  {section.links.map((link) => (
                    <Link
                      key={link.text}
                      to={link.href}
                      className="flex items-center gap-2 py-2 hover:text-wang-orange font-sarabun"
                    >
                      {link.icon || getIconForLink(link.text)}
                      <span>{link.text}</span>
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

// Combined component that renders the appropriate menu based on screen size
const NavigationMenu: React.FC<NavigationMenuProps> = ({ sections }) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileNavigationMenu sections={sections} />
  ) : (
    <DesktopNavigationMenu sections={sections} />
  );
};

export default NavigationMenu;
