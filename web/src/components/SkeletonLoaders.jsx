/**
 * Skeleton Loaders
 * Placeholder components that show while content is loading
 */

import React from 'react';
import { TRANSITIONS } from '../data/browsePageConstants';

/**
 * ItemCardSkeleton
 * Skeleton placeholder for ItemCard
 */
export function ItemCardSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-dark-100 h-48 w-full" />

      {/* Content Skeleton */}
      <div className="card-base flex flex-col gap-3">
        {/* Title Skeleton */}
        <div className="h-6 bg-dark-200 rounded w-3/4" />

        {/* Seller Info Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-dark-200 rounded-full" />
          <div className="h-4 bg-dark-200 rounded w-1/3" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-dark-200 rounded" />
          ))}
        </div>

        {/* Price Skeleton */}
        <div className="pt-2 border-t border-dark-100">
          <div className="h-8 bg-dark-200 rounded w-1/2" />
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-dark-200 rounded w-full mt-2" />
      </div>
    </div>
  );
}

/**
 * ItemGridSkeleton
 * Skeleton placeholder for items grid
 */
export function ItemGridSkeleton({ count = 12, columns = 3 }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
      {[...Array(count)].map((_, i) => (
        <ItemCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * CategoryFilterSkeleton
 * Skeleton placeholder for category filter
 */
export function CategoryFilterSkeleton({ count = 8 }) {
  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center gap-2 animate-pulse">
          <div className="w-4 h-4 bg-dark-200 rounded" />
          <div className="flex-1 h-4 bg-dark-200 rounded" />
        </div>
      ))}
    </div>
  );
}

/**
 * FilterSidebarSkeleton
 * Skeleton placeholder for entire filter sidebar
 */
export function FilterSidebarSkeleton() {
  return (
    <div className="bg-dark-50 rounded-xl p-6 sticky top-24 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-6 bg-dark-200 rounded w-1/3 mb-6" />

      {/* Category Section Skeleton */}
      <div className="mb-6">
        <div className="h-5 bg-dark-200 rounded w-1/4 mb-3" />
        <CategoryFilterSkeleton count={5} />
      </div>

      {/* Price Section Skeleton */}
      <div className="mb-6">
        <div className="h-5 bg-dark-200 rounded w-1/4 mb-3" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-dark-200 rounded" />
              <div className="flex-1 h-4 bg-dark-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Rating Section Skeleton */}
      <div className="mb-6">
        <div className="h-5 bg-dark-200 rounded w-1/4 mb-3" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-dark-200 rounded" />
              <div className="flex-1 h-4 bg-dark-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * SearchBarSkeleton
 * Skeleton placeholder for search bar
 */
export function SearchBarSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-dark-200">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="h-4 bg-dark-200 rounded w-16" />
        <div className="h-10 bg-dark-200 rounded flex-1 sm:flex-none sm:w-40" />
      </div>
      <div className="h-10 bg-dark-200 rounded flex-1 sm:flex-none sm:w-48" />
    </div>
  );
}

export default ItemCardSkeleton;
