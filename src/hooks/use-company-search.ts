import { useState, useCallback, useMemo } from 'react';
import { Company } from '@/types/Company';

interface UseCompanySearchOptions {
  companies: Company[];
}

interface CompanySearchState {
  searchQuery: string;
  selectedIndustry: string;
  selectedSize: string;
}

export function useCompanySearch({ companies }: UseCompanySearchOptions) {
  const [state, setState] = useState<CompanySearchState>({
    searchQuery: '',
    selectedIndustry: '',
    selectedSize: '',
  });

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = !state.searchQuery || 
        company.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        company.nameEn.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(state.searchQuery.toLowerCase());

      const matchesIndustry = !state.selectedIndustry || 
        company.industry === state.selectedIndustry;

      const matchesSize = !state.selectedSize || 
        company.employeeCount === state.selectedSize;

      return matchesSearch && matchesIndustry && matchesSize;
    });
  }, [companies, state.searchQuery, state.selectedIndustry, state.selectedSize]);

  const verifiedCompanies = useMemo(() => 
    companies.filter(company => company.verified), 
    [companies]
  );

  const industries = useMemo(() => 
    Array.from(new Set(companies.map(company => company.industry))).sort(), 
    [companies]
  );

  const sizes = useMemo(() => 
    Array.from(new Set(companies.map(company => company.employeeCount))).sort(), 
    [companies]
  );

  const handleSearch = useCallback((query: string, industry: string, size: string) => {
    setState({
      searchQuery: query,
      selectedIndustry: industry,
      selectedSize: size,
    });
  }, []);

  const clearFilters = useCallback(() => {
    setState({
      searchQuery: '',
      selectedIndustry: '',
      selectedSize: '',
    });
  }, []);

  return {
    ...state,
    filteredCompanies,
    verifiedCompanies,
    industries,
    sizes,
    handleSearch,
    clearFilters,
    hasActiveFilters: state.searchQuery || state.selectedIndustry || state.selectedSize,
  };
}