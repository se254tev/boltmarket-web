# 🎨 Bolt Market - Visual Overview & UI Elements

## 🎯 Design System At a Glance

### Color Palette

```
PRIMARY (Sky Blue)
#0ea5e9  ← Main buttons, links, active states

ACCENT (Pink)
#ec4899  ← Favorites, highlights, special actions

DARK GRAYS (Text & Backgrounds)
#0f172a  ← Text, headers
#1e293b  ← Dark backgrounds
#334155  ← Medium text
#475569  ← Light text
#cbd5e1  ← Borders

LIGHT GRAYS (Backgrounds)
#f8fafc  ← Light backgrounds
#f1f5f9  ← Cards, sections
#e2e8f0  ← Hover states

ACCENT COLORS
Gold/Yellow  #fbbf24 ← Star ratings
Green/Emerald #10b981 ← Success states
Red          #ef4444 ← Danger/delete
```

### Typography

```
DISPLAY FONT: Plus Jakarta Sans (bold)
  - H1: 48px, bold      (Main titles)
  - H2: 36px, bold      (Section titles)
  - H3: 30px, bold      (Subsection titles)
  - H4: 24px, bold      (Minor titles)

BODY FONT: Inter (regular)
  - LG: 18px           (Large body text)
  - Base: 16px         (Standard body)
  - SM: 14px           (Small text, captions)
```

---

## 📱 Page Layouts

### HOME PAGE
```
┌─────────────────────────────────────┐
│          [NAVBAR]                   │
├─────────────────────────────────────┤
│                                     │
│   HERO SECTION (Blue Background)    │
│  ┌─────────────────────────────┐   │
│  │  Welcome to Bolt Market     │   │
│  │  [Search Bar]               │   │
│  │  10K+ | 5K+ | 50K+ (Stats)  │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│  Browse by Category                 │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐             │
│  │👗│ │📱│ │🏠│ │⚽│             │
│  └──┘ └──┘ └──┘ └──┘             │
├─────────────────────────────────────┤
│  Trending Now            [View All]  │
│  ┌─────┐ ┌─────┐ ┌─────┐          │
│  │Card1│ │Card2│ │Card3│          │
│  └─────┘ └─────┘ └─────┘          │
├─────────────────────────────────────┤
│  Ready to Start Selling?            │
│  [Start Listing Today] Button       │
│                                     │
├─────────────────────────────────────┤
│          [FOOTER]                   │
└─────────────────────────────────────┘
```

### BROWSE PAGE
```
┌──────────────────────────────────────┐
│           [NAVBAR]                   │
├──────────────────────────────────────┤
│                                      │
│ [Filters] │ Results (3,245 items)   │
│           │                          │
│ ☑ Fashion │ Sort: [Newest ▼]        │
│ ☑ Home    │ [Search bar]            │
│ ☑ Sports  │                          │
│           │ ┌─────┐ ┌─────┐ ┌─────┐ │
│ Price:    │ │Card │ │Card │ │Card │ │
│ ☑ <$25    │ └─────┘ └─────┘ └─────┘ │
│ ☑ $25-50  │                          │
│ ☑ $50-100 │ ┌─────┐ ┌─────┐ ┌─────┐ │
│           │ │Card │ │Card │ │Card │ │
│ Rating:   │ └─────┘ └─────┘ └─────┘ │
│ ☑ 5 Stars │                          │
│ ☑ 4+ Star │ [1] [2] [3] Next→      │
│           │                          │
├──────────────────────────────────────┤
│          [FOOTER]                    │
└──────────────────────────────────────┘
```

### ITEM DETAILS PAGE
```
┌──────────────────────────────────────┐
│           [NAVBAR]                   │
├──────────────────────────────────────┤
│ Home / Browse / Vintage Jacket       │
│                                      │
│ ┌─────────┐  ┌──────────────────┐   │
│ │ [Image] │  │ Category Badge   │   │
│ │ [Image] │  │ Vintage Jacket   │   │
│ │         │  │ ⭐⭐⭐⭐⭐ (24)    │   │
│ │Thumb.. │  │ $89.99           │   │
│ └─────────┘  │                  │   │
│              │ Description...   │   │
│              │ Qty: [-] 1 [+]   │   │
│              │ [Add to Cart]    │   │
│              │ [❤ Save]        │   │
│              │ ┌──────────────┐ │   │
│              │ │ Seller Info  │ │   │
│              │ │ Tech Store ✓ │ │   │
│              │ │ 4.8★ (156)   │ │   │
│              │ └──────────────┘ │   │
│              └──────────────────┘   │
│                                      │
│ REVIEWS (24)                         │
│ ┌──────────────────────────────┐    │
│ │ Alice - ⭐⭐⭐⭐⭐              │    │
│ │ Excellent product!           │    │
│ └──────────────────────────────┘    │
│                                      │
│ [Leave a Review] Form                │
├──────────────────────────────────────┤
│          [FOOTER]                    │
└──────────────────────────────────────┘
```

