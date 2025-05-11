
import React from 'react';
import { useOptimizedImage } from '@/hooks/use-optimized-image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  eager?: boolean;
  fallback?: string;
}

/**
 * OptimizedImage component that handles lazy loading, fallbacks, and improved performance
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  eager = false,
  fallback = '/placeholder.svg'
}) => {
  const { imageProps, loaded } = useOptimizedImage({
    src,
    alt,
    eager,
    width,
    height,
    fallback
  });

  return (
    <img
      {...imageProps}
      className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
    />
  );
};

export default OptimizedImage;
