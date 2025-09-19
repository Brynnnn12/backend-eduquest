const { Badge } = require("../models");
const {
  getPagination,
  getFiltering,
  getSorting,
} = require("../utils/queryHelper");
const asyncHandler = require("express-async-handler");
const { saveFile, deleteFileFromFolder } = require("../utils/badgeHelper");

exports.getAllBadges = asyncHandler(async (query) => {
  const { limit, offset, page } = getPagination(query); // tambahkan page di sini
  const where = getFiltering(query, ["name", "icon"]);
  const order = getSorting(query, ["name", "created_at", "icon"]);

  const result = await Badge.findAndCountAll({
    attributes: ["id", "name", "icon"],
    where,
    order,
    limit,
    offset,
  });

  return {
    data: result.rows,
    total: result.count,
    page, // sekarang sudah terdefinisi
    limit,
  };
});
exports.storeBadge = asyncHandler(async (name, file) => {
  // Validasi name
  if (!name) {
    throw new Error("Nama badge wajib diisi");
  }

  // Cek duplikasi nama
  const badge = await Badge.findOne({ where: { name } });
  if (badge) {
    throw new Error("Badge sudah ada");
  }

  // Simpan file icon
  const icon = saveFile(file, "icons");

  // Simpan ke database
  const newBadge = await Badge.create({ name, icon });
  return {
    name: newBadge.name,
    icon: newBadge.icon,
  };
});

exports.updateBadge = asyncHandler(async (id, name, file) => {
  const badge = await Badge.findByPk(id);
  if (!badge) {
    throw new Error("Badge tidak ditemukan");
  }

  // Jika ada file baru, hapus yang lama dan simpan yang baru
  let icon = badge.icon;
  if (file && file.buffer) {
    deleteFileFromFolder(badge.icon, "icons");
    icon = saveFile(file, "icons");
  }

  await badge.update({ name, icon });

  return {
    name: badge.name,
    icon: badge.icon,
  };
});

exports.destroyBadge = asyncHandler(async (id) => {
  const badge = await Badge.findByPk(id);
  if (!badge) {
    throw new Error("Badge tidak ditemukan");
  }

  // Hapus file icon jika ada
  deleteFileFromFolder(badge.icon, "icons");

  await badge.destroy();
});
