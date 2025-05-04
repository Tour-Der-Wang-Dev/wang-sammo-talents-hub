
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <h1 className="font-prompt text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">หน้าที่คุณกำลังมองหาไม่มีอยู่</p>
          <p className="text-gray-500 mb-8">
            หน้าเว็บที่คุณพยายามเข้าถึงอาจได้รับการย้ายหรือลบออกแล้ว
          </p>
          <Button asChild>
            <Link to="/">กลับไปยังหน้าแรก</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
