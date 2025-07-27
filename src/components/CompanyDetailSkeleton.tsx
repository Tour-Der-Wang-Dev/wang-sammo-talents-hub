import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CompanyDetailSkeleton = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-6 w-40 mb-6" />
      
      {/* Header Skeleton */}
      <Card className="overflow-hidden mb-8">
        <Skeleton className="h-48 w-full" />
        <CardContent className="p-6 relative">
          <Skeleton className="absolute -top-16 left-6 w-24 h-24 rounded-full border-4 border-background" />
          <div className="mt-12 space-y-3">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default CompanyDetailSkeleton;