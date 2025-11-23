import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listingsAPI, sellersAPI, reviewsAPI } from '../services/supabase';

/**
 * ItemDetailsPage Component
 * Detailed product page with images, seller info, and interactions
 */
function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [item, setItem] = useState(null);
  const [seller, setSeller] = useState(null);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const { data: itemResp } = await listingsAPI.getListing(id);
        const fetchedItem = itemResp?.data || itemResp;
        setItem(fetchedItem);

        // images fallback
        setImages([
          fetchedItem?.image,
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
        ].filter(Boolean));

        if (fetchedItem?.seller_id) {
          const { data: sellerResp } = await sellersAPI.getSellerProfile(fetchedItem.seller_id);
          setSeller(sellerResp?.data || sellerResp);
        }

        const { data: reviewsResp } = await reviewsAPI.getItemReviews(id);
        setReviews(reviewsResp?.data || reviewsResp || []);
      } catch (err) {
        console.error('Item details load error', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-safe">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <button onClick={() => navigate('/')} className="text-primary-600 hover:text-primary-700">Home</button>
          <span className="text-dark-400">/</span>
          <button onClick={() => navigate('/browse')} className="text-primary-600 hover:text-primary-700">Browse</button>
          <span className="text-dark-400">/</span>
          <span className="text-dark-700 font-medium truncate">{item.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Images Section */}
          <div className="lg:col-span-1">
            {/* Main Image */}
            <div className="mb-4 rounded-xl overflow-hidden bg-dark-100 sticky top-24">
              <div className="aspect-square flex items-center justify-center">
                <img 
                  src={images[activeImageIndex]} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx 
                      ? 'border-primary-600 ring-2 ring-primary-300' 
                      : 'border-dark-200 hover:border-dark-300'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2">
            {/* Category & Title */}
            <div className="mb-6">
                <span className="badge badge-primary mb-3 inline-block">{item?.category}</span>
              <h1 className="text-heading-2 mb-3">{item?.title}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < (item?.rating || 0) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-dark-300'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-dark-600">
                  <span className="font-semibold">{item.rating}</span> ({item.reviews} reviews)
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-dark-200">
                <p className="text-4xl font-bold text-primary-600 mb-2">
                ${item?.price?.toFixed ? item.price.toFixed(2) : item?.price}
              </p>
              <p className="text-dark-600 text-sm">In stock: <span className="font-semibold text-dark-900">12+ items</span></p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-heading-4 mb-3">About this item</h2>
              <p className="text-body-lg text-dark-700 leading-relaxed">
                {item.description || 'This is a high-quality item perfect for your needs. Carefully selected and tested for optimal performance and durability.'}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-dark-200 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-dark-100 transition-colors"
                >
                  −
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-0 focus:outline-none bg-transparent"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-dark-100 transition-colors"
                >
                  +
                </button>
              </div>

              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`btn flex-1 sm:flex-none transition-all ${
                  isFavorite
                    ? 'bg-accent-100 text-accent-700 hover:bg-accent-200'
                    : 'btn-secondary'
                }`}
              >
                <svg className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isFavorite ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Main CTA */}
            <button className="btn btn-primary w-full btn-lg mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>

            {/* Contact Seller */}
            <button className="btn btn-ghost w-full mb-8">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Seller
            </button>

            {/* Seller Info */}
            <div className="card border-2 border-primary-100 bg-primary-50">
              <div className="card-base flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                  {seller?.name?.charAt ? seller.name.charAt(0) : ''}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-dark-900">{seller?.name}</h3>
                    {seller?.verified && (
                      <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-2.126 3.066 3.066 0 00-3.58 3.907 3.067 3.067 0 001.835-1.781zm9.5 2.43a3.066 3.066 0 00-3.59-3.906 3.066 3.066 0 101.735 5.093 3.066 3.066 0 001.855-1.187zm7.023 6.828a4.084 4.084 0 01-7.6 3.742a4.084 4.084 0 015.744-5.425 4.084 4.084 0 011.856 1.683zm-8.651 4.991c-1.886 1.887-3.501 4.021-4.633 6.34a4.627 4.627 0 11-6.944-4.21 4.586 4.586 0 013.564 1.534 4.084 4.084 0 015.743 5.743 4.084 4.084 0 002.27-3.407z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-yellow-500 font-semibold">{mockSeller.rating}★</span>
                    <span className="text-dark-600">{mockSeller.reviews} reviews</span>
                    <span className="text-dark-600">|</span>
                    <span className="text-dark-600">{mockSeller.itemsSold} sold</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm">Visit Store</button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-12 border-t border-dark-200">
          <h2 className="text-heading-3 mb-8">Reviews ({item.reviews})</h2>
          
          <div className="space-y-6 mb-12">
            {reviews.map((review) => (
              <div key={review.id} className="card card-base">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-dark-900">{review.author}</h4>
                    <p className="text-xs text-dark-600">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-dark-300'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-dark-700">{review.text}</p>
              </div>
            ))}
          </div>

          {/* Write Review */}
          <div className="card card-base bg-primary-50 border-2 border-primary-200">
            <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-900 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" className="text-3xl hover:scale-110 transition-transform">⭐</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-900 mb-2">Your Review</label>
                <textarea 
                  className="input h-24" 
                  placeholder="Share your experience with this product..."
                />
              </div>
              <button className="btn btn-primary w-full">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
