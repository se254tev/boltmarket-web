# 📋 Bolt Market - Complete Project Structure

```
bolt-market/
│
├── 📄 index.html                    # HTML entry point
├── 📄 package.json                  # Dependencies & scripts
├── 📄 vite.config.js                # Vite configuration
├── 📄 tailwind.config.js            # Tailwind CSS theme
├── 📄 postcss.config.js             # PostCSS plugins
├── 📄 .eslintrc.json                # ESLint rules
├── 📄 .prettierrc                   # Prettier formatting
├── 📄 .gitignore                    # Git ignore rules
├── 📄 .env.example                  # Environment template
│
├── 📁 src/                          # Source code root
│   │
│   ├── 📄 main.jsx                  # React entry point
│   ├── 📄 App.jsx                   # Main app router component
│   │
│   ├── 📁 components/               # Reusable UI components
│   │   ├── 📄 Navbar.jsx
│   │   │   ├─ Logo and branding
│   │   │   ├─ Navigation links
│   │   │   ├─ Mobile menu toggle
│   │   │   └─ Sign in button
│   │   │
│   │   ├── 📄 Footer.jsx
│   │   │   ├─ Brand info
│   │   │   ├─ Product/Company links
│   │   │   ├─ Social links
│   │   │   └─ Newsletter signup
│   │   │
│   │   ├── 📄 ItemCard.jsx
│   │   │   ├─ Product image with hover
│   │   │   ├─ Category badge
│   │   │   ├─ Favorite button
│   │   │   ├─ Title & seller info
│   │   │   ├─ Star rating
│   │   │   ├─ Price display
│   │   │   └─ View details button
│   │   │
│   │   ├── 📄 CategoryBadge.jsx
│   │   │   ├─ Category icon
│   │   │   ├─ Category name
│   │   │   ├─ Selected/hover states
│   │   │   └─ Click handler
│   │   │
│   │   ├── 📄 SearchBar.jsx
│   │   │   ├─ Text search input
│   │   │   ├─ Location toggle
│   │   │   ├─ Location input
│   │   │   └─ Search button
│   │   │
│   │   └── 📄 Modal.jsx
│   │       ├─ Backdrop
│   │       ├─ Modal header with close
│   │       ├─ Content area
│   │       ├─ Footer with actions
│   │       └─ Animation support
│   │
│   ├── 📁 pages/                    # Page components
│   │   ├── 📄 HomePage.jsx
│   │   │   ├─ Hero section
│   │   │   ├─ Search integration
│   │   │   ├─ Category grid
│   │   │   ├─ Trending items grid
│   │   │   └─ CTA section
│   │   │
│   │   ├── 📄 BrowsePage.jsx
│   │   │   ├─ Sidebar filters
│   │   │   │  ├─ Category filter
│   │   │   │  ├─ Price range filter
│   │   │   │  ├─ Rating filter
│   │   │   │  └─ Clear filters button
│   │   │   ├─ Main content area
│   │   │   │  ├─ Sort dropdown
│   │   │   │  ├─ Search input
│   │   │   │  └─ Items grid
│   │   │   ├─ Pagination controls
│   │   │   └─ Empty state message
│   │   │
│   │   ├── 📄 ItemDetailsPage.jsx
│   │   │   ├─ Breadcrumb navigation
│   │   │   ├─ Image carousel
│   │   │   │  ├─ Main image display
│   │   │   │  └─ Thumbnail navigation
│   │   │   ├─ Product details
│   │   │   │  ├─ Category badge
│   │   │   │  ├─ Title
│   │   │   │  ├─ Rating display
│   │   │   │  └─ Price
│   │   │   ├─ Quantity selector
│   │   │   ├─ Add to cart button
│   │   │   ├─ Save to favorites
│   │   │   ├─ Seller information card
│   │   │   ├─ Reviews section
│   │   │   ├─ Existing reviews list
│   │   │   └─ Review submission form
│   │   │
│   │   ├── 📄 SellerDashboard.jsx
│   │   │   ├─ Dashboard header
│   │   │   ├─ Statistics cards
│   │   │   │  ├─ Active listings
│   │   │   │  ├─ Total views
│   │   │   │  ├─ Favorites count
│   │   │   │  └─ Items sold
│   │   │   ├─ Filter tabs (all/active/sold)
│   │   │   ├─ Listings grid
│   │   │   │  ├─ Listing image
│   │   │   │  ├─ Status badge
│   │   │   │  ├─ Title
│   │   │   │  ├─ Price
│   │   │   │  ├─ Views/Favorites stats
│   │   │   │  ├─ Edit button
│   │   │   │  └─ Delete button
│   │   │   ├─ Empty state
│   │   │   ├─ Create listing modal
│   │   │   │  ├─ Title input
│   │   │   │  ├─ Category select
│   │   │   │  ├─ Price input
│   │   │   │  ├─ Image URL input
│   │   │   │  ├─ Description textarea
│   │   │   │  └─ Submit button
│   │   │   └─ Edit listing modal (same form)
│   │   │
│   │   └── 📄 NotFoundPage.jsx
│   │       ├─ 404 heading
│   │       ├─ Error message
│   │       ├─ Home button
│   │       ├─ Browse button
│   │       └─ Illustration
│   │
│   ├── 📁 services/                 # API & external services
│   │   └── 📄 api.js
│   │       ├─ Axios instance config
│   │       ├─ Request interceptors (auth token)
│   │       ├─ Items API
│   │       │  ├─ getAllItems()
│   │       │  ├─ getItemById()
│   │       │  ├─ createItem()
│   │       │  ├─ updateItem()
│   │       │  ├─ deleteItem()
│   │       │  └─ searchItems()
│   │       ├─ Categories API
│   │       │  ├─ getAllCategories()
│   │       │  └─ getItemsByCategory()
│   │       ├─ Users API
│   │       │  ├─ getSellerProfile()
│   │       │  ├─ getCurrentProfile()
│   │       │  ├─ updateProfile()
│   │       │  └─ getMyListings()
│   │       ├─ Auth API
│   │       │  ├─ register()
│   │       │  ├─ login()
│   │       │  ├─ logout()
│   │       │  └─ verifyToken()
│   │       ├─ Favorites API
│   │       │  ├─ getFavorites()
│   │       │  ├─ addFavorite()
│   │       │  └─ removeFavorite()
│   │       └─ Reviews API
│   │           ├─ getItemReviews()
│   │           ├─ createReview()
│   │           └─ getSellerReviews()
│   │
│   ├── 📁 data/                     # Data & constants
│   │   └── 📄 mockData.js
│   │       ├─ mockItems array
│   │       ├─ mockCategories array
│   │       ├─ mockListings array
│   │       ├─ mockSeller object
│   │       ├─ mockFilters object
│   │       │  ├─ Price ranges
│   │       │  ├─ Ratings
│   │       │  └─ Conditions
│   │
│   ├── 📁 utils/                    # Utility functions
│   │   └── 📄 helpers.js
│   │       ├─ formatPrice()
│   │       ├─ formatDate()
│   │       ├─ formatNumber()
│   │       ├─ truncateText()
│   │       ├─ generateId()
│   │       ├─ isValidEmail()
│   │       ├─ isValidUrl()
│   │       ├─ debounce()
│   │       ├─ throttle()
│   │       ├─ getInitials()
│   │       ├─ getStars()
│   │       ├─ storage helpers
│   │       ├─ copyToClipboard()
│   │       ├─ delay()
│   │       ├─ getQueryParam()
│   │       └─ buildQueryString()
│   │
│   └── 📁 styles/                   # Global styles
│       └── 📄 globals.css
│           ├─ Tailwind directives
│           ├─ Custom animations
│           ├─ Component utilities
│           │  ├─ .btn classes
│           │  ├─ .card classes
│           │  ├─ .input classes
│           │  ├─ .badge classes
│           │  └─ .spinner
│           ├─ Typography scales
│           ├─ Responsive utilities
│           └─ Gradient backgrounds
│
├── 📁 docs/                         # Documentation (optional)
│   ├── 📄 ARCHITECTURE.md           # System design
│   ├── 📄 API_REFERENCE.md          # API documentation
│   └── 📄 COMPONENTS.md             # Component library
│
├── 📄 README.md                     # Main documentation
├── 📄 QUICKSTART.md                 # Quick start guide
├── 📄 DEPLOYMENT.md                 # Deployment instructions
│
└── 📄 .env                          # Environment variables (not in git)
    └── REACT_APP_API_URL=...
        REACT_APP_ENV=development
```

