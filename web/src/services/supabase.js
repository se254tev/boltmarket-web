// Supabase integration service for real-time features
// Replace SUPABASE_URL and SUPABASE_KEY with your actual credentials
import { createClient } from '@supabase/supabase-js';

// Prefer Vite environment variables (VITE_) but fall back to REACT_APP_ for backwards compatibility
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || 'https://ubbsxosmjgditxlleqal.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYnN4b3NtamdkaXR4bGxlcWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDI1ODcsImV4cCI6MjA3ODE3ODU4N30.sc_5wBgs7NblwVeJms3S-e9kIe5jpfa9vI2lBCo0OkA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Listings API - Real-time updates
 */
export const listingsAPI = {
  // Get all listings with real-time subscription
  subscribeToListings: (callback) => {
    return supabase
      .from('listings')
      .on('*', (payload) => {
        callback(payload);
      })
      .subscribe();
  },

  // Create new listing
  createListing: (data) =>
    supabase
      .from('listings')
      .insert([{ ...data, created_at: new Date() }])
      .select(),

  // Update listing
  updateListing: (id, data) =>
    supabase
      .from('listings')
      .update(data)
      .eq('id', id)
      .select(),

  // Delete listing
  deleteListing: (id) =>
    supabase
      .from('listings')
      .delete()
      .eq('id', id),

  // Get listing by ID
  getListing: (id) =>
    supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single(),
  // (Chat-related helpers were moved to `chatAPI` below)
};

/**
 * Chat API - Real-time messaging
 */
export const chatAPI = {
  // Subscribe to messages for a conversation
  subscribeToMessages: (conversationId, callback) => {
    return supabase
      .from('messages')
      .on('INSERT', (payload) => {
        callback(payload.new);
      })
      .eq('conversation_id', conversationId)
      .subscribe();
  },

  // Send message
  sendMessage: (data) =>
    supabase
      .from('messages')
      .insert([{ ...data, created_at: new Date() }])
      .select(),

  // Get conversation messages
  getConversationMessages: (conversationId) =>
    supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true }),

  // Get user conversations
  getUserConversations: (userId) =>
    supabase
      .from('conversations')
      .select('*')
      .or(`participant_1.eq.${userId},participant_2.eq.${userId}`)
      .order('updated_at', { ascending: false }),

  // Create or get conversation
  getOrCreateConversation: (userId1, userId2) => {
    const participantIds = [userId1, userId2].sort();
    return supabase
      .from('conversations')
      .select('*')
      .or(`and(participant_1.eq.${participantIds[0]},participant_2.eq.${participantIds[1]}),and(participant_1.eq.${participantIds[1]},participant_2.eq.${participantIds[0]})`)
      .single()
      .then(({ data, error }) => {
        if (error && error.code === 'PGRST116') {
          // No conversation found, create one
          return supabase
            .from('conversations')
            .insert([
              {
                participant_1: participantIds[0],
                participant_2: participantIds[1],
                created_at: new Date(),
                updated_at: new Date(),
              },
            ])
            .select()
            .single();
        }
        return { data, error };
      });
    },
  };

/**
 * Escrow API - Transaction management
 */
export const escrowAPI = {
  // Subscribe to escrow updates
  subscribeToEscrow: (callback) => {
    return supabase
      .from('escrow_transactions')
      .on('UPDATE', (payload) => {
        callback(payload.new);
      })
      .subscribe();
  },

  // Create escrow transaction
  createEscrow: (data) =>
    supabase
      .from('escrow_transactions')
      .insert([{ ...data, status: 'pending', created_at: new Date() }])
      .select(),

  // Update escrow status
  updateEscrowStatus: (id, status) =>
    supabase
      .from('escrow_transactions')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .select(),

  // Get user escrow transactions
  getUserEscrows: (userId) =>
    supabase
      .from('escrow_transactions')
      .select('*')
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
      .order('created_at', { ascending: false }),

  // Get escrow by ID
  getEscrow: (id) =>
    supabase
      .from('escrow_transactions')
      .select('*')
      .eq('id', id)
      .single(),
};

