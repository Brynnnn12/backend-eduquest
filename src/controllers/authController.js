const asyncHandler = require("express-async-handler");
const {
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken,
} = require("../services/authService");
const { responseSuccess } = require("../utils/response");

exports.register = asyncHandler(async (req, res) => {
  const user = await register(req.body);

  responseSuccess(
    res,
    201,
    "Registrasi berhasil, silakan cek email Anda untuk verifikasi.",
    { user }
  );
});

exports.login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await login(req.body);

  responseSuccess(res, 200, "Login berhasil", {
    user,
    accessToken,
    refreshToken,
  });
});

exports.logout = asyncHandler(async (req, res) => {
  await logout(req.user);
  responseSuccess(res, 200, "Logout berhasil");
});

exports.verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const user = await verifyEmail(token);
  responseSuccess(res, 200, "Email berhasil diverifikasi", { user });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await forgotPassword(email);

  responseSuccess(res, 200, "Link reset password telah dikirim ke email Anda");
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const token = req.body.token || req.query.token;
  const { password, passwordConfirmation } = req.body;

  if (!token) {
    throw new Error("Token reset password diperlukan");
  }

  const user = await resetPassword(token, password, passwordConfirmation);
  responseSuccess(res, 200, "Password berhasil direset", { user });
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    throw new Error("Refresh token diperlukan");
  }

  const {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  } = await refreshToken(token);

  responseSuccess(res, 200, "Token berhasil diperbarui", {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  });
});
