import React from 'react';
import { Button } from '@/components/ui/button';
import SettingCard from '@/components/SettingCard';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { toast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
  const handleEdit = (settingName: string) => {
    toast({
      title: "กำลังแก้ไขการตั้งค่า",
      description: `คุณกำลังแก้ไข${settingName}`,
    });
  };

  return (
    <Layout>
      <SEO 
        title="การตั้งค่า" 
        description="จัดการการตั้งค่าบัญชีและข้อมูลส่วนตัวของคุณในระบบที่นี่ วังสามหมอ"
      />
      <div className="container px-4 py-8 mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold font-prompt text-wang-blue mb-6">การตั้งค่า</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold font-prompt mb-4">บัญชีผู้ใช้</h2>
            <div className="grid gap-4">
              <SettingCard title="ข้อมูลส่วนตัว" description="ชื่อ, นามสกุล และข้อมูลติดต่อของคุณ" value="สมชาย ใจดี" onEdit={() => handleEdit("ข้อมูลส่วนตัว")} />
              <SettingCard title="อีเมล" description="อีเมลที่ใช้ในการเข้าสู่ระบบและรับการแจ้งเตือน" value="somchai@example.com" onEdit={() => handleEdit("อีเมล")} />
              <SettingCard title="หมายเลขโทรศัพท์" description="หมายเลขโทรศัพท์สำหรับการติดต่อและยืนยันตัวตน" value="088-123-4567" onEdit={() => handleEdit("หมายเลขโทรศัพท์")} />
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold font-prompt mb-4">การแจ้งเตือน</h2>
            <div className="grid gap-4">
              <SettingCard title="การแจ้งเตือนอีเมล" description="รับการแจ้งเตือนเกี่ยวกับงานใหม่และการสมัครงานทางอีเมล" value="เปิดใช้งาน" onEdit={() => handleEdit("การแจ้งเตือนอีเมล")} />
              <SettingCard title="การแจ้งเตือน SMS" description="รับการแจ้งเตือนเกี่ยวกับงานใหม่และการสมัครงานทาง SMS" value="ปิดใช้งาน" onEdit={() => handleEdit("การแจ้งเตือน SMS")} />
            </div>
          </section>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button variant="default" className="bg-wang-orange hover:bg-orange-600">เข้าสู่ระบบ</Button>
            <Button variant="default" className="bg-wang-orange hover:bg-orange-600">ลงประกาศงาน</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;