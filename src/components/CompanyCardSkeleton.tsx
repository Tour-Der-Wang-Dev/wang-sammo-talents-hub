import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CompanyCardSkeleton = () => (
  <Card className="h-full overflow-hidden">
    <Skeleton className="h-32 w-full" />
    <CardContent className="p-4">
      <div className="relative">
        <Skeleton className="absolute -top-12 left-0 w-16 h-16 rounded-full border-4 border-background" />
      </div>
      <div className="mt-6 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </CardContent>
    <CardFooter className="bg-gray-50 px-4 py-3 border-t flex justify-between">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-5 w-1/4" />
    </CardFooter>
  </Card>
);

export default CompanyCardSkeleton;