import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const ContactInfoForm = () => {
  const { control } = useFormContext();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>อีเมลติดต่อ</FormLabel>
            <FormControl>
              <Input type="email" placeholder="อีเมลสำหรับติดต่อเกี่ยวกับการสมัครงาน" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="contactPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>เบอร์โทรติดต่อ</FormLabel>
            <FormControl>
              <Input placeholder="เบอร์โทรศัพท์สำหรับติดต่อ" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactInfoForm;