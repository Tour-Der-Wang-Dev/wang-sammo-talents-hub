
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobPostingForm from '@/components/JobPostingForm';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const JobPostingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>ลงประกาศรับสมัครงาน | ที่นี่ วังสามหมอ</title>
        <meta name="description" content="ลงประกาศรับสมัครพนักงานในพื้นที่วังสามหมอ เข้าถึงผู้สมัครงานที่มีคุณภาพในท้องถิ่น" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-1 font-prompt text-gray-600"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            ย้อนกลับ
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-prompt text-2xl sm:text-3xl font-bold text-wang-blue mb-2">
              ลงประกาศรับสมัครงาน
            </h1>
            <p className="text-gray-600">
              กรอกข้อมูลตำแหน่งงานของคุณเพื่อเข้าถึงผู้สมัครที่มีคุณภาพในพื้นที่วังสามหมอ
            </p>
          </div>
          
          <JobPostingForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobPostingPage;
