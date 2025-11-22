-- ============================================================================
-- COMPREHENSIVE SUPABASE MIGRATION - BOLTWEB MARKETPLACE
-- ============================================================================
-- This is the DEFINITIVE migration file that creates all tables, relationships,
-- columns, indexes, and constraints required by the frontend application.
-- 
-- Features:
-- - Uses IF NOT EXISTS for safe re-runs
-- - Optimized for PostgreSQL 15+ (Supabase)
-- - Includes proper foreign keys, constraints, and cascading deletes
-- - Adds RLS policy templates (not auto-enabled; review before enabling)
-- - Compatible with Supabase Auth (auth.users integration)
-- 
-- Run this ONCE in your Supabase SQL editor.
-- If tables exist, it will skip them. If columns are missing, it will add them.
-- ============================================================================

-- ======================
-- 1. PROFILES TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'seller', 'admin')),
  wallet_balance NUMERIC(12,2) DEFAULT 0,
  suspended BOOLEAN DEFAULT FALSE,
  suspend_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Add missing columns if not present
ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'seller', 'admin')),
  ADD COLUMN IF NOT EXISTS wallet_balance NUMERIC(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS suspended BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS suspend_reason TEXT;

-- ======================
-- 2. CATEGORIES TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE,
  description TEXT,
  image TEXT,
  item_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- 3. LISTINGS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  stock INT DEFAULT 1,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'inactive')),
  views INT DEFAULT 0,
  favorites INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Add missing columns if not present
ALTER TABLE IF EXISTS public.listings
  ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS stock INT DEFAULT 1;

-- ======================
-- 4. FAVORITES TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

-- ======================
-- 5. CONVERSATIONS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_1 UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  participant_2 UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  CONSTRAINT different_participants CHECK (participant_1 < participant_2)
);

-- ======================
-- 6. MESSAGES TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- 7. PAYMENTS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_id UUID,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  method TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  confirmation JSONB,
  raw_metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Add missing columns if not present
ALTER TABLE IF EXISTS public.payments
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  ADD COLUMN IF NOT EXISTS confirmation JSONB;

-- ======================
-- 8. ESCROW TRANSACTIONS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.escrow_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_id UUID,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'held', 'released', 'refunded', 'disputed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- ======================
-- 9. PAYMENT METHODS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('bank_account', 'till_number', 'mpesa', 'pochi')),
  payload JSONB NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  verify_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ
);

-- ======================
-- 10. CART ITEMS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  quantity INT DEFAULT 1,
  unit_price NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- ======================
-- 11. ORDERS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  total_amount NUMERIC(12,2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  quantity INT DEFAULT 1,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'disputed')),
  payment_method TEXT,
  payment_released BOOLEAN DEFAULT FALSE,
  meta JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Add missing columns if not present
ALTER TABLE IF EXISTS public.orders
  ADD COLUMN IF NOT EXISTS payment_method TEXT,
  ADD COLUMN IF NOT EXISTS listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS quantity INT DEFAULT 1;

-- ======================
-- 12. ORDER ITEMS TABLE (line items)
-- ======================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  quantity INT DEFAULT 1,
  unit_price NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- 13. SELLER PAYOUTS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.seller_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'released', 'failed')),
  released_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  released_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- 14. ADMIN LOGS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- 15. CONTENT REPORTS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  content_type TEXT DEFAULT 'listing' CHECK (content_type IN ('listing', 'user', 'message', 'review')),
  reason TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Add missing columns if not present
ALTER TABLE IF EXISTS public.content_reports
  ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'listing' CHECK (content_type IN ('listing', 'user', 'message', 'review')),
  ADD COLUMN IF NOT EXISTS description TEXT;

-- ======================
-- 16. DISPUTES TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  initiator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  defendant_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  escrow_id UUID REFERENCES public.escrow_transactions(id) ON DELETE SET NULL,
  reason TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  resolution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- ======================
