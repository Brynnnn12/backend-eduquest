require("dotenv").config();

/**
 * Konfigurasi JWT
 * Menggunakan environment variables untuk fleksibilitas
 * Pastikan variabel lingkungan sudah diatur di file .env
 */
module.exports = {
  access: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
};
