// Supabase integration service for real-time features
// Replace SUPABASE_URL and SUPABASE_KEY with your actual credentials
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

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
 * Payments API
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
};

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

export default supabase;
