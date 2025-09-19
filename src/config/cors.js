const cors = require("cors");

/**
 * Konfigurasi CORS
 * Jika environment variable CORS_ORIGIN tidak diset, izinkan semua origin
 */
exports.corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};
