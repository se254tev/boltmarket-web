# Deployment Guide for Bolt Market

## Quick Start Deployments

### 🚀 Vercel (Recommended - Easiest)

**Step 1: Prepare Your Code**
```bash
cd bolt-market
git init
git add .
git commit -m "Initial commit"
```

**Step 2: Push to GitHub**
```bash
# Create new repo on GitHub.com
# Then:
git remote add origin https://github.com/YOUR_USERNAME/bolt-market.git
git branch -M main
git push -u origin main
```

**Step 3: Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select "Next.js" or "Vite" as framework
5. Click "Deploy"

**That's it!** Your site is live at `your-project.vercel.app`

---

### 🌐 Netlify

**Step 1: Build the Project**
```bash
npm run build
```

**Step 2: Connect to Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy site"

---

### 📘 GitHub Pages

**Step 1: Update Configuration**

Edit `vite.config.js`:
```javascript
export default defineConfig({
  base: '/bolt-market/',  // Your repo name
  // ... rest of config
});
```

**Step 2: Build and Deploy**
```bash
npm run build
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/bolt-market",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

**Step 3: Deploy**
```bash
npm run deploy
```

Your site will be live at `https://YOUR_USERNAME.github.io/bolt-market`

---

## Environment Variables

Create `.env.production` for production settings:

```env
REACT_APP_API_URL=https://your-api.com/api
REACT_APP_ENV=production
REACT_APP_ENABLE_ANALYTICS=true
```

---

## Pre-Deployment Checklist

- [ ] Update logo and favicon in `index.html`
- [ ] Update meta description and og tags
- [ ] Configure API URL for production backend
- [ ] Test all pages and features
- [ ] Check mobile responsiveness
- [ ] Optimize images (< 100KB each)
- [ ] Run `npm run build` and verify no errors
- [ ] Test production build locally: `npm run preview`
- [ ] Check browser console for errors
- [ ] Set up analytics (Google Analytics recommended)

---

## Performance Optimization

### Before Deployment

1. **Optimize Images**
   - Use next-gen formats (WebP)
   - Compress images to < 100KB
   - Use appropriate dimensions (no 4000x3000 for thumbnails)

2. **Code Splitting**
   - Already configured with Vite
   - Large pages will load on demand

3. **Minification**
   - Automatic with `npm run build`
   - CSS and JS are minified

4. **Caching**
   - Set cache headers for static assets
   - On Vercel/Netlify, automatically configured

### Lighthouse Score Tips

- Add real, optimized images
- Set image dimensions to prevent layout shift
- Implement lazy loading for images
- Minimize JavaScript
- Use modern CSS techniques

**Run Lighthouse in Chrome DevTools to measure improvements**

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)

### Netlify
1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Update DNS records

### GitHub Pages
Edit `package.json` `homepage` field and update DNS CNAME record

---

## Monitoring & Analytics

### Sentry (Error Tracking)
```bash
npm install @sentry/react @sentry/tracing
```

Add to `main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.REACT_APP_ENV,
});
```

### Google Analytics
Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on Custom Path
Make sure `vite.config.js` has correct base path

### API Requests Failing
- Check API URL in environment variables
- Verify CORS is enabled on backend
- Check browser console for exact error

### Slow Performance
- Check Network tab in DevTools
- Optimize large assets
- Enable compression on server
- Use CDN for static files

---

## Continuous Integration

### GitHub Actions (Free)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
```

---

## Cost Analysis

| Platform | Free Tier | Pro | Notes |
|----------|-----------|-----|-------|
| Vercel | ✅ Unlimited | $20/mo | Recommended for beginners |
| Netlify | ✅ Unlimited | $19/mo | Good free tier |
| GitHub Pages | ✅ Unlimited | ❌ | Static only |
| AWS | Limited | Varies | Most expensive |

**For most projects, the free tier is sufficient!**

---

## Backend Integration

This frontend is ready to connect to any backend:

1. **Express.js**: Use the provided API client
2. **Node.js + MongoDB**: See README for API endpoints
3. **Firebase**: Update API endpoints in `src/services/api.js`
4. **Any REST API**: Update baseURL in api client

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev
- **Tailwind Docs**: https://tailwindcss.com/docs

---

**Your app is ready to go live! 🚀**
