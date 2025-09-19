/**
 * middleware untuk menangani route yang tidak ditemukan
 * membuat error dengan pesan "Not Found - [url]"
 * set status code 404
 * lalu lempar ke middleware errorHandler
 */
exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * middleware untuk menangani error
 * menyesuaikan status code dan pesan error
 * jika di production, stack trace tidak ditampilkan
 * jika di development, stack trace ditampilkan
 * untuk memudahkan debugging
 */

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Terjadi kesalahan di server",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
