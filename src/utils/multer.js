const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Konfigurasi multer untuk meng-upload file
 *
 * @param {string} subfolder - Subfolder tempat menyimpan file yang di-upload
 * @param {number} maxFileSize - Ukuran maksimum file yang di-upload
 * @param {string} prefix - Prefix untuk nama file yang di-upload
 * @returns {Object} - Middleware multer untuk meng-upload file
 */

exports.createUploader = (
  subfolder = "",
  maxFileSize = 2 * 1024 * 1024,
  prefix = ""
) => {
  const destination = path.join(__dirname, "..", "..", "public", subfolder);

  // Pastikan folder tujuan ada
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const timestamp = Date.now();
      const newFilename = prefix
        ? `${prefix}-${timestamp}${ext}`
        : `${timestamp}-${file.originalname}`;
      cb(null, newFilename);
    },
  });

  return multer({
    storage,
    limits: { fileSize: maxFileSize },
  });
};

/**
 * Konfigurasi multer untuk memory storage
 *
 * @param {number} maxFileSize - Ukuran maksimum file yang di-upload
 * @returns {Object} - Middleware multer untuk meng-upload file ke memory
 */
exports.createMemoryUploader = (maxFileSize = 2 * 1024 * 1024) => {
  const storage = multer.memoryStorage();

  return multer({
    storage,
    limits: { fileSize: maxFileSize },
  });
};
