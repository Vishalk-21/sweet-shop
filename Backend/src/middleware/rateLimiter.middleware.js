/**
 * Rate Limiter Middleware
 * Prevent abuse with request rate limiting
 */

const rateLimit = {};

const rateLimiter = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!rateLimit[ip]) {
      rateLimit[ip] = [];
    }

    // Remove old requests outside the time window
    rateLimit[ip] = rateLimit[ip].filter((timestamp) => now - timestamp < windowMs);

    if (rateLimit[ip].length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
    }

    rateLimit[ip].push(now);
    next();
  };
};

module.exports = rateLimiter;
