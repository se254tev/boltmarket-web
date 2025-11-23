import React, { useState } from 'react';

/**
 * SearchBar Component
 * Multi-featured search component with location and filters
 * @param {Function} onSearch - Callback when search is performed
 * @param {string} placeholder - Input placeholder text
 */
function SearchBar({ onSearch, placeholder = 'Search items, sellers...' }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ query, location });
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex gap-2 items-center">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="input pl-12"
          />
          <svg 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Location Toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 rounded-lg border border-dark-200 hover:bg-dark-100 transition-colors"
          title="Toggle location filter"
        >
          <svg 
            className="w-5 h-5 text-dark-600"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Search Button */}
        <button 
          type="submit"
          className="btn btn-primary btn-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Expanded Location Input */}
      {isExpanded && (
        <div className="mt-3 animate-slideUp">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or postal code"
            className="input w-full"
          />
        </div>
      )}
    </form>
  );
}

export default SearchBar;
