# ⚡ Bolt Market - Commands Reference

## 🚀 Quick Commands

### Development
```bash
# Install dependencies (run once)
npm install

# Start dev server (with hot reload)
npm run dev

# Open browser to
http://localhost:3000
```

### Building & Testing
```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Check for code errors
npm run lint

# Format all code
npm run format
```

### Git & Deployment
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Bolt Market setup"

# Deploy to Vercel
vercel

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

---

## 📦 Package Management

```bash
# Install a new package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update all packages
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

---

## 🛠️ Development Tips

### Browser DevTools
```bash
# Open DevTools
F12 or Ctrl+Shift+I (Windows)
Cmd+Option+I (Mac)

# Toggle mobile view
Ctrl+Shift+M (Windows)
Cmd+Shift+M (Mac)
```

### Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Kill Port (if 3000 in use)
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 📁 Important Directories

```bash
# Navigate to project
cd c:\Users\Stephen Otieno\OneDrive\Desktop\projects\Boltweb

# Open in VS Code
code .

# View project in file explorer
explorer .
```

---

## 🔍 Debugging

### Check Console Errors
1. Press F12
2. Click "Console" tab
3. Look for red errors

### Check Network Requests
1. Press F12
2. Click "Network" tab
3. Reload page
4. Look for API calls

### React DevTools
1. Install extension: "React Developer Tools"
2. See component tree and state in DevTools

### Lighthouse Performance Test
1. Press F12
2. Click "Lighthouse" tab
3. Click "Generate report"
4. Review scores

---

## 🚢 Deployment Checklist

```bash
# 1. Build the project
npm run build

# 2. Test build locally
npm run preview

# 3. Check for errors
npm run lint

# 4. Format code
npm run format

# 5. Commit & push
git add .
git commit -m "Production build"
git push origin main

# 6. Deploy
vercel
# or
netlify deploy --prod --dir=dist
```

---

## 📝 Environment Variables

### Create .env file
```bash
# Windows
type nul > .env

# Mac/Linux
touch .env
```

### Add to .env
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### For Production
```env
REACT_APP_API_URL=https://your-api.com/api
REACT_APP_ENV=production
```

---

## 🐛 Troubleshooting Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Verify Vite works
npm run dev -- --host

# Check if port 3000 is in use
netstat -ano | findstr :3000

# Install all packages fresh
npm ci

# See installed packages
npm list

# Check for duplicate packages
npm ls --all

# View package details
npm info package-name
```

---

## 🎯 File Editing Tips

### Common Edits

**Change API URL**
Edit `.env`:
```env
REACT_APP_API_URL=https://your-backend.com/api
```

**Change Colors**
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { 500: '#your-color' }
}
```

**Change Logo Text**
Edit `src/components/Navbar.jsx`:
```jsx
Bolt Market  // Change to your name
```

**Add New Page**
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Import at top

---

## 📱 Testing on Mobile

### Local Network Testing
```bash
npm run dev -- --host

# Then visit:
# http://your-computer-ip:5173
# from your phone
```

### Chrome DevTools Mobile Emulation
1. Press F12
2. Click device icon
3. Choose device
4. Test responsiveness

---

## 🔒 Security Commands

```bash
# Audit for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check package licenses
npm ls --depth=0

# View dependency tree
npm ls
```

---

## 📊 Performance Commands

```bash
# Check bundle size
npm run build
# Check size of dist/ folder

# Analyze bundle
npm install -D webpack-bundle-analyzer
```

---

## 🤖 Automation

### Git Pre-commit Hook (Optional)
```bash
npm install husky --save-dev
npm install lint-staged --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run format"
```

### GitHub Actions CI/CD
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
      - run: npm ci
      - run: npm run build
```

---

## 📚 Documentation Commands

```bash
# Generate documentation (if added later)
npm run docs

# View README
cat README.md

# View quick start
cat QUICKSTART.md

# View deployment guide
cat DEPLOYMENT.md
```

---

## 🎨 IDE Shortcuts (VS Code)

```
Ctrl+` = Open terminal
Ctrl+Shift+P = Command palette
Ctrl+Shift+F = Find in files
Ctrl+Alt+F = Format document
Ctrl+Shift+L = Select all occurrences
Ctrl+H = Find and replace
Ctrl+J = Toggle terminal
Ctrl+B = Toggle sidebar
```

---

## ✨ Quick Testing Flows

### Test Home Page
```
1. npm run dev
2. Open http://localhost:3000
3. Click categories
4. Click "Browse" link
5. Search for items
```

### Test Browse Page
```
1. Click filters (price, category)
2. Sort by different options
3. Use search bar
4. Test pagination
5. Click an item
```

### Test Item Details
```
1. Click item card
2. Change quantity
3. Click favorite button
4. Scroll to reviews
5. Try review form
```

### Test Seller Dashboard
```
1. Go to /dashboard
2. Click "Create Listing"
3. Fill form
4. Click Create
5. Edit or delete listing
```

---

## 🔄 Common Workflows

### Adding a New Feature
```bash
# 1. Create feature branch
git checkout -b feature/feature-name

# 2. Make changes
# Edit files...

# 3. Test locally
npm run dev

# 4. Format and lint
npm run format
npm run lint

# 5. Commit
git add .
git commit -m "Add feature description"

# 6. Build and test
npm run build
npm run preview

# 7. Push
git push origin feature/feature-name
```

### Updating Dependencies
```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest

# Check for security issues
npm audit fix
```

### Deploying to Production
```bash
# 1. Make sure code is committed
git status

# 2. Build
npm run build

# 3. Test production build
npm run preview

# 4. Deploy
vercel --prod
# or
netlify deploy --prod --dir=dist
```

---

## 💾 Backup & Recovery

```bash
# Backup project
zip -r bolt-market-backup.zip .

# Restore from git
git checkout -- src/

# Restore specific file
git checkout HEAD -- path/to/file

# See commit history
git log --oneline

# Revert to previous commit
git revert commit-hash
```

---

## 🚀 One-Liner Deployments

```bash
# Vercel (all in one)
npm run build && vercel --prod

# Netlify (all in one)
npm run build && netlify deploy --prod --dir=dist

# GitHub Pages
npm run build && gh-pages -d dist
```

---

## 📞 Getting Help

```bash
# Check Node docs
node --help

# Check npm docs
npm help

# Check Vite docs
npm run dev --help

# View package info
npm info vite

# Search npm registry
npm search keyword

# View installed version
npm list package-name
```

---

## 🎓 Useful Links

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind Docs**: https://tailwindcss.com
- **Node.js Docs**: https://nodejs.org/docs
- **npm Registry**: https://www.npmjs.com
- **GitHub**: https://github.com

---

## ✅ Daily Development Checklist

```
☐ npm run dev (start server)
☐ Make changes
☐ npm run lint (check errors)
☐ Test in browser
☐ npm run format (format code)
☐ git add . (stage changes)
☐ git commit -m "message" (commit)
☐ git push (push to GitHub)
☐ Verify deployed
```

---

## 🎯 Remember

- Always run `npm install` after cloning
- Always use `npm run format` before committing
- Always test locally before deploying
- Always check browser console for errors
- Always commit with meaningful messages
- Always keep dependencies updated
- Always test on mobile

---

**Pro Tip:** Save this file and reference it often! 📌

Made with ❤️ for Bolt Market
