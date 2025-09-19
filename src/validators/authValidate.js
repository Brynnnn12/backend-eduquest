const { body, query, validationResult } = require("express-validator");

exports.validateRegistration = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Nama harus diisi")
    .isLength({ min: 3 })
    .withMessage("Nama harus memiliki minimal 3 karakter")
    .matches(/^[a-zA-Z0-9\s.'-]+$/)
    .withMessage(
      "Nama hanya boleh huruf, angka, spasi, titik, apostrof, dan strip"
    ),
  body("email")
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password harus memiliki minimal 6 karakter")
    .matches(/^[^\s<>"]+$/)
    .withMessage(
      "Password tidak boleh mengandung spasi atau karakter berbahaya"
    ),
  body("passwordConfirmation")
    .notEmpty()
    .withMessage("Konfirmasi password harus diisi")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password dan konfirmasi password tidak cocok"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .matches(/^[^\s<>"]+$/)
    .withMessage(
      "Password tidak boleh mengandung spasi atau karakter berbahaya"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateForgotPassword = [
  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email tidak valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateResetPassword = [
  // Token bisa datang dari body atau query parameter
  body("token")
    .optional()
    .notEmpty()
    .withMessage("Token reset password harus diisi"),
  query("token")
    .optional()
    .notEmpty()
    .withMessage("Token reset password harus diisi"),
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password harus memiliki minimal 6 karakter")
    .matches(/^[^\s<>"]+$/)
    .withMessage(
      "Password tidak boleh mengandung spasi atau karakter berbahaya"
    ),
  body("passwordConfirmation")
    .notEmpty()
    .withMessage("Konfirmasi password harus diisi")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password dan konfirmasi password tidak cocok"),
  (req, res, next) => {
    const errors = validationResult(req);

    // Custom validation untuk memastikan token ada di salah satu tempat
    if (!req.body.token && !req.query.token) {
      return res.status(400).json({
        errors: [
          {
            msg: "Token reset password diperlukan (dalam body atau query parameter)",
            param: "token",
            location: "body",
          },
        ],
      });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateRefreshToken = [
  body("refreshToken").notEmpty().withMessage("Refresh token harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
