const express = require("express");
const {
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
} = require("../controllers/profileController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  validateUpdateProfile,
  validateUpdatePassword,
  validateDeleteAccount,
} = require("../validators/profileValidate");

const router = express.Router();

router.get("/", authenticateToken, getProfile);
router.put(
  "/",
  authenticateToken,
  validateUpdateProfile,

  updateProfile
);
router.put(
  "/password",
  authenticateToken,
  validateUpdatePassword,

  updatePassword
);
router.delete(
  "/",
  authenticateToken,
  validateDeleteAccount,

  deleteAccount
);

module.exports = router;
