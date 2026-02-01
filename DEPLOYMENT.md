# Deployment Guide for LUMINARIS

## 📦 GitHub Pages Deployment

### Option 1: Using Vite with GitHub Actions (Recommended)

1. **Update `vite.config.js`**:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/luminaris/', // Replace with your repo name
})
```

2. **Create GitHub Actions Workflow**:
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npx gh-pages -d dist
```

---

## 🌐 Netlify Deployment

1. **Connect Repository**:
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

3. **Deploy**: Click "Deploy site"

---

## ▲ Vercel Deployment

1. **Connect Repository**:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configuration** (Auto-detected):
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Deploy**: Click "Deploy"

---

## 🚀 Performance Optimization

Before deploying, ensure:

- [x] Images are optimized
- [x] Three.js bundles are tree-shaken
- [x] CSS is minified
- [x] JavaScript is compressed
- [x] Environment variables are set

---

## 🔧 Environment Variables

Create `.env.production`:

```env
VITE_APP_TITLE=LUMINARIS
VITE_WIKI_API=https://en.wikipedia.org/w/api.php
```

---

## ✅ Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] README.md is complete
- [ ] LICENSE file added
- [ ] .gitignore configured
- [ ] All images load correctly
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Accessibility tested
- [ ] Performance optimized (Lighthouse score > 90)

---

## 📊 Monitoring

After deployment, monitor:
- Page load times
- API calls to Wikipedia
- User interactions
- Error rates

---

## 🔄 Continuous Deployment

Every push to `main` branch will automatically:
1. Build the project
2. Run tests (if configured)
3. Deploy to production

---

## 🛠️ Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Assets Not Loading
- Check `base` path in `vite.config.js`
- Verify GitHub Pages is enabled
- Check browser console for errors

### Slow Performance
- Enable gzip compression
- Optimize images
- Use CDN for Three.js

---

**Need help?** Open an issue on GitHub!
