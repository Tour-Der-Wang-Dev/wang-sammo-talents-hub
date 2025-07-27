import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Job } from '@/data/jobs';

interface UseJobSearchOptions {
  jobs: Job[];
  debounceMs?: number;
}

interface JobSearchState {
  searchTerm: string;
  selectedCategories: string[];
  selectedTypes: string[];
}

export function useJobSearch({ jobs, debounceMs = 300 }: UseJobSearchOptions) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [state, setState] = useState<JobSearchState>({
    searchTerm: searchParams.get('q') || '',
    selectedCategories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
    selectedTypes: searchParams.get('types')?.split(',').filter(Boolean) || [],
  });

  // Memoized filtered jobs for performance
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = !state.searchTerm || 
        job.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        job.titleThai?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(state.searchTerm.toLowerCase());

      const matchesCategory = state.selectedCategories.length === 0 ||
        job.categories.some(category => state.selectedCategories.includes(category));

      const matchesType = state.selectedTypes.length === 0 ||
        state.selectedTypes.includes(job.employmentType);

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [jobs, state.searchTerm, state.selectedCategories, state.selectedTypes]);

  // Update URL params when filters change
  const updateSearchParams = useCallback((newState: Partial<JobSearchState>) => {
    const updatedState = { ...state, ...newState };
    const params = new URLSearchParams();
    
    if (updatedState.searchTerm) params.set('q', updatedState.searchTerm);
    if (updatedState.selectedCategories.length > 0) {
      params.set('categories', updatedState.selectedCategories.join(','));
    }
    if (updatedState.selectedTypes.length > 0) {
      params.set('types', updatedState.selectedTypes.join(','));
    }
    
    setSearchParams(params);
    setState(updatedState);
  }, [state, setSearchParams]);

  const handleSearch = useCallback((searchTerm: string) => {
    updateSearchParams({ searchTerm });
  }, [updateSearchParams]);

  const handleCategoryChange = useCallback((category: string, checked: boolean) => {
    const selectedCategories = checked
      ? [...state.selectedCategories, category]
      : state.selectedCategories.filter(c => c !== category);
    
    updateSearchParams({ selectedCategories });
  }, [state.selectedCategories, updateSearchParams]);

  const handleTypeChange = useCallback((type: string, checked: boolean) => {
    const selectedTypes = checked
      ? [...state.selectedTypes, type]
      : state.selectedTypes.filter(t => t !== type);
    
    updateSearchParams({ selectedTypes });
  }, [state.selectedTypes, updateSearchParams]);

  const clearFilters = useCallback(() => {
    setState({
      searchTerm: '',
      selectedCategories: [],
      selectedTypes: [],
    });
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    ...state,
    filteredJobs,
    handleSearch,
    handleCategoryChange,
    handleTypeChange,
    clearFilters,
    hasActiveFilters: state.searchTerm || state.selectedCategories.length > 0 || state.selectedTypes.length > 0,
  };
}