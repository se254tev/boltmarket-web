import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryBadge from '../components/CategoryBadge';
import ItemCard from '../components/ItemCard';
import { mockItems, mockCategories } from '../data/mockData';

/**
 * HomePage Component
 * Main landing page with hero, search, categories, and trending items
 */
function HomePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState({});

  const handleSearch = ({ query, location }) => {
    // Navigate to browse page with search params
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (location) params.append('location', location);
    navigate(`/browse?${params.toString()}`);
  };

  const handleFavorite = (itemId) => {
    setFavorites(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const trendingItems = mockItems.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white relative overflow-hidden py-20 md:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container-safe relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-slideUp">
            <h1 className="text-heading-1 mb-4">
              Welcome to Bolt Market
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Discover amazing products, connect with trusted sellers, and make your next purchase with confidence.
            </p>

            {/* Search Bar */}
            <div className="mt-10">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-white/80 text-sm">Active Items</p>
              </div>
              <div>
                <p className="text-3xl font-bold">5K+</p>
                <p className="text-white/80 text-sm">Trusted Sellers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-white/80 text-sm">Happy Buyers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-dark-50">
        <div className="container-safe">
          <div className="mb-12">
            <h2 className="text-heading-3 mb-2">Browse by Category</h2>
            <p className="text-body-lg text-dark-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mockCategories.slice(0, 8).map((category) => (
              <CategoryBadge
                key={category.id}
                name={category.name}
                icon={category.icon}
                isSelected={selectedCategory === category.id}
                onClick={() => {
                  setSelectedCategory(selectedCategory === category.id ? null : category.id);
                  navigate(`/browse?category=${category.id}`);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Items Section */}
      <section className="py-16 md:py-20">
        <div className="container-safe">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-heading-3 mb-2">Trending Now</h2>
              <p className="text-body-lg text-dark-600">Most viewed this week</p>
            </div>
            <button 
              onClick={() => navigate('/browse')}
              className="btn btn-ghost text-primary-600 hover:text-primary-700"
            >
              View All
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingItems.map((item) => (
              <div key={item.id} onClick={() => navigate(`/item/${item.id}`)}>
                <ItemCard 
                  item={{ ...item, isFavorite: favorites[item.id] }}
                  onFavorite={handleFavorite}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16 md:py-20">
        <div className="container-safe text-center">
          <h2 className="text-heading-2 mb-4">Ready to Start Selling?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers and reach millions of buyers on Bolt Market.
          </p>
          <button className="btn bg-white text-primary-600 hover:bg-dark-50 font-semibold px-8 py-3 rounded-lg">
            Start Listing Today
          </button>
        </div>
      </section>
    </>
  );
}

export default HomePage;
