import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const JobDetailSkeleton = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="container mx-auto px-4 py-6 md:py-8 flex-grow">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Main Content Skeleton */}
        <div className="w-full md:w-2/3 space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-5 w-1/3" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-px w-full" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default JobDetailSkeleton;