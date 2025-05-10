import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobs } from '@/data/jobs';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import { generateJobPostingSchema } from '@/utils/seo';

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find job by ID
  const job = jobs.find(job => job.id === id);
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO 
          title="ไม่พบประกาศงาน"
          description="ไม่พบตำแหน่งงานที่คุณกำลังค้นหา อาจถูกลบหรือเปลี่ยนแปลงแล้ว"
        />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="font-prompt text-xl sm:text-2xl font-semibold mb-4">ไม่พบประกาศงาน</h1>
            <p className="text-gray-500 mb-6">อาจถูกลบหรือเปลี่ยนแปลงแล้ว</p>
            <Button onClick={() => navigate(-1)}>กลับไปยังหน้าก่อนหน้า</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleSaveJob = () => {
    toast.success("บันทึกงานสำเร็จ", {
      description: `เพิ่ม ${job.title} เข้าสู่รายการบันทึกแล้ว`,
    });
  };
  
  const handleApplyJob = () => {
    toast.success("สมัครงานสำเร็จ", {
      description: `ส่งใบสมัคร ${job.title} เรียบร้อยแล้ว`,
    });
  };

  // Generate job posting structured data
  const structuredData = generateJobPostingSchema(job);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={job.titleThai || job.title}
        description={job.descriptionThai?.substring(0, 160) || job.description.substring(0, 160)}
        structuredData={structuredData}
        ogImage={job.companyLogo || 'https://lovable.dev/opengraph-image-p98pqg.png'}
      />
      <Header />
      
      <div className="container mx-auto px-4 py-6 md:py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-4 pl-0 text-gray-500 hover:text-wang-blue"
                size="sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                ย้อนกลับ
              </Button>
              
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="mb-4 sm:mb-0 sm:mr-4">
                  <h1 className="font-prompt text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {job.titleThai || job.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 mb-2">
                    {job.company}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {job.location}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.categories.map((category) => (
                      <Badge key={category} variant="outline" className="bg-blue-50 text-wang-blue border-blue-200">
                        {category}
                      </Badge>
                    ))}
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                      {job.employmentType}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>เผยแพร่เมื่อ {new Date(job.datePosted).toLocaleDateString('th-TH')}</span>
                  </div>
                </div>
                
                {job.companyLogo && (
                  <div className="flex-shrink-0">
                    <img 
                      src={job.companyLogo} 
                      alt={job.company} 
                      className="w-16 h-16 sm:w-24 sm:h-24 object-contain" 
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Job Description */}
            <div className="mb-8">
              <h2 className="font-prompt text-lg md:text-xl font-semibold mb-4">
                รายละเอียดงาน
              </h2>
              <div className="prose prose-sm sm:prose max-w-none">
                <p className="mb-4 text-gray-700">
                  {job.descriptionThai || job.description}
                </p>
              </div>
            </div>
            
            {/* Job Requirements */}
            <div className="mb-8">
              <h2 className="font-prompt text-lg md:text-xl font-semibold mb-4">
                คุณสมบัติที่ต้องการ
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex">
                    <Check className="h-5 w-5 mr-3 text-wang-orange flex-shrink-0 mt-0.5" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 md:hidden">
              <Button 
                onClick={handleApplyJob} 
                className="w-full bg-wang-orange hover:bg-orange-600 mb-3"
              >
                สมัครงาน
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSaveJob} 
                className="w-full"
              >
                <Bookmark className="mr-2 h-4 w-4" />
                บันทึกงานนี้
              </Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-prompt text-lg md:text-xl font-semibold mb-4">
                    สรุปงาน
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 font-medium mb-1">
                        เงินเดือน
                      </p>
                      <p className="text-wang-blue text-lg font-semibold">
                        {job.salary}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 font-medium mb-1">
                        ประเภทงาน
                      </p>
                      <p>
                        {job.employmentType}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 font-medium mb-1">
                        สถานที่ทำงาน
                      </p>
                      <p>
                        {job.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-8 space-y-3">
                    <Button 
                      onClick={handleApplyJob} 
                      className="w-full bg-wang-orange hover:bg-orange-600"
                    >
                      สมัครงาน
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSaveJob} 
                      className="w-full"
                    >
                      <Bookmark className="mr-2 h-4 w-4" />
                      บันทึกงานนี้
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4 md:mt-6">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-prompt font-semibold mb-3">
                    แชร์ตำแหน่งงานนี้
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Facebook</Button>
                    <Button variant="outline" size="sm">LINE</Button>
                    <Button variant="outline" size="sm">อีเมล</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobDetailPage;