/**
 * Payments API (merged below)
 * Single consolidated `paymentsAPI` is defined later in the file.
 */

/**
 * Loans API - Soft loans feature
 */
export const loansAPI = {
  // Subscribe to loan updates
  subscribeToLoans: (callback) => {
    return supabase
      .from('loans')
      .on('*', (payload) => {
        callback(payload);
      })
      .subscribe();
  },

  // Create loan application
  createLoanApplication: (data) =>
    supabase
      .from('loans')
      .insert([{ ...data, status: 'pending', created_at: new Date() }])
      .select(),

  // Get loan applications
  getLoanApplications: (userId) =>
    supabase
      .from('loans')
      .select('*')
      .eq('borrower_id', userId)
      .order('created_at', { ascending: false }),

  // Get loan providers
  getLoanProviders: () =>
    supabase
      .from('loan_providers')
      .select('*')
      .eq('active', true),

  // Update loan status
  updateLoanStatus: (id, status) =>
    supabase
      .from('loans')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .select(),

  // Create repayment
  createRepayment: (data) =>
    supabase
      .from('loan_repayments')
      .insert([{ ...data, created_at: new Date() }])
      .select(),

  // Get repayment schedule
  getRepaymentSchedule: (loanId) =>
    supabase
      .from('loan_repayments')
      .select('*')
      .eq('loan_id', loanId)
      .order('due_date', { ascending: true }),
};

/**
 * User Profiles API
 */
export const profilesAPI = {
  // Get user profile
  getProfile: (userId) =>
    supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single(),

  // Update profile
  updateProfile: (userId, data) =>
    supabase
      .from('profiles')
      .update(data)
      .eq('id', userId)
      .select(),

  // Get user by email
  getUserByEmail: (email) =>
    supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single(),
};

/**
 * Disputes API - For escrow disputes
 */
export const disputesAPI = {
  // Create dispute
  createDispute: (data) =>
    supabase
      .from('disputes')
      .insert([{ ...data, status: 'open', created_at: new Date() }])
      .select(),

  // Get dispute
  getDispute: (id) =>
    supabase
      .from('disputes')
      .select('*')
      .eq('id', id)
      .single(),

  // Resolve dispute
  resolveDispute: (id, resolution) =>
    supabase
      .from('disputes')
      .update({ status: 'resolved', resolution, updated_at: new Date() })
      .eq('id', id)
      .select(),

  // Get disputes for user
  getUserDisputes: (userId) =>
    supabase
      .from('disputes')
      .select('*')
      .or(`initiator_id.eq.${userId},defendant_id.eq.${userId}`)
      .order('created_at', { ascending: false }),
};

/**
 * Content Moderation API
 */
export const moderationAPI = {
  // Report listing
  reportListing: (data) =>
    supabase
      .from('content_reports')
      .insert([{ ...data, status: 'pending', created_at: new Date() }])
      .select(),

  // Get reports (admin only)
  getReports: () =>
    supabase
      .from('content_reports')
      .select('*')
      .order('created_at', { ascending: false }),

  // Moderate report
  moderateReport: (id, action, reason) =>
    supabase
      .from('content_reports')
      .update({ status: 'resolved', action, reason, updated_at: new Date() })
      .eq('id', id)
      .select(),
};

/**
 * Analytics API
 */
export const analyticsAPI = {
  // Record page view
  recordPageView: (data) =>
    supabase
      .from('page_views')
      .insert([{ ...data, created_at: new Date() }])
      .select(),

  // Get user analytics
  getUserAnalytics: (userId) =>
    supabase
      .from('page_views')
      .select('*')
      .eq('user_id', userId),

  // Get platform stats
  getPlatformStats: () =>
    supabase
      .from('platform_stats')
      .select('*')
      .order('date', { ascending: false })
      .limit(30),
};

