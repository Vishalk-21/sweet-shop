# 🚀 Backend Deployment Guide - Render (FREE)

## Your Status
- ✅ **Frontend:** Already deployed on Netlify (working)
- ⏳ **Backend:** Ready to deploy on Render (FREE)
- ✅ **Database:** MongoDB Atlas (connected locally, FREE 512MB)
- ✅ **Code:** Pushed to GitHub

---

## Step 1: Create Render Account (2 minutes)

### 1.1 Go to Render
Visit: https://render.com

### 1.2 Sign Up (FREE)
- Click "Get started"
- Click "Continue with GitHub"
- Authorize Render to access your GitHub account
- Select your GitHub account

---

## Step 2: Create Web Service (3 minutes)

### 2.1 Create New Service
- Click "New +" button
- Select "Web Service"
- Select your sweet-shop repository

### 2.2 Configure Service

| Setting | Value |
|---------|-------|
| Name | sweet-shop-backend |
| Region | Singapore (or closest to your users) |
| Branch | main |
| Runtime | Node |
| Build Command | `cd Backend && npm install` |
| Start Command | `node server.js` |
| Plan | **FREE** ← Select this! |

### 2.3 Save Web Service
- Click "Create Web Service"
- Render will start building automatically

---

## Step 3: Add Environment Variables (2 minutes)

**While Render is building, add environment variables:**

### 3.1 Go to Environment
- In Render dashboard, scroll down
- Click "Environment" section
- Click "Add Environment Variable"

### 3.2 Add Each Variable

**Add these one by one:**

| Key | Value |
|-----|-------|
| MONGO_URI | `mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop` |
| JWT_SECRET | `sweet_shop_secret_key_2024` |
| IMAGE_PRIVATE_KEY | `private_8IkxV2gYS4Nv7bdABTvVaQXeUUU=` |
| IMAGE_PUBLIC_KEY | `public_sfEyqebZ3g2lmw71F+JhMOIglHg=` |
| IMAGE_URL_ENDPOINT | `https://ik.imagekit.io/https://ik.imagekit.io/pg81w4dbz` |
| NODE_ENV | `production` |

### 3.3 How to Add Variables:
1. Click "+ Add Environment Variable"
2. **Key:** (paste from table)
3. **Value:** (paste from table)
4. Click "Save"
5. Repeat for each variable

---

## Step 4: Wait for Deployment (5-10 minutes)

### 4.1 Check Build Status
- Render dashboard shows build logs
- Wait for: ✅ "Build successful" message
- Then: ✅ "Service live" message

### 4.2 Get Your Backend URL
Once deployed, you'll see:
```
https://sweet-shop-backend.onrender.com
```

**Save this URL!** You'll need it next.

---

## Step 5: Update Frontend with Backend URL (3 minutes)

### 5.1 Go to Netlify
Visit: https://app.netlify.com
- Select your sweet-shop site
- Click "Site settings"

### 5.2 Update Environment Variables
- Go to "Build & deploy" → "Environment"
- Click "Edit variables"

### 5.3 Update Variable
- **Key:** `VITE_API_URL`
- **Value:** `https://sweet-shop-backend.onrender.com/api` ← Replace with YOUR URL
- Click "Save"

### 5.4 Redeploy Frontend
- Go to "Deployments"
- Click "Trigger deploy" → "Deploy site"
- Wait for deployment (~2 minutes)

---

## Step 6: Test Backend (2 minutes)

### 6.1 Test Health Endpoint
Visit: `https://sweet-shop-backend.onrender.com/api/health`

You should see:
```json
{
  "message": "Backend is running",
  "timestamp": "2026-06-19T12:00:00.000Z"
}
```

### 6.2 Test Products Endpoint
Visit: `https://sweet-shop-backend.onrender.com/api/products`

You should see your products list.

### 6.3 Test Frontend
Visit: `https://your-netlify-site.netlify.app`

Check:
- ✅ Page loads
- ✅ Products display
- ✅ No console errors
- ✅ Navigation works

---

## Step 7: Prevent Backend from Sleeping (IMPORTANT!)

Render's free tier spins down after 15 minutes of inactivity.

### Option 1: UptimeRobot (RECOMMENDED - Easiest)

**7.1 Go to UptimeRobot:**
https://uptimerobot.com

**7.2 Sign Up (FREE):**
- Email or Google account
- Verify email

**7.3 Create Monitor:**
- Click "+ Add Monitor"
- **Monitor Type:** HTTP(s)
- **Friendly Name:** Sweet Shop Backend
- **URL:** `https://sweet-shop-backend.onrender.com/api/health`
- **Monitoring Interval:** 5 minutes
- Click "Create Monitor"

