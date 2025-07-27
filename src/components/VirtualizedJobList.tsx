import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Job } from '@/data/jobs';
import JobCard from './JobCard';
import { useVirtualScroll } from '@/utils/performance';
import { LoadingSkeleton } from './ui/loading-state';

interface VirtualizedJobListProps {
  jobs: Job[];
  containerHeight?: number;
  itemHeight?: number;
  className?: string;
}

const VirtualizedJobList: React.FC<VirtualizedJobListProps> = ({
  jobs,
  containerHeight = 600,
  itemHeight = 200,
  className = '',
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { getVisibleRange, getItemStyle, getTotalHeight } = useVirtualScroll(
    jobs,
    { itemHeight, containerHeight }
  );

  const { startIndex, endIndex } = useMemo(
    () => getVisibleRange(scrollTop),
    [getVisibleRange, scrollTop]
  );

  const visibleJobs = useMemo(
    () => jobs.slice(startIndex, endIndex + 1),
    [jobs, startIndex, endIndex]
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Handle loading state
  if (jobs.length === 0) {
    return (
      <div className={`h-96 ${className}`}>
        <LoadingSkeleton type="job-list" count={3} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: getTotalHeight(),
          position: 'relative',
        }}
      >
        {visibleJobs.map((job, index) => {
          const actualIndex = startIndex + index;
          return (
            <div
              key={job.id}
              style={getItemStyle(actualIndex)}
              className="px-2"
            >
              <JobCard job={job} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(VirtualizedJobList);