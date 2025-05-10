
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import NavigationMenu from '@/components/NavigationMenu';
import Footer from '@/components/Footer';

const navigationSections = [
  {
    title: 'Job Seeker',
    links: [
      { text: 'ค้นหางาน', href: '/jobs' },
      { text: 'สร้างโปรไฟล์', href: '/profile' },
    ],
  },
  {
    title: 'Employers',
    links: [
      { text: 'ลงประกาศงาน', href: '/post-job' },
      { text: 'ราคาและแพ็คเกจ', href: '/pricing' },
    ],
  },
  {
    title: 'About',
    links: [
      { text: 'เกี่ยวกับเรา', href: '/about' },
      { text: 'ติดต่อเรา', href: '/contact' },
      { text: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
      { text: 'ข้อกำหนดการใช้งาน', href: '/terms' },
    ],
  },
];

const CompaniesPage = () => {
  return (
    <>
      <Helmet>
        <title>บริษัทที่เปิดรับสมัครงาน | ที่นี่ วังสามหมอ</title>
        <meta name="description" content="ค้นหาบริษัทที่กำลังเปิดรับสมัครงานในวังสามหมอ" />
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-prompt font-bold text-wang-blue mb-6">
          บริษัทที่เปิดรับสมัครงาน
        </h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-prompt font-semibold text-wang-blue mb-4">
            Navigation Menu Demo
          </h2>
          <p className="text-gray-600 mb-6 font-sarabun">
            นี่คือตัวอย่างเมนูนำทางสำหรับเว็บไซต์ของเรา สามารถใช้งานได้ทั้งบนคอมพิวเตอร์และมือถือ
          </p>
          
          <div className="flex justify-center md:justify-start mb-8">
            <NavigationMenu sections={navigationSections} />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-prompt text-lg font-medium text-gray-700 mb-2">
              วิธีใช้งาน Navigation Menu
            </h3>
            <ul className="list-disc list-inside font-sarabun space-y-2">
              <li>บนหน้าจอขนาดใหญ่: คลิกที่หัวข้อหมวดหมู่เพื่อแสดงเมนูย่อย</li>
              <li>บนมือถือ: คลิกที่ไอคอนเมนูเพื่อเปิดแผงเมนู จากนั้นคลิกที่หมวดหมู่เพื่อขยาย</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CompaniesPage;
