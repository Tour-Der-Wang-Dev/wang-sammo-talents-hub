
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/dbc20659-751f-4e70-9ce3-49e4dc99bc25.png" 
                alt="ที่นี่ วังสามหมอ" 
                className="h-10" 
              />
              <div className="flex flex-col">
                <span className="text-lg font-prompt font-bold text-wang-blue">ที่นี่ วังสามหมอ</span>
                <span className="text-xs text-gray-500">TOUR DER WANG</span>
              </div>
            </Link>
            <p className="text-gray-600 mt-2">
              แหล่งรวมตำแหน่งงานในพื้นที่วังสามหมอและบริเวณใกล้เคียง เชื่อมต่อคนหางานกับนายจ้างในภาคการท่องเที่ยวและบริการ
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-prompt font-medium text-lg mb-4">สำหรับคนหางาน</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-wang-orange transition-colors">
                  ค้นหางาน
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-wang-orange transition-colors">
                  สร้างโปรไฟล์
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-gray-600 hover:text-wang-orange transition-colors">
                  งานที่บันทึกไว้
                </Link>
              </li>
              <li>
                <Link to="/job-alerts" className="text-gray-600 hover:text-wang-orange transition-colors">
                  แจ้งเตือนงาน
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-prompt font-medium text-lg mb-4">สำหรับผู้ประกอบการ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/post-job" className="text-gray-600 hover:text-wang-orange transition-colors">
                  ลงประกาศงาน
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-wang-orange transition-colors">
                  ราคาและแพ็คเกจ
                </Link>
              </li>
              <li>
                <Link to="/company-profile" className="text-gray-600 hover:text-wang-orange transition-colors">
                  สร้างโปรไฟล์บริษัท
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-prompt font-medium text-lg mb-4">เกี่ยวกับเรา</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-wang-orange transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-wang-orange transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-wang-orange transition-colors">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-wang-orange transition-colors">
                  ข้อกำหนดการใช้งาน
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ที่นี่ วังสามหมอ. สงวนลิขสิทธิ์.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-wang-orange transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-500 hover:text-wang-orange transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-500 hover:text-wang-orange transition-colors">
              LINE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
