import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { employmentTypes } from '@/data/jobs';

const workLocations = [
  { value: 'onsite', label: 'ออนไซต์ (ทำงานที่บริษัท)' },
  { value: 'remote', label: 'รีโมท (ทำงานทางไกล)' },
  { value: 'hybrid', label: 'ไฮบริด (ผสมผสาน)' },
];

const BasicInfoForm = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อตำแหน่งงาน (ภาษาอังกฤษ) *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Marketing Manager" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="titleThai"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อตำแหน่งงาน (ภาษาไทย)</FormLabel>
              <FormControl>
                <Input placeholder="เช่น ผู้จัดการฝ่ายการตลาด" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อบริษัท *</FormLabel>
              <FormControl>
                <Input placeholder="ชื่อบริษัทของคุณ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>สถานที่ตั้ง *</FormLabel>
              <FormControl>
                <Input placeholder="เช่น วังสามหมอ, อุดรธานี" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="workLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รูปแบบการทำงาน *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกรูปแบบการทำงาน" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workLocations.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="employmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ประเภทงาน *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภทงาน" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เงินเดือน *</FormLabel>
              <FormControl>
                <Input placeholder="เช่น 15,000 - 20,000 บาท หรือ ตามตกลง" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="applicationDeadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>วันหมดเขตรับสมัคร</FormLabel>
              <FormControl>
                <Input type="date" min={new Date().toISOString().split('T')[0]} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BasicInfoForm;