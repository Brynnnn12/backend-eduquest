const { getProgress, deleteProgress } = require("../services/progressService");
const { responseSuccess } = require("../utils/response");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  const result = await getProgress(req.query);
  responseSuccess(res, 200, "Berhasil Mengambil Progresses", result);
});

exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteProgress(id);
  responseSuccess(res, 200, "Berhasil Menghapus Progress", result);
});
