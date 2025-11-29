/**
 * BrowsePage Helper Functions
 * Filtering, sorting, validation, and utility functions for BrowsePage
 */

import { PRICE_RANGES, RATING_OPTIONS } from '../data/browsePageConstants';

/**
 * Filter items by search query (title and category)
 * @param {Array} items - Items to filter
 * @param {string} query - Search query
 * @returns {Array} Filtered items
 */
export const filterBySearch = (items, query) => {
  if (!query || !query.trim()) {
    return items;
  }

  const lowerQuery = query.toLowerCase().trim();
  return items.filter((item) => {
    const titleMatch = item?.title?.toLowerCase().includes(lowerQuery);
    const categoryMatch = item?.category?.toLowerCase().includes(lowerQuery);
    const descriptionMatch = item?.description?.toLowerCase().includes(lowerQuery);
    return titleMatch || categoryMatch || descriptionMatch;
  });
};

/**
 * Filter items by category
 * @param {Array} items - Items to filter
 * @param {string|number} categoryId - Category ID
 * @returns {Array} Filtered items
 */
export const filterByCategory = (items, categoryId) => {
  if (!categoryId) {
    return items;
  }
  return items.filter((item) => item?.category === categoryId || item?.categoryId === categoryId);
};

/**
 * Filter items by price range
 * @param {Array} items - Items to filter
 * @param {Object} priceRange - Price range object {min, max}
 * @returns {Array} Filtered items
 */
export const filterByPriceRange = (items, priceRange) => {
  if (!priceRange) {
    return items;
  }

  return items.filter((item) => {
    const price = parseFloat(item?.price) || 0;
    return price >= priceRange.min && price <= priceRange.max;
  });
};

/**
 * Filter items by minimum rating
 * @param {Array} items - Items to filter
 * @param {number} minRating - Minimum rating value (0-5)
 * @returns {Array} Filtered items
 */
export const filterByRating = (items, minRating) => {
  if (!minRating) {
    return items;
  }

  return items.filter((item) => {
    const rating = parseFloat(item?.rating) || 0;
    return rating >= minRating;
  });
};

/**
 * Apply all filters to items
 * @param {Array} items - Items to filter
 * @param {Object} filters - Filter object with properties: searchQuery, categoryId, priceRange, minRating
 * @returns {Array} Filtered items
 */
export const applyAllFilters = (items, filters) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  let result = [...items];

  // Apply filters in order
  if (filters?.searchQuery) {
    result = filterBySearch(result, filters.searchQuery);
  }

  if (filters?.categoryId) {
    result = filterByCategory(result, filters.categoryId);
  }

  if (filters?.priceRange) {
    result = filterByPriceRange(result, filters.priceRange);
  }

  if (filters?.minRating) {
    result = filterByRating(result, filters.minRating);
  }

  return result;
};

/**
 * Sort items by specified criteria
 * @param {Array} items - Items to sort
 * @param {string} sortBy - Sort criteria: 'newest', 'price-low', 'price-high', 'rating'
 * @returns {Array} Sorted items
 */
export const sortItems = (items, sortBy) => {
  if (!Array.isArray(items) || items.length === 0) {
    return items;
  }

  const sorted = [...items];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => (parseFloat(a?.price) || 0) - (parseFloat(b?.price) || 0));

    case 'price-high':
      return sorted.sort((a, b) => (parseFloat(b?.price) || 0) - (parseFloat(a?.price) || 0));

    case 'rating':
      return sorted.sort(
        (a, b) =>
          (parseFloat(b?.rating) || 0) - (parseFloat(a?.rating) || 0) ||
          (b?.reviewCount || 0) - (a?.reviewCount || 0)
      );

    case 'newest':
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime()
      );
  }
};

/**
 * Get paginated items
 * @param {Array} items - Items to paginate
 * @param {number} currentPage - Current page (1-indexed)
 * @param {number} itemsPerPage - Items per page
 * @returns {Array} Paginated items
 */
export const getPaginatedItems = (items, currentPage, itemsPerPage) => {
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  return items.slice(startIdx, endIdx);
};

