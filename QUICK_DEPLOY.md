# 🚀 Quick Start: Deploy in 15 Minutes (Vercel + Railway)

## Prerequisites
- GitHub account (free at https://github.com)
- Vercel account (free at https://vercel.com)
- Railway account (free at https://railway.app)

---

## ✅ Step 1: Prepare Your Code (2 minutes)

### 1.1 Backend CORS
The backend reads your deployed frontend URL from a Railway environment variable:

```env
FRONTEND_URL=https://your-vercel-project.vercel.app
```

For multiple frontend URLs, separate them with commas:

```env
FRONTEND_URL=https://your-vercel-project.vercel.app,https://www.yourdomain.com
```

### 1.2 Create `vercel.json` in root directory
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "@VITE_API_URL"
  }
}
```

### 1.3 Update Frontend API config
Edit: `Frontend/src/services/api.js`

Change this:
```javascript
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})
```

To this:
```javascript
const apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true
})
```

### 1.4 Push to GitHub
```bash
cd c:\Backend\Sweet Shop
git init
git add .
git commit -m "Prepare for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sweet-shop.git
git push -u origin main
```

---

## ✅ Step 2: Deploy Frontend to Vercel (5 minutes)

### 2.1 Go to Vercel
Visit: https://vercel.com

### 2.2 Sign up with GitHub
- Click "Sign up"
- Select "Continue with GitHub"
- Authorize Vercel

### 2.3 Import Project
- Click "Add New" → "Project"
- Click "Import Git Repository"
- Paste: `https://github.com/YOUR_USERNAME/sweet-shop.git`
- Click "Import"

### 2.4 Configure Project
- **Project Name:** sweet-shop
- **Framework Preset:** Vite
- **Root Directory:** Frontend (click to set)
- **Build Command:** npm run build
- **Output Directory:** dist
- **Install Command:** npm install

### 2.5 Add Environment Variables
- Click "Environment Variables"
- **Name:** VITE_API_URL
- **Value:** https://your-backend-url/api (you'll update this after deploying backend)
- Click "Add"
- Click "Deploy"

### 2.6 Wait for deployment
- Vercel will build and deploy automatically
- You'll see a URL like: `https://sweet-shop-xyz.vercel.app`

✅ **Frontend deployed!**

---

## ✅ Step 3: Deploy Backend to Railway (5 minutes)

### 3.1 Go to Railway
Visit: https://railway.app

### 3.2 Sign up with GitHub
- Click "Sign up"
- Select "Continue with GitHub"
- Authorize Railway

### 3.3 Create New Project
- Click "New Project"
- Select "Deploy from GitHub"
- Select your sweet-shop repository

### 3.4 Configure Backend
- Keep the Railway service root as the repository root
- `railway.json` sets the backend build command to `null` and the start command to `npm start`
- The root `package.json` installs the backend dependencies and runs `node server.js`

### 3.5 Add Environment Variables
In Railway dashboard, go to "Variables" and add:

```
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/SweetShop

JWT_SECRET=use-a-long-random-secret

IMAGE_PRIVATE_KEY=your-imagekit-private-key

IMAGE_PUBLIC_KEY=your-imagekit-public-key

IMAGE_URL_ENDPOINT=https://ik.imagekit.io/your-endpoint

NODE_ENV=production

FRONTEND_URL=https://your-vercel-project.vercel.app
```

Do not set `PORT` manually on Railway. Railway provides it automatically.

### 3.6 Push to GitHub
```bash
git add .
git commit -m "Fix Railway backend deployment"
git push
```

### 3.7 Wait for deployment
- Railway will auto-deploy
- You'll see a URL like: `https://sweet-shop-backend.railway.app`

✅ **Backend deployed!**

---

## ✅ Step 4: Connect Frontend to Backend (3 minutes)

### 4.1 Update Vercel Environment Variable
- Go back to Vercel dashboard
- Select your project
- Click "Settings" → "Environment Variables"
- Click on `VITE_API_URL`
- **Update Value:** `https://your-railway-url/api`
- Click "Save"
- Click "Deployments" → "Redeploy"

### 4.2 Wait for redeploy
Vercel will rebuild and redeploy with the new backend URL.

✅ **Everything connected!**

---

## 🎉 Your Site is Live!

- **Frontend:** https://sweet-shop-xyz.vercel.app
- **Backend:** https://sweet-shop-backend.railway.app
- **API:** https://sweet-shop-backend.railway.app/api

---

## 📝 Test Your Deployment

### Test Backend Health
Visit: https://sweet-shop-backend.railway.app/api/health

You should see:
```json
{
  "message": "Backend is running",
  "timestamp": "2026-06-18T12:00:00.000Z"
}
```

### Test API Endpoints
Visit: https://sweet-shop-backend.railway.app/api/products

You should see product data.

### Test Frontend
Visit: https://sweet-shop-xyz.vercel.app

You should see:
- Your Kallu Sweet House logo ✓
- Products loading ✓
- Navigation working ✓
- Admin dashboard accessible ✓

---

## 🔄 Future Updates (How to Deploy Changes)

Just push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Both Vercel and Railway will auto-deploy!

---

## ⚠️ Important Notes

1. **Keep .env file secret** - Never commit it to GitHub
2. **Enable HTTPS** - Already done by Vercel/Railway
3. **Check logs** - If something breaks:
   - Vercel: Click "Deployments" → View logs
   - Railway: Click "Logs" tab

4. **Upgrade for Production:**
   - Vercel Pro: $20/month (production features)
   - Railway: $5/month minimum (enough for most needs)

---

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| Vercel | Free (or $20/month Pro) |
| Railway | $5/month |
| MongoDB Atlas | Free (512MB) |
| **Total** | **Free to $25/month** |

---

## 🚨 Troubleshooting

**Problem: "Cannot GET /api/products"**
- Backend didn't deploy correctly
- Check Railway logs
- Verify environment variables are set

**Problem: CORS error**
- Update CORS in Backend/src/app.js
- Redeploy backend
- Update Vercel env variable

**Problem: Images not loading**
- Check ImageKit credentials
- Verify ImageKit API keys are active

**Problem: Database connection error**
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Add Railway IP to whitelist (or allow all: 0.0.0.0/0 for testing)

---

## ✨ Next Steps

1. **Add Custom Domain:**
   - Buy domain from GoDaddy/Namecheap
   - Point DNS to Vercel
   - Enable SSL

2. **Enable Monitoring:**
   - Set up Sentry for error tracking
   - Add uptime monitoring (UptimeRobot)

3. **Setup Backups:**
   - Enable MongoDB Atlas backups
   - Keep GitHub repo updated

4. **Performance:**
   - Enable caching
   - Optimize images
   - Setup CDN (optional)

---

**You're done! 🎉 Your site is now live on the internet!**
