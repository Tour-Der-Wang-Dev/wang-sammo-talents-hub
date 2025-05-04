
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { jobs } from '@/data/jobs';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Get hot jobs
  const hotJobs = jobs.filter(job => job.isHot);
  
  // Get recent jobs (limited to 3 on mobile, 6 on desktop)
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
    .slice(0, 6);

  // Handle search with navigation
  const handleSearch = useCallback((term: string) => {
    navigate(`/jobs?q=${encodeURIComponent(term)}`);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="banner-gradient text-white py-12 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="thai-pattern absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-prompt text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              ค้นหาตำแหน่งงานในวังสามหมอ
            </h1>
            <p className="text-base md:text-lg lg:text-xl opacity-90 mb-6 md:mb-8">
              แหล่งรวมตำแหน่งงานในท้องถิ่นทั้งหมดสำหรับผู้ที่ต้องการทำงานในภาคการท่องเที่ยวและการบริการ
            </p>
            
            <SearchBar onSearch={handleSearch} />
            
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-gray-200">ยอดนิยม:</span>
              <Link to="/jobs?category=Tourism" className="text-white hover:text-wang-orange transition-colors underline mr-2">
                ท่องเที่ยว
              </Link>
              <Link to="/jobs?category=Hospitality" className="text-white hover:text-wang-orange transition-colors underline mr-2">
                การโรงแรม
              </Link>
              <Link to="/jobs?category=Food" className="text-white hover:text-wang-orange transition-colors underline">
                อาหารและเครื่องดื่ม
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="font-prompt text-xl sm:text-2xl md:text-3xl font-bold">
              งานยอดนิยม
            </h2>
            <Link to="/jobs">
              <Button variant="outline" className="font-prompt text-sm sm:text-base">
                ดูทั้งหมด
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {hotJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="font-prompt text-xl sm:text-2xl md:text-3xl font-bold">
              งานล่าสุด
            </h2>
            <Link to="/jobs">
              <Button variant="outline" className="font-prompt text-sm sm:text-base">
                ดูทั้งหมด
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recentJobs.slice(0, window.innerWidth < 640 ? 3 : 6).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-prompt text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              ต้องการประกาศรับสมัครพนักงาน?
            </h2>
            <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
              เข้าถึงผู้สมัครงานที่มีคุณภาพในพื้นที่วังสามหมอ เพิ่มโอกาสในการได้พนักงานที่เหมาะสมกับธุรกิจของคุณ
            </p>
            <Button className="bg-wang-orange hover:bg-orange-600 text-white font-prompt py-3 px-6 sm:py-6 sm:px-8 rounded-md">
              ลงประกาศรับสมัครงาน
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