/**
 * Favorites/Wishlist API
 */
export const favoritesAPI = {
  // Get user's favorites
  getFavorites: () =>
    supabase
      .from('favorites')
      .select('*')
      .order('created_at', { ascending: false }),

  // Add item to favorites
  addFavorite: (itemId) =>
    supabase
      .from('favorites')
      .insert([{ item_id: itemId, created_at: new Date() }])
      .select(),

  // Remove from favorites
  removeFavorite: (itemId) =>
    supabase
      .from('favorites')
      .delete()
      .eq('item_id', itemId),

  // Check if item is favorited
  isFavorite: (itemId) =>
    supabase
      .from('favorites')
      .select('*')
      .eq('item_id', itemId)
      .single(),
};

/**
 * Sellers API
 */
export const sellersAPI = {
  // Get seller profile
  getSellerProfile: (sellerId) =>
    // profiles table holds seller profile records keyed by auth user id
    supabase
      .from('profiles')
      .select('*')
      .eq('id', sellerId)
      .single(),

  // Get current user profile
  getCurrentProfile: () =>
    // Attempt to resolve current authenticated user, then return profile
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) return { data: null, error };
      return supabase.from('profiles').select('*').eq('id', data.user.id).single();
    }),

  // Get my listings
  getMyListings: () =>
    supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false }),
};

/**
 * Payment Methods API
 */
export const paymentMethodsAPI = {
  // Get payment methods for a user
  getPaymentMethods: (userId) =>
    supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),

  // Add a payment method
  addPaymentMethod: (data) =>
    supabase
      .from('payment_methods')
      .insert([{ ...data, created_at: new Date(), verified: false }])
      .select(),

  // Update a payment method
  updatePaymentMethod: (id, data) =>
    supabase
      .from('payment_methods')
      .update({ ...data, updated_at: new Date() })
      .eq('id', id)
      .select(),

  // Delete a payment method
  deletePaymentMethod: (id) =>
    supabase
      .from('payment_methods')
      .delete()
      .eq('id', id),

  // Admin verification action
  verifyPaymentMethod: (id, adminId, verified = true, reason = '') =>
    supabase
      .from('payment_methods')
      .update({ verified, verified_by: adminId, verify_reason: reason, verified_at: new Date() })
      .eq('id', id)
      .select(),
};

/**
 * Cart API
 */
export const cartAPI = {
  // Get cart items for a user
  getCart: (userId) =>
    supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),

  // Add item to cart
  addToCart: (data) =>
    supabase
      .from('cart_items')
      .insert([{ ...data, created_at: new Date() }])
      .select(),

  // Update cart item quantity
  updateCartItem: (id, data) =>
    supabase
      .from('cart_items')
      .update({ ...data, updated_at: new Date() })
      .eq('id', id)
      .select(),

  // Remove cart item
  removeCartItem: (id) =>
    supabase
      .from('cart_items')
      .delete()
      .eq('id', id),
};

/**
 * Orders API
 */
export const ordersAPI = {
  // Create order. If `data.items` (array) is provided, insert order then create order_items.
  createOrder: async (data) => {
    // data: { buyer_id, seller_id, total_amount, currency, payment_method, items: [{ listing_id, quantity, unit_price }], meta }
    const insertData = { ...data };
    delete insertData.items;
    insertData.created_at = new Date();
    insertData.payment_released = false;

    const { data: orderResp, error: orderErr } = await supabase.from('orders').insert([insertData]).select().single();
    if (orderErr) return { error: orderErr };

    const order = orderResp;
    if (data.items && Array.isArray(data.items) && data.items.length > 0) {
      const itemsToInsert = data.items.map((it) => ({
        order_id: order.id,
        listing_id: it.listing_id,
        quantity: it.quantity || 1,
        unit_price: it.unit_price || null,
        created_at: new Date(),
      }));
      const { data: itemsResp, error: itemsErr } = await supabase.from('order_items').insert(itemsToInsert).select();
      if (itemsErr) return { error: itemsErr };
      return { data: { order, items: itemsResp } };
    }

    return { data: { order } };
  },

  // Get order
  getOrder: (id) =>
    supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single(),

  // Get user orders
  getUserOrders: (userId) =>
    supabase
      .from('orders')
      .select('*')
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
      .order('created_at', { ascending: false }),

  // Update order and optionally release payment
  updateOrder: (id, data) =>
    supabase
      .from('orders')
      .update({ ...data, updated_at: new Date() })
      .eq('id', id)
      .select(),
};

