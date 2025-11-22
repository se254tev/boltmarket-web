-- ============================================================================
-- SUPABASE DATABASE VALIDATION SCRIPT
-- ============================================================================
-- This script validates that all required tables, foreign keys, indexes, 
-- and constraints exist for the Boltweb marketplace platform.
-- 
-- Run this in Supabase SQL Editor to check your database schema.
-- The output will show missing tables, foreign keys, indexes, and issues.
-- ============================================================================

-- Section 1: Check for all required tables
-- Expected tables based on codebase analysis
SELECT 
  'TABLE_CHECK' as check_type,
  'profiles' as required_table,
  (SELECT to_regclass('public.profiles') IS NOT NULL) as exists
UNION ALL
SELECT 'TABLE_CHECK', 'categories', (SELECT to_regclass('public.categories') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'listings', (SELECT to_regclass('public.listings') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'favorites', (SELECT to_regclass('public.favorites') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'conversations', (SELECT to_regclass('public.conversations') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'messages', (SELECT to_regclass('public.messages') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'payments', (SELECT to_regclass('public.payments') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'escrow_transactions', (SELECT to_regclass('public.escrow_transactions') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'payment_methods', (SELECT to_regclass('public.payment_methods') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'cart_items', (SELECT to_regclass('public.cart_items') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'orders', (SELECT to_regclass('public.orders') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'order_items', (SELECT to_regclass('public.order_items') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'seller_payouts', (SELECT to_regclass('public.seller_payouts') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'admin_logs', (SELECT to_regclass('public.admin_logs') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'content_reports', (SELECT to_regclass('public.content_reports') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'page_views', (SELECT to_regclass('public.page_views') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'platform_stats', (SELECT to_regclass('public.platform_stats') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'loans', (SELECT to_regclass('public.loans') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'loan_providers', (SELECT to_regclass('public.loan_providers') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'loan_repayments', (SELECT to_regclass('public.loan_repayments') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'reviews', (SELECT to_regclass('public.reviews') IS NOT NULL)
UNION ALL
SELECT 'TABLE_CHECK', 'disputes', (SELECT to_regclass('public.disputes') IS NOT NULL)
ORDER BY required_table;

-- Section 2: Check critical columns in profiles
SELECT
  'COLUMN_CHECK' as check_type,
  'profiles' as table_name,
  attname as column_name,
  format_type(atttypid, atttypmod) as column_type
FROM pg_attribute
WHERE attrelid = 'public.profiles'::regclass AND attnum > 0
ORDER BY attnum;

-- Section 3: Check critical columns in listings
SELECT
  'COLUMN_CHECK' as check_type,
  'listings' as table_name,
  attname as column_name,
  format_type(atttypid, atttypmod) as column_type
FROM pg_attribute
WHERE attrelid = 'public.listings'::regclass AND attnum > 0
ORDER BY attnum;

-- Section 4: Check critical columns in orders
SELECT
  'COLUMN_CHECK' as check_type,
  'orders' as table_name,
  attname as column_name,
  format_type(atttypid, atttypmod) as column_type
FROM pg_attribute
WHERE attrelid = 'public.orders'::regclass AND attnum > 0
ORDER BY attnum;

-- Section 5: Check all foreign keys
SELECT
  'FOREIGN_KEY' as check_type,
  constraint_name,
  table_name,
  column_name,
  foreign_table_name,
  foreign_column_name
FROM information_schema.referential_constraints rc
JOIN information_schema.key_column_usage kcu ON rc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu ON rc.unique_constraint_name = ccu.constraint_name
WHERE rc.constraint_schema = 'public'
ORDER BY table_name, constraint_name;

-- Section 6: Check all indexes
SELECT
  'INDEX' as check_type,
  schemaname,
  tablename,
  indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Section 7: Summary - Tables missing columns
SELECT 'MISSING_COLUMNS_SUMMARY' as section;
SELECT
  t.tablename,
  STRING_AGG(
    CASE
      WHEN t.tablename = 'profiles' AND a.attname NOT IN ('id', 'email', 'full_name', 'phone', 'created_at', 'updated_at', 'role', 'wallet_balance', 'suspended', 'suspend_reason') THEN NULL
      WHEN t.tablename = 'listings' AND a.attname NOT IN ('id', 'seller_id', 'title', 'description', 'price', 'currency', 'category_id', 'image', 'status', 'views', 'favorites', 'created_at', 'updated_at', 'images', 'stock') THEN NULL
      WHEN t.tablename = 'orders' AND a.attname NOT IN ('id', 'buyer_id', 'seller_id', 'total_amount', 'currency', 'status', 'payment_released', 'meta', 'created_at', 'updated_at', 'payment_method', 'listing_id', 'quantity') THEN NULL
      WHEN t.tablename = 'payments' AND a.attname NOT IN ('id', 'user_id', 'order_id', 'amount', 'currency', 'method', 'raw_metadata', 'created_at', 'status', 'confirmation') THEN NULL
      ELSE a.attname
    END,
    ', '
  ) as unexpected_columns
FROM pg_tables t
LEFT JOIN pg_attribute a ON a.attrelid = t.tablename::regclass AND a.attnum > 0
WHERE t.schemaname = 'public' AND t.tablename IN ('profiles', 'listings', 'orders', 'payments')
GROUP BY t.tablename;

-- Section 8: Check for missing sequences/defaults
SELECT
  'SEQUENCE_CHECK' as check_type,
  tablename,
  attname as column_name,
  pg_get_expr(adbin, adrelid) as default_value
FROM pg_attribute
JOIN pg_class ON pg_class.oid = attrelid
JOIN pg_tables ON pg_tables.tablename = pg_class.relname
JOIN pg_attrdef ON pg_attrdef.adrelid = pg_class.oid AND pg_attrdef.adnum = pg_attribute.attnum
WHERE schemaname = 'public' AND attnum > 0
ORDER BY tablename, attnum;
