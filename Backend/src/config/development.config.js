/**
 * Development Configuration
 * Configuration settings for development environment
 */

module.exports = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: 'development',

  // Database
  mongodb: {
    uri: process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-shop',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-key',
    expire: '7d',
  },

  // CORS
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true,
  },

  // ImageKit
  imageKit: {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  },

  // API
  api: {
    prefix: '/api/v1',
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 1000,
  },

  // Logging
  logging: {
    level: 'debug',
  },
};
