import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/data/jobs';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = memo(({ job }) => {
  return (
    <Link to={`/job/${job.id}`} className="block h-full transition-transform hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-wang-blue touch-manipulation" aria-label={`งาน ${job.titleThai || job.title} ที่ ${job.company}`}>
      <Card className="h-full job-card overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200">
        {job.isHot && (
          <div className="bg-wang-orange text-white text-xs font-prompt py-1 px-3 text-center">
            งานยอดนิยม
          </div>
        )}
        <CardContent className="p-3 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-prompt text-base sm:text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                {job.titleThai || job.title}
              </h3>
              <p className="text-gray-600 mb-1 truncate text-sm sm:text-base">{job.company}</p>
              <p className="text-gray-500 text-xs sm:text-sm flex items-center">
                <span className="truncate">{job.location}</span>
              </p>
            </div>
            {job.companyLogo && (
              <div className="flex-shrink-0">
                <img 
                  src={job.companyLogo} 
                  alt={`โลโก้ ${job.company}`}
                  loading="lazy"
                  className="w-9 h-9 sm:w-12 sm:h-12 object-contain" 
                />
              </div>
            )}
          </div>
          
          <div className="mt-2 sm:mt-3 mb-2 sm:mb-3 flex flex-wrap gap-1 sm:gap-2">
            {job.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="outline" className="bg-blue-50 text-wang-blue border-blue-200 text-xs whitespace-nowrap">
                {category}
              </Badge>
            ))}
            {job.categories.length > 2 && (
              <Badge variant="outline" className="bg-blue-50 text-wang-blue border-blue-200 text-xs">
                +{job.categories.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-2 sm:mt-3">
            <div className="text-wang-blue font-medium text-sm sm:text-base">
              {job.salary}
            </div>
            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">
              {job.employmentType}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 px-3 sm:px-5 py-2 text-xs text-gray-500 flex justify-between">
          <span className="truncate">เผยแพร่เมื่อ: {new Date(job.datePosted).toLocaleDateString('th-TH')}</span>
          <span className="text-wang-blue font-prompt">ดูรายละเอียด</span>
        </CardFooter>
      </Card>
    </Link>
  );
});

JobCard.displayName = 'JobCard';

export default JobCard;