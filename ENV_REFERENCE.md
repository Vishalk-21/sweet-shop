# 🔧 Environment Variables & Configuration Reference

## Backend Environment Variables

### Location: `Backend/.env`

```env
# Database Configuration
MONGO_URI=mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop

# JWT Configuration
JWT_SECRET=sweet_shop_secret_key_2024

# ImageKit Configuration (For Product Images)
IMAGE_PRIVATE_KEY=private_8IkxV2gYS4Nv7bdABTvVaQXeUUU=
IMAGE_PUBLIC_KEY=public_sfEyqebZ3g2lmw71F+JhMOIglHg=
IMAGE_URL_ENDPOINT=https://ik.imagekit.io/https://ik.imagekit.io/pg81w4dbz

# Server Configuration
NODE_ENV=production
PORT=3000
```

---

## Frontend Environment Variables

### For Local Development: `Frontend/.env.local`

```env
VITE_API_URL=http://localhost:3000/api
```

### For Production (Set in Vercel):

```env
VITE_API_URL=https://your-railway-backend.railway.app/api
```

---

## Production Deployment Variables

### For Railway (Backend):

1. Go to Railway dashboard
2. Select your project
3. Click "Variables"
4. Add each variable:

| Variable | Value | Description |
|----------|-------|-------------|
| MONGO_URI | `mongodb+srv://21230vishal_db_user:Vishal9410@...` | MongoDB connection string |
| JWT_SECRET | `sweet_shop_secret_key_2024` | Secret key for JWT tokens |
| IMAGE_PRIVATE_KEY | `private_8IkxV2gYS4Nv7bdABTvVaQXeUUU=` | ImageKit API private key |
| IMAGE_PUBLIC_KEY | `public_sfEyqebZ3g2lmw71F+JhMOIglHg=` | ImageKit API public key |
| IMAGE_URL_ENDPOINT | `https://ik.imagekit.io/...` | ImageKit endpoint URL |
| NODE_ENV | `production` | Environment mode |
| PORT | `3000` | Server port |

### For Vercel (Frontend):

1. Go to Vercel project settings
2. Click "Environment Variables"
3. Add variable:

| Variable | Value |
|----------|-------|
| VITE_API_URL | `https://your-railway-backend.railway.app/api` |

---

## How to Find/Generate Required Values

### 1. MONGO_URI

**Get from MongoDB Atlas:**
1. Go to https://cloud.mongodb.com
2. Click "Clusters"
3. Click "Connect"
4. Select "Connect your application"
5. Copy connection string
6. Replace `<password>` with your actual password

**Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### 2. JWT_SECRET

**Generate a strong secret:**
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
$randomBytes = [byte[]] (1..32 | ForEach-Object { Get-Random -Maximum 256 })
[Convert]::ToBase64String($randomBytes)

