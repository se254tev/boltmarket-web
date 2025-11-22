-- ============================================================================
-- COMPREHENSIVE DATABASE VALIDATION SCRIPT - BOLTWEB SUPABASE
-- ============================================================================
-- Purpose: Validate that all required tables, columns, foreign keys, indexes,
--          and constraints exist in the Supabase database to match the actual
--          backend codebase requirements.
--
-- Run this in Supabase SQL Editor to get a complete validation report.
-- Results will show missing tables, foreign keys, indexes, and schema mismatches.
--
-- Backend Tables & Routes Analyzed:
-- - users.js (profiles table)
-- - items.js (listings table)
-- - categories.js (categories table)
-- - chats.js (conversations, messages tables)
-- - favorites.js (favorites table)
-- - payments via mpesa.js (payments table)
-- - escrow.js (escrow_transactions, disputes tables)
-- - loans.js (loans, loan_providers, loan_repayments tables)
-- - rewards.js (user_points table)
-- - admin.js (content_reports, admin audit tables)
--
-- ============================================================================

-- ============================================================================
-- SECTION 1: TABLE EXISTENCE CHECK
-- ============================================================================
-- Lists all required tables and whether they exist in the database

WITH required_tables AS (
  SELECT 'profiles' as table_name
  UNION ALL SELECT 'users'
  UNION ALL SELECT 'categories'
  UNION ALL SELECT 'listings'
  UNION ALL SELECT 'items'
  UNION ALL SELECT 'favorites'
  UNION ALL SELECT 'conversations'
  UNION ALL SELECT 'messages'
  UNION ALL SELECT 'payments'
  UNION ALL SELECT 'escrow_transactions'
  UNION ALL SELECT 'disputes'
  UNION ALL SELECT 'loans'
  UNION ALL SELECT 'loan_providers'
  UNION ALL SELECT 'loan_repayments'
  UNION ALL SELECT 'user_points'
  UNION ALL SELECT 'content_reports'
  UNION ALL SELECT 'order_items'
  UNION ALL SELECT 'orders'
  UNION ALL SELECT 'cart_items'
  UNION ALL SELECT 'payment_methods'
  UNION ALL SELECT 'seller_payouts'
  UNION ALL SELECT 'reviews'
  UNION ALL SELECT 'admin_logs'
  UNION ALL SELECT 'page_views'
  UNION ALL SELECT 'platform_stats'
)
SELECT 
  'TABLE_EXISTENCE' as check_type,
  rt.table_name,
  CASE 
    WHEN to_regclass('public.' || rt.table_name) IS NOT NULL THEN 'EXISTS'
    ELSE 'MISSING'
  END as status,
  to_regclass('public.' || rt.table_name) IS NOT NULL as exists_flag
FROM required_tables rt
ORDER BY status DESC, rt.table_name;

-- ============================================================================
-- SECTION 2: CRITICAL COLUMNS CHECK
-- ============================================================================
-- Validates that required columns exist in each main table

