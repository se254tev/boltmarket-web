import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { listingsAPI, categoriesAPI } from '../services/supabase';

/**
 * BrowsePage Component
 * Browse items with filtering, sorting, and pagination
 */
function BrowsePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch items and categories on mount or when search params change
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch listings
        const listingsResp = await listingsAPI.getAllListings();
        if (listingsResp.error) {
          console.error('Failed to load listings:', listingsResp.error);
          setItems([]);
          setFilteredItems([]);
        } else {
          const fetchedItems = Array.isArray(listingsResp.data) ? listingsResp.data : [];
          setItems(fetchedItems);
          setFilteredItems(fetchedItems);
        }

        // Fetch categories
        const catsResp = await categoriesAPI.getAllCategories();
        if (catsResp.error) {
          console.error('Failed to load categories:', catsResp.error);
          setCategories([]);
        } else {
          const cats = Array.isArray(catsResp.data) ? catsResp.data : [];
          setCategories(cats);
        }
      } catch (err) {
        console.error('Browse page load exception:', err);
        setError(err);
        setItems([]);
        setFilteredItems([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [searchParams]);

  // Apply filters whenever they change
  useEffect(() => {
    // Ensure items is always an array before spreading
    if (!Array.isArray(items)) {
      setFilteredItems([]);
      return;
    }

    let result = [...items];

    // Search filter
    if (searchQuery) {
      result = result.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Price filter
    if (selectedPriceRange) {
      result = result.filter(item => 
        item.price >= selectedPriceRange.min && 
        item.price <= selectedPriceRange.max
      );
    }

    // Rating filter
    if (selectedRating) {
      result = result.filter(item => item.rating >= selectedRating);
    }

    // Sorting
    result = result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return 0;
      }
    });

    setFilteredItems(result);
    setCurrentPage(1);
  }, [items, selectedCategory, selectedPriceRange, selectedRating, sortBy, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + itemsPerPage);

  const handleFavorite = (itemId) => {
    setFavorites(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setSearchQuery('');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-safe">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-heading-2 mb-2">Browse Items</h1>
          <p className="text-body-lg text-dark-600">
            Found <span className="font-bold text-primary-600">{filteredItems.length}</span> items
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-dark-50 rounded-xl p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                {(selectedCategory || selectedPriceRange || selectedRating) && (
                  <button 
                    onClick={handleClearFilters}
                    className="text-xs text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-dark-900 mb-3">Category</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                        className="w-4 h-4 rounded border-dark-300 text-primary-600"
                      />
                      <span className="text-sm text-dark-700">{cat.name}</span>
                      <span className="text-xs text-dark-500 ml-auto">({cat.itemCount})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-dark-900 mb-3">Price</h4>
                <div className="space-y-2">
                  {[
                    { id: 1, label: 'Under $25', min: 0, max: 25 },
                    { id: 2, label: '$25 - $50', min: 25, max: 50 },
                    { id: 3, label: '$50 - $100', min: 50, max: 100 },
                    { id: 4, label: '$100 - $250', min: 100, max: 250 },
                    { id: 5, label: 'Over $250', min: 250, max: Infinity },
                  ].map((range) => (
                    <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio"
                        name="price"
                        checked={selectedPriceRange?.id === range.id}
                        onChange={() => setSelectedPriceRange(selectedPriceRange?.id === range.id ? null : range)}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="text-sm text-dark-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-dark-900 mb-3">Rating</h4>
                <div className="space-y-2">
                  {[{ id: 5, label: '5 Stars', value: 5 }, { id: 4, label: '4+ Stars', value: 4 }, { id: 3, label: '3+ Stars', value: 3 }].map((rating) => (
                    <label key={rating.id} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating.value}
                        onChange={() => setSelectedRating(selectedRating === rating.value ? null : rating.value)}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="text-sm text-dark-700">{rating.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-dark-200">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-dark-700">Sort by:</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input py-2 text-sm bg-white"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Search Input */}
              <input 
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input py-2 text-sm"
              />
            </div>

            {/* Items Grid */}
            {paginatedItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {paginatedItems.map((item) => (
                    <div key={item.id} onClick={() => navigate(`/item/${item.id}`)}>
                      <ItemCard 
                        item={{ ...item, isFavorite: favorites[item.id] }}
                        onFavorite={handleFavorite}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-dark-200 hover:bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                      if (pageNum > totalPages) return null;
                      return (
                        <button 
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-primary-600 text-white font-semibold'
                              : 'border border-dark-200 hover:bg-dark-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-dark-200 hover:bg-dark-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <svg className="w-16 h-16 text-dark-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <h3 className="text-xl font-semibold text-dark-900 mb-2">No items found</h3>
                <p className="text-dark-600 mb-6">Try adjusting your filters or search term</p>
                <button 
                  onClick={handleClearFilters}
                  className="btn btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
