/**
 * Mock data for development
 * Replace with real API calls in production
 */

export const mockItems = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    price: 89.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
    seller: 'John Doe',
    rating: 5,
    reviews: 24,
    description: 'Classic brown vintage leather jacket in excellent condition.',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Wooden Desk Lamp',
    price: 45.50,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1565636192335-14f8a31a9ee9?w=500&h=500&fit=crop',
    seller: 'Sarah Smith',
    rating: 4,
    reviews: 12,
    description: 'Minimalist wooden lamp perfect for any desk.',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Sony Headphones',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    seller: 'Tech Store',
    rating: 5,
    reviews: 156,
    description: 'High-quality noise-cancelling headphones.',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Plant Pot Set',
    price: 34.99,
    category: 'Garden',
    image: 'https://images.unsplash.com/photo-1610351557014-ee4fa0c6b727?w=500&h=500&fit=crop',
    seller: 'Green Thumb Co',
    rating: 4,
    reviews: 48,
    description: 'Set of 3 ceramic plant pots with saucers.',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Yoga Mat Premium',
    price: 29.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    seller: 'Fitness Plus',
    rating: 5,
    reviews: 89,
    description: 'Non-slip premium yoga mat for all fitness levels.',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Stainless Steel Water Bottle',
    price: 24.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7fa4ee1b7311?w=500&h=500&fit=crop',
    seller: 'Hydro Life',
    rating: 4,
    reviews: 203,
    description: 'Double-wall insulated water bottle keeps drinks cold for 24 hours.',
    isFavorite: false,
  },
];

export const mockCategories = [
  { id: 1, name: 'Fashion', icon: '👗', itemCount: 245 },
  { id: 2, name: 'Electronics', icon: '📱', itemCount: 189 },
  { id: 3, name: 'Home', icon: '🏠', itemCount: 312 },
  { id: 4, name: 'Sports', icon: '⚽', itemCount: 156 },
  { id: 5, name: 'Garden', icon: '🌿', itemCount: 98 },
  { id: 6, name: 'Books', icon: '📚', itemCount: 134 },
  { id: 7, name: 'Toys', icon: '🎮', itemCount: 210 },
  { id: 8, name: 'Food', icon: '🍔', itemCount: 167 },
];

export const mockListings = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    price: 89.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
    status: 'active',
    views: 324,
    favorites: 48,
    created: '2024-01-15',
  },
  {
    id: '3',
    title: 'Sony Headphones',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    status: 'sold',
    views: 1250,
    favorites: 234,
    created: '2024-01-10',
  },
];

export const mockSeller = {
  id: '1',
  name: 'Tech Store',
  rating: 4.8,
  reviews: 156,
  itemsActive: 42,
  itemsSold: 234,
  memberSince: '2020-03-15',
  verified: true,
  description: 'Official electronics retailer with 4+ years of experience.',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
};

export const mockFilters = {
  categories: mockCategories,
  priceRanges: [
    { id: 1, label: 'Under $25', min: 0, max: 25 },
    { id: 2, label: '$25 - $50', min: 25, max: 50 },
    { id: 3, label: '$50 - $100', min: 50, max: 100 },
    { id: 4, label: '$100 - $250', min: 100, max: 250 },
    { id: 5, label: 'Over $250', min: 250, max: Infinity },
  ],
  ratings: [
    { id: 5, label: '5 Stars', value: 5 },
    { id: 4, label: '4+ Stars', value: 4 },
    { id: 3, label: '3+ Stars', value: 3 },
  ],
  conditions: [
    { id: 'new', label: 'New' },
    { id: 'like-new', label: 'Like New' },
    { id: 'good', label: 'Good' },
    { id: 'fair', label: 'Fair' },
  ],
};