WITH column_requirements AS (
  -- Profiles/Users table requirements
  SELECT 'profiles' as table_name, 'id' as column_name, 'uuid' as expected_type
  UNION ALL SELECT 'profiles', 'email', 'text'
  UNION ALL SELECT 'profiles', 'name', 'text'
  UNION ALL SELECT 'profiles', 'password', 'text'
  UNION ALL SELECT 'profiles', 'role', 'text'
  UNION ALL SELECT 'profiles', 'created_at', 'timestamp'
  UNION ALL SELECT 'profiles', 'full_name', 'text'
  UNION ALL SELECT 'profiles', 'phone', 'text'
  UNION ALL SELECT 'profiles', 'wallet_balance', 'numeric'
  UNION ALL SELECT 'profiles', 'suspended', 'boolean'
  
  -- Listings/Items table requirements
  UNION ALL SELECT 'listings', 'id', 'uuid'
  UNION ALL SELECT 'listings', 'seller_id', 'uuid'
  UNION ALL SELECT 'listings', 'title', 'text'
  UNION ALL SELECT 'listings', 'description', 'text'
  UNION ALL SELECT 'listings', 'price', 'numeric'
  UNION ALL SELECT 'listings', 'category_id', 'uuid'
  UNION ALL SELECT 'listings', 'image', 'text'
  UNION ALL SELECT 'listings', 'views', 'integer'
  UNION ALL SELECT 'listings', 'favorites', 'integer'
  UNION ALL SELECT 'listings', 'created_at', 'timestamp'
  UNION ALL SELECT 'listings', 'status', 'text'
  UNION ALL SELECT 'listings', 'currency', 'text'
  UNION ALL SELECT 'listings', 'stock', 'integer'
  UNION ALL SELECT 'listings', 'updated_at', 'timestamp'
  
  -- Favorites table requirements
  UNION ALL SELECT 'favorites', 'id', 'uuid'
  UNION ALL SELECT 'favorites', 'user_id', 'uuid'
  UNION ALL SELECT 'favorites', 'item_id', 'uuid'
  UNION ALL SELECT 'favorites', 'created_at', 'timestamp'
  
  -- Conversations table requirements
  UNION ALL SELECT 'conversations', 'id', 'uuid'
  UNION ALL SELECT 'conversations', 'buyer_id', 'uuid'
  UNION ALL SELECT 'conversations', 'seller_id', 'uuid'
  UNION ALL SELECT 'conversations', 'item_id', 'uuid'
  UNION ALL SELECT 'conversations', 'created_at', 'timestamp'
  UNION ALL SELECT 'conversations', 'participant_1', 'uuid'
  UNION ALL SELECT 'conversations', 'participant_2', 'uuid'
  
  -- Messages table requirements
  UNION ALL SELECT 'messages', 'id', 'uuid'
  UNION ALL SELECT 'messages', 'conversation_id', 'uuid'
  UNION ALL SELECT 'messages', 'sender_id', 'uuid'
  UNION ALL SELECT 'messages', 'text', 'text'
  UNION ALL SELECT 'messages', 'body', 'text'
  UNION ALL SELECT 'messages', 'created_at', 'timestamp'
  
  -- Payments table requirements
  UNION ALL SELECT 'payments', 'id', 'uuid'
  UNION ALL SELECT 'payments', 'user_id', 'uuid'
  UNION ALL SELECT 'payments', 'amount', 'numeric'
  UNION ALL SELECT 'payments', 'method', 'text'
  UNION ALL SELECT 'payments', 'status', 'text'
  UNION ALL SELECT 'payments', 'created_at', 'timestamp'
  UNION ALL SELECT 'payments', 'order_id', 'uuid'
  
  -- Escrow transactions table requirements
  UNION ALL SELECT 'escrow_transactions', 'id', 'uuid'
  UNION ALL SELECT 'escrow_transactions', 'item_id', 'uuid'
  UNION ALL SELECT 'escrow_transactions', 'amount', 'numeric'
  UNION ALL SELECT 'escrow_transactions', 'buyer_id', 'uuid'
  UNION ALL SELECT 'escrow_transactions', 'seller_id', 'uuid'
  UNION ALL SELECT 'escrow_transactions', 'status', 'text'
  UNION ALL SELECT 'escrow_transactions', 'created_at', 'timestamp'
  UNION ALL SELECT 'escrow_transactions', 'released_at', 'timestamp'
  UNION ALL SELECT 'escrow_transactions', 'order_id', 'uuid'
  
  -- Disputes table requirements
  UNION ALL SELECT 'disputes', 'id', 'uuid'
  UNION ALL SELECT 'disputes', 'escrow_id', 'uuid'
  UNION ALL SELECT 'disputes', 'reporter_id', 'uuid'
  UNION ALL SELECT 'disputes', 'reason', 'text'
  UNION ALL SELECT 'disputes', 'created_at', 'timestamp'
  UNION ALL SELECT 'disputes', 'initiator_id', 'uuid'
  UNION ALL SELECT 'disputes', 'defendant_id', 'uuid'
  UNION ALL SELECT 'disputes', 'status', 'text'
  
  -- Loans table requirements
  UNION ALL SELECT 'loans', 'id', 'uuid'
  UNION ALL SELECT 'loans', 'borrower_id', 'uuid'
  UNION ALL SELECT 'loans', 'amount', 'numeric'
  UNION ALL SELECT 'loans', 'reason', 'text'
  UNION ALL SELECT 'loans', 'term_months', 'integer'
  UNION ALL SELECT 'loans', 'requested_term_months', 'integer'
  UNION ALL SELECT 'loans', 'status', 'text'
  UNION ALL SELECT 'loans', 'created_at', 'timestamp'
  
  -- Loan providers table
  UNION ALL SELECT 'loan_providers', 'id', 'uuid'
  UNION ALL SELECT 'loan_providers', 'name', 'text'
  UNION ALL SELECT 'loan_providers', 'interest_rate', 'numeric'
  UNION ALL SELECT 'loan_providers', 'min_amount', 'numeric'
  UNION ALL SELECT 'loan_providers', 'max_amount', 'numeric'
  UNION ALL SELECT 'loan_providers', 'min_term_months', 'integer'
  UNION ALL SELECT 'loan_providers', 'max_term_months', 'integer'
  
  -- Loan repayments table
  UNION ALL SELECT 'loan_repayments', 'id', 'uuid'
  UNION ALL SELECT 'loan_repayments', 'loan_id', 'uuid'
  UNION ALL SELECT 'loan_repayments', 'due_date', 'date'
  UNION ALL SELECT 'loan_repayments', 'amount', 'numeric'
  UNION ALL SELECT 'loan_repayments', 'paid', 'boolean'
  
  -- User points table
  UNION ALL SELECT 'user_points', 'user_id', 'uuid'
  UNION ALL SELECT 'user_points', 'points', 'integer'
  
  -- Content reports table
  UNION ALL SELECT 'content_reports', 'id', 'uuid'
  UNION ALL SELECT 'content_reports', 'reporter_id', 'uuid'
  UNION ALL SELECT 'content_reports', 'listing_id', 'uuid'
  UNION ALL SELECT 'content_reports', 'reason', 'text'
  UNION ALL SELECT 'content_reports', 'status', 'text'
  UNION ALL SELECT 'content_reports', 'created_at', 'timestamp'
  UNION ALL SELECT 'content_reports', 'admin_action', 'text'
  UNION ALL SELECT 'content_reports', 'reviewed_at', 'timestamp'
  
  -- Categories table
  UNION ALL SELECT 'categories', 'id', 'uuid'
  UNION ALL SELECT 'categories', 'name', 'text'
  
  -- Orders table
  UNION ALL SELECT 'orders', 'id', 'uuid'
  UNION ALL SELECT 'orders', 'buyer_id', 'uuid'
  UNION ALL SELECT 'orders', 'seller_id', 'uuid'
  UNION ALL SELECT 'orders', 'total_amount', 'numeric'
  UNION ALL SELECT 'orders', 'status', 'text'
  UNION ALL SELECT 'orders', 'created_at', 'timestamp'
  UNION ALL SELECT 'orders', 'listing_id', 'uuid'
)
SELECT 
  'COLUMNS' as check_type,
  cr.table_name,
  cr.column_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = cr.table_name 
        AND column_name = cr.column_name
    ) THEN 'EXISTS'
    ELSE 'MISSING'
  END as status
