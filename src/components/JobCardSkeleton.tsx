import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const JobCardSkeleton = () => (
  <Card className="h-full overflow-hidden">
    <CardContent className="p-3 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="w-9 h-9 sm:w-12 sm:h-12 rounded-full" />
      </div>
      <div className="mt-3 mb-3 flex flex-wrap gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="flex items-center justify-between mt-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>
    </CardContent>
    <CardFooter className="border-t bg-gray-50 px-3 sm:px-5 py-2 flex justify-between">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
    </CardFooter>
  </Card>
);

export default JobCardSkeleton;