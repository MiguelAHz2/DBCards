import { useState } from 'react';

interface Filters {
  searchTerm: string;
  selectedRace: string | null;
  selectedCategory: string | null;
  showFavorites: boolean;
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    selectedRace: null,
    selectedCategory: null,
    showFavorites: false
  });

  const updateSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const updateRaceFilter = (selectedRace: string | null) => {
    setFilters(prev => ({ ...prev, selectedRace }));
  };

  const updateCategoryFilter = (selectedCategory: string | null) => {
    setFilters(prev => ({ ...prev, selectedCategory }));
  };

  const toggleFavoritesFilter = () => {
    setFilters(prev => ({ ...prev, showFavorites: !prev.showFavorites }));
  };

  const setShowFavorites = (showFavorites: boolean) => {
    setFilters(prev => ({ ...prev, showFavorites }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      selectedRace: null,
      selectedCategory: null,
      showFavorites: false
    });
  };

  return {
    filters,
    updateSearchTerm,
    updateRaceFilter,
    updateCategoryFilter,
    toggleFavoritesFilter,
    setShowFavorites,
    resetFilters
  };
} 