### SELLER DASHBOARD
```
┌──────────────────────────────────────┐
│           [NAVBAR]                   │
├──────────────────────────────────────┤
│ Seller Dashboard        [+ Create]   │
│                                      │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │
│ │ 12 │ │324 │ │ 48 │ │234 │        │
│ │Act.│ │View│ │Fav.│ │Sold│        │
│ └────┘ └────┘ └────┘ └────┘        │
│                                      │
│ [All] [Active] [Sold]                │
│ ┌──────────┐ ┌──────────┐           │
│ │ Listing  │ │ Listing  │           │
│ │ $89.99   │ │ $199.99  │           │
│ │ Active   │ │ Sold     │           │
│ │Views: 10 │ │Views: 250│           │
│ │[Edit]    │ │[Edit]    │           │
│ │[Delete]  │ │[Delete]  │           │
│ └──────────┘ └──────────┘           │
│                                      │
├──────────────────────────────────────┤
│          [FOOTER]                    │
└──────────────────────────────────────┘
```

---

## 🧩 Component Examples

### ItemCard Component
```
┌──────────────────────┐
│ [Image]              │ ← Image with hover zoom
│ 🏷️ Fashion  ❤️        │ ← Category & Favorite
├──────────────────────┤
│ Vintage Leather...   │ ← Title (truncated)
│ 👤 John Doe          │ ← Seller
│ ⭐⭐⭐⭐⭐ (24)       │ ← Rating
│                      │
│ $89.99               │ ← Price
├──────────────────────┤
│ [View Details]       │ ← Action button
└──────────────────────┘
```

### Navbar Component
```
┌─────────────────────────────────────┐
│ ⚡ Bolt Market  [Home] [Browse]     │
│                          [Dashboard]│
│                 [🔔] [Sign In]      │
└─────────────────────────────────────┘

Mobile:
┌─────────────────────────────────────┐
│ ⚡ Bolt Market           [≡]         │
│ ▼ [Home] [Browse] [Dashboard]       │
└─────────────────────────────────────┘
```

### CategoryBadge Component
```
Unselected:
┌──────────────┐
│   👗         │
│  Fashion     │
└──────────────┘

Selected:
┌──────────────┐
│   👗    (Blue)
│  Fashion (Blue)
└──────────────┘
```

### SearchBar Component
```
┌─────────────────────────┬───┐
│ 🔍 Search items...      │[🔍]│
└─────────────────────────┴───┘
│ [📍] Location toggle
│ ┌─────────────────────┐
│ │ City or postal code │ ← Expandable
│ └─────────────────────┘
```

### Modal Component
```
        Dark Backdrop
              ↓
┌─────────────────────────┐
│ Modal Title        [✕]  │ ← Header
├─────────────────────────┤
│                         │
│   Content goes here...  │ ← Content
│   (Form, text, etc)     │
│                         │
├─────────────────────────┤
│ [Cancel]  [Confirm]     │ ← Footer
└─────────────────────────┘
```

---

## 🎨 Button Styles

### Primary Button
```
Background: Sky Blue (#0ea5e9)
Text: White
Padding: 12px 24px
Border Radius: 8px
Hover: Darker blue + shadow
Active: Scale 95%
```

### Secondary Button
```
Background: Light gray (#f1f5f9)
Text: Dark gray (#0f172a)
Padding: 12px 24px
Border Radius: 8px
Hover: Darker gray
Active: Scale 95%
```

### Ghost Button
```
Background: Transparent
Text: Blue (#0ea5e9)
Padding: 12px 24px
Border Radius: 8px
Hover: Light blue background
Active: Darker blue
```

---

## 📐 Spacing & Sizing