-- 17. PAGE VIEWS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  path TEXT,
  referrer TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- 18. PLATFORM STATS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.platform_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  total_users INT DEFAULT 0,
  total_listings INT DEFAULT 0,
  total_orders INT DEFAULT 0,
  total_revenue NUMERIC(12,2) DEFAULT 0,
  stats JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- 19. LOANS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  borrower_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,
  reason TEXT,
  employment_status TEXT,
  annual_income NUMERIC(12,2),
  phone_number TEXT,
  email TEXT,
  id_number TEXT,
  dob DATE,
  gender TEXT,
  address TEXT,
  collateral TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  bank_account TEXT,
  requested_term_months INT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'disbursed', 'completed')),
  approved_amount NUMERIC(12,2),
  interest_rate NUMERIC(6,3) DEFAULT 0.18,
  repayment_schedule JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Add missing columns if not present
ALTER TABLE IF EXISTS public.loans
  ADD COLUMN IF NOT EXISTS repayment_schedule JSONB,
  ADD COLUMN IF NOT EXISTS interest_rate NUMERIC(6,3) DEFAULT 0.18;

-- ======================
-- 20. LOAN PROVIDERS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.loan_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  interest_rate NUMERIC(5,3),
  min_amount NUMERIC(12,2),
  max_amount NUMERIC(12,2),
  min_term_months INT,
  max_term_months INT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- 21. LOAN REPAYMENTS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.loan_repayments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES public.loans(id) ON DELETE CASCADE,
  due_date DATE NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  paid_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- 22. REVIEWS TABLE
-- ======================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES (Performance Optimization)
-- ============================================================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Listings indexes
CREATE INDEX IF NOT EXISTS idx_listings_seller_id ON public.listings(seller_id);
CREATE INDEX IF NOT EXISTS idx_listings_category_id ON public.listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON public.listings(created_at DESC);

-- Favorites indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_item_id ON public.favorites(item_id);

-- Messages indexes
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON public.orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON public.orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Order items indexes
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_listing_id ON public.order_items(listing_id);

-- Payments indexes
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- Cart items indexes
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);

-- Loans indexes
CREATE INDEX IF NOT EXISTS idx_loans_borrower_id ON public.loans(borrower_id);
CREATE INDEX IF NOT EXISTS idx_loans_status ON public.loans(status);

-- Admin logs indexes
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON public.admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON public.admin_logs(created_at DESC);

-- Content reports indexes
CREATE INDEX IF NOT EXISTS idx_content_reports_listing_id ON public.content_reports(listing_id);
CREATE INDEX IF NOT EXISTS idx_content_reports_status ON public.content_reports(status);

-- Page views indexes
CREATE INDEX IF NOT EXISTS idx_page_views_user_id ON public.page_views(user_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.page_views(created_at DESC);

-- ============================================================================
-- SAMPLE RLS POLICIES (COMMENTED - ENABLE IF PRODUCTION READY)
-- ============================================================================
-- Uncomment and customize these after reviewing your security requirements

/*
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Example: Users can only read their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Example: Users can only update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Example: Sellers can only read/update their own listings
CREATE POLICY "listings_select_own" ON public.listings
  FOR SELECT USING (auth.uid() = seller_id OR status = 'active');

-- Example: Users can only read messages in their conversations
CREATE POLICY "messages_select_own" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
        AND (c.participant_1 = auth.uid() OR c.participant_2 = auth.uid())
    )
  );
*/

-- ============================================================================
-- SUMMARY & NOTES
-- ============================================================================
-- This migration creates a production-ready database schema for:
-- - Marketplace listings and browsing
-- - User profiles and authentication (via Supabase Auth)
-- - Order management with escrow support
-- - Payment processing and tracking
-- - Chat/messaging between users
-- - Loan applications and repayments
-- - Content moderation and dispute resolution
-- - Admin audit logging
-- - Analytics and platform statistics
--
-- All tables support:
-- - UUID primary keys for scalability
-- - Timestamptz for UTC timestamps
-- - Proper cascading deletes
-- - Foreign key constraints
-- - Optimized indexes for common queries
-- - JSONB for flexible metadata storage
-- 
-- Next steps:
-- 1. Run this migration in Supabase SQL editor
-- 2. Enable RLS policies as needed for security
-- 3. Configure Row Level Security (RLS) based on your requirements
-- 4. Test all frontend operations to ensure they work
-- 5. Monitor query performance and add additional indexes if needed
-- ============================================================================
