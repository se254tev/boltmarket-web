# BOLTWEB DATABASE - QUICK REFERENCE

## 📊 Database Overview
- **Type:** PostgreSQL 15+ (Supabase)
- **Tables:** 24 core tables
- **Columns:** 200+
- **Indexes:** 50+
- **Foreign Keys:** 40+
- **Status:** ✅ Production Ready

---

## 🚀 QUICK START

### Option 1: Complete Setup (Recommended)
```bash
# 1. Run migration
sql/supabase_migrations/004_migration_complete.sql

# 2. Validate results
sql/004_validation_complete.sql

# 3. Verify: Check validation output for 100% coverage
```

### Option 2: Emergency Bootstrap
```bash
# If database is completely empty:
sql/005_emergency_bootstrap_oneline.sql

# Then run complete migration:
sql/supabase_migrations/004_migration_complete.sql
```

---

## 📋 TABLE REFERENCE

### Users & Profiles
```sql
profiles(id, email, name, phone, role, wallet_balance, created_at)
```

### Marketplace
```sql
categories(id, name, slug, description)
listings(id, seller_id, title, price, category_id, status, views)
favorites(id, user_id, item_id)
reviews(id, listing_id, user_id, rating, comment)
```

### Transactions
```sql
orders(id, buyer_id, seller_id, total_amount, status)
order_items(id, order_id, listing_id, quantity, unit_price)
escrow_transactions(id, buyer_id, seller_id, amount, status)
payments(id, user_id, amount, method, status)
```

### Messaging
```sql
conversations(id, buyer_id, seller_id, item_id)
messages(id, conversation_id, sender_id, text, created_at)
```

### Loans
```sql
loans(id, borrower_id, amount, status, interest_rate)
loan_providers(id, name, interest_rate, min_amount, max_amount)
loan_repayments(id, loan_id, due_date, amount, paid)
```

### Admin
```sql
content_reports(id, reporter_id, listing_id, reason, status)
admin_logs(id, admin_id, action, details, created_at)
user_points(user_id, points)
```

### Analytics
```sql
page_views(id, user_id, path, created_at)
platform_stats(id, date, total_users, total_listings, total_revenue)
```

---

## 🔍 COMMON QUERIES

### Get User's Listings
```sql
SELECT * FROM listings 
WHERE seller_id = $1 AND status = 'active'
ORDER BY created_at DESC;
```
✅ Uses: `idx_listings_seller_id`, `idx_listings_status`

### Get User's Favorites
```sql
SELECT l.* FROM listings l
JOIN favorites f ON l.id = f.item_id
WHERE f.user_id = $1;
```
✅ Uses: `idx_favorites_user_id`

### Get Conversation Messages
```sql
SELECT * FROM messages 
WHERE conversation_id = $1
ORDER BY created_at ASC;
```
✅ Uses: `idx_messages_conversation_id`

### Get Pending Orders
```sql
SELECT * FROM orders 
WHERE buyer_id = $1 AND status = 'pending'
ORDER BY created_at DESC;
```
✅ Uses: `idx_orders_buyer_id`, `idx_orders_status`

### Get Loan Status
```sql
SELECT * FROM loans 
WHERE borrower_id = $1 AND status != 'completed'
ORDER BY created_at DESC;
```
✅ Uses: `idx_loans_borrower_id`, `idx_loans_status`

### Get Pending Reports
```sql
SELECT * FROM content_reports 
WHERE status = 'pending'
ORDER BY created_at ASC;
```
✅ Uses: `idx_content_reports_status`

---

## 🔑 IMPORTANT CONSTRAINTS

### Role Enum
```sql
role IN ('user', 'seller', 'admin')
```

### Listing Status
```sql
status IN ('active', 'sold', 'inactive')
```

### Payment Status
```sql
status IN ('pending', 'completed', 'failed', 'cancelled')
```

### Loan Status
```sql
status IN ('pending', 'approved', 'rejected', 'disbursed', 'completed')
```

### Escrow Status
```sql
status IN ('pending', 'held', 'released', 'refunded', 'disputed')
```

### Dispute Status
```sql
status IN ('open', 'in_progress', 'resolved', 'closed')
```

### Order Status
```sql
status IN ('pending', 'confirmed', 'completed', 'cancelled', 'disputed')
```

---

## 📈 PERFORMANCE NOTES

### Indexes by Table
| Table | Indexes | Use Case |
|-------|---------|----------|
| **profiles** | 2 | Auth, role filtering |
| **listings** | 5 | Search, category filter, price sort |
| **favorites** | 2 | User favorites, item popularity |
| **conversations** | 4 | Participant lookup |
| **messages** | 3 | Thread display, user history |
| **payments** | 3 | Payment history, status tracking |
| **orders** | 4 | Sales/purchase history |
| **loans** | 3 | Loan history, approval queue |
| **content_reports** | 3 | Moderation queue, item issues |
| **admin_logs** | 2 | Audit trail |

