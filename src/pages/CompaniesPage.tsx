
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteNavigation from '@/components/SiteNavigation';
import { navigationStructure } from '@/data/navigation';
import { useLanguage } from '@/components/SiteNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CompaniesPage = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>
          {language === 'th' ? 'บริษัทที่เปิดรับสมัครงาน | ที่นี่ วังสามหมอ' : 'Companies Hiring | Wang Sam Mo Jobs'}
        </title>
        <meta 
          name="description" 
          content={
            language === 'th' 
              ? 'ค้นหาบริษัทที่กำลังเปิดรับสมัครงานในวังสามหมอ' 
              : 'Find companies currently hiring in Wang Sam Mo'
          } 
        />
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-prompt font-bold text-wang-blue mb-6">
          {language === 'th' ? 'บริษัทที่เปิดรับสมัครงาน' : 'Companies Hiring'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-prompt">{language === 'th' ? 'โครงสร้างเว็บไซต์' : 'Site Structure'}</CardTitle>
              <CardDescription className="font-sarabun">
                {language === 'th' 
                  ? 'เว็บไซต์ของเราแบ่งออกเป็นหมวดหมู่หลักเพื่อให้ง่ายต่อการใช้งาน' 
                  : 'Our website is organized into main categories for easy navigation'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <SiteNavigation sections={navigationStructure} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-prompt">
                {language === 'th' ? 'สำหรับผู้หางาน' : 'For Job Seekers'}
              </CardTitle>
              <CardDescription className="font-sarabun">
                {language === 'th' 
                  ? 'เครื่องมือและบริการสำหรับผู้ที่กำลังหางาน' 
                  : 'Tools and services for those looking for employment'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 font-sarabun">
                <li className="flex items-center">
                  <span className="bg-wang-blue text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">1</span>
                  {language === 'th' ? 'ค้นหางานที่เหมาะกับคุณ' : 'Find jobs that match your skills'}
                </li>
                <li className="flex items-center">
                  <span className="bg-wang-blue text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">2</span>
                  {language === 'th' ? 'สร้างโปรไฟล์ผู้หางาน' : 'Create your job seeker profile'}
                </li>
                <li className="flex items-center">
                  <span className="bg-wang-blue text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">3</span>
                  {language === 'th' ? 'บันทึกงานที่สนใจ' : "Save jobs you're interested in"}
                </li>
                <li className="flex items-center">
                  <span className="bg-wang-blue text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">4</span>
                  {language === 'th' ? 'รับการแจ้งเตือนงานใหม่' : 'Get alerts for new job postings'}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-prompt">
                {language === 'th' ? 'สำหรับนายจ้าง' : 'For Employers'}
              </CardTitle>
              <CardDescription className="font-sarabun">
                {language === 'th' 
                  ? 'บริการสำหรับบริษัทที่ต้องการประกาศรับสมัครงาน' 
                  : 'Services for companies looking to post job openings'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 font-sarabun">
                <li className="flex items-center">
                  <span className="bg-wang-orange text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">1</span>
                  {language === 'th' ? 'ลงประกาศรับสมัครงาน' : 'Post job listings'}
                </li>
                <li className="flex items-center">
                  <span className="bg-wang-orange text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">2</span>
                  {language === 'th' ? 'เลือกแพ็คเกจที่เหมาะสม' : 'Choose the right package'}
                </li>
                <li className="flex items-center">
                  <span className="bg-wang-orange text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">3</span>
                  {language === 'th' ? 'สร้างโปรไฟล์บริษัท' : 'Create your company profile'}
                </li>
              </ul>
              
              <Button className="w-full bg-wang-orange hover:bg-orange-600 mt-4 font-prompt">
                {language === 'th' ? 'ลงประกาศงานตอนนี้' : 'Post a Job Now'}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-prompt font-semibold text-gray-800 mb-4">
            {language === 'th' ? 'เปลี่ยนภาษา' : 'Language Options'}
          </h2>
          <div className="flex space-x-4">
            <Button 
              variant={language === 'th' ? 'default' : 'outline'}
              onClick={() => setLanguage('th')}
              className="font-prompt"
            >
              ภาษาไทย (Thai)
            </Button>
            <Button 
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => setLanguage('en')}
              className="font-prompt"
            >
              English (อังกฤษ)
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-600 font-sarabun">
            {language === 'th' 
              ? 'เว็บไซต์ของเรารองรับทั้งภาษาไทยและภาษาอังกฤษ คลิกที่ปุ่มด้านบนเพื่อเปลี่ยนภาษา' 
              : 'Our website supports both Thai and English languages. Click the buttons above to switch languages.'}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CompaniesPage;