# Or just use:
sweet_shop_secret_key_2024
```

**Best Practice:** Use a random string of at least 32 characters

### 3. ImageKit Credentials

**Get from ImageKit:**
1. Go to https://imagekit.io
2. Sign up with email/GitHub
3. Create a project
4. Go to Settings → Developer
5. Copy:
   - Private Key
   - Public Key
   - URL Endpoint

**If using ImageKit:**
```
IMAGE_PRIVATE_KEY: private_xxxxxxxxxxxxxxxx
IMAGE_PUBLIC_KEY: public_xxxxxxxxxxxxxxxx
IMAGE_URL_ENDPOINT: https://ik.imagekit.io/yourprojectid
```

**If not using ImageKit:**
Set to empty or dummy values:
```
IMAGE_PRIVATE_KEY=dummy
IMAGE_PUBLIC_KEY=dummy
IMAGE_URL_ENDPOINT=https://ik.imagekit.io/dummy
```

---

## Configuration Files

### Backend: `Backend/src/config/index.js`

```javascript
const config = {
    development: {
        mongoUri: process.env.MONGO_URI,
        jwtSecret: process.env.JWT_SECRET,
        nodeEnv: 'development'
    },
    production: {
        mongoUri: process.env.MONGO_URI,
        jwtSecret: process.env.JWT_SECRET,
        nodeEnv: 'production'
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];
```

### Frontend: `Frontend/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    minify: 'terser'
  }
})
```

### Backend: `Backend/src/middleware/auth.middleware.js`

```javascript
const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token

        if (!token) {
            return res.status(401).json({ message: 'Token not found' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if (decoded.role !== 'owner') {
            return res.status(403).json({ message: 'Admin access required' })
        }

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}
```

---

## CORS Configuration

### Backend: `Backend/src/app.js`

**For Production:**
```javascript
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://sweet-shop-xyz.vercel.app',      // Your Vercel frontend
            'https://api.kallusweethouse.com',         // Your custom domain
            'http://localhost:5173',                   // Local development
            'http://localhost:3000'                    // Local backend
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

---

## Database Configuration

### MongoDB Atlas Settings:

**Security:**
- IP Whitelist: Add your server IP (or 0.0.0.0/0 for testing)
- User Authentication: Required
- Encryption: Enabled (automatic)

**Performance:**
- Backups: Hourly snapshots
- Indexes: Create on frequently queried fields
- Connection Pool: Min 10, Max 100 (default)

**Recommended Indexes:**
```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })

// Products
db.products.createIndex({ category: 1 })
db.products.createIndex({ name: 1 })
db.products.createIndex({ is_available: 1 })

// Orders
db.orders.createIndex({ user_id: 1 })
db.orders.createIndex({ status: 1 })
db.orders.createIndex({ createdAt: -1 })

// Messages
db.messages.createIndex({ email: 1 })
db.messages.createIndex({ status: 1 })
db.messages.createIndex({ createdAt: -1 })
```

---

## API Configuration

### Base URLs:

**Development:**
```
http://localhost:3000/api
```

**Production (Railway):**
```
https://your-project.railway.app/api
```

**Production (Custom Domain):**
```
https://api.kallusweethouse.com
```

### API Endpoints:

```
/api/auth/register          POST   - Create account
/api/auth/login             POST   - Login user
/api/auth/profile           GET    - Get user profile

/api/products               GET    - Get all products
/api/products/:id           GET    - Get single product
/api/admin/products         GET    - Get products (admin)
/api/admin/products         POST   - Create product
/api/admin/products/:id     PUT    - Update product
/api/admin/products/:id     DELETE - Delete product

/api/orders                 POST   - Create order
/api/orders/my              GET    - Get my orders
/api/orders/:id             GET    - Get order details
/api/admin/orders           GET    - Get all orders (admin)
/api/admin/orders/:id/status PUT   - Update order status

/api/messages               POST   - Create message
/api/admin/messages         GET    - Get all messages (admin)
/api/admin/messages/:id     GET    - Get message details
/api/admin/messages/:id/status PUT - Update message status
/api/admin/messages/stats   GET    - Get message statistics
```

---

## Rate Limiting Configuration

### Recommended Settings (Backend):

```javascript
const rateLimit = require('express-rate-limit')

// Login limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 5,                     // 5 attempts
    message: 'Too many login attempts, please try again later'
})

// General API limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP'
})

app.post('/api/auth/login', loginLimiter, authController.login)
app.use('/api/', apiLimiter)
```

---

## Security Headers

### Add to Backend (src/app.js):

```javascript
const helmet = require('helmet')

app.use(helmet())  // Security headers
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))

// Additional headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    next()
})
```

---

## Logging Configuration

### Production Logging (Backend):

```javascript
const logger = {
    info: (message) => {
        if (process.env.NODE_ENV === 'production') {
            console.log(`[INFO] ${new Date().toISOString()} - ${message}`)
        }
    },
    error: (message, error) => {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error)
    }
}

module.exports = logger
```

---

## Environment Variable Checklist

- [ ] MONGO_URI - MongoDB connection string
- [ ] JWT_SECRET - Token signing key
- [ ] IMAGE_PRIVATE_KEY - ImageKit private key
- [ ] IMAGE_PUBLIC_KEY - ImageKit public key
- [ ] IMAGE_URL_ENDPOINT - ImageKit endpoint
- [ ] NODE_ENV - Set to 'production'
- [ ] PORT - Backend port (3000)
- [ ] VITE_API_URL - Frontend API URL

---

## Verification Commands

### Test Backend Connection:

```bash
# Test MongoDB
cd Backend
npm install mongoose
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB OK'))
  .catch(err => console.error('❌ MongoDB Error:', err.message))
"
```

### Test API Health:

```bash
curl https://your-backend-url/api/health
```

Expected response:
```json
{
  "message": "Backend is running",
  "timestamp": "2026-06-18T12:00:00.000Z"
}
```

---

## Quick Copy-Paste Template

**For Railway Backend:**
```env
MONGO_URI=mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop
JWT_SECRET=sweet_shop_secret_key_2024
IMAGE_PRIVATE_KEY=private_8IkxV2gYS4Nv7bdABTvVaQXeUUU=
IMAGE_PUBLIC_KEY=public_sfEyqebZ3g2lmw71F+JhMOIglHg=
IMAGE_URL_ENDPOINT=https://ik.imagekit.io/https://ik.imagekit.io/pg81w4dbz
NODE_ENV=production
PORT=3000
```

**For Vercel Frontend:**
```env
VITE_API_URL=https://your-railway-url/api
```

---

Everything you need for production! 🚀
