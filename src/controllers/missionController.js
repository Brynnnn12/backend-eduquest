const {
  getMission,
  createMission,
  updateMission,
  deleteMission,
} = require("../services/missionService");
const { responseSuccess } = require("../utils/response");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  const result = await getMission(req.query);
  responseSuccess(res, 200, "Berhasil Mengambil Missions", result);
});

exports.store = asyncHandler(async (req, res) => {
  const { title, description, subject, level, points } = req.body;
  const created_by = req.user.id; // Ambil dari user yang login

  const data = {
    title,
    description,
    subject,
    level,
    points,
    created_by,
  };

  const result = await createMission(data);
  responseSuccess(res, 201, "Berhasil Membuat Mission", result);
});

exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, subject, level, points } = req.body;

  const data = {
    title,
    description,
    subject,
    level,
    points,
  };

  const result = await updateMission(id, data);
  responseSuccess(res, 200, "Berhasil Mengupdate Mission", result);
});

exports.destroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteMission(id);
  responseSuccess(res, 200, "Berhasil Menghapus Mission", result);
});
