import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const JobDetailsForm = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>รายละเอียดงาน *</FormLabel>
            <FormControl>
              <Textarea placeholder="อธิบายเกี่ยวกับงานและบริษัทของคุณ" className="min-h-[100px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="qualifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>คุณสมบัติ *</FormLabel>
            <FormControl>
              <Textarea placeholder="ระบุคุณสมบัติที่ต้องการ เช่น วุฒิการศึกษา ประสบการณ์ ทักษะ" className="min-h-[100px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="responsibilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>หน้าที่ความรับผิดชอบ *</FormLabel>
            <FormControl>
              <Textarea placeholder="ระบุหน้าที่และความรับผิดชอบหลักของตำแหน่งงาน" className="min-h-[100px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default JobDetailsForm;