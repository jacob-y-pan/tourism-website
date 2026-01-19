# Tourism Website Deployment Guide

## Pre-Deployment Checklist

### 1. **Environment Variables Setup** ✅
- Create a `.env` file in the root directory (copy from `.env.example`)
- Add your Google OAuth Client ID:
  ```
  VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here
  ```
- Never commit `.env` to git (it should be in `.gitignore`)

### 2. **Build the Project**
```bash
npm run build
```
This creates a `dist/` folder with optimized production files. Check that it runs without errors.

### 3. **Test the Production Build Locally**
```bash
npm run preview
```
This serves the built version locally to test it before deploying.

### 4. **Google OAuth Setup** (Critical)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Type: Web Application
   - Authorized JavaScript origins: 
     - `http://localhost:5173` (local testing)
     - `https://yourdomain.com` (production domain)
   - Authorized redirect URIs:
     - `http://localhost:5173` (local testing)
     - `https://yourdomain.com` (production domain)
5. Copy the Client ID and add to `.env`

---

## Deployment Options

### **Option 1: Vercel (Recommended - Easiest)**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repo
4. Add environment variable:
   - Key: `VITE_GOOGLE_CLIENT_ID`
   - Value: Your Google Client ID
5. Click Deploy
6. Update Google OAuth with Vercel domain

### **Option 2: Netlify**
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New Site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Site Settings
7. Deploy

### **Option 3: GitHub Pages**
1. Update `vite.config.js` with base path if needed
2. Add environment variables in GitHub Actions
3. Set up automated deployment with Actions
4. Domain will be: `username.github.io/repository`

### **Option 4: Traditional Hosting (Heroku, DigitalOcean, AWS)**
1. Build locally: `npm run build`
2. Upload `dist` folder to your server
3. Configure web server (nginx/Apache) to serve `dist/index.html` for all routes (important for React Router)
4. Set environment variables on server

---

## Important Configuration Notes

### **React Router on Production**
Ensure your server redirects all requests to `index.html` so React Router can handle routing client-side.

**Nginx example:**
```nginx
try_files $uri $uri/ /index.html;
```

**Apache example:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### **Environment Variables in Production**
- Update `VITE_GOOGLE_CLIENT_ID` in your deployment platform's environment settings
- Update Google OAuth authorized domains to match your production domain

---

## Post-Deployment Testing

✅ Test all features:
- [ ] Activities load on home page
- [ ] Search and filters work
- [ ] Click "View Details" opens in new tab
- [ ] Activity detail page displays correctly
- [ ] Images load properly
- [ ] Google login works
- [ ] User session persists on refresh
- [ ] Logout works
- [ ] Mobile responsive design works
- [ ] No console errors

---

## Deployment Domains Example

After setting up with one of the above options, your site will be accessible at:
- Vercel: `your-project-name.vercel.app`
- Netlify: `your-project-name.netlify.app`
- GitHub Pages: `your-username.github.io/repository-name`

---

## Troubleshooting

**Build fails with missing dependencies:**
```bash
npm install
npm run build
```

**Google login not working:**
- Check that Client ID is correctly set in `.env`
- Verify domain is added to Google OAuth authorized origins
- Check browser console for errors

**Routing doesn't work on production:**
- Ensure `index.html` fallback is configured on server
- Check Vite base path setting if deploying to subdirectory

**Images not loading:**
- Verify image paths in `data.json` are correct
- Check that `public` folder images are accessible

---

## Quick Deploy to Vercel

```bash
npm i -g vercel
vercel
```
Then follow the prompts and add your environment variables.

**You're ready to deploy!** 🚀