**Result:** Your backend stays awake 24/7! ✅

### Option 2: Upgrade Render (Paid)

If you don't want to use UptimeRobot:
- In Render dashboard, click "Upgrade"
- Select Paid plan ($7/month)
- Backend runs 24/7 without sleep

**Recommendation:** Use UptimeRobot (it's FREE!)

---

## Complete Status Check

| Component | Status | Location |
|-----------|--------|----------|
| Frontend | ✅ Deployed | https://your-site.netlify.app |
| Backend | ✅ Deployed | https://sweet-shop-backend.onrender.com |
| API | ✅ Working | https://sweet-shop-backend.onrender.com/api |
| Database | ✅ Connected | MongoDB Atlas |
| Monitoring | ✅ Active | UptimeRobot (if setup) |

---

## Troubleshooting

### Backend Build Failed
**Solution:**
1. Check "Logs" in Render dashboard
2. Look for error messages
3. Common issues:
   - Missing `node_modules` - Run: `npm install` locally
   - .env file missing - Add environment variables in Render
   - Port conflict - Already configured in code

### Backend Responds Slowly First Time
**Reason:** Render spins down after 15 minutes
**Solution:** Use UptimeRobot to keep it awake

### CORS Errors
**Solution:**
1. Check `Backend/src/app.js` CORS configuration
2. Add your Netlify URL to allowed origins:
```javascript
const allowedOrigins = [
    'https://your-netlify-site.netlify.app',
    'http://localhost:5173'
];
```
3. Push changes to GitHub (auto-deploys on Render)

### Products Not Loading
**Check:**
1. Backend health: https://your-backend.onrender.com/api/health
2. Products endpoint: https://your-backend.onrender.com/api/products
3. Check browser console for errors
4. Verify VITE_API_URL in Netlify settings

### Login Not Working
**Check:**
1. MongoDB is connected
2. User exists in database
3. JWT_SECRET environment variable is set
4. Check Render logs for errors

---

## Quick Reference

### Your URLs
```
Frontend:  https://[your-netlify-site].netlify.app
Backend:   https://sweet-shop-backend.onrender.com
API Base:  https://sweet-shop-backend.onrender.com/api
```

### Environment Variables (Copy & Paste)
```
MONGO_URI=mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop
JWT_SECRET=sweet_shop_secret_key_2024
IMAGE_PRIVATE_KEY=private_8IkxV2gYS4Nv7bdABTvVaQXeUUU=
IMAGE_PUBLIC_KEY=public_sfEyqebZ3g2lmw71F+JhMOIglHg=
IMAGE_URL_ENDPOINT=https://ik.imagekit.io/https://ik.imagekit.io/pg81w4dbz
NODE_ENV=production
```

### API Endpoints to Test
```
Health:    /api/health
Products:  /api/products
Login:     /api/auth/login (POST)
Orders:    /api/orders (GET/POST)
Messages:  /api/messages (POST)
```

---

## After Deployment

### Monitor Your Backend
1. Keep UptimeRobot running
2. Check Render logs weekly
3. Monitor database usage (MongoDB Atlas)

### Make Updates
```bash
# Local changes
cd c:\Backend\Sweet Shop
git add .
git commit -m "Your changes"
git push origin main

# Render auto-deploys!
# Check status in Render dashboard
```

### Scale When Needed
- Current: FREE tier (good for < 100 users/day)
- If traffic grows:
  - Render Pro: $7/month (24/7 uptime)
  - Database: Stay on MongoDB free tier

---

## Success Indicators

✅ You'll know it's working when:
1. Health check returns JSON
2. Products load on frontend
3. Can log in as owner
4. Admin dashboard shows data
5. Backend doesn't spin down (with UptimeRobot)

---

## Total Cost

| Service | Cost |
|---------|------|
| Netlify Frontend | FREE ✅ |
| Render Backend | FREE ✅ |
| MongoDB Database | FREE ✅ |
| UptimeRobot Monitor | FREE ✅ |
| **Total** | **$0/month** 🎉 |

---

## Timeline

| Step | Time | Status |
|------|------|--------|
| Create Render Account | 2 min | ⏳ |
| Create Web Service | 3 min | ⏳ |
| Add Environment Variables | 2 min | ⏳ |
| Build & Deploy | 5-10 min | ⏳ |
| Update Frontend | 3 min | ⏳ |
| Setup UptimeRobot | 2 min | ⏳ |
| Test Everything | 2 min | ⏳ |
| **TOTAL** | **19-29 min** | **Go Live!** ✅ |

---

**You're ready to deploy! Start with Step 1.** 🚀
