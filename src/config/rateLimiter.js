const rateLimit = require("express-rate-limit");

/**
 * Rate limiter global (untuk semua routes)
 */
exports.globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.GLOBAL_RATE_LIMIT_MAX) || 100,
  message: {
    status: 429,
    error: "Terlalu banyak permintaan dari IP ini, silakan coba lagi nanti.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter untuk login/auth (lebih ketat)
 */
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 5,
  message: {
    status: 429,
    error: "Terlalu banyak permintaan dari IP ini, silakan coba lagi nanti.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter untuk API tertentu (e.g., upload)
 */
exports.uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: parseInt(process.env.UPLOAD_RATE_LIMIT_MAX) || 10,
  message: {
    status: 429,
    error: "Upload limit exceeded, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
