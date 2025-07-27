
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import JobFormPreview from '@/components/JobFormPreview';
import ImageUploader from '@/components/ImageUploader';
import { employmentTypes, categories, benefits as availableBenefits } from '@/data/jobs';

// Form schema validation
const formSchema = z.object({
  title: z.string().min(1, 'ต้องระบุชื่อตำแหน่งงาน').max(100, 'ชื่อตำแหน่งงานต้องไม่เกิน 100 ตัวอักษร'),
  titleThai: z.string().optional(),
  company: z.string().min(1, 'ต้องระบุชื่อบริษัท'),
  location: z.string().min(1, 'ต้องระบุที่ตั้ง'),
  workLocation: z.enum(['onsite', 'remote', 'hybrid']),
  employmentType: z.string().min(1, 'ต้องระบุประเภทงาน'),
  salary: z.string().min(1, 'ต้องระบุข้อมูลเงินเดือน'),
  salaryMin: z.number().min(0, 'เงินเดือนขั้นต่ำต้องไม่น้อยกว่า 0').optional(),
  salaryMax: z.number().min(0, 'เงินเดือนขั้นสูงต้องไม่น้อยกว่า 0').optional(),
  description: z.string().min(1, 'ต้องระบุรายละเอียดงาน'),
  qualifications: z.string().min(1, 'ต้องระบุคุณสมบัติ'),
  responsibilities: z.string().min(1, 'ต้องระบุหน้าที่ความรับผิดชอบ'),
  categories: z.array(z.string()).min(1, 'ต้องเลือกหมวดหมู่อย่างน้อย 1 หมวด'),
  benefits: z.array(z.string()).optional(),
  contactEmail: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional(),
  contactPhone: z.string().optional(),
  applicationDeadline: z.string().optional(),
  isHot: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const JobPostingForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [jobImages, setJobImages] = useState<string[]>([]);
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      titleThai: '',
      company: '',
      location: '',
      workLocation: 'onsite',
      employmentType: '',
      salary: '',
      description: '',
      qualifications: '',
      responsibilities: '',
      categories: [],
      benefits: [],
      contactEmail: '',
      contactPhone: '',
      applicationDeadline: '',
      isHot: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      console.log('Form values:', values);
      console.log('Logo:', logoImage);
      console.log('Job images:', jobImages);
      
      // TODO: Connect to Supabase for job posting
      // This will be implemented in the next phase
      
      toast({
        title: "ลงประกาศสำเร็จ!",
        description: "ประกาศงานของคุณจะถูกตรวจสอบก่อนที่จะแสดงบนเว็บไซต์",
      });
      
      // Navigate back to jobs page after submission
      navigate('/jobs');
    } catch (error) {
      console.error('Error submitting job posting:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลงประกาศได้ กรุณาลองอีกครั้ง",
        variant: "destructive",
      });
    }
  };
  
  const handlePreview = () => {
    setActiveTab('preview');
  };

  const workLocations = [
    { value: 'onsite', label: 'ออนไซต์ (ทำงานที่บริษัท)' },
    { value: 'remote', label: 'รีโมท (ทำงานทางไกล)' },
    { value: 'hybrid', label: 'ไฮบริด (ผสมผสาน)' },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
      <TabsList className="grid grid-cols-2 w-full mb-8">
        <TabsTrigger value="details" className="font-prompt">รายละเอียดงาน</TabsTrigger>
        <TabsTrigger value="preview" className="font-prompt">ตัวอย่าง</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="font-prompt text-xl font-semibold text-wang-blue">ข้อมูลพื้นฐาน</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
                      name="workLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>รูปแบบการทำงาน *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
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
                      control={form.control}
                      name="employmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ประเภทงาน *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="เลือกประเภทงาน" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {employmentTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>เงินเดือน *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="เช่น 15,000 - 20,000 บาท หรือ ตามตกลง" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="applicationDeadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>วันหมดเขตรับสมัคร</FormLabel>
                          <FormControl>
                            <Input 
                              type="date"
                              min={new Date().toISOString().split('T')[0]}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h2 className="font-prompt text-xl font-semibold text-wang-blue">รายละเอียดงาน</h2>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>รายละเอียดงาน *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="อธิบายเกี่ยวกับงานและบริษัทของคุณ" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="qualifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>คุณสมบัติ *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="ระบุคุณสมบัติที่ต้องการ เช่น วุฒิการศึกษา ประสบการณ์ ทักษะ" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="responsibilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>หน้าที่ความรับผิดชอบ *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="ระบุหน้าที่และความรับผิดชอบหลักของตำแหน่งงาน" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h2 className="font-prompt text-xl font-semibold text-wang-blue">หมวดหมู่และสวัสดิการ</h2>
                  
                  <FormField
                    control={form.control}
                    name="categories"
                    render={() => (
                      <FormItem>
                        <FormLabel>หมวดหมู่งาน *</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {categories.map((category) => (
                            <FormField
                              key={category}
                              control={form.control}
                              name="categories"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={category}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(category)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, category])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== category
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer">
                                      {category}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="benefits"
                    render={() => (
                      <FormItem>
                        <FormLabel>สวัสดิการ</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {availableBenefits.map((benefit) => (
                            <FormField
                              key={benefit}
                              control={form.control}
                              name="benefits"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={benefit}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(benefit)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, benefit])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== benefit
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer">
                                      {benefit}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h2 className="font-prompt text-xl font-semibold text-wang-blue">ข้อมูลติดต่อ</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>อีเมลติดต่อ</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="อีเมลสำหรับติดต่อเกี่ยวกับการสมัครงาน" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>เบอร์โทรติดต่อ</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="เบอร์โทรศัพท์สำหรับติดต่อ" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h2 className="font-prompt text-xl font-semibold text-wang-blue">รูปภาพ</h2>
                  
                  <div>
                    <FormLabel>โลโก้บริษัท</FormLabel>
                    <div className="mt-2">
                      <ImageUploader 
                        image={logoImage} 
                        onImageChange={setLogoImage} 
                        maxImages={1}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <FormLabel>รูปภาพประกอบ (สูงสุด 5 รูป)</FormLabel>
                    <div className="mt-2">
                      <ImageUploader 
                        images={jobImages} 
                        onImagesChange={setJobImages} 
                        maxImages={5}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h2 className="font-prompt text-xl font-semibold text-wang-blue">ตัวเลือกเพิ่มเติม</h2>
                  
                  <FormField
                    control={form.control}
                    name="isHot"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer">
                            แสดงเป็น "งานยอดนิยม"
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/jobs')}>
                    ยกเลิก
                  </Button>
                  
                  <div className="space-x-2">
                    <Button type="button" variant="outline" onClick={handlePreview}>
                      ดูตัวอย่าง
                    </Button>
                    <Button type="submit" className="bg-wang-blue">
                      ลงประกาศรับสมัคร
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="preview">
        <JobFormPreview 
          data={form.getValues()} 
          logoImage={logoImage} 
          jobImages={jobImages} 
          onBack={() => setActiveTab('details')}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      </TabsContent>
    </Tabs>
  );
};

export default JobPostingForm;
