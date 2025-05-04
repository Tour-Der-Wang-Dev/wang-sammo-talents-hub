
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
    <Link to={`/job/${job.id}`}>
      <Card className="h-full job-card overflow-hidden">
        {job.isHot && (
          <div className="bg-wang-orange text-white text-xs font-prompt py-1 px-3 text-center">
            งานยอดนิยม
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="mr-4">
              <h3 className="font-prompt text-lg font-medium text-gray-900 mb-1">
                {job.titleThai || job.title}
              </h3>
              <p className="text-gray-600 mb-1">{job.company}</p>
              <p className="text-gray-500 text-sm flex items-center">
                <span>{job.location}</span>
              </p>
            </div>
            {job.companyLogo && (
              <div className="flex-shrink-0">
                <img 
                  src={job.companyLogo} 
                  alt={job.company} 
                  className="w-12 h-12 object-contain" 
                />
              </div>
            )}
          </div>
          
          <div className="mt-3 mb-4 flex flex-wrap gap-2">
            {job.categories.map((category) => (
              <Badge key={category} variant="outline" className="bg-blue-50 text-wang-blue border-blue-200">
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-wang-blue font-medium">
              {job.salary}
            </div>
            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
              {job.employmentType}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 px-6 py-3 text-xs text-gray-500 flex justify-between">
          <span>เผยแพร่เมื่อ: {new Date(job.datePosted).toLocaleDateString('th-TH')}</span>
          <span className="text-wang-blue font-prompt">ดูรายละเอียด</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
