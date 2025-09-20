const {
  getAllBadges,
  destroyBadge,
  updateBadge,
  storeBadge,
} = require("../services/badgeService");
const { responseSuccess } = require("../utils/response");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  const result = await getAllBadges(req.query);
  responseSuccess(res, 200, "Berhasil Mengambil Badges", result);
});

exports.store = asyncHandler(async (req, res) => {
  const { name, description, threshold } = req.body;

  const result = await storeBadge(name, description, threshold, req.file);
  responseSuccess(res, 201, "Berhasil Menyimpan Badge", result);
});

exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, threshold } = req.body;

  const result = await updateBadge(id, name, description, threshold, req.file);
  responseSuccess(res, 200, "Berhasil Mengupdate Badge", result);
});

exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await destroyBadge(id);
  responseSuccess(res, 204, "Berhasil Menghapus Badge", result);
});
