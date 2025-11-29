/**
 * Filter Context
 * Centralized state management for browse page filters using useReducer
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { STORAGE_KEYS } from '../data/browsePageConstants';

/**
 * Create FilterContext
 */
const FilterContext = createContext(null);

/**
 * Initial state for filters
 */
const getInitialState = () => ({
  searchQuery: '',
  categoryId: null,
  priceRange: null,
  minRating: null,
  sortBy: 'newest',
  currentPage: 1,
  itemsPerPage: 12,
});

/**
 * Filter reducer function
 * Handles all filter state updates
 */
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
        currentPage: 1, // Reset to first page on search
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        categoryId: action.payload,
        currentPage: 1,
      };

    case 'SET_PRICE_RANGE':
      return {
        ...state,
        priceRange: action.payload,
        currentPage: 1,
      };

    case 'SET_MIN_RATING':
      return {
        ...state,
        minRating: action.payload,
        currentPage: 1,
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload,
        currentPage: 1,
      };

    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };

    case 'SET_ITEMS_PER_PAGE':
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: 1,
      };

    case 'CLEAR_ALL':
      return getInitialState();

    case 'RESTORE_FROM_STORAGE':
      return {
        ...getInitialState(),
        ...action.payload,
      };

    default:
      return state;
  }
};

/**
 * FilterProvider Component
 * Wraps children with filter context
 */
export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, getInitialState());

  // Memoized action creators
  const setSearchQuery = useCallback(
    (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    []
  );

  const setCategory = useCallback(
    (categoryId) => dispatch({ type: 'SET_CATEGORY', payload: categoryId }),
    []
  );

  const setPriceRange = useCallback(
    (priceRange) => dispatch({ type: 'SET_PRICE_RANGE', payload: priceRange }),
    []
  );

  const setMinRating = useCallback(
    (rating) => dispatch({ type: 'SET_MIN_RATING', payload: rating }),
    []
  );

  const setSort = useCallback(
    (sortBy) => dispatch({ type: 'SET_SORT', payload: sortBy }),
    []
  );

  const setPage = useCallback(
    (page) => dispatch({ type: 'SET_PAGE', payload: page }),
    []
  );

  const setItemsPerPage = useCallback(
    (itemsPerPage) => dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: itemsPerPage }),
    []
  );

  const clearAllFilters = useCallback(
    () => dispatch({ type: 'CLEAR_ALL' }),
    []
  );

  const restoreFromStorage = useCallback(
    (filters) => dispatch({ type: 'RESTORE_FROM_STORAGE', payload: filters }),
    []
  );

  const value = {
    // State
    filters: state,

    // Actions
    setSearchQuery,
    setCategory,
    setPriceRange,
    setMinRating,
    setSort,
    setPage,
    setItemsPerPage,
    clearAllFilters,
    restoreFromStorage,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

/**
 * Custom hook to use FilterContext
 * @returns {Object} Filter context value
 * @throws {Error} If used outside FilterProvider
 */
export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within FilterProvider');
  }
  return context;
}

export default FilterContext;
