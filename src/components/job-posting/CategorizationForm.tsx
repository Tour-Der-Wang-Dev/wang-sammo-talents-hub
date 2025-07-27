import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { categories, benefits as availableBenefits } from '@/data/jobs';

const CategorizationForm = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="categories"
        render={() => (
          <FormItem>
            <FormLabel>หมวดหมู่งาน *</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((category) => (
                <FormField
                  key={category}
                  control={control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem key={category} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(category)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, category])
                              : field.onChange(field.value?.filter((value) => value !== category));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">{category}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="benefits"
        render={() => (
          <FormItem>
            <FormLabel>สวัสดิการ</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableBenefits.map((benefit) => (
                <FormField
                  key={benefit}
                  control={control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem key={benefit} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(benefit)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), benefit])
                              : field.onChange(field.value?.filter((value) => value !== benefit));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">{benefit}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CategorizationForm;