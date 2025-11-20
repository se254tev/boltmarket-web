# Bolt Market - Setup & Integration Guide

A complete guide to setting up the new features in the Bolt Market platform.

## Table of Contents

1. [Installation](#installation)
2. [Supabase Setup](#supabase-setup)
3. [M-Pesa Integration](#mpesa-integration)
4. [PWA Setup](#pwa-setup)
5. [Feature Guides](#feature-guides)
6. [Testing](#testing)
7. [Deployment](#deployment)

---

## Installation

### Prerequisites

- Node.js 16+
- npm or yarn
- A Supabase project (free tier available)
- M-Pesa test credentials (for payment testing)

### Step 1: Install Dependencies

```bash
cd bolt-market
npm install
```

### Step 2: Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# M-Pesa Configuration (for testing)
REACT_APP_MPESA_API_URL=https://sandbox.safaricom.co.ke/mpesa
REACT_APP_MPESA_CONSUMER_KEY=your-consumer-key
REACT_APP_MPESA_CONSUMER_SECRET=your-consumer-secret
REACT_APP_MPESA_SHORT_CODE=174379
REACT_APP_MPESA_PASS_KEY=your-pass-key
REACT_APP_MPESA_CALLBACK_URL=https://your-app.com/mpesa-callback

# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Step 3: Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Wait for the project to initialize

### 2. Setup Database

1. Navigate to the **SQL Editor** in Supabase
2. Open the `DATABASE_SCHEMA.md` file
3. Copy and paste all the table creation SQL
4. Run the queries to create all tables

### 3. Enable Realtime

1. Go to **Database** → **Replication**
2. Enable replication for:
   - `messages`
   - `listings`
   - `escrow_transactions`
   - `loans`

### 4. Setup Authentication

1. Go to **Authentication** → **Providers**
2. Enable Email/Password auth
3. Configure Google/GitHub OAuth if desired

### 5. Get Your Credentials

1. Go to **Settings** → **API**
2. Copy `SUPABASE_URL` and `SUPABASE_ANON_KEY`
3. Add them to your `.env` file

### 6. Enable Row-Level Security (RLS)

Use the policies from `DATABASE_SCHEMA.md` to set up RLS

---

## M-Pesa Integration

### Test Mode (Development)

By default, the app uses mock M-Pesa implementation. You can:

1. Test the flow with the mock payment service
2. Users will see simulated payment prompts
3. No real charges occur

### Production M-Pesa Setup

To integrate real M-Pesa payments:

1. **Register with Safaricom**
   - Visit [Safaricom Daraja](https://developer.safaricom.co.ke)
   - Register for M-Pesa Sandbox/Production

2. **Get API Credentials**
   - Consumer Key
   - Consumer Secret
   - Short Code (Paybill)
   - Pass Key

3. **Update Environment Variables**
   ```env
   REACT_APP_MPESA_CONSUMER_KEY=your-key
   REACT_APP_MPESA_CONSUMER_SECRET=your-secret
   ```

4. **Enable Real API Calls**
   - Edit `src/services/mpesa.js`
   - Uncomment the real API implementation
   - Comment out the mock implementation

5. **Setup Callback Handler**
   - Implement the M-Pesa callback endpoint on your backend
   - Handle transaction confirmations
   - Update Supabase with payment status

### Testing M-Pesa

Use these test credentials in sandbox:
- Phone: `254712345678`
- Amount: `1` - `50,000`

---

## PWA Setup

### 1. Icons

Add your PWA icons to the `public/` folder:

- `icon-192x192.png` - 192x192 pixels
- `icon-512x512.png` - 512x512 pixels
- `icon-192x192-maskable.png` - Maskable version for adaptive icons

### 2. Customize Manifest

Edit `public/manifest.json`:

```json
{
  "name": "Your App Name",
  "short_name": "Short Name",
  "description": "Your app description",
  "start_url": "/",
  "theme_color": "#0ea5e9",
  "background_color": "#ffffff"
}
```

### 3. Test PWA

- Open DevTools (F12)
- Go to **Application** tab
- Check **Manifest** and **Service Workers**
- You should see the service worker registered

### 4. Install on Mobile

- Open the app on Chrome/Firefox mobile
- Tap the install prompt
- App will be installed like a native app

### 5. Offline Support

The service worker automatically caches:

- Static assets (CSS, JS, images)
- API responses
- HTML pages

Users can browse cached content when offline!

---

## Feature Guides

### 1. Real-Time Chat

**Location**: `/chat`

Features:
- Real-time messaging between buyers and sellers
- Powered by Supabase Realtime
- Message persistence
- Conversation management

**How to Use**:
1. Navigate to Messages
2. Click the + button to start a conversation
3. Enter the user ID of who you want to chat with
4. Send messages in real-time

### 2. Escrow Transactions

**Location**: Built into item details and checkout flow

Features:
- Secure transaction management
- Multi-step confirmation process
- Dispute resolution
- Payment tracking

**Status Flow**:
1. Pending - Awaiting payment
2. Payment Received - Buyer has paid
3. Goods Shipped - Seller has shipped
4. Goods Received - Buyer confirms receipt
5. Completed - Payment released to seller

### 3. Soft Loans

**Location**: `/loans`

Features:
- Loan applications
- Multiple loan providers
- Flexible terms (6-36 months)
- Repayment tracking
- Automatic calculations

**How to Apply**:
1. Go to Loans page
2. Fill out the application form
3. Select loan term (6-36 months)
4. Submit application
5. Wait for provider approval
6. Access repayment schedule

### 4. Admin Dashboard

**Location**: `/admin`

Features:
- Content moderation
- Dispute resolution
- Platform analytics
- User management

**Sections**:
- **Dashboard**: KPIs and metrics
- **Moderation**: Review and action on content reports
- **Disputes**: Resolve buyer-seller disputes
- **Analytics**: Platform performance metrics

### 5. Dark Mode

Accessible from the Navbar (moon/sun icon)

**Options**:
- Light: Always light mode
- Dark: Always dark mode
- System: Follows device settings

**Implementation**: Uses Tailwind CSS dark mode with class strategy

---

## Testing

### Manual Testing Checklist

#### Authentication
- [ ] User can sign up
- [ ] User can log in
- [ ] User can view profile
- [ ] User can update profile

#### Listings
- [ ] Can create listing
- [ ] Can upload images
- [ ] Can edit listing
- [ ] Can delete listing
- [ ] Listings appear in browse

#### Chat
- [ ] Can start conversation
- [ ] Can send messages
- [ ] Messages appear in real-time
- [ ] Can view conversation history

#### Escrow
- [ ] Can create escrow transaction
- [ ] Status updates work
- [ ] Dispute can be initiated
- [ ] Timeline displays correctly

#### Loans
- [ ] Can apply for loan
- [ ] Loan amount validated
- [ ] Monthly payment calculated
- [ ] Application appears in history

#### Dark Mode
- [ ] Light mode works
- [ ] Dark mode works
- [ ] System mode works
- [ ] Theme persists on reload

#### PWA
- [ ] App can be installed
- [ ] Icons display correctly
- [ ] Works offline (cached pages)
- [ ] Push notifications work

### API Testing with Supabase

Use Supabase's built-in tools:

1. Go to **SQL Editor**
2. Query your tables
3. Verify data is being stored correctly

Example query:
```sql
SELECT * FROM listings LIMIT 10;
```

---

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Add environment variables from `.env`

3. **Deploy**
   ```bash
   vercel
   ```

### Netlify Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod --dir dist
   ```

### Self-Hosted Deployment

1. **Build**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your server

3. **Configure**
   - Set environment variables on server
   - Configure HTTPS
   - Setup CORS if needed

---

## Troubleshooting

### Service Worker Not Registering

**Solution**:
- Check browser console for errors
- Verify `/sw.js` exists in public folder
- Clear browser cache and reload

### Supabase Connection Issues

**Solution**:
- Verify `REACT_APP_SUPABASE_URL` in `.env`
- Check Supabase project is active
- Verify ANON_KEY is correct

### M-Pesa Integration Not Working

**Solution**:
- Check environment variables
- Verify phone number format (254XXXXXXXXX)
- Check M-Pesa test credentials
- Review browser console for errors

### Dark Mode Not Working

**Solution**:
- Clear browser cache
- Check `tailwind.config.js` has `darkMode: 'class'`
- Verify ThemeProvider wraps entire app

### Real-Time Chat Not Working

**Solution**:
- Verify Realtime is enabled for messages table
- Check Supabase connection
- Verify user IDs are correct
- Check browser console for errors

---

## Next Steps

1. **User Authentication**: Implement proper auth with Supabase Auth
2. **Payment Integration**: Complete M-Pesa integration for production
3. **Image Uploads**: Setup Supabase Storage for listing images
4. **Email Notifications**: Setup SendGrid or similar for transactional emails
5. **Push Notifications**: Implement FCM or Expo for push notifications
6. **Analytics**: Setup Mixpanel or Segment for advanced analytics

---

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Safaricom Daraja**: https://developer.safaricom.co.ke
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com
- **Vite**: https://vitejs.dev

---

**Last Updated**: November 20, 2025
**Version**: 1.0.0