```
Padding Standards:
- sm: 0.5rem (8px)
- base: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

Margin Standards:
- sm: 0.5rem (8px)
- base: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

Border Radius:
- sm: 0.375rem (6px)
- base: 0.5rem (8px)
- lg: 0.75rem (12px)
- xl: 1rem (16px)
- 2xl: 1.5rem (24px)

Shadow Sizes:
- sm: subtle shadow
- card: moderate shadow + hover
- hover: strong shadow
- lg: large shadow
```

---

## 🎬 Animations

```
Fade In (0.5s):
Opacity: 0% → 100%

Slide Up (0.5s):
Transform: Y+10px, Opacity 0% → Y0, Opacity 100%

Slide Left (0.4s):
Transform: X-20px, Opacity 0% → X0, Opacity 100%

Pulse (2s infinite):
Opacity: 100% → 50% → 100%
```

---

## 📱 Responsive Grid Sizes

```
Mobile (< 640px):
- Items: 1 column
- Cards: Full width with padding

Tablet (640px - 1024px):
- Items: 2 columns
- Cards: ~50% width

Desktop (> 1024px):
- Items: 3 columns
- Cards: ~33% width
```

---

## 🌈 State Colors

```
Hover:     Slightly darker / with shadow
Active:    Scale 95% + shadow
Disabled:  Opacity 50% + cursor-not-allowed
Error:     Red (#ef4444)
Success:   Green (#10b981)
Warning:   Amber (#f59e0b)
Info:      Blue (#3b82f6)
Loading:   Spinner with pulse animation
```

---

## 🎯 Interaction Patterns

### Click/Tap
- Immediate visual feedback
- Scale down 95% (0.1s)
- Color change to darker
- Shadow increase

### Hover
- Shadow increase
- Slight lift (-4px)
- Color slightly darker
- Smooth transition (0.3s)

### Focus (Keyboard)
- Outline ring (4px)
- Ring color: primary blue
- All interactive elements support

### Loading
- Spinner animation
- Disabled button state
- Text: "Loading..." or skeleton

### Error
- Red border on input
- Red text message
- Shake animation (optional)

---

## 💡 Visual Hierarchy

```
Level 1 (Most Important):
- Main headings (H1)
- Primary buttons
- Key information
- Color: Primary blue

Level 2 (Important):
- Section headings (H2, H3)
- Secondary buttons
- Secondary info
- Color: Dark gray

Level 3 (Supporting):
- Body text
- Ghost buttons
- Helper text
- Color: Medium gray

Level 4 (Subtle):
- Captions
- Disabled text
- Borders
- Color: Light gray
```

---

## 🎓 Design Principles Used

✅ **Consistency** - Same colors, fonts, spacing throughout
✅ **Hierarchy** - Clear visual importance levels
✅ **Contrast** - Text is readable on all backgrounds
✅ **Alignment** - Components aligned to grid
✅ **Whitespace** - Generous spacing prevents clutter
✅ **Feedback** - Every action has visual response
✅ **Accessibility** - WCAG compliant colors & sizes
✅ **Mobile-First** - Works great on all devices

---

## 📋 Color Usage Guidelines

### When to Use Colors

**Primary Blue (#0ea5e9):**
- Main call-to-action buttons
- Active navigation links
- Primary inputs (focus state)
- Important highlights

**Accent Pink (#ec4899):**
- Favorite/heart icons
- Special promotions
- Attention-grabbing elements
- Love/like interactions

**Dark Gray (#0f172a):**
- Primary text
- Headers
- Main content

**Light Gray (#f1f5f9):**
- Backgrounds
- Cards
- Section separators
- Inactive elements

**Status Colors:**
- Green: Success, confirmed, active
- Red: Error, delete, warning
- Yellow/Gold: Stars, ratings, warning
- Amber: Caution, moderate warning

---

## 🎨 Final Design Summary

| Element | Color | Font | Size |
|---------|-------|------|------|
| H1 | Dark Gray | Plus Jakarta | 48px |
| H2 | Dark Gray | Plus Jakarta | 36px |
| H3 | Dark Gray | Plus Jakarta | 30px |
| Body | Dark Gray | Inter | 16px |
| Buttons | White on Blue | Inter | 14-16px |
| Badges | Dark on Light | Inter | 12px |
| Links | Blue | Inter | 14-16px |
| Cards | White | Inter | Various |

---

**Your marketplace is beautiful, modern, and ready to impress! 🌟**
