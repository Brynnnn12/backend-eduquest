const { body, validationResult } = require("express-validator");

exports.validateUpsertCharacter = [
  body("username")
    .notEmpty()
    .withMessage("Username wajib diisi")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username harus 3-50 karakter"),
  body("bio")
    .optional()
    .isLength({ max: 160 })
    .withMessage("Bio maksimal 160 karakter"),
  body("avatar_url")
    .notEmpty()
    .withMessage("Avatar URL wajib diisi")
    .isURL()
    .withMessage("Avatar URL harus berupa URL valid"),
  // Tidak perlu validasi bio, karena nullable
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