/**
 * Reports API (content reports / moderation)
 */
export const reportsAPI = {
  createReport: (data) =>
    supabase
      .from('content_reports')
      .insert([{ ...data, status: 'pending', created_at: new Date() }])
      .select(),

  getReports: () =>
    supabase
      .from('content_reports')
      .select('*')
      .order('created_at', { ascending: false }),

  updateReport: (id, data) =>
    supabase
      .from('content_reports')
      .update({ ...data, updated_at: new Date() })
      .eq('id', id)
      .select(),
};

/**
 * Payments helpers
 */
export const paymentsAPI = {
  // Create payment record
  createPayment: (data) =>
    supabase
      .from('payments')
      .insert([{ ...data, created_at: new Date() }])
      .select(),

  // Get payment by ID
  getPayment: (id) =>
    supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single(),

  // Get user payments
  getUserPayments: (userId) =>
    supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),

  // Update payment status/confirmation
  updatePaymentStatus: (id, status, confirmation = null) =>
    supabase
      .from('payments')
      .update({ status, confirmation, updated_at: new Date() })
      .eq('id', id)
      .select(),
};

/**
 * Admin API & Logs
 */
export const adminAPI = {
  // Get all orders (admin)
  getAllOrders: () =>
    supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false }),

  // Log admin action
  createAdminLog: (data) =>
    supabase
      .from('admin_logs')
      .insert([{ ...data, created_at: new Date() }])
      .select(),

  // User management helpers
  suspendUser: (userId, reason = '') =>
    supabase
      .from('profiles')
      .update({ suspended: true, suspend_reason: reason, updated_at: new Date() })
      .eq('id', userId)
      .select(),

  restoreUser: (userId) =>
    supabase
      .from('profiles')
      .update({ suspended: false, updated_at: new Date() })
      .eq('id', userId)
      .select(),

  promoteToAdmin: (userId) =>
    supabase
      .from('profiles')
      .update({ role: 'admin', updated_at: new Date() })
      .eq('id', userId)
      .select(),
};

/**
 * Seller Payouts API
 */
export const payoutsAPI = {
  createPayout: (data) =>
    supabase
      .from('seller_payouts')
      .insert([{ ...data, status: 'pending', created_at: new Date() }])
      .select(),

  getPayoutsForSeller: (sellerId) =>
    supabase
      .from('seller_payouts')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false }),

  releasePayout: (id, releasedBy) =>
    supabase
      .from('seller_payouts')
      .update({ status: 'released', released_by: releasedBy, released_at: new Date() })
      .eq('id', id)
      .select(),
};

/**
 * Reviews API
 */
export const reviewsAPI = {
  // Get reviews for an item
  getItemReviews: (itemId) =>
    supabase
      .from('reviews')
      .select('*')
      .eq('listing_id', itemId)
      .order('created_at', { ascending: false }),

  // Create review
  createReview: (data) =>
    supabase
      .from('reviews')
      .insert([{ ...data, created_at: new Date() }])
      .select(),
};

/**
 * Categories API
 */
export const categoriesAPI = {
  // Get all categories
  getAllCategories: () =>
    supabase
      .from('categories')
      .select('*')
      .order('name'),

  // Get items by category
  getItemsByCategory: (categoryId) =>
    supabase
      .from('listings')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false }),
};

export default supabase;
