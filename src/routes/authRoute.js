const express = require("express");

const {
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken,
} = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateRefreshToken,
} = require("../validators/authValidate");
const { authLimiter } = require("../config/rateLimiter");

const router = express.Router();

router.use(authLimiter);

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", validateForgotPassword, forgotPassword);
router.post("/reset-password", validateResetPassword, resetPassword);
router.post("/refresh-token", validateRefreshToken, refreshToken);
router.post("/logout", logout);

module.exports = router;
