# 🚀 Quick Start Guide - Backend Setup & Testing

## What You Have Now

✅ Complete full-stack marketplace system:
- 8 React pages fully wired to Express API
- Express + PostgreSQL backend with 11 route files
- User authentication with JWT
- Real API calls (no mock data)
- Database schema ready to deploy
- Production-ready frontend build

## Get Started in 5 Minutes

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm installed

### Step 1: Project Setup
```bash
cd "c:\Users\Stephen Otieno\OneDrive\Desktop\projects\Boltweb"
cp .env.sample .env
```

### Step 2: Edit .env
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/boltmarket
JWT_SECRET=your_secret_key_here
```

### Step 3: Create Database
```bash
# Open PostgreSQL
psql -U postgres

# Create database (in psql)
CREATE DATABASE boltmarket;
\q

# Execute schema
psql -U postgres -d boltmarket -f backend/db/schema.sql
```

### Step 4: Start Backend
```bash
cd backend
npm install
npm run dev
```

### Step 5: Start Frontend (New Terminal)
```bash
npm run dev
```

### Step 6: Open Browser
http://localhost:5173 - Your full-stack marketplace! 🎉

## Test the System

### Create Account & List Item
1. Register: Fill signup form
2. Seller Dashboard: Create new item
3. Browse: View your item listed
4. Chat: Message with other users
5. Admin: View reports (if admin role)

### API Testing
```bash
# Get all items
curl http://localhost:5000/api/items

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123"}'
```

## What's Connected

### Frontend Pages
- ✅ HomePage - Categories & trending items
- ✅ BrowsePage - Search & filter
- ✅ ItemDetailsPage - Full item info
- ✅ SellerDashboard - CRUD items
- ✅ ChatPage - Messaging
- ✅ LoansPage - Loan applications
- ✅ AdminDashboard - Moderation
- ✅ ItemCard - Favorites toggle

### Backend Endpoints (11 Routes)
- ✅ Auth - Register, login, verify
- ✅ Items - CRUD marketplace listings
- ✅ Categories - Browse categories
- ✅ Users - Profiles & listings
- ✅ Favorites - Wishlist management
- ✅ Chats - Messaging system
- ✅ Escrow - Transaction holds
- ✅ M-Pesa - Payment integration
- ✅ Loans - Soft loan system
- ✅ Admin - Content moderation
- ✅ Rewards - Points system

## Database
11 tables created automatically:
- users, items, categories, favorites
- conversations, messages
- payments, escrow_transactions, disputes
- loans, user_points

## Troubleshooting

### Port in use?
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Database error?
```bash
# Check PostgreSQL
psql -U postgres -d boltmarket -c "SELECT 1"
```

### CORS error?
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Check .env REACT_APP_API_URL

## Documentation

- `BACKEND_SETUP.md` - Detailed setup & API docs
- `INTEGRATION_COMPLETE.md` - Full integration status
- `START_HERE.md` - Project overview

---

**Everything is wired and ready. Start both servers and test!** ✨
- ✅ Helper utilities and formatters
- ✅ Deployment guides

## 📦 Installation & Running

### 1. Install Dependencies
```bash
cd c:\Users\Stephen Otieno\OneDrive\Desktop\projects\Boltweb
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open browser to: `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm run preview  # Test production build locally
```

## 🗺️ File Structure Quick Reference

```
src/
  ├── components/          ← Reusable UI pieces
  │   ├── Navbar.jsx
  │   ├── Footer.jsx
  │   ├── ItemCard.jsx
  │   ├── CategoryBadge.jsx
  │   ├── SearchBar.jsx
  │   └── Modal.jsx
  ├── pages/               ← Full page components
  │   ├── HomePage.jsx
  │   ├── BrowsePage.jsx
  │   ├── ItemDetailsPage.jsx
  │   ├── SellerDashboard.jsx
  │   └── NotFoundPage.jsx
  ├── services/            ← API integration
  │   └── api.js
  ├── data/                ← Mock data
  │   └── mockData.js
  ├── utils/               ← Helper functions
  │   └── helpers.js
  ├── styles/              ← Global styles
  │   └── globals.css
  ├── App.jsx              ← Main app with routes
  └── main.jsx             ← Entry point
```

## 🎯 Pages Overview

### Home Page (`/`)
- Hero section with search
- Category browsing
- Trending items showcase
- Call-to-action sections

### Browse Page (`/browse`)
- Advanced filtering (category, price, rating)
- Sort options (newest, price, rating)
- Search functionality
- Pagination
- Responsive grid layout

### Item Details Page (`/item/:id`)
- Product image carousel
- Seller information
- Reviews section
- Add to cart & favorites
- Leave review form

### Seller Dashboard (`/dashboard`)
- Seller statistics
- Manage listings
- Create new listings
- Edit/delete listings
- Filter by status (active/sold)

## 🎨 Design System

### Colors
```
Primary:  #0ea5e9 (Sky Blue)    - Main actions
Accent:   #ec4899 (Pink)        - Highlights
Dark:     #0f172a (Slate)       - Text/BG
Light:    #f0f9ff              - Backgrounds
```