## Component Hierarchy

```
<App>
  ├─ <Navbar />
  ├─ <main>
  │   ├─ <HomePage>
  │   │   ├─ <SearchBar />
  │   │   ├─ <CategoryBadge /> (multiple)
  │   │   ├─ <ItemCard /> (multiple)
  │   │   └─ CTA sections
  │   │
  │   ├─ <BrowsePage>
  │   │   ├─ Filter sidebar
  │   │   │   └─ Input checkboxes
  │   │   └─ Main content
  │   │       ├─ Sort controls
  │   │       ├─ <ItemCard /> (multiple)
  │   │       └─ Pagination
  │   │
  │   ├─ <ItemDetailsPage>
  │   │   ├─ Image carousel
  │   │   ├─ Product details
  │   │   ├─ Seller info card
  │   │   ├─ Reviews section
  │   │   └─ <Modal /> (for review form)
  │   │
  │   ├─ <SellerDashboard>
  │   │   ├─ Statistics cards
  │   │   ├─ Filter tabs
  │   │   ├─ Listings grid
  │   │   └─ <Modal /> (for create/edit)
  │   │
  │   └─ <NotFoundPage>
  │       └─ Error message
  │
  └─ <Footer />
```

## Data Flow

```
User Action
    ↓
Component State Update
    ↓
API Call (via services/api.js)
    ↓
Mock/Real Data Response
    ↓
Component Re-render
    ↓
Updated UI Display
```

