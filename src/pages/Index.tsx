import React, { useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { generateWebsiteSchema, generateJobListingSchema } from '@/utils/seo';
import SEO from '@/components/SEO';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs } from '@/api/mockApi';
import JobCardSkeleton from '@/components/JobCardSkeleton';
import { Job } from '@/data/jobs';

const Index = () => {
  const navigate = useNavigate();
  
  const { data: jobsData, isLoading: isLoadingJobs } = useQuery<Job[], Error>({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  const hotJobs = useMemo(() => (jobsData || []).filter(job => job.isHot), [jobsData]);
  
  const recentJobs = useMemo(() => {
    return [...(jobsData || [])]
      .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
      .slice(0, 6);
  }, [jobsData]);

  const displayCount = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 640 ? 3 : 6;
  }, []);

  const handleSearch = useCallback((term: string) => {
    navigate(`/jobs?q=${encodeURIComponent(term)}`);
  }, [navigate]);

  const structuredData = [
    generateWebsiteSchema(),
    generateJobListingSchema(recentJobs)
  ];

  return (
    <Layout>
      <SEO 
        title="หน้าแรก"
        description="แหล่งรวมตำแหน่งงานในพื้นที่วังสามหมอและบริเวณใกล้เคียง เชื่อมต่อคนหางานกับนายจ้างในภาคการท่องเที่ยวและบริการ"
        structuredData={structuredData}
      />
      
      <section className="banner-gradient text-white py-8 md:py-16 lg:py-20 relative overflow-hidden">
        <div className="thai-pattern absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-prompt text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-5">
              ค้นหาตำแหน่งงานในวังสามหมอ
            </h1>
            <p className="text-sm md:text-base lg:text-lg opacity-90 mb-5 md:mb-6">
              แหล่งรวมตำแหน่งงานในท้องถิ่นทั้งหมดสำหรับผู้ที่ต้องการทำงานในภาคการท่องเที่ยวและการบริการ
            </p>
            <SearchBar onSearch={handleSearch} />
            <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
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

      <section className="py-6 md:py-10 lg:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="font-prompt text-xl sm:text-2xl md:text-2xl font-bold">
              งานยอดนิยม
            </h2>
            <Link to="/jobs">
              <Button variant="outline" className="font-prompt text-xs sm:text-sm">
                ดูทั้งหมด
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {isLoadingJobs ? (
              Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={i} />)
            ) : (
              hotJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="font-prompt text-xl sm:text-2xl md:text-2xl font-bold">
              งานล่าสุด
            </h2>
            <Link to="/jobs">
              <Button variant="outline" className="font-prompt text-xs sm:text-sm">
                ดูทั้งหมด
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {isLoadingJobs ? (
              Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
            ) : (
              recentJobs.slice(0, displayCount).map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10 lg:py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-prompt text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3">
              ต้องการประกาศรับสมัครพนักงาน?
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
              เข้าถึงผู้สมัครงานที่มีคุณภาพในพื้นที่วังสามหมอ เพิ่มโอกาสในการได้พนักงานที่เหมาะสมกับธุรกิจของคุณ
            </p>
            <Link to="/post-job">
              <Button className="bg-wang-orange hover:bg-orange-600 text-white font-prompt py-2 px-4 sm:py-3 sm:px-6 rounded-md">
                ลงประกาศรับสมัครงาน
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;