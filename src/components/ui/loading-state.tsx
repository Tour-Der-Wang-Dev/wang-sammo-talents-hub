import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = 'md', text, className }: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-wang-blue', sizeClasses[size])} />
      {text && (
        <span className="text-sm text-gray-600 font-prompt">{text}</span>
      )}
    </div>
  );
}

interface LoadingSkeletonProps {
  type: 'job-card' | 'company-card' | 'job-list' | 'company-list' | 'job-detail';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ type, count = 1, className }: LoadingSkeletonProps) {
  const renderJobCardSkeleton = () => (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-10 w-10 rounded" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );

  const renderCompanyCardSkeleton = () => (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );

  const renderJobDetailSkeleton = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-28" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );

  const skeletonComponents = {
    'job-card': renderJobCardSkeleton,
    'company-card': renderCompanyCardSkeleton,
    'job-list': renderJobCardSkeleton,
    'company-list': renderCompanyCardSkeleton,
    'job-detail': renderJobDetailSkeleton,
  };

  const SkeletonComponent = skeletonComponents[type];

  if (type === 'job-detail') {
    return <div className={className}>{SkeletonComponent()}</div>;
  }

  return (
    <div className={cn('grid gap-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{SkeletonComponent()}</div>
      ))}
    </div>
  );
}

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorBoundary?: boolean;
}

export function SuspenseWrapper({ 
  children, 
  fallback = <LoadingSpinner text="กำลังโหลด..." />,
  errorBoundary = true 
}: SuspenseWrapperProps) {
  const content = (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  );

  if (errorBoundary) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}