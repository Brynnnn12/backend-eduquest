const bcrypt = require("bcryptjs");

/**
 * Hash password dengan bcrypt
 * @param {string} password - Password yang akan di-hash
 * @returns {Promise<string>} - Password yang sudah di-hash
 */

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Bandingkan password dengan hash-nya
 * @param {string} password - Password yang akan dibandingkan
 * @param {string} hash - Hash password yang akan dibandingkan
 * @returns {Promise<boolean>} - Hasil perbandingan
 */
exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
