/**
 * BrowsePage Constants
 * Centralized configuration for filter options, sorting, pagination, and defaults
 */

/**
 * Price range filter options
 */
export const PRICE_RANGES = [
  { id: 1, label: 'Under $25', min: 0, max: 25 },
  { id: 2, label: '$25 - $50', min: 25, max: 50 },
  { id: 3, label: '$50 - $100', min: 50, max: 100 },
  { id: 4, label: '$100 - $250', min: 100, max: 250 },
  { id: 5, label: 'Over $250', min: 250, max: Infinity },
];

/**
 * Rating filter options
 */
export const RATING_OPTIONS = [
  { id: 5, label: '5 Stars', value: 5 },
  { id: 4, label: '4+ Stars', value: 4 },
  { id: 3, label: '3+ Stars', value: 3 },
];

/**
 * Sort options
 */
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

/**
 * Default pagination settings
 */
export const PAGINATION_DEFAULTS = {
  INITIAL_PER_PAGE: 12,
  MAX_PAGE_BUTTONS: 5,
  ITEMS_PER_PAGE_OPTIONS: [6, 12, 24, 48],
};

/**
 * Local storage keys for filter persistence
 */
export const STORAGE_KEYS = {
  FILTERS: 'browse_filters',
  ITEMS_PER_PAGE: 'browse_items_per_page',
  SORT: 'browse_sort',
};

/**
 * Debounce delays (in milliseconds)
 */
export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  FILTER: 200,
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  LOAD_LISTINGS: 'Failed to load items. Please try again.',
  LOAD_CATEGORIES: 'Failed to load categories. Please try again.',
  GENERIC: 'An error occurred. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  FILTERS_CLEARED: 'All filters cleared',
  ITEMS_LOADED: 'Items loaded successfully',
};

/**
 * Accessibility labels
 */
export const A11Y_LABELS = {
  SEARCH_INPUT: 'Search items by title or category',
  SORT_SELECT: 'Sort items by',
  CATEGORY_FILTER: 'Filter items by category',
  PRICE_FILTER: 'Filter items by price range',
  RATING_FILTER: 'Filter items by rating',
  CLEAR_FILTERS: 'Clear all active filters',
  PAGINATION_PREVIOUS: 'Go to previous page',
  PAGINATION_NEXT: 'Go to next page',
  PAGINATION_PAGE: (page, total) => `Go to page ${page} of ${total}`,
  PAGINATION_CURRENT: (page, total) => `Current page ${page} of ${total}`,
  ITEMS_GRID: 'Grid of available items',
  EMPTY_STATE: 'No items found with current filters',
  FILTER_SIDEBAR: 'Filter options sidebar',
};

/**
 * Animation/transition classes
 */
export const TRANSITIONS = {
  FADE: 'transition-opacity duration-300',
  SLIDE: 'transition-all duration-300',
  COLOR: 'transition-colors duration-200',
  SCALE: 'transition-transform duration-300',
};

/**
 * Skeleton loader defaults
 */
export const SKELETON_DEFAULTS = {
  ITEMS_COUNT: 12,
  CATEGORY_COUNT: 8,
};
