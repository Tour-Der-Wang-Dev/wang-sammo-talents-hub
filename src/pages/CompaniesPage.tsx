
import React, { useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteNavigation from '@/components/SiteNavigation';
import { navigationStructure } from '@/data/navigation';
import { useLanguage } from '@/components/SiteNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/utils/seo';

const CompaniesPage = () => {
  const { language, setLanguage } = useLanguage();
  
  // Memoized structured data for better performance
  const structuredData = useMemo(() => [
    generateWebsiteSchema(),
    generateOrganizationSchema('ที่นี่ วังสามหมอ', 'https://lovable.dev/opengraph-image-p98pqg.png')
  ], []);

  // Memoized translations for better performance
  const translations = useMemo(() => ({
    pageTitle: {
      th: 'บริษัทที่เปิดรับสมัครงาน',
      en: 'Companies Hiring'
    },
    pageDescription: {
      th: 'ค้นหาบริษัทที่กำลังเปิดรับสมัครงานในวังสามหมอ',
      en: 'Find companies currently hiring in Wang Sam Mo'
    },
    siteStructure: {
      th: 'โครงสร้างเว็บไซต์',
      en: 'Site Structure'
    },
    siteStructureDesc: {
      th: 'เว็บไซต์ของเรารองรับทั้งภาษาไทยและภาษาอังกฤษ คลิกที่ปุ่มด้านบนเพื่อเปลี่ยนภาษา',
      en: 'Our website supports both Thai and English languages. Click the buttons above to switch languages.'
    },
    forJobSeekers: {
      th: 'สำหรับผู้หางาน',
      en: 'For Job Seekers'
    },
    jobSeekerDesc: {
      th: 'เครื่องมือและบริการสำหรับผู้ที่กำลังหางาน',
      en: 'Tools and services for those looking for employment'
    },
    forEmployers: {
      th: 'สำหรับนายจ้าง',
      en: 'For Employers'
    },
    employerDesc: {
      th: 'บริการสำหรับบริษัทที่ต้องการประกาศรับสมัครงาน',
      en: 'Services for companies looking to post job openings'
    },
    postJob: {
      th: 'ลงประกาศงานตอนนี้',
      en: 'Post a Job Now'
    },
    languageOptions: {
      th: 'เปลี่ยนภาษา',
      en: 'Language Options'
    },
    jobSeekerItems: [
      { 
        th: 'ค้นหางานที่เหมาะกับคุณ', 
        en: 'Find jobs that match your skills' 
      },
      { 
        th: 'สร้างโปรไฟล์ผู้หางาน', 
        en: 'Create your job seeker profile' 
      },
      { 
        th: 'บันทึกงานที่สนใจ', 
        en: "Save jobs you're interested in" 
      },
      { 
        th: 'รับการแจ้งเตือนงานใหม่', 
        en: 'Get alerts for new job postings' 
      }
    ],
    employerItems: [
      { 
        th: 'ลงประกาศรับสมัครงาน', 
        en: 'Post job listings' 
      },
      { 
        th: 'เลือกแพ็คเกจที่เหมาะสม', 
        en: 'Choose the right package' 
      },
      { 
        th: 'สร้างโปรไฟล์บริษัท', 
        en: 'Create your company profile' 
      }
    ],
  }), []);
  
  // Create SEO alternate URLs for language variants
  const alternateUrls = useMemo(() => ({
    th: window.location.origin + '/companies?lang=th',
    en: window.location.origin + '/companies?lang=en'
  }), []);
  
  return (
    <>
      <SEO
        title={translations.pageTitle[language]}
        description={translations.pageDescription[language]}
        structuredData={structuredData}
        alternateUrls={alternateUrls}
      />

      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-prompt font-bold text-wang-blue mb-6">
          {translations.pageTitle[language]}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-prompt">{translations.siteStructure[language]}</CardTitle>
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
                {translations.forJobSeekers[language]}
              </CardTitle>
              <CardDescription className="font-sarabun">
                {translations.jobSeekerDesc[language]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 font-sarabun">
                {translations.jobSeekerItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="bg-wang-blue text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">{index + 1}</span>
                    {item[language]}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-prompt">
                {translations.forEmployers[language]}
              </CardTitle>
              <CardDescription className="font-sarabun">
                {translations.employerDesc[language]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 font-sarabun">
                {translations.employerItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="bg-wang-orange text-white rounded-full h-5 w-5 flex items-center justify-center mr-2 text-xs">{index + 1}</span>
                    {item[language]}
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-wang-orange hover:bg-orange-600 mt-4 font-prompt">
                {translations.postJob[language]}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-prompt font-semibold text-gray-800 mb-4">
            {translations.languageOptions[language]}
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
            {translations.siteStructureDesc[language]}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CompaniesPage;
