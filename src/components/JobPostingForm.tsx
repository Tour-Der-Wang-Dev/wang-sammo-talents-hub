import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JobFormPreview from '@/components/JobFormPreview';

import FormSection from '@/components/job-posting/FormSection';
import BasicInfoForm from '@/components/job-posting/BasicInfoForm';
import JobDetailsForm from '@/components/job-posting/JobDetailsForm';
import CategorizationForm from '@/components/job-posting/CategorizationForm';
import ContactInfoForm from '@/components/job-posting/ContactInfoForm';
import ImageUploadForm from '@/components/job-posting/ImageUploadForm';
import AdditionalOptionsForm from '@/components/job-posting/AdditionalOptionsForm';
import { useJobs } from '@/hooks/use-jobs';

const formSchema = z.object({
  title: z.string().min(1, 'ต้องระบุชื่อตำแหน่งงาน').max(100, 'ชื่อตำแหน่งงานต้องไม่เกิน 100 ตัวอักษร'),
  titleThai: z.string().optional(),
  company: z.string().min(1, 'ต้องระบุชื่อบริษัท'),
  location: z.string().min(1, 'ต้องระบุที่ตั้ง'),
  workLocation: z.enum(['onsite', 'remote', 'hybrid']),
  employmentType: z.string().min(1, 'ต้องระบุประเภทงาน'),
  salary: z.string().min(1, 'ต้องระบุข้อมูลเงินเดือน'),
  description: z.string().min(1, 'ต้องระบุรายละเอียดงาน'),
  qualifications: z.string().min(1, 'ต้องระบุคุณสมบัติ'),
  responsibilities: z.string().min(1, 'ต้องระบุหน้าที่ความรับผิดชอบ'),
  categories: z.array(z.string()).min(1, 'ต้องเลือกหมวดหมู่อย่างน้อย 1 หมวด'),
  benefits: z.array(z.string()).optional(),
  contactEmail: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  applicationDeadline: z.string().optional(),
  isHot: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const JobPostingForm = () => {
  const navigate = useNavigate();
  const { createJob } = useJobs();
  const [activeTab, setActiveTab] = useState('details');
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [jobImages, setJobImages] = useState<string[]>([]);
  
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
    const toastId = toast.loading("กำลังลงประกาศงาน...");
    try {
      const newJobData = {
        title: values.title,
        titleThai: values.titleThai,
        company: values.company,
        location: values.location,
        salary: values.salary,
        employmentType: values.employmentType as any,
        description: values.description,
        descriptionThai: values.description,
        requirements: values.qualifications.split('\n').filter(Boolean),
        isHot: values.isHot,
        categories: values.categories,
        companyLogo: logoImage || undefined,
      };

      await createJob(newJobData);
      
      toast.success("ลงประกาศสำเร็จ!", {
        id: toastId,
        description: "ประกาศงานของคุณได้ถูกเพิ่มเข้าระบบแล้ว",
      });
      
      navigate('/jobs');
    } catch (error) {
      console.error('Error submitting job posting:', error);
      toast.error("เกิดข้อผิดพลาด", {
        id: toastId,
        description: "ไม่สามารถลงประกาศได้ กรุณาลองอีกครั้ง",
      });
    }
  };
  
  const handlePreview = () => {
    form.trigger().then(isValid => {
      if (isValid) {
        setActiveTab('preview');
      } else {
        toast.error("ข้อมูลไม่ครบถ้วน", {
          description: "กรุณากรอกข้อมูลในช่องที่มีเครื่องหมาย * ให้ครบถ้วน",
        });
      }
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
      <TabsList className="grid grid-cols-2 w-full mb-8">
        <TabsTrigger value="details" className="font-prompt">รายละเอียดงาน</TabsTrigger>
        <TabsTrigger value="preview" className="font-prompt" onClick={handlePreview}>ตัวอย่าง</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormSection title="ข้อมูลพื้นฐาน"><BasicInfoForm /></FormSection>
                <FormSection title="รายละเอียดงาน"><JobDetailsForm /></FormSection>
                <FormSection title="หมวดหมู่และสวัสดิการ"><CategorizationForm /></FormSection>
                <FormSection title="ข้อมูลติดต่อ"><ContactInfoForm /></FormSection>
                <FormSection title="รูปภาพ">
                  <ImageUploadForm 
                    logoImage={logoImage} 
                    setLogoImage={setLogoImage} 
                    jobImages={jobImages} 
                    setJobImages={setJobImages} 
                  />
                </FormSection>
                <FormSection title="ตัวเลือกเพิ่มเติม"><AdditionalOptionsForm /></FormSection>
                
                <div className="flex justify-between pt-6 border-t">
                  <Button type="button" variant="outline" onClick={() => navigate('/jobs')}>ยกเลิก</Button>
                  <div className="space-x-2">
                    <Button type="button" variant="outline" onClick={handlePreview}>ดูตัวอย่าง</Button>
                    <Button type="submit" className="bg-wang-blue">ลงประกาศรับสมัคร</Button>
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