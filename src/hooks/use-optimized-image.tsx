
import { useState, useEffect } from 'react';

interface UseOptimizedImageOptions {
  src: string;
  fallback?: string;
  eager?: boolean;
  width?: number;
  height?: number;
  alt: string;
}

/**
 * Custom hook for optimized image loading with lazy loading and fallback
 */
export function useOptimizedImage({
  src,
  fallback = '/placeholder.svg',
  eager = false,
  width,
  height,
  alt
}: UseOptimizedImageOptions) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(eager ? src : fallback);

  useEffect(() => {
    if (eager) return;

    const img = new Image();
    img.src = src;
    
    const onLoad = () => {
      setLoaded(true);
      setImageSrc(src);
    };
    
    const onError = () => {
      setError(true);
      console.error(`Failed to load image: ${src}`);
    };

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, eager]);

  const imageProps = {
    src: imageSrc,
    alt,
    loading: eager ? 'eager' : 'lazy',
    width,
    height,
    onError: () => setImageSrc(fallback),
  };

  return { imageProps, loaded, error };
}

export default useOptimizedImage;