### Typography
```
Headings: Plus Jakarta Sans (bold)
Body:     Inter (normal)
Sizes:    H1, H2, H3, H4 + LG, Base, SM
```

### Components
- **Buttons**: `.btn .btn-primary .btn-secondary .btn-ghost`
- **Cards**: `.card .card-base`
- **Inputs**: `.input`
- **Badges**: `.badge .badge-primary`

## 💻 Key Features to Know

### Search & Filter
```javascript
// Users can:
- Search by title/category
- Filter by category, price, rating
- Sort by newest, price, rating
- View paginated results
```

### Favorites System
```javascript
// Click heart icon on items to save
// Saved items are tracked in component state
// Ready to connect to backend
```

### Create Listings (Seller Dashboard)
```javascript
// Click "Create Listing" button
// Fill form: title, price, category, image, description
// Edit or delete listings anytime
// View stats: views, favorites
```

### Responsive Design
```
Mobile:  Works on screens < 640px
Tablet:  Optimized for 640px - 1024px
Desktop: Full experience on 1024px+
```

## 🔌 Connecting Your Backend

### Step 1: Update API URL
Edit `.env`:
```env
REACT_APP_API_URL=http://your-backend.com/api
```

### Step 2: Use API Client
```javascript
import { itemsAPI, authAPI, favoritesAPI } from './services/api';

// Get items
const items = await itemsAPI.getAllItems();

// Create item
await itemsAPI.createItem({ title: 'Jacket', price: 99.99 });

// Add to favorites
await favoritesAPI.addFavorite(itemId);
```

### Step 3: Replace Mock Data
Edit `src/data/mockData.js` or remove it and fetch from API

## 📱 Testing Responsive Design

### In Browser DevTools
1. Press `F12` to open DevTools
2. Click mobile icon (top-left)
3. Test different screen sizes

### Common Breakpoints to Test
- Mobile: 375px (iPhone)
- Tablet: 768px (iPad)
- Desktop: 1024px+ (Desktop)

## 🚢 Deploy in 5 Minutes

### Vercel (Easiest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Upload dist/ folder to gh-pages
```

## 🛠 Customization Tips

### Change Logo
Edit in `Navbar.jsx`:
```jsx
<svg>...</svg>
Bolt Market  // Change text
```

### Add New Category
Edit `mockData.js`:
```javascript
{ id: 9, name: 'Electronics', icon: '📱', itemCount: 100 }
```

### Modify Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { 500: '#your-color' }
}
```

### Add New Page
1. Create file in `src/pages/`
2. Add route in `App.jsx`
3. Link to it from Navbar

## ⚡ Performance Tips

✅ Already Optimized:
- Code splitting with Vite
- CSS purging with Tailwind
- Minified production build

📝 To Improve Further:
- Replace placeholder images with real ones
- Implement lazy loading for images
- Add image compression
- Optimize bundle size

## 🐛 Common Issues

**Port 3000 already in use?**
```bash
npm run dev -- --port 3001
```

**Styles not showing?**
```bash
# Rebuild Tailwind
npm run dev
# Clear browser cache (Ctrl+Shift+Delete)
```

**API requests failing?**
- Check backend is running
- Verify CORS is enabled
- Check `.env` API URL
- Look at browser Console (F12)

## 📚 File-by-File Breakdown

| File | Purpose | Key Functions |
|------|---------|---|
| `App.jsx` | Main router | Routes to all pages |
| `components/Navbar.jsx` | Navigation | Links, mobile menu |
| `pages/HomePage.jsx` | Landing | Hero, search, trending |
| `pages/BrowsePage.jsx` | Listings | Filter, sort, paginate |
| `services/api.js` | Backend calls | axios client config |
| `data/mockData.js` | Sample data | Items, categories, sellers |
| `utils/helpers.js` | Utilities | Format, validate, store |
| `styles/globals.css` | Global styles | Tailwind directives |

## 🎓 Learning Resources

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Vite**: https://vitejs.dev
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com

## 🔐 Security Checklist

Before deploying:
- [ ] Never commit API keys to git
- [ ] Use environment variables
- [ ] HTTPS only in production
- [ ] Validate all user inputs
- [ ] Sanitize HTML content
- [ ] Use secure headers
- [ ] Enable CORS properly

## 📞 Helpful Commands

```bash
# Install packages
npm install package-name

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format

# Check for errors
npm run lint
```

## 🎉 What's Next?

1. ✅ Get it running locally
2. ✅ Connect your backend API
3. ✅ Customize with your branding
4. ✅ Deploy to Vercel/Netlify
5. ✅ Add authentication
6. ✅ Implement cart system
7. ✅ Set up payments
8. ✅ Go live!

## 💡 Pro Tips

- Use React DevTools browser extension for debugging
- Check Lighthouse score in DevTools (Ctrl+Shift+I)
- Use mock data during development
- Test on real mobile devices
- Keep git history clean with meaningful commits
- Use `.env` for all configuration

---

## 🆘 Need Help?

1. Check the `README.md` for detailed docs
2. Look at `DEPLOYMENT.md` for deployment help
3. Review code comments in components
4. Check error messages in browser console
5. Visit framework documentation links above

**You're all set! Happy coding! 🚀**