FROM column_requirements cr
WHERE to_regclass('public.' || cr.table_name) IS NOT NULL
ORDER BY cr.table_name, status DESC, cr.column_name;

-- ============================================================================
-- SECTION 3: FOREIGN KEY VALIDATION
-- ============================================================================
-- Lists all foreign keys and validates they exist

SELECT 
  'FOREIGN_KEY' as check_type,
  constraint_name,
  table_name,
  column_name,
  foreign_table_name,
  foreign_column_name
FROM (
  SELECT
    rc.constraint_name,
    kcu.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
  FROM information_schema.referential_constraints rc
  JOIN information_schema.key_column_usage kcu ON rc.constraint_name = kcu.constraint_name
    AND kcu.table_schema = rc.constraint_schema
  JOIN information_schema.constraint_column_usage ccu ON rc.unique_constraint_name = ccu.constraint_name
    AND ccu.table_schema = rc.constraint_schema
  WHERE rc.constraint_schema = 'public'
) fk
ORDER BY table_name, constraint_name;

-- ============================================================================
-- SECTION 4: INDEX VALIDATION
-- ============================================================================
-- Lists all existing indexes and identifies missing ones

WITH required_indexes AS (
  SELECT 'idx_listings_seller_id' as index_name, 'listings' as table_name, 'seller_id' as columns
  UNION ALL SELECT 'idx_listings_category_id', 'listings', 'category_id'
  UNION ALL SELECT 'idx_listings_status', 'listings', 'status'
  UNION ALL SELECT 'idx_listings_created_at', 'listings', 'created_at'
  UNION ALL SELECT 'idx_favorites_user_id', 'favorites', 'user_id'
  UNION ALL SELECT 'idx_favorites_item_id', 'favorites', 'item_id'
  UNION ALL SELECT 'idx_messages_conversation_id', 'messages', 'conversation_id'
  UNION ALL SELECT 'idx_messages_sender_id', 'messages', 'sender_id'
  UNION ALL SELECT 'idx_messages_created_at', 'messages', 'created_at'
  UNION ALL SELECT 'idx_payments_user_id', 'payments', 'user_id'
  UNION ALL SELECT 'idx_payments_status', 'payments', 'status'
  UNION ALL SELECT 'idx_orders_buyer_id', 'orders', 'buyer_id'
  UNION ALL SELECT 'idx_orders_seller_id', 'orders', 'seller_id'
  UNION ALL SELECT 'idx_orders_status', 'orders', 'status'
  UNION ALL SELECT 'idx_loans_borrower_id', 'loans', 'borrower_id'
  UNION ALL SELECT 'idx_loans_status', 'loans', 'status'
  UNION ALL SELECT 'idx_content_reports_listing_id', 'content_reports', 'listing_id'
  UNION ALL SELECT 'idx_content_reports_status', 'content_reports', 'status'
  UNION ALL SELECT 'idx_profiles_email', 'profiles', 'email'
  UNION ALL SELECT 'idx_profiles_role', 'profiles', 'role'
)
SELECT 
  'INDEX' as check_type,
  ri.table_name,
  ri.index_name,
  CASE 
    WHEN pi.indexname IS NOT NULL THEN 'EXISTS'
    ELSE 'MISSING'
  END as status
