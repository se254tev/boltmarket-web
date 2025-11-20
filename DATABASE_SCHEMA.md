# Supabase Database Schema

This document provides the SQL schema needed to set up all the tables for the Bolt Market marketplace platform.

## 1. User Profiles

```sql
-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone_number TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  employment_status TEXT,
  annual_income DECIMAL,
  ratings_average DECIMAL DEFAULT 5.0,
  total_transactions INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  banned BOOLEAN DEFAULT FALSE,
  kyc_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX profiles_email_idx ON profiles(email);
CREATE INDEX profiles_verified_idx ON profiles(verified);
```

## 2. Listings

```sql
-- Listings table
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL NOT NULL,
  currency TEXT DEFAULT 'KES',
  category TEXT NOT NULL,
  condition TEXT DEFAULT 'good',
  location TEXT,
  images JSONB,
  status TEXT DEFAULT 'active', -- active, sold, removed
  views INT DEFAULT 0,
  favorites INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX listings_seller_idx ON listings(seller_id);
CREATE INDEX listings_category_idx ON listings(category);
CREATE INDEX listings_status_idx ON listings(status);
CREATE INDEX listings_created_idx ON listings(created_at DESC);
```

## 3. Messages & Chat

```sql
-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_1 UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  participant_2 UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  participant_1_name TEXT,
  participant_2_name TEXT,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX conversations_participant1_idx ON conversations(participant_1);
CREATE INDEX conversations_participant2_idx ON conversations(participant_2);
CREATE INDEX conversations_updated_idx ON conversations(updated_at DESC);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX messages_conversation_idx ON messages(conversation_id);
CREATE INDEX messages_sender_idx ON messages(sender_id);
CREATE INDEX messages_created_idx ON messages(created_at DESC);
```

## 4. Escrow Transactions

```sql
-- Escrow transactions table
CREATE TABLE escrow_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'KES',
  status TEXT DEFAULT 'pending', -- pending, payment_received, goods_shipped, goods_received, completed, disputed, refunded, cancelled
  payment_method TEXT,
  transaction_reference TEXT UNIQUE,
  estimated_completion TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX escrow_buyer_idx ON escrow_transactions(buyer_id);
CREATE INDEX escrow_seller_idx ON escrow_transactions(seller_id);
CREATE INDEX escrow_status_idx ON escrow_transactions(status);
CREATE INDEX escrow_listing_idx ON escrow_transactions(listing_id);
```

## 5. Payments

```sql
-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escrow_id UUID REFERENCES escrow_transactions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'KES',
  payment_method TEXT NOT NULL, -- mpesa, card, bank_transfer
  transaction_id TEXT UNIQUE,
  mpesa_receipt_number TEXT,
  status TEXT DEFAULT 'pending', -- pending, completed, failed
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX payments_user_idx ON payments(user_id);
CREATE INDEX payments_escrow_idx ON payments(escrow_id);
CREATE INDEX payments_status_idx ON payments(status);
```

## 6. Loans

```sql
-- Loan providers table
CREATE TABLE loan_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  interest_rate DECIMAL NOT NULL,
  min_amount DECIMAL NOT NULL,
  max_amount DECIMAL NOT NULL,
  min_term_months INT DEFAULT 6,
  max_term_months INT DEFAULT 36,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Loans table
CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  borrower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES loan_providers(id) ON DELETE SET NULL,
  amount DECIMAL NOT NULL,
  approved_amount DECIMAL,
  currency TEXT DEFAULT 'KES',
  interest_rate DECIMAL,
  term_months INT,
  monthly_payment DECIMAL,
  reason TEXT,
  employment_status TEXT,
  annual_income DECIMAL,
  requested_term_months INT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected, active, completed, defaulted
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX loans_borrower_idx ON loans(borrower_id);
CREATE INDEX loans_status_idx ON loans(status);
CREATE INDEX loans_provider_idx ON loans(provider_id);

-- Loan repayments table
CREATE TABLE loan_repayments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  principal_payment DECIMAL,
  interest_payment DECIMAL,
  remaining_balance DECIMAL,
  due_date DATE NOT NULL,
  paid_date DATE,
  payment_method TEXT,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending', -- pending, paid, overdue, partially_paid
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX loan_repayments_loan_idx ON loan_repayments(loan_id);
CREATE INDEX loan_repayments_status_idx ON loan_repayments(status);
CREATE INDEX loan_repayments_due_date_idx ON loan_repayments(due_date);
```

