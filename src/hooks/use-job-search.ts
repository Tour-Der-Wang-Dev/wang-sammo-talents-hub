import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Job } from '@/data/jobs';

interface UseJobSearchOptions {
  jobs: Job[];
}

export function useJobSearch({ jobs }: UseJobSearchOptions) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive state directly from URL search params
  const searchTerm = useMemo(() => searchParams.get('q') || '', [searchParams]);
  const selectedCategories = useMemo(() => searchParams.get('categories')?.split(',').filter(Boolean) || [], [searchParams]);
  const selectedTypes = useMemo(() => searchParams.get('types')?.split(',').filter(Boolean) || [], [searchParams]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.titleThai?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 ||
        job.categories.some(category => selectedCategories.includes(category));

      const matchesType = selectedTypes.length === 0 ||
        selectedTypes.includes(job.employmentType);

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [jobs, searchTerm, selectedCategories, selectedTypes]);

  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const handleCategoryChange = useCallback((category: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    const categories = selectedCategories;
    const newCategories = checked
      ? [...categories, category]
      : categories.filter(c => c !== category);
    
    if (newCategories.length > 0) {
      params.set('categories', newCategories.join(','));
    } else {
      params.delete('categories');
    }
    setSearchParams(params);
  }, [searchParams, setSearchParams, selectedCategories]);

  const handleTypeChange = useCallback((type: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    const types = selectedTypes;
    const newTypes = checked
      ? [...types, type]
      : types.filter(t => t !== type);

    if (newTypes.length > 0) {
      params.set('types', newTypes.join(','));
    } else {
      params.delete('types');
    }
    setSearchParams(params);
  }, [searchParams, setSearchParams, selectedTypes]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const hasActiveFilters = useMemo(() => !!searchTerm || selectedCategories.length > 0 || selectedTypes.length > 0, [searchTerm, selectedCategories, selectedTypes]);

  return {
    searchTerm,
    selectedCategories,
    selectedTypes,
    filteredJobs,
    handleSearch,
    handleCategoryChange,
    handleTypeChange,
    clearFilters,
    hasActiveFilters,
  };
}