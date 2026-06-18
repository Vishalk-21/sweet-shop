# Complete Deployment Guide - Kallu Sweet House

## 📋 Table of Contents
1. [Option 1: Vercel + Railway (RECOMMENDED - Easiest)](#option-1-vercel--railway)
2. [Option 2: Netlify + Render](#option-2-netlify--render)
3. [Option 3: Docker Deployment (AWS/DigitalOcean)](#option-3-docker-deployment)
4. [Option 4: Traditional VPS (Linode/DigitalOcean)](#option-4-traditional-vps)
5. [Production Checklist](#production-checklist)

---

## Option 1: Vercel + Railway (RECOMMENDED - Easiest)

### ✅ Best For: Quick, modern deployment with minimal setup

### Step 1: Prepare Frontend for Vercel

**1.1 Build and test locally:**
```bash
cd c:\Backend\Sweet Shop\Frontend
npm run build
```

**1.2 Create `vercel.json` configuration:**
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

**1.3 Update `Frontend/src/services/api.js` for production:**
```javascript
const apiBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true
})
```

### Step 2: Deploy Frontend to Vercel

**2.1 Go to https://vercel.com**
- Sign up with GitHub/Google
- Click "Import Project"
- Connect your GitHub repository (or upload manually)

**2.2 Configure project:**
- **Framework Preset:** Vite
- **Root Directory:** Frontend
- **Build Command:** npm run build
- **Output Directory:** dist
- **Install Command:** npm install

**2.3 Add Environment Variables:**
- Click "Environment Variables"
- Add: `VITE_API_URL` = `https://your-backend-url/api` (we'll get this from Railway)
- Save and Deploy

**2.4 Get your Frontend URL:**
```
https://your-project-name.vercel.app
```

### Step 3: Deploy Backend to Railway

**3.1 Go to https://railway.app**
- Sign up with GitHub
- Click "New Project"
- Select "Deploy from GitHub"

**3.2 Connect GitHub:**
- Authorize Railway to access your GitHub
- Select your Sweet Shop repository

**3.3 Configure Backend:**
- Click "Add Plugin" → Select "MongoDB" (optional, or use your Atlas URI)
- Root directory: Backend
- Add Environment Variables in Railway dashboard:

```
MONGO_URI=mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop
JWT_SECRET=sweet_shop_secret_key_2024
IMAGE_PRIVATE_KEY=private_8IkxV2gYS4Nv7bdABTvVaQXeUUU=
IMAGE_PUBLIC_KEY=public_sfEyqebZ3g2lmw71F+JhMOIglHg=
IMAGE_URL_ENDPOINT=https://ik.imagekit.io/https://ik.imagekit.io/pg81w4dbz
NODE_ENV=production
PORT=3000
```

**3.4 Update Railway with Procfile:**
Create `Procfile` in Backend directory:
```
web: node ../server.js
```

**3.5 Deploy:**
- Railway auto-deploys from GitHub
- Get your Backend URL from Railway dashboard:
```
https://your-railway-project.railway.app
```

**3.6 Update CORS in Backend:**
```javascript
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://your-project-name.vercel.app',
            'http://localhost:5173',
            'http://localhost:3000'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};
```

### Step 4: Update Frontend with Backend URL

**4.1 Go back to Vercel dashboard:**
- Settings → Environment Variables
- Update `VITE_API_URL` to your Railway backend URL
- Redeploy

**4.2 Your site is live!**
```
Frontend: https://your-project-name.vercel.app
Backend: https://your-railway-project.railway.app
```

---

## Option 2: Netlify + Render

### ✅ Best For: Free tier with good performance

### Step 1: Deploy Frontend to Netlify

**1.1 Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/sweet-shop.git
git push -u origin main
```

**1.2 Go to https://netlify.com**
- Sign up with GitHub
- Click "New site from Git"
- Connect repository
- Select "Frontend" folder as publish directory

**1.3 Build settings:**
- Build command: `cd Frontend && npm run build`
- Publish directory: `Frontend/dist`

**1.4 Add environment variables:**
- Go to Site Settings → Build & Deploy → Environment
- Add: `VITE_API_URL` = `https://your-render-url/api`

### Step 2: Deploy Backend to Render

**2.1 Go to https://render.com**
- Sign up with GitHub
- Click "New +" → "Web Service"
- Connect your GitHub repository

**2.2 Configure:**
- **Name:** sweet-shop-backend
- **Environment:** Node
- **Build Command:** `cd Backend && npm install`
- **Start Command:** `node ../server.js`
- **Plan:** Free (or Paid for production)

**2.3 Add Environment Variables:**
```
MONGO_URI=mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop
JWT_SECRET=sweet_shop_secret_key_2024
IMAGE_PRIVATE_KEY=private_8IkxV2gYS4Nv7bdABTvVaQXeUUU=
IMAGE_PUBLIC_KEY=public_sfEyqebZ3g2lmw71F+JhMOIglHg=
IMAGE_URL_ENDPOINT=https://ik.imagekit.io/https://ik.imagekit.io/pg81w4dbz
NODE_ENV=production
```

**2.4 Deploy and get URL:**
```
https://sweet-shop-backend.onrender.com
```

---

## Option 3: Docker Deployment (AWS/DigitalOcean)

### ✅ Best For: Full control, scalability

### Step 1: Build Docker Images

**1.1 Ensure Docker files exist:**
- `Dockerfile` (backend)
- `Frontend.Dockerfile` (frontend)
- `docker-compose.yml`

**1.2 Build locally first:**
```bash
cd c:\Backend\Sweet Shop
docker-compose build
```

### Step 2: Deploy to DigitalOcean

**2.1 Create DigitalOcean account:**
- Go to https://digitalocean.com
- Sign up and create a Droplet (Ubuntu 22.04, 2GB RAM minimum)

**2.2 SSH into Droplet:**
```bash
ssh root@your-droplet-ip
```

**2.3 Install Docker and Docker Compose:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**2.4 Clone your repository:**
```bash
git clone https://github.com/your-username/sweet-shop.git
cd sweet-shop
```

**2.5 Create `.env` file:**
```bash
cat > Backend/.env << EOF
MONGO_URI=mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop
JWT_SECRET=sweet_shop_secret_key_2024
IMAGE_PRIVATE_KEY=private_8IkxV2gYS4Nv7bdABTvVaQXeUUU=
IMAGE_PUBLIC_KEY=public_sfEyqebZ3g2lmw71F+JhMOIglHg=
IMAGE_URL_ENDPOINT=https://ik.imagekit.io/https://ik.imagekit.io/pg81w4dbz
NODE_ENV=production
EOF
```

**2.6 Start containers:**
```bash
docker-compose up -d
```

**2.7 Setup Nginx Reverse Proxy:**
```bash
sudo apt update
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/default
```

Add this configuration:
```nginx
upstream backend {
    server localhost:3000;
}

upstream frontend {
    server localhost:5173;
}

server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name your-domain.com;

    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**2.8 Enable SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## Option 4: Traditional VPS (Linode/DigitalOcean)

### ✅ Best For: Maximum control, custom configurations

### Step 1: Setup Server

**1.1 Create Ubuntu 22.04 VPS (2GB RAM minimum)**

**1.2 SSH into server:**
```bash
ssh root@your-server-ip
```

**1.3 Update system:**
```bash
apt update && apt upgrade -y
```

### Step 2: Install Dependencies

**2.1 Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**2.2 Install MongoDB CLI (or use Atlas):**
```bash
curl https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" > /etc/apt/sources.list.d/mongodb-org-6.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod
```

### Step 3: Deploy Application

**3.1 Clone repository:**
```bash
cd /opt
git clone https://github.com/your-username/sweet-shop.git
cd sweet-shop
```

**3.2 Install backend dependencies:**
```bash
cd Backend
npm install
cd ..
```

**3.3 Install frontend dependencies:**
```bash
cd Frontend
npm install
npm run build
cd ..
```

**3.4 Create environment file:**
```bash
cat > Backend/.env << EOF
MONGO_URI=mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop
JWT_SECRET=sweet_shop_secret_key_2024
NODE_ENV=production
PORT=3000
EOF
```

### Step 4: Setup PM2 (Process Manager)

**4.1 Install PM2:**
```bash
npm install -g pm2
```

**4.2 Create PM2 ecosystem file:**
```bash
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'sweet-shop-backend',
      script: './Backend/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'sweet-shop-frontend',
      script: 'npm run preview',
      cwd: './Frontend',
      env: {
        HOST: '0.0.0.0',
        PORT: 5173
      }
    }
  ]
};
EOF
```

**4.3 Start with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 5: Setup Nginx

**5.1 Install Nginx:**
```bash
apt install -y nginx
```

**5.2 Configure Nginx (same as Docker option above)**

**5.3 Restart Nginx:**
```bash
systemctl restart nginx
```

---

## Production Checklist

- [ ] **Environment Variables Set Correctly**
  - MONGO_URI configured for production
  - JWT_SECRET is strong and unique
  - NODE_ENV = production

- [ ] **CORS Configuration Updated**
  - Allowed origins set to your domain
  - Remove localhost from production

- [ ] **SSL/HTTPS Enabled**
  - Certificate installed (Let's Encrypt)
  - Redirect HTTP to HTTPS

- [ ] **Database**
  - MongoDB Atlas backups enabled
  - IP whitelist configured
  - Indexes created for performance

- [ ] **Security**
  - Rate limiting enabled on API
  - Input validation on all endpoints
  - HTTPS only
  - Security headers configured

- [ ] **Performance**
  - Caching configured
  - Images optimized
  - CDN setup (optional)
  - Database queries optimized

- [ ] **Monitoring**
  - Error tracking (Sentry)
  - Uptime monitoring
  - Logs centralized
  - Performance metrics tracked

- [ ] **Backup Strategy**
  - Database backups automated
  - Code backups to GitHub
  - Configuration backed up

---

## Domain Setup

**1. Register Domain:**
- GoDaddy, Namecheap, or Route53

**2. Point DNS to your server:**

**For Vercel/Netlify:**
```
Type: CNAME
Name: @
Value: your-vercel-domain.vercel.app
```

**For VPS/DigitalOcean:**
```
Type: A
Name: @
Value: your-server-ip
```

**For Subdomain (Backend API):**
```
Type: A
Name: api
Value: your-backend-ip
```

---

## Quick Command Reference

### Local Development
```bash
cd Frontend && npm run dev      # Frontend dev server
cd Backend && npm start          # Backend server
```

### Build for Production
```bash
cd Frontend && npm run build     # Creates dist folder
```

### Deploy Updates
```bash
git add .
git commit -m "Update message"
git push origin main
# Auto-deploys on Vercel/Railway/Render
```

---

## Troubleshooting

**Problem: CORS errors after deployment**
- Update Backend CORS origins with your Vercel/Netlify URL
- Redeploy backend

**Problem: MongoDB connection fails**
- Verify MONGO_URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are URL-encoded

**Problem: Images not loading**
- Verify ImageKit credentials
- Check image URLs in .env
- Ensure ImageKit project is active

**Problem: Backend not responding**
- Check Railway/Render logs for errors
- Verify environment variables are set
- Restart the service

---

## Cost Estimate

| Service | Free Tier | Price |
|---------|-----------|-------|
| Vercel (Frontend) | ✅ Free | $20/month (Pro) |
| Railway (Backend) | ✅ Free ($5 credit) | $5/month minimum |
| MongoDB Atlas | ✅ 512MB | $57/month (Shared) |
| **Total** | **Free to test** | **~$30-80/month** |

---

**Next Steps:**
1. Choose your deployment option (Vercel + Railway recommended)
2. Follow the specific guide above
3. Test thoroughly before going live
4. Set up monitoring and backups
5. Keep dependencies updated
