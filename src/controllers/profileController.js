const asyncHandler = require("express-async-handler");
const { responseSuccess } = require("../utils/response");
const {
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
} = require("../services/profileService");

exports.getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await getProfile(userId);
  responseSuccess(res, 200, "Profile berhasil diambil", user);
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;
  const user = await updateProfile(userId, { name, email });
  responseSuccess(res, 200, "Profile berhasil diupdate", user);
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  const user = await updatePassword(userId, { oldPassword, newPassword });
  responseSuccess(res, 200, "Password berhasil diupdate", user);
});

exports.deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;
  const result = await deleteAccount(userId, { password });
  responseSuccess(res, 204, result.message);
});
