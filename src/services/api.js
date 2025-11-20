import axios from 'axios';

// API base URL - adjust this to your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach auth token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Items API
 */
export const itemsAPI = {
  // Get all items with optional filters
  getAllItems: (params = {}) => apiClient.get('/items', { params }),
  
  // Get single item by ID
  getItemById: (id) => apiClient.get(`/items/${id}`),
  
  // Create new item (requires auth)
  createItem: (data) => apiClient.post('/items', data),
  
  // Update item (requires auth)
  updateItem: (id, data) => apiClient.put(`/items/${id}`, data),
  
  // Delete item (requires auth)
  deleteItem: (id) => apiClient.delete(`/items/${id}`),
  
  // Search items
  searchItems: (query, params = {}) => 
    apiClient.get('/items/search', { params: { ...params, q: query } }),
};

/**
 * Categories API
 */
export const categoriesAPI = {
  // Get all categories
  getAllCategories: () => apiClient.get('/categories'),
  
  // Get items by category
  getItemsByCategory: (categoryId, params = {}) => 
    apiClient.get(`/categories/${categoryId}/items`, { params }),
};

/**
 * Sellers/Users API
 */
export const usersAPI = {
  // Get seller profile
  getSellerProfile: (sellerId) => apiClient.get(`/users/${sellerId}`),
  
  // Get current user profile (requires auth)
  getCurrentProfile: () => apiClient.get('/users/profile'),
  
  // Update profile (requires auth)
  updateProfile: (data) => apiClient.put('/users/profile', data),
  
  // Get seller's listings (requires auth)
  getMyListings: (params = {}) => apiClient.get('/users/listings', { params }),
};

/**
 * Authentication API
 */
export const authAPI = {
  // Register new user
  register: (data) => apiClient.post('/auth/register', data),
  
  // Login
  login: (credentials) => apiClient.post('/auth/login', credentials),
  
  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  },
  
  // Verify token
  verifyToken: () => apiClient.get('/auth/verify'),
};

/**
 * Favorites API
 */
export const favoritesAPI = {
  // Get all favorites (requires auth)
  getFavorites: () => apiClient.get('/favorites'),
  
  // Add to favorites (requires auth)
  addFavorite: (itemId) => apiClient.post('/favorites', { itemId }),
  
  // Remove from favorites (requires auth)
  removeFavorite: (itemId) => apiClient.delete(`/favorites/${itemId}`),
};

/**
 * Reviews API
 */
export const reviewsAPI = {
  // Get reviews for an item
  getItemReviews: (itemId) => apiClient.get(`/items/${itemId}/reviews`),
  
  // Create review (requires auth)
  createReview: (itemId, data) => apiClient.post(`/items/${itemId}/reviews`, data),
  
  // Get seller reviews
  getSellerReviews: (sellerId) => apiClient.get(`/users/${sellerId}/reviews`),
};

/**
 * MPesa API (proxied through backend)
 */
export const mpesaAPI = {
  initiate: (data) => apiClient.post('/mpesa/stkpush', data),
  status: (checkoutRequestId) => apiClient.post('/mpesa/status', { checkoutRequestId }),
};

/**
 * Loans API
 */
export const loansAPI = {
  apply: (data) => apiClient.post('/loans', data),
  getUserLoans: () => apiClient.get('/loans'),
  approve: (id) => apiClient.post(`/loans/${id}/approve`),
};

/**
 * Chat API
 */
export const chatsAPI = {
  getConversations: () => apiClient.get('/chats'),
  getMessages: (conversationId) => apiClient.get(`/chats/${conversationId}/messages`),
  sendMessage: (conversationId, data) => apiClient.post(`/chats/${conversationId}/messages`, data),
};

/**
 * Escrow API
 */
export const escrowAPI = {
  create: (data) => apiClient.post('/escrow', data),
  release: (id) => apiClient.post(`/escrow/${id}/release`),
  dispute: (id, data) => apiClient.post(`/escrow/${id}/dispute`, data),
};

/**
 * Rewards API
 */
export const rewardsAPI = {
  getMine: () => apiClient.get('/rewards/me'),
};

export default apiClient;
