# Backend - API Server

Production-ready Node.js/Express API for Sweet Shop e-commerce platform.

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Environment Setup
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Running the Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start

# With database seeding
npm run seed
```

## 📁 Project Structure

```
src/
├── api/
│   └── v1/                  # API v1 endpoints
│       ├── controllers/     # Request handlers
│       ├── routes/          # Route definitions
│       ├── services/        # Business logic
│       └── validators/      # Input validation
├── config/                  # Configuration
│   └── imagekit.config.js  # Image upload config
├── db/                      # Database
│   └── db.js               # MongoDB connection
├── middleware/              # Express middleware
│   ├── auth.middleware.js  # JWT verification
│   └── imagekit.middleware.js  # Image upload
├── models/                  # Mongoose schemas
│   ├── user.model.js
│   ├── product.model.js
│   └── order.model.js
├── utils/                   # Utility functions
│   ├── logger.js           # Logging utility
│   ├── validators.js       # Common validators
│   └── ...
├── exceptions/              # Custom errors
│   └── AppError.js         # Base error class
├── constants/               # Constants
│   └── httpStatus.js       # HTTP status codes
└── app.js                  # Express setup
```

## 🔄 API Versioning

The API is organized with versioning in mind:
- Current version: `v1`
- Base URL: `/api/v1`
- Future versions can be added as `/api/v2`, etc.

## 🛡️ Key Features

- ✅ JWT Authentication
- ✅ Input Validation
- ✅ Error Handling
- ✅ CORS Configuration
- ✅ Image Upload (ImageKit)
- ✅ Structured Services Layer
- ✅ Custom Exception Handling

## 🔐 Security Best Practices

- Environment variables for sensitive data
- JWT token validation on protected routes
- Password hashing with bcrypt
- CORS whitelist configuration
- Input validation on all endpoints

## 🧪 Testing

```bash
npm test
```

## 📝 Adding New Features

### 1. Create a new route
Create files in `src/api/v1/`:
- `controllers/newFeature.controller.js` - Handler logic
- `routes/newFeature.route.js` - Route definition
- `services/newFeature.service.js` - Business logic
- `validators/newFeature.validator.js` - Input validation

### 2. Register in app.js
```javascript
const newFeatureRoutes = require('./api/v1/routes/newFeature.route');
app.use('/api/v1/newfeature', newFeatureRoutes);
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - Authentication
- **bcrypt** - Password hashing
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **imagekit** - Image management
- **multer** - File upload handling
- **cookie-parser** - Cookie parsing

## 🚨 Error Handling

Custom error handling with `AppError` class:
```javascript
throw new AppError('Error message', 400);
```

## 📊 Logging

Centralized logging utility in `src/utils/logger.js`:
```javascript
const logger = require('./utils/logger');
logger.info('Message');
logger.error('Error message');
```

---

**Version**: 1.0.0
**Last Updated**: 2026-06-18
