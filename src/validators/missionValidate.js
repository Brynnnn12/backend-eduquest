const { body, query, validationResult } = require("express-validator");

exports.validateStoreMission = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("level").notEmpty().withMessage("Level is required"),
  body("points")
    .isInt({ min: 1 })
    .withMessage("Points must be a positive integer"),
  // created_by otomatis dari user login, tidak perlu validasi dari body
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateGetMission = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateUpdateMission = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("subject").optional().notEmpty().withMessage("Subject cannot be empty"),
  body("level").optional().notEmpty().withMessage("Level cannot be empty"),
  body("points")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Points must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
