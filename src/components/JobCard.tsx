
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/data/jobs';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link to={`/job/${job.id}`} className="block h-full">
      <Card className="h-full job-card overflow-hidden">
        {job.isHot && (
          <div className="bg-wang-orange text-white text-xs font-prompt py-1 px-3 text-center">
            งานยอดนิยม
          </div>
        )}
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-prompt text-base sm:text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                {job.titleThai || job.title}
              </h3>
              <p className="text-gray-600 mb-1 truncate">{job.company}</p>
              <p className="text-gray-500 text-sm flex items-center">
                <span className="truncate">{job.location}</span>
              </p>
            </div>
            {job.companyLogo && (
              <div className="flex-shrink-0">
                <img 
                  src={job.companyLogo} 
                  alt={job.company} 
                  loading="lazy"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
                />
              </div>
            )}
          </div>
          
          <div className="mt-3 mb-3 flex flex-wrap gap-1 sm:gap-2">
            {job.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="outline" className="bg-blue-50 text-wang-blue border-blue-200 text-xs">
                {category}
              </Badge>
            ))}
            {job.categories.length > 2 && (
              <Badge variant="outline" className="bg-blue-50 text-wang-blue border-blue-200 text-xs">
                +{job.categories.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="text-wang-blue font-medium text-sm sm:text-base">
              {job.salary}
            </div>
            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">
              {job.employmentType}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 text-xs text-gray-500 flex justify-between">
          <span className="truncate">เผยแพร่เมื่อ: {new Date(job.datePosted).toLocaleDateString('th-TH')}</span>
          <span className="text-wang-blue font-prompt">ดูรายละเอียด</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
