import { useState, useCallback, useMemo } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export function usePagination({ 
  totalItems, 
  itemsPerPage = 12, 
  initialPage = 1 
}: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(() => 
    Math.ceil(totalItems / itemsPerPage), 
    [totalItems, itemsPerPage]
  );

  const startIndex = useMemo(() => 
    (currentPage - 1) * itemsPerPage, 
    [currentPage, itemsPerPage]
  );

  const endIndex = useMemo(() => 
    Math.min(startIndex + itemsPerPage, totalItems), 
    [startIndex, itemsPerPage, totalItems]
  );

  const canGoNext = useMemo(() => 
    currentPage < totalPages, 
    [currentPage, totalPages]
  );

  const canGoPrevious = useMemo(() => 
    currentPage > 1, 
    [currentPage]
  );

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentPage(prev => prev + 1);
    }
  }, [canGoNext]);

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentPage(prev => prev - 1);
    }
  }, [canGoPrevious]);

  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Generate page numbers for pagination UI
  const pageNumbers = useMemo(() => {
    const delta = 2; // Show 2 pages before and after current page
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    let prev = 0;
    for (const i of range) {
      if (i - prev === 2) {
        rangeWithDots.push(prev + 1);
      } else if (i - prev !== 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    canGoNext,
    canGoPrevious,
    goToPage,
    goToNext,
    goToPrevious,
    reset,
    pageNumbers,
    itemsPerPage,
  };
}