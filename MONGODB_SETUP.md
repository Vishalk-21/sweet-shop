# 🔐 MongoDB Atlas Configuration for Production

## Step 1: Log into MongoDB Atlas

Visit: https://account.mongodb.com/account/login

---

## Step 2: Access Network Access

1. Click on your project
2. Left sidebar → "Network Access"
3. Click "ADD IP ADDRESS"

---

## Step 3: Whitelist IP Addresses

### For Railway Backend:
- Click "ADD IP ADDRESS"
- Enter: `0.0.0.0/0` (Allow all IPs - for testing only)
- Or better: Ask Railway for their IP range
- Click "Confirm"

**⚠️ Note:** For production, use specific IP ranges instead of 0.0.0.0/0

### For Vercel Frontend:
- Add Vercel IP range: `76.76.19.0/24`
- Add your local IP (if testing locally)

---

## Step 4: Create Database User

1. Left sidebar → "Database Access"
2. Click "ADD NEW DATABASE USER"
3. **Username:** 21230vishal_db_user
4. **Password:** Vishal9410
5. **Database User Privileges:** Read/Write to any database
6. Click "Add User"

---

## Step 5: Get Connection String

1. Go to "Clusters"
2. Click "Connect" button
3. Select "Connect your application"
4. Copy the connection string:
```
mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop
```

---

## Step 6: Verify Connection

### Test from Railway:
```bash
# Railway console
npm install mongoose
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://21230vishal_db_user:Vishal9410@project1.tu3of7b.mongodb.net/SweetShop')
  .then(() => console.log('✅ Connected!'))
  .catch(err => console.error('❌ Error:', err.message));
"
```

---

## Step 7: Security Checklist

- [ ] Change MongoDB password (optional but recommended)
- [ ] Use IP whitelist (don't use 0.0.0.0/0 in production)
- [ ] Enable two-factor authentication
- [ ] Backup enabled in Atlas settings
- [ ] Database encryption enabled (automatic)
- [ ] Connection string secured (not in code)

---

## Common Issues & Solutions

### Issue: "Authentication Failed"
**Solution:**
- Check username/password in connection string
- Ensure special characters are URL-encoded
- Test with MongoDB Atlas UI connection test

### Issue: "IP Not Whitelisted"
**Solution:**
1. Go to Network Access
2. Check Railway IP is whitelisted
3. Add `0.0.0.0/0` temporarily for testing
4. Later: Use specific IP ranges

### Issue: "Cannot Connect from Vercel"
**Solution:**
- Vercel frontend doesn't connect directly to MongoDB
- Only backend connects to MongoDB
- Update Vercel env with correct backend API URL

---

## Backup Configuration

### Enable Automated Backups:
1. Go to "Backup"
2. Click "Configure"
3. Enable "Hourly snapshots"
4. Retention: 30 days

### Manual Backup:
1. Go to "Backup"
2. Click "Take Snapshot Now"
3. Download backup when ready

---

## Performance Optimization

### Create Indexes:
In MongoDB Atlas:
1. Go to "Collections"
2. Click your collection (e.g., "products")
3. Go to "Indexes"
4. Create indexes for frequently queried fields:
   - `email` (for user lookups)
   - `status` (for order filtering)
   - `category` (for product filtering)
   - `createdAt` (for sorting)

### Example JavaScript to create indexes:
```javascript
// In your database initialization
const userSchema = new mongoose.Schema({
    email: { type: String, index: true, unique: true },
    name: String,
    role: String
});

const productSchema = new mongoose.Schema({
    name: { type: String, index: true },
    category: { type: String, index: true },
    price: Number
});

const orderSchema = new mongoose.Schema({
    user_id: { type: String, index: true },
    status: { type: String, index: true },
    createdAt: { type: Date, index: true }
});
```

---

## Monitoring

### Set Up Alerts:
1. Go to "Alerts"
2. Click "Create Alert"
3. Set alerts for:
   - Connection failures
   - Replication lag
   - High CPU usage
   - Disk space low

### Check Metrics:
1. Go to "Metrics" dashboard
2. Monitor:
   - Operations per second
   - Network bandwidth
   - CPU usage
   - Memory usage
   - Disk usage

---

## Connection Best Practices

### In Production (Backend):
```javascript
// Backend/src/db/db.js
const mongoose = require('mongoose');

async function connectDB() {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                retryWrites: true,
                w: 'majority',
                socketTimeoutMS: 45000,
                connectTimeoutMS: 10000
            });
            
            console.log('✅ MongoDB connected successfully');
            
            // Connection event handlers
            mongoose.connection.on('connected', () => {
                console.log('Mongoose connected to MongoDB');
            });

            mongoose.connection.on('error', (err) => {
                console.error('Mongoose connection error:', err);
            });

            mongoose.connection.on('disconnected', () => {
                console.warn('Mongoose disconnected');
            });

            break;
        } catch (error) {
            retries++;
            console.error(`MongoDB connection attempt ${retries}/${maxRetries} failed:`, error.message);
            
            if (retries < maxRetries) {
                console.log(`Retrying in 5 seconds...`);
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                console.error('Failed to connect to MongoDB after maximum retries');
                process.exit(1);
            }
        }
    }
}

module.exports = connectDB;
```

---

## Scaling Tips

When you get more users:

1. **Upgrade to Dedicated Cluster**
   - M10 ($57/month) - Good for production
   - Better performance and more storage

2. **Enable Sharding**
   - Distribute data across multiple servers
   - Better for large datasets

3. **Add Read Replicas**
   - Improve read performance
   - High availability setup

4. **Archive Old Data**
   - Move old orders to archive collection
   - Keep active data lean

---

## Quick Reference

| Task | Steps |
|------|-------|
| View Connection String | Clusters → Connect → Connection String |
| Whitelist IP | Network Access → Add IP Address |
| Create User | Database Access → Add User |
| Take Backup | Backup → Take Snapshot Now |
| View Metrics | Metrics dashboard |
| Create Index | Collections → Select Collection → Indexes |

---

That's it! Your MongoDB is production-ready! 🚀
