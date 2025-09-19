const { body, validationResult } = require("express-validator");

/**
 * Validator untuk update profile
 */
exports.validateUpdateProfile = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nama wajib diisi")
    .isLength({ min: 2, max: 50 })
    .withMessage("Nama harus antara 2-50 karakter"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Email tidak valid")
    .normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }
    next();
  },
];

/**
 * Validator untuk update password
 */
exports.validateUpdatePassword = [
  body("oldPassword")
    .trim()
    .notEmpty()
    .withMessage("Password lama wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password lama minimal 6 karakter"),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("Password baru wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password baru minimal 6 karakter")
    .custom((value, { req }) => {
      if (value === req.body.oldPassword) {
        throw new Error("Password baru tidak boleh sama dengan password lama");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }
    next();
  },
];

/**
 * Validator untuk delete account
 */
exports.validateDeleteAccount = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password wajib diisi untuk konfirmasi hapus akun")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }
    next();
  },
];
