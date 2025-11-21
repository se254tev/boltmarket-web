-- Migration: add missing fields and tables required by frontend
-- Review carefully before executing in production

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

-- End of migration
