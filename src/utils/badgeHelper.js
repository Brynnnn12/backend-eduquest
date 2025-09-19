const path = require("path");
const fs = require("fs");

// Delete file by full path
exports.deleteFileByPath = (filePath) => {
  if (!filePath) return;
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
};

// Save file to specified folder
exports.saveFile = (file, folder = "icons") => {
  if (!file || !file.buffer) return null;

  if (!file.mimetype || !file.mimetype.startsWith("image/")) {
    throw new Error("File harus berupa gambar");
  }

  const ext = path.extname(file.originalname);
  const timestamp = Date.now();
  const filename = `icon-${timestamp}${ext}`;
  const fileDir = path.join(__dirname, "..", "..", "public", folder);

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }

  const filePath = path.join(fileDir, filename);
  fs.writeFileSync(filePath, file.buffer);
  return filename;
};

// Delete file from specified folder
exports.deleteFileFromFolder = (filename, folder = "icons") => {
  if (!filename) return;

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    folder,
    path.basename(filename)
  );
  exports.deleteFileByPath(filePath);
};