## 7. Disputes

```sql
-- Disputes table
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escrow_id UUID NOT NULL REFERENCES escrow_transactions(id) ON DELETE CASCADE,
  initiator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  defendant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open', -- open, in_review, resolved
  resolution TEXT,
  evidence JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX disputes_escrow_idx ON disputes(escrow_id);
CREATE INDEX disputes_initiator_idx ON disputes(initiator_id);
CREATE INDEX disputes_status_idx ON disputes(status);
```

## 8. Gamification & Rewards

```sql
-- Badges table
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL, -- first_sale, power_seller, trusted_buyer, etc.
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX user_badges_user_idx ON user_badges(user_id);
CREATE INDEX user_badges_badge_idx ON user_badges(badge_type);

-- Points/Rewards table
CREATE TABLE user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  points INT NOT NULL,
  reason TEXT,
  transaction_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX user_points_user_idx ON user_points(user_id);
```

## 9. Content Moderation

```sql
-- Content reports table
CREATE TABLE content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL, -- listing, message, profile, review
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending', -- pending, resolved
  action TEXT, -- approved, remove, ban_user
  resolved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX content_reports_status_idx ON content_reports(status);
CREATE INDEX content_reports_reporter_idx ON content_reports(reporter_id);
CREATE INDEX content_reports_created_idx ON content_reports(created_at DESC);
```

## 10. Analytics

```sql
-- Page views for analytics
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX page_views_user_idx ON page_views(user_id);
CREATE INDEX page_views_created_idx ON page_views(created_at DESC);

-- Platform statistics (aggregated daily)
CREATE TABLE platform_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  total_users INT,
  active_users INT,
  new_users_30d INT,
  total_listings INT,
  active_listings INT,
  total_transactions INT,
  total_volume DECIMAL,
  avg_rating DECIMAL,
  dispute_rate DECIMAL,
  completion_rate DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX platform_stats_date_idx ON platform_stats(date DESC);
```

## 11. Reviews & Ratings

```sql
-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES escrow_transactions(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX reviews_reviewer_idx ON reviews(reviewer_id);
CREATE INDEX reviews_reviewee_idx ON reviews(reviewee_id);
CREATE INDEX reviews_created_idx ON reviews(created_at DESC);
```

## Enable Realtime (Required for Live Features)

To enable realtime updates in Supabase, run:

```sql
-- Enable realtime for chat and listings
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE listings;
ALTER PUBLICATION supabase_realtime ADD TABLE escrow_transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE loans;
```

## Row-Level Security (RLS)

Enable RLS on all tables and create policies:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE escrow_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- Example policies (customize based on your needs)

-- Profiles: Users can read public profiles, edit their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Listings: Anyone can view, only seller can edit
CREATE POLICY "Listings are viewable by everyone" ON listings
  FOR SELECT USING (true);

CREATE POLICY "Users can create listings" ON listings
  FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their listings" ON listings
  FOR UPDATE USING (auth.uid() = seller_id);

-- Messages: Only conversation participants can view
CREATE POLICY "Users can view their messages" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (conversations.participant_1 = auth.uid() OR conversations.participant_2 = auth.uid())
    )
  );

CREATE POLICY "Users can send messages to conversations they're part of" ON messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = conversation_id
      AND (conversations.participant_1 = auth.uid() OR conversations.participant_2 = auth.uid())
    )
  );
```

## Setup Instructions

1. Go to your Supabase project dashboard
2. Open the SQL Editor
3. Copy and paste all the table creation SQL above
4. Run each section to create the tables
5. Enable Realtime for required tables
6. Set up RLS policies as shown above
7. Update your environment variables:

```bash
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

## Environment Variables for M-Pesa Integration

```bash
REACT_APP_MPESA_API_URL=https://sandbox.safaricom.co.ke/mpesa
REACT_APP_MPESA_CONSUMER_KEY=your-consumer-key
REACT_APP_MPESA_CONSUMER_SECRET=your-consumer-secret
REACT_APP_MPESA_SHORT_CODE=174379
REACT_APP_MPESA_PASS_KEY=your-pass-key
REACT_APP_MPESA_CALLBACK_URL=https://your-app.com/mpesa-callback
```

All tables are now ready for the marketplace platform!