## Styling Architecture

```
Tailwind CSS Base
    ↓
PostCSS Processing
    ↓
Global CSS (globals.css)
    ├─ Custom animations
    ├─ Component utilities
    └─ Typography scales
    ↓
Component Classes
    └─ Inline Tailwind + custom classes
    ↓
Final Styled Components
```

## File Size Reference

| File | Purpose | Size |
|------|---------|------|
| Navbar.jsx | Navigation | ~3 KB |
| Footer.jsx | Footer | ~3 KB |
| ItemCard.jsx | Item display | ~4 KB |
| HomePage.jsx | Home page | ~5 KB |
| BrowsePage.jsx | Browse page | ~7 KB |
| ItemDetailsPage.jsx | Details page | ~10 KB |
| SellerDashboard.jsx | Dashboard | ~8 KB |
| api.js | API client | ~3 KB |
| helpers.js | Utilities | ~5 KB |
| globals.css | Styles | ~8 KB |

**Total Source: ~60 KB (before compression)**

## Development Workflow

1. **Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes**
   - Edit files in src/
   - Save and hot reload active

3. **Test Locally**
   ```bash
   npm run dev
   # Test at http://localhost:3000
   ```

4. **Format & Lint**
   ```bash
   npm run format
   npm run lint
   ```

5. **Commit**
   ```bash
   git add .
   git commit -m "Add new feature"
   ```

6. **Build & Test**
   ```bash
   npm run build
   npm run preview
   ```

7. **Push & Deploy**
   ```bash
   git push origin feature/new-feature
   # Create pull request
   ```

## Naming Conventions

- **Components**: PascalCase (e.g., `ItemCard.jsx`)
- **Functions**: camelCase (e.g., `handleSearch()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS = 100`)
- **Files**: camelCase for utilities, PascalCase for components
- **CSS Classes**: kebab-case (e.g., `.btn-primary`)

## Best Practices Applied

✅ **Component Structure**
- Single responsibility principle
- Props validation through comments
- Clear component documentation

✅ **State Management**
- Local state where appropriate
- Lifting state when needed
- No global state needed for MVP

✅ **Styling**
- Utility-first approach (Tailwind)
- Responsive design mobile-first
- Consistent spacing and sizing

✅ **Performance**
- Memoization ready
- No unnecessary re-renders
- Optimized images paths

✅ **Accessibility**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support

✅ **Code Quality**
- Clear variable names
- JSDoc comments
- Consistent formatting

---

This structure is scalable, maintainable, and ready for production deployment!
