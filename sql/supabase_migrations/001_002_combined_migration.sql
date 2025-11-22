-- Combined migration: Run this if you haven't applied the individual migrations.
-- This file runs the original table-creation migration first, then the "add missing fields" migration.
-- Run in Supabase SQL editor or your DB migration tool.

-- ========== START: base schema (from 001_create_backend_tables.sql) ===========

-- Profiles (users)
create table if not exists profiles (
  id uuid primary key,
  email text unique,
  full_name text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  item_count int default 0
);

-- Listings
create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id) on delete set null,
  title text not null,
  description text,
  price numeric(12,2) not null,
  currency text default 'KES',
  category_id uuid references categories(id),
  image text,
  status text default 'active',
  views int default 0,
  favorites int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Favorites
create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  item_id uuid references listings(id) on delete cascade,
  created_at timestamptz default now()
);

-- Conversations & Messages (chat)
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  participant_1 uuid references profiles(id),
  participant_2 uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender_id uuid references profiles(id),
  body text,
  created_at timestamptz default now()
);

-- Payments & Escrow
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  order_id uuid,
  amount numeric(12,2),
  currency text default 'KES',
  method text,
  raw_metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists escrow_transactions (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references profiles(id),
  seller_id uuid references profiles(id),
  order_id uuid,
  amount numeric(12,2),
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Payment methods for sellers
create table if not exists payment_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  method text not null,
  payload jsonb not null,
  verified boolean default false,
  verified_by uuid,
  verify_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz,
  verified_at timestamptz
);

-- Cart items
create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  item_id uuid references listings(id) on delete cascade,
  quantity int default 1,
  unit_price numeric(12,2),
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references profiles(id) on delete set null,
  seller_id uuid references profiles(id) on delete set null,
  total_amount numeric(12,2),
  currency text default 'KES',
  status text default 'pending',
  payment_released boolean default false,
  meta jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Seller payouts
create table if not exists seller_payouts (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id) on delete cascade,
  order_id uuid references orders(id),
  amount numeric(12,2),
  status text default 'pending',
  released_by uuid,
  released_at timestamptz,
  created_at timestamptz default now()
);

-- Admin logs
create table if not exists admin_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references profiles(id),
  action text,
  details jsonb,
  created_at timestamptz default now()
);

-- Content moderation
create table if not exists content_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references profiles(id),
  listing_id uuid references listings(id),
  reason text,
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Page views & analytics
create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  path text,
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists platform_stats (
  id uuid primary key default gen_random_uuid(),
  date date,
  stats jsonb
);

-- Loans
create table if not exists loans (
  id uuid primary key default gen_random_uuid(),
  borrower_id uuid references profiles(id),
  amount numeric(12,2),
  reason text,
  employment_status text,
  annual_income numeric(12,2),
  phone_number text,
  id_number text,
  requested_term_months int,
  status text default 'pending',
  approved_amount numeric(12,2),
  created_at timestamptz default now(),
  updated_at timestamptz
);

create table if not exists loan_providers (
  id uuid primary key default gen_random_uuid(),
  name text,
  interest_rate numeric,
  min_amount numeric,
  max_amount numeric,
  min_term_months int,
  max_term_months int,
  active boolean default true
);

create table if not exists loan_repayments (
  id uuid primary key default gen_random_uuid(),
  loan_id uuid references loans(id),
  due_date date,
  amount numeric(12,2),
  paid boolean default false
);

-- Reviews
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id),
  user_id uuid references profiles(id),
  rating int,
  comment text,
  created_at timestamptz default now()
);

-- ========== END: base schema ==========


-- ========== START: additions (from 002_add_missing_fields_and_tables.sql) ===========

-- Add fields to profiles
alter table if exists profiles
  add column if not exists role text default 'user',
  add column if not exists wallet_balance numeric(12,2) default 0;

-- Add images (array/jsonb) and stock to listings
alter table if exists listings
  add column if not exists images jsonb default '[]'::jsonb,
  add column if not exists stock int default 1;

-- Add order_items table for order line items
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  listing_id uuid references listings(id) on delete set null,
  quantity int default 1,
  unit_price numeric(12,2),
  created_at timestamptz default now()
);

-- Add payment status and confirmation to payments
alter table if exists payments
  add column if not exists status text default 'pending',
  add column if not exists confirmation jsonb;

-- Add content_reports extra fields
alter table if exists content_reports
  add column if not exists content_type text default 'listing',
  add column if not exists description text;

-- Create disputes table (referenced by services)
create table if not exists disputes (
  id uuid primary key default gen_random_uuid(),
  initiator_id uuid references profiles(id),
  defendant_id uuid references profiles(id),
  escrow_id uuid references escrow_transactions(id),
  reason text,
  status text default 'open',
  resolution text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Add repayment_schedule and interest_rate to loans
alter table if exists loans
  add column if not exists repayment_schedule jsonb,
  add column if not exists interest_rate numeric(6,3) default 0.18;

-- Add payment_method field to orders for buyer-visible selection
alter table if exists orders
  add column if not exists payment_method text,
  add column if not exists listing_id uuid references listings(id),
  add column if not exists quantity int default 1;

-- Ensure indexes
create index if not exists idx_profiles_email on profiles(email);
create index if not exists idx_listings_category on listings(category_id);

-- ========== END: additions ==========
