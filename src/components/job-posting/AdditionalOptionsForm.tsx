import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

const AdditionalOptionsForm = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="isHot"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="cursor-pointer">แสดงเป็น "งานยอดนิยม"</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

export default AdditionalOptionsForm;