### Slow Query Prevention
- ✅ All filters are indexed (seller_id, category_id, status, etc.)
- ✅ All JOINs on indexed foreign keys
- ✅ Temporal queries use DESC indexes for LIMIT queries
- ✅ Consider adding covering indexes for high-volume queries

---

## ❌ COMMON MISTAKES

### ❌ Missing ON CONFLICT
```sql
-- BAD: Will fail if user already favorited
INSERT INTO favorites (user_id, item_id) VALUES ($1, $2);

-- GOOD: Handles duplicate gracefully
INSERT INTO favorites (user_id, item_id) VALUES ($1, $2)
ON CONFLICT (user_id, item_id) DO NOTHING;
```

### ❌ Wrong Status Value
```sql
-- BAD: Status will be stored but queries won't find it
UPDATE listings SET status = 'archived' WHERE id = $1;

-- GOOD: Use only valid enums
UPDATE listings SET status = 'inactive' WHERE id = $1;
```

### ❌ Missing Timestamps
```sql
-- BAD: User will have NULL timestamps
INSERT INTO orders (buyer_id, total_amount) VALUES ($1, $2);

-- GOOD: Let defaults handle timestamps
INSERT INTO orders (buyer_id, total_amount, status) VALUES ($1, $2, 'pending');
-- created_at and updated_at auto-populate
```

### ❌ Broken Foreign Keys
```sql
-- BAD: seller_id doesn't exist in profiles
INSERT INTO listings (seller_id, title, price) VALUES ('invalid-id', 'Item', 100);

-- GOOD: Verify FK exists first
SELECT * FROM profiles WHERE id = $seller_id; -- Check exists
INSERT INTO listings (seller_id, title, price) VALUES ($seller_id, 'Item', 100);
```

---

## 🔐 SECURITY REMINDERS

### Row Level Security (Not Enabled by Default)
To enable RLS on sensitive tables:
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Example policy: Users can only see their own profiles
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);
```

### Sensitive Fields
- `passwords` - Hash before storing (already done by auth.js)
- `email` - UNIQUE constraint prevents duplicates
- `wallet_balance` - NUMERIC(15,2) prevents float precision errors
- `verified` - Boolean flag for payment method verification

---

## 🛠 TROUBLESHOOTING

### Table doesn't exist?
```sql
-- Check all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

### FK constraint violation?
```sql
-- Find what's missing
SELECT * FROM profiles WHERE id = $missing_id;
-- If empty, create the profile first
```

### Query slow?
```sql
-- Check index usage
EXPLAIN ANALYZE SELECT * FROM listings WHERE seller_id = $1;

-- Recreate index if needed
REINDEX INDEX CONCURRENTLY idx_listings_seller_id;
```

### Migration failed?
```sql
-- Safe to re-run: all CREATE TABLE use IF NOT EXISTS
sql/supabase_migrations/004_migration_complete.sql
```

---

## 📞 REFERENCE FILES

| File | Purpose |
|------|---------|
| `DATABASE_MIGRATION_SUMMARY.md` | Complete documentation |
| `sql/004_validation_complete.sql` | Health check script |
| `sql/supabase_migrations/004_migration_complete.sql` | Full schema creation |
| `sql/005_emergency_bootstrap_oneline.sql` | Emergency fallback |
| `backend/db/schema.sql` | Original backend schema |

---

## ✅ VALIDATION CHECKLIST

- [ ] Migration runs without errors
- [ ] Validation script shows 100% coverage
- [ ] User registration works (profiles table)
- [ ] Item creation works (listings table)
- [ ] Favorites add/remove works (favorites table)
- [ ] Chat starts (conversations + messages)
- [ ] Payment records (payments table)
- [ ] Escrow works (escrow_transactions)
- [ ] Loans process (loans table)
- [ ] Admin reports work (content_reports)

---

## 🎯 EXECUTION TIME

| Operation | Time | Size |
|-----------|------|------|
| Migration | 5-10s | 2,500 lines |
| Validation | 2-5s | 550 lines |
| Emergency | 5-10s | 1 line (15KB) |

---

## 📞 HELP

**Database Issues?**
→ Run: `sql/004_validation_complete.sql`

**Need Full Docs?**
→ Read: `DATABASE_MIGRATION_SUMMARY.md`

**Emergency Recovery?**
→ Use: `sql/005_emergency_bootstrap_oneline.sql`

**Query Help?**
→ See: Common Queries section above

---

**Status:** ✅ Production Ready  
**Version:** 1.0.0  
**Updated:** November 22, 2025

