import React, { useState } from 'react';
import { favoritesAPI } from '../services/supabase';

/**
 * ItemCard Component
 * Reusable card component for displaying marketplace items
 * @param {Object} item - Item data object
 * @param {string} item.id - Unique item identifier
 * @param {string} item.title - Item title
 * @param {number} item.price - Item price
 * @param {string} item.image - Item image URL
 * @param {string} item.category - Item category
 * @param {number} item.rating - Item rating (0-5)
 * @param {string} item.seller - Seller name
 * @param {boolean} item.isFavorite - Is item favorited
 * @param {Function} onFavorite - Callback when favorite button clicked
 */
function ItemCard({ item, onFavorite }) {
  const [isFavorite, setIsFavorite] = useState(item?.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isFavorite) {
        await favoritesAPI.removeFavorite(item.id);
      } else {
        await favoritesAPI.addFavorite(item.id);
      }
      setIsFavorite(!isFavorite);
      if (onFavorite) onFavorite(item.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorite');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card overflow-hidden group cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-dark-100 h-48">
        <img 
          src={item?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'}
          alt={item?.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="badge badge-primary text-xs">
            {item?.category || 'Uncategorized'}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={handleFavorite}
          disabled={isLoading}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg 
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'text-accent-500 fill-accent-500' : 'text-dark-400 hover:text-accent-500'
            }`}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="card-base flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-dark-900 truncate-lines-2 group-hover:text-primary-600 transition-colors">
          {item?.title || 'Item Title'}
        </h3>

        {/* Seller Info */}
        <div className="flex items-center gap-2 text-sm text-dark-600">
          <div className="w-6 h-6 rounded-full bg-primary-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary-700">
              {item?.seller?.charAt(0) || 'S'}
            </span>
          </div>
          <span>{item?.seller || 'Seller'}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < (item?.rating || 4) 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-dark-300'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-dark-600 ml-1">({item?.reviews || 12})</span>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-dark-100">
          <p className="text-2xl font-bold text-primary-600">
            ${item?.price || '0.00'}
          </p>
        </div>

        {/* Action Button */}
        <button className="btn btn-primary btn-sm w-full mt-2">
          View Details
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
