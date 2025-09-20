const { body, query, validationResult } = require("express-validator");

exports.validateStoreBadge = [
  body("name").notEmpty().withMessage("Nama wajib diisi").escape(),
  body("description")
    .optional()
    .isString()
    .withMessage("Deskripsi harus berupa string")
    .escape(),

  body("threshold")
    .isInt({ min: 0 })
    .withMessage("Ambang batas harus berupa bilangan bulat positif"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateUpdateBadge = [
  body("name").notEmpty().withMessage("Nama wajib diisi").escape(),
  body("description")
    .optional()
    .isString()
    .withMessage("Deskripsi harus berupa string")
    .escape(),
  body("threshold")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Ambang batas harus berupa bilangan bulat positif"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
