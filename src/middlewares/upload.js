const { createUploader, createMemoryUploader } = require("../utils/multer");

/**
 * cara pakai nya
 */
exports.uploadFile = (type) => {
  let maxFileSize;
  switch (type) {
    case "icon":
      maxFileSize = 2 * 1024 * 1024; // 2 MB
      break;
    // definisikan ukuran maksimum untuk jenis file lainnya
    default:
      maxFileSize = 2 * 1024 * 1024; // Default 2 MB
  }
  const subfolder = `${type}s`; // Misal: "avatars" untuk type "avatar"
  const prefix = type; // Misal: "avatar" untuk prefix
  return createUploader(subfolder, maxFileSize, prefix).single(type);
};

/**
 * Upload file ke memory (untuk validasi dulu sebelum simpan)
 */
exports.uploadFileToMemory = (type) => {
  let maxFileSize;
  switch (type) {
    case "icon":
      maxFileSize = 2 * 1024 * 1024; // 2 MB
      break;
    // definisikan ukuran maksimum untuk jenis file lainnya
    default:
      maxFileSize = 2 * 1024 * 1024; // Default 2 MB
  }
  return createMemoryUploader(maxFileSize).single(type);
};
