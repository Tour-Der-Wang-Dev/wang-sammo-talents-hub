import { useCallback, useRef } from 'react';

/**
 * Debounce hook for performance optimization
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

/**
 * Throttle hook for performance optimization
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef<number>(0);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    }) as T,
    [callback, delay]
  );
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(() => {
    if (elementRef.current && !observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback();
              observerRef.current?.disconnect();
            }
          });
        },
        { threshold: 0.1, ...options }
      );
      
      observerRef.current.observe(elementRef.current);
    }
  }, [elementRef, callback, options]);

  const disconnect = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  }, []);

  return { observe, disconnect };
}

/**
 * Virtual scrolling utilities
 */
export interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function useVirtualScroll<T>(
  items: T[],
  options: VirtualScrollOptions
) {
  const { itemHeight, containerHeight, overscan = 5 } = options;
  
  const getVisibleRange = useCallback((scrollTop: number) => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
      visibleStart + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );
    
    const startIndex = Math.max(0, visibleStart - overscan);
    const endIndex = Math.min(items.length - 1, visibleEnd + overscan);
    
    return { startIndex, endIndex, visibleStart, visibleEnd };
  }, [itemHeight, containerHeight, overscan, items.length]);

  const getItemStyle = useCallback((index: number) => ({
    position: 'absolute' as const,
    top: index * itemHeight,
    height: itemHeight,
    width: '100%',
  }), [itemHeight]);

  const getTotalHeight = useCallback(() => items.length * itemHeight, [items.length, itemHeight]);

  return {
    getVisibleRange,
    getItemStyle,
    getTotalHeight,
  };
}

/**
 * Memory optimization utilities
 */
export const memoizeByProps = <T extends Record<string, any>>(
  fn: (props: T) => any,
  propKeys: (keyof T)[]
) => {
  const cache = new Map<string, any>();
  
  return (props: T) => {
    const key = propKeys.map(k => props[k]).join('|');
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(props);
    cache.set(key, result);
    
    // Prevent memory leaks - limit cache size
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  };
};

/**
 * Performance monitoring utilities
 */
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${end - start} milliseconds`);
  }
};

export const withPerformanceLogging = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} execution time: ${end - start}ms`);
    }
    
    return result;
  }) as T;
};