import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import FilterPanel from '@/components/FilterPanel';
import { jobs } from '@/data/jobs';
import { generateJobListingSchema } from '@/utils/seo';
import SEO from '@/components/SEO';

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Initialize filters from URL params - optimized with useEffect dependencies
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategories([category]);
    }
    
    const type = searchParams.get('type');
    if (type) {
      setSelectedTypes([type]);
    }
    
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  // Memoize filtered jobs for better performance
  const filteredJobs = useMemo(() => {
    let results = [...jobs];
    
    // Apply search term filter
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      results = results.filter(
        job => 
          job.title.toLowerCase().includes(lowercaseSearchTerm) ||
          (job.titleThai && job.titleThai.toLowerCase().includes(lowercaseSearchTerm)) ||
          job.company.toLowerCase().includes(lowercaseSearchTerm) ||
          job.location.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(job => 
        job.categories.some(category => selectedCategories.includes(category))
      );
    }
    
    // Apply job type filter
    if (selectedTypes.length > 0) {
      results = results.filter(job => selectedTypes.includes(job.employmentType));
    }
    
    return results;
  }, [searchTerm, selectedCategories, selectedTypes]);

  // Update URL params when filters change - optimized with useEffect dependencies
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedCategories.length === 1) params.set('category', selectedCategories[0]);
    if (selectedTypes.length === 1) params.set('type', selectedTypes[0]);
    setSearchParams(params);
  }, [searchTerm, selectedCategories, selectedTypes, setSearchParams]);

  // Memoized event handlers
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleCategoryChange = useCallback((category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  }, []);

  const handleTypeChange = useCallback((type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes(prev => [...prev, type]);
    } else {
      setSelectedTypes(prev => prev.filter(t => t !== type));
    }
  }, []);

  // Generate page title based on search parameters
  const generatePageTitle = useCallback(() => {
    const parts = [];
    
    if (searchTerm) {
      parts.push(`"${searchTerm}"`);
    }
    
    if (selectedCategories.length > 0) {
      parts.push(selectedCategories.join(', '));
    }
    
    if (selectedTypes.length > 0) {
      parts.push(selectedTypes.join(', '));
    }
    
    return parts.length > 0 
      ? `งานในกลุ่ม ${parts.join(' ')}` 
      : 'ค้นหางานทั้งหมด';
  }, [searchTerm, selectedCategories, selectedTypes]);

  // Structured data for job listings
  const structuredData = generateJobListingSchema(filteredJobs);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={generatePageTitle()}
        description={`ค้นหางานในวังสามหมอ${searchTerm ? ' สำหรับ ' + searchTerm : ''} - พบ ${filteredJobs.length} ตำแหน่งงาน`}
        structuredData={structuredData}
      />
      <Header />
      
      {/* Search Bar Section - Optimized for mobile */}
      <section className="bg-gray-50 py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <h1 className="font-prompt text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4">
            ค้นหางาน
          </h1>
          <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        </div>
      </section>
      
      {/* Main Content - Better mobile layout */}
      <section className="py-4 sm:py-6 flex-grow">
        <div className="container mx-auto px-4">
          <div className="lg:hidden mb-3">
            <FilterPanel 
              selectedCategories={selectedCategories}
              selectedTypes={selectedTypes}
              onCategoryChange={handleCategoryChange}
              onTypeChange={handleTypeChange}
            />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Filter Sidebar - Desktop Only */}
            <div className="hidden lg:block w-1/4 lg:w-1/5">
              <FilterPanel 
                selectedCategories={selectedCategories}
                selectedTypes={selectedTypes}
                onCategoryChange={handleCategoryChange}
                onTypeChange={handleTypeChange}
              />
            </div>
            
            {/* Job Listings */}
            <div className="w-full lg:w-3/4 lg:w-4/5">
              <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 mb-4">
                <h2 className="text-base font-medium mb-1">ผลการค้นหา</h2>
                <p className="text-gray-500 text-sm">พบ {filteredJobs.length} ตำแหน่งงาน</p>
              </div>
              
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">ไม่พบตำแหน่งงานที่ตรงกับเงื่อนไข</h3>
                  <p className="text-gray-500 text-sm">
                    ลองเปลี่ยนคำค้นหาหรือตัวกรองเพื่อดูผลลัพธ์เพิ่มเติม
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default JobsPage;