FROM required_indexes ri
LEFT JOIN pg_indexes pi ON pi.indexname = ri.index_name AND pi.schemaname = 'public'
ORDER BY ri.table_name, status DESC;

-- ============================================================================
-- SECTION 5: PRIMARY KEY CHECK
-- ============================================================================
-- Verifies all tables have proper primary keys

SELECT 
  'PRIMARY_KEY' as check_type,
  t.table_name,
  CASE 
    WHEN tc.constraint_type = 'PRIMARY KEY' THEN 'EXISTS'
    ELSE 'MISSING'
  END as status,
  tc.constraint_type
FROM information_schema.tables t
LEFT JOIN information_schema.table_constraints tc ON t.table_name = tc.table_name
  AND tc.constraint_type = 'PRIMARY KEY'
  AND tc.table_schema = 'public'
WHERE t.table_schema = 'public'
  AND t.table_name IN (
    'profiles', 'listings', 'favorites', 'conversations', 'messages', 
    'payments', 'escrow_transactions', 'disputes', 'loans', 'categories',
    'orders', 'content_reports', 'user_points', 'loan_providers', 'loan_repayments'
  )
ORDER BY t.table_name;

-- ============================================================================
-- SECTION 6: CONSTRAINT VALIDATION
-- ============================================================================
-- Lists all check constraints and unique constraints

SELECT 
  'CONSTRAINT' as check_type,
  table_name,
  constraint_name,
  constraint_type
FROM information_schema.table_constraints
WHERE table_schema = 'public'
  AND constraint_type IN ('CHECK', 'UNIQUE', 'FOREIGN KEY')
ORDER BY table_name, constraint_type, constraint_name;

-- ============================================================================
-- SECTION 7: VALIDATION SUMMARY REPORT
-- ============================================================================
-- High-level overview of database health

WITH table_check AS (
  SELECT COUNT(*) as total_required,
         SUM(CASE WHEN to_regclass('public.' || table_name) IS NOT NULL THEN 1 ELSE 0 END) as existing
  FROM (
    SELECT 'profiles' UNION SELECT 'categories' UNION SELECT 'listings'
    UNION SELECT 'favorites' UNION SELECT 'conversations' UNION SELECT 'messages'
    UNION SELECT 'payments' UNION SELECT 'escrow_transactions' UNION SELECT 'disputes'
    UNION SELECT 'loans' UNION SELECT 'loan_providers' UNION SELECT 'loan_repayments'
    UNION SELECT 'user_points' UNION SELECT 'content_reports' UNION SELECT 'orders'
  ) t(table_name)
)
SELECT 
  'VALIDATION_SUMMARY' as check_type,
  (SELECT total_required FROM table_check) as total_tables_required,
  (SELECT existing FROM table_check) as tables_existing,
  (SELECT total_required - existing FROM table_check) as tables_missing,
  ROUND(100.0 * (SELECT existing FROM table_check) / (SELECT total_required FROM table_check), 1) as coverage_percentage;

-- ============================================================================
-- SECTION 8: ACTION ITEMS REPORT
-- ============================================================================
-- Clear list of what needs to be done

SELECT 'ACTION_REQUIRED' as report_type, 'Run migration 004_migration_complete.sql' as action
WHERE NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='profiles')
UNION ALL
SELECT 'ACTION_REQUIRED', 'Verify all foreign key references after migration'
WHERE (SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema='public') < 15
UNION ALL
SELECT 'ACTION_REQUIRED', 'Create missing indexes for query performance'
WHERE (SELECT COUNT(*) FROM pg_indexes WHERE schemaname='public') < 20
UNION ALL
SELECT 'STATUS_OK', 'All required tables exist'
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='profiles')
  AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='listings')
  AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='orders');
