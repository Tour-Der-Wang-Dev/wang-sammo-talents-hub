import React, { useCallback, useMemo } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import FilterPanel from '@/components/FilterPanel';
import { generateJobListingSchema } from '@/utils/seo';
import SEO from '@/components/SEO';
import { useJobSearch } from '@/hooks/use-job-search';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs } from '@/api/mockApi';
import JobCardSkeleton from '@/components/JobCardSkeleton';
import { Job } from '@/data/jobs';
import { usePagination } from '@/hooks/use-pagination';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const JobsPage = () => {
  const { data: jobs, isLoading, isError } = useQuery<Job[], Error>({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  const {
    searchTerm,
    selectedCategories,
    selectedTypes,
    filteredJobs,
    handleSearch,
    handleCategoryChange,
    handleTypeChange,
  } = useJobSearch({ jobs: jobs || [] });

  const {
    currentPage,
    totalPages,
    goToPage,
    goToNext,
    goToPrevious,
    pageNumbers,
    startIndex,
    endIndex,
  } = usePagination({ totalItems: filteredJobs.length, itemsPerPage: 8 });

  const paginatedJobs = useMemo(() => filteredJobs.slice(startIndex, endIndex), [filteredJobs, startIndex, endIndex]);

  const generatePageTitle = useCallback(() => {
    const parts = [];
    if (searchTerm) parts.push(`"${searchTerm}"`);
    if (selectedCategories.length > 0) parts.push(selectedCategories.join(', '));
    if (selectedTypes.length > 0) parts.push(selectedTypes.join(', '));
    return parts.length > 0 ? `งานในกลุ่ม ${parts.join(' ')}` : 'ค้นหางานทั้งหมด';
  }, [searchTerm, selectedCategories, selectedTypes]);

  const structuredData = generateJobListingSchema(filteredJobs);

  return (
    <Layout className="bg-gray-50">
      <SEO 
        title={generatePageTitle()}
        description={`ค้นหางานในวังสามหมอ${searchTerm ? ' สำหรับ ' + searchTerm : ''} - พบ ${filteredJobs.length} ตำแหน่งงาน`}
        structuredData={structuredData}
      />
      
      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <h1 className="font-prompt text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4">
            ค้นหางาน
          </h1>
          <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        </div>
      </section>
      
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
            <div className="hidden lg:block w-1/4 lg:w-1/5">
              <FilterPanel 
                selectedCategories={selectedCategories}
                selectedTypes={selectedTypes}
                onCategoryChange={handleCategoryChange}
                onTypeChange={handleTypeChange}
              />
            </div>
            
            <div className="w-full lg:w-3/4 lg:w-4/5">
              <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 mb-4">
                <h2 className="text-base font-medium mb-1">ผลการค้นหา</h2>
                <p className="text-gray-500 text-sm">พบ {isLoading ? '...' : filteredJobs.length} ตำแหน่งงาน</p>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {Array.from({ length: 8 }).map((_, i) => <JobCardSkeleton key={i} />)}
                </div>
              ) : isError ? (
                <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">เกิดข้อผิดพลาด</h3>
                  <p className="text-gray-500 text-sm">ไม่สามารถโหลดข้อมูลงานได้ กรุณาลองอีกครั้ง</p>
                </div>
              ) : paginatedJobs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {paginatedJobs.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <Pagination className="mt-6">
                      <PaginationContent>
                        <PaginationItem><PaginationPrevious onClick={goToPrevious} className="cursor-pointer" /></PaginationItem>
                        {pageNumbers.map((page, index) => (
                          <PaginationItem key={index}>
                            {typeof page === 'string' ? (
                              <span>{page}</span>
                            ) : (
                              <PaginationLink isActive={page === currentPage} onClick={() => goToPage(page)} className="cursor-pointer">
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                        <PaginationItem><PaginationNext onClick={goToNext} className="cursor-pointer" /></PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
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
    </Layout>
  );
};

export default JobsPage;