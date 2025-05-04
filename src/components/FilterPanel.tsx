
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { categories, employmentTypes } from '@/data/jobs';

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
  return (
    <div className="bg-white rounded-lg shadow-sm border p-5">
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
    </div>
  );
};

export default FilterPanel;
