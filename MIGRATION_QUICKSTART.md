# QUICK START: Run Database Migrations

## 3-Step Setup

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase Project Dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Copy & Paste Migration
Copy the **entire** contents of:
```
sql/supabase_migrations/003_comprehensive_migration.sql
```

Paste into the SQL Editor query box.

### Step 3: Execute
Click **Run** button and wait for completion.

You should see confirmation: "22 tables created successfully"

---

## Verify Installation

After running migration, paste this to verify:

```sql
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

Should return 22 rows (profiles, categories, listings, orders, etc.)

---

## If Something Goes Wrong

### Error: "relation 'orders' does not exist"
→ Solution: You haven't run the migration yet. Run Step 1-3 above.

### Error: "already exists"
→ Solution: Safe to ignore. Migration uses `IF NOT EXISTS` so can be re-run.

### Need to Clear Everything & Start Fresh
Run this (⚠️ WARNING: DELETES ALL DATA):

```sql
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
```

Then run Step 1-3 above again.

---

## Environment Variables for Frontend

Add these to your `.env.local` file (or Vercel settings):

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

Get these from: **Supabase Project Settings → API**

---

## Test It Works

1. **Frontend**: `npm run dev` (should see no errors)
2. **Create Test User**: Sign up via magic link
3. **Create Test Listing**: In Seller Dashboard
4. **Check Database**: 
   ```sql
   SELECT COUNT(*) FROM profiles;
   SELECT COUNT(*) FROM listings;
   ```
   Should show 1 profile, 1 listing.

---

## Deploy to Vercel

1. Set env vars in Vercel Project Settings
2. Run `npm run build` locally (should succeed)
3. Push to GitHub
4. Vercel auto-deploys

Your site is now live! 🚀

---

## Need Help?

- **Database issues**: Check `sql/validation_schema.sql` output
- **Build issues**: Run `npm run build` locally and check errors
- **Frontend errors**: Open browser console (F12) and look for error messages
- **Environment vars**: Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set

---

**Status**: ✅ Production Ready