/**
 * Calculate total pages
 * @param {number} totalItems - Total number of items
 * @param {number} itemsPerPage - Items per page
 * @returns {number} Total pages
 */
export const calculateTotalPages = (totalItems, itemsPerPage) => {
  return Math.ceil(totalItems / itemsPerPage);
};

/**
 * Get page numbers to display in pagination
 * @param {number} currentPage - Current page
 * @param {number} totalPages - Total pages
 * @param {number} maxButtons - Maximum buttons to show
 * @returns {Array<number>} Array of page numbers
 */
export const getPageNumbers = (currentPage, totalPages, maxButtons = 5) => {
  const pages = [];

  if (totalPages <= maxButtons) {
    // Show all pages if total is less than max buttons
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show pages with current page in the middle
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);

    // Adjust start if end is at the limit
    if (end === totalPages) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return pages;
};

/**
 * Validate filter state
 * @param {Object} filters - Filter state object
 * @returns {boolean} True if any filter is active
 */
export const hasActiveFilters = (filters) => {
  return !!(
    filters?.searchQuery ||
    filters?.categoryId ||
    filters?.priceRange ||
    filters?.minRating
  );
};

/**
 * Build URL query params from filters
 * @param {Object} filters - Filter object
 * @returns {URLSearchParams} URL search params
 */
export const buildFilterQueryParams = (filters) => {
  const params = new URLSearchParams();

  if (filters?.searchQuery) {
    params.set('q', filters.searchQuery);
  }

  if (filters?.categoryId) {
    params.set('category', filters.categoryId);
  }

  if (filters?.priceRange?.id) {
    params.set('price', filters.priceRange.id);
  }

  if (filters?.minRating) {
    params.set('rating', filters.minRating);
  }

  if (filters?.sortBy) {
    params.set('sort', filters.sortBy);
  }

  if (filters?.currentPage && filters.currentPage > 1) {
    params.set('page', filters.currentPage);
  }

  return params;
};

/**
 * Parse URL query params into filters
 * @param {URLSearchParams} params - URL search params
 * @returns {Object} Filter object
 */
export const parseQueryParamsToFilters = (params) => {
  const filters = {
    searchQuery: params.get('q') || '',
    sortBy: params.get('sort') || 'newest',
    currentPage: parseInt(params.get('page') || '1', 10),
  };

  // Parse category
  const category = params.get('category');
  if (category) {
    filters.categoryId = isNaN(category) ? category : parseInt(category, 10);
  }

  // Parse price range
  const priceId = params.get('price');
  if (priceId) {
    const foundRange = PRICE_RANGES.find((r) => r.id === parseInt(priceId, 10));
    if (foundRange) {
      filters.priceRange = foundRange;
    }
  }

  // Parse rating
  const rating = params.get('rating');
  if (rating) {
    const ratingValue = parseInt(rating, 10);
    const foundRating = RATING_OPTIONS.find((r) => r.value === ratingValue);
    if (foundRating) {
      filters.minRating = foundRating.value;
    }
  }

  return filters;
};

/**
 * Normalize categories data to ensure consistency
 * @param {Array} categories - Raw categories array
 * @returns {Array} Normalized categories
 */
export const normalizeCategories = (categories) => {
  if (!Array.isArray(categories)) {
    return [];
  }

  return categories.filter((cat) => cat?.id && cat?.name);
};

/**
 * Normalize items data to ensure consistency
 * @param {Array} items - Raw items array
 * @returns {Array} Normalized items
 */
export const normalizeItems = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => ({
    ...item,
    price: parseFloat(item?.price) || 0,
    rating: Math.min(5, Math.max(0, parseFloat(item?.rating) || 0)),
    reviewCount: parseInt(item?.reviewCount || item?.reviews || 0, 10),
  }));
};

/**
 * Get retry configuration for failed API requests
 * @returns {Object} Retry config with maxAttempts and delay
 */
export const getRetryConfig = () => ({
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 5000,
  backoffMultiplier: 2,
});
