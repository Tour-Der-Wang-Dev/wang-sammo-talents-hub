
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';
import { categories, employmentTypes } from '@/data/jobs';
import { useIsMobile } from '@/hooks/use-mobile';

interface FilterPanelProps {
  selectedCategories: string[];
  selectedTypes: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  onTypeChange: (type: string, checked: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategories,
  selectedTypes,
  onCategoryChange,
  onTypeChange,
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  const FilterContent = () => (
    <>
      <div className="mb-6">
        <h3 className="font-prompt text-lg font-medium mb-3">หมวดหมู่งาน</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => 
                  onCategoryChange(category, checked === true)
                }
              />
              <Label 
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-prompt text-lg font-medium mb-3">ประเภทงาน</h3>
        <div className="space-y-2">
          {employmentTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={(checked) => 
                  onTypeChange(type, checked === true)
                }
              />
              <Label 
                htmlFor={`type-${type}`}
                className="text-sm cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // Mobile filter drawer
  if (isMobile) {
    return (
      <div className="mb-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter size={16} />
              ตัวกรอง {selectedCategories.length + selectedTypes.length > 0 && `(${selectedCategories.length + selectedTypes.length})`}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
            <SheetTitle className="font-prompt text-xl">ตัวกรองการค้นหา</SheetTitle>
            <div className="py-4 overflow-y-auto max-h-[calc(80vh-8rem)]">
              <FilterContent />
            </div>
            <SheetFooter className="mt-4">
              <Button 
                className="w-full bg-wang-orange hover:bg-orange-600" 
                onClick={() => setIsOpen(false)}
              >
                ยืนยันตัวกรอง
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // Desktop filter panel
  return (
    <div className="bg-white rounded-lg shadow-sm border p-5 sticky top-24">
      <FilterContent />
    </div>
  );
};

export default FilterPanel;
