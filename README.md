# Bolt Market - Modern Interactive Marketplace

A clean, modern, fully responsive marketplace built with React, Vite, and Tailwind CSS. Ready to deploy on Vercel, Netlify, or GitHub Pages.

## 🚀 Features

- **Home Page**: Hero section, search bar, category buttons, trending items grid
- **Browse Page**: Advanced filtering, sorting, pagination, infinite scroll ready
- **Item Details Page**: Product images, seller info, reviews, add to favorites
- **Seller Dashboard**: Manage listings, create/edit/delete items
- **Responsive Design**: Mobile-first, 100% responsive layout
- **Modern UI**: Clean design with smooth animations, professional color palette
- **Reusable Components**: Navbar, Footer, ItemCard, CategoryBadge, SearchBar, Modal
- **API Ready**: Pre-configured axios client with mock data support

## 📁 Project Structure

```
bolt-market/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Footer.jsx       # Site footer
│   │   ├── ItemCard.jsx     # Item display card
│   │   ├── CategoryBadge.jsx # Category selector
│   │   ├── SearchBar.jsx    # Search component
│   │   └── Modal.jsx        # Reusable modal
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Landing page
│   │   ├── BrowsePage.jsx   # Item browsing
│   │   ├── ItemDetailsPage.jsx # Product details
│   │   ├── SellerDashboard.jsx # Seller tools
│   │   └── NotFoundPage.jsx # 404 page
│   ├── services/            # API and utilities
│   │   └── api.js           # Axios API client
│   ├── data/                # Mock data
│   │   └── mockData.js      # Sample items and categories
│   ├── styles/              # Global styles
│   │   └── globals.css      # Tailwind + custom CSS
│   ├── App.jsx              # Main app component
│   └── main.jsx             # React entry point
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # Documentation
```

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#0ea5e9) - Main actions and accents
- **Accent**: Pink (#ec4899) - Highlights and favorites
- **Dark**: Slate (#0f172a - #334155) - Text and backgrounds

### Typography
- **Display Font**: Plus Jakarta Sans (headings)
- **Body Font**: Inter (content)
- **Scales**: Heading 1-4, Body LG/Base/SM

### Components
- **Buttons**: Primary, Secondary, Ghost variants with sizes (sm, lg)
- **Cards**: With hover effects and shadows
- **Badges**: Category and status indicators
- **Inputs**: Consistent styling with focus states

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- A modern web browser

### Installation

1. **Navigate to project directory**
```bash
cd bolt-market
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```
The app will open at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## 📦 Production Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### GitHub Pages
1. Update `vite.config.js` with your repo name
2. Run `npm run build`
3. Deploy `dist/` folder

## 📡 API Integration

### Mock Data
The app comes with mock data in `src/data/mockData.js`. Replace with real API calls:

```javascript
import { itemsAPI } from './services/api';

// Get all items
const items = await itemsAPI.getAllItems();

// Create item
await itemsAPI.createItem({ title: 'Jacket', price: 99.99 });

// Update item
await itemsAPI.updateItem(id, { price: 89.99 });

// Delete item
await itemsAPI.deleteItem(id);
```

### API Endpoints

All endpoints are configured in `src/services/api.js`:

**Items**
- `GET /items` - Get all items
- `GET /items/:id` - Get single item
- `POST /items` - Create item (auth required)
- `PUT /items/:id` - Update item (auth required)
- `DELETE /items/:id` - Delete item (auth required)

**Categories**
- `GET /categories` - Get all categories
- `GET /categories/:id/items` - Get items by category

**Users/Sellers**
- `GET /users/:id` - Get seller profile
- `GET /users/profile` - Get current user (auth required)
- `GET /users/listings` - Get user's listings (auth required)

**Authentication**
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /auth/verify` - Verify token

**Favorites**
- `GET /favorites` - Get favorites (auth required)
- `POST /favorites` - Add favorite (auth required)
- `DELETE /favorites/:id` - Remove favorite (auth required)

**Reviews**
- `GET /items/:id/reviews` - Get item reviews
- `POST /items/:id/reviews` - Create review (auth required)

## 🎯 Features to Add

1. **Authentication**
   - Login/Register pages
   - User profile management
   - JWT token handling

2. **Shopping Cart**
   - Add/remove items
   - Cart persistence (localStorage)
   - Checkout flow

3. **Search & Filters**
   - Advanced search
   - Saved searches
   - Recently viewed

4. **User Reviews**
   - Review submission
   - Rating system
   - Review moderation

5. **Messaging**
   - Seller-buyer messaging
   - Notifications
   - Message history

6. **Admin Dashboard**
   - User management
   - Moderation tools
   - Analytics

## 🛠 Customization

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { 500: '#your-color' }
}
```

### Modify Component Styling
All components are in `src/components/` and use Tailwind classes. Modify the className attributes to change appearance.

### Update Mock Data
Edit `src/data/mockData.js` to add more categories, items, or filters.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (default)
- **Tablet**: 640px - 1024px (sm/md)
- **Desktop**: > 1024px (lg)

Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`

## ⚡ Performance

- **Code Splitting**: Automatic with Vite
- **Image Optimization**: Use images appropriately
- **CSS Purging**: Automatic with Tailwind
- **Tree Shaking**: Unused code removed in build

### Lighthouse Tips
- Add real images (not placeholder URLs)
- Implement lazy loading for images
- Compress images to < 100KB each
- Add meta descriptions and og tags

## 🔒 Security

- **HTTPS Only**: Always use HTTPS in production
- **Environment Variables**: Never commit API keys
- **CORS**: Configure CORS in backend
- **Auth**: Use JWT tokens with httpOnly cookies
- **Input Validation**: Sanitize all user inputs

## 📄 License

MIT License - free to use and modify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
