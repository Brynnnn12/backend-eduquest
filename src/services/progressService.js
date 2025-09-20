const { Progres, Badge } = require("../models");
const { getPagination } = require("../utils/queryHelper");
const asyncHandler = require("express-async-handler");
const { assignBadge } = require("./userBadgeService");

exports.getProgress = asyncHandler(async (query) => {
  const { limit, offset, page } = getPagination(query);
  const { user_id, mission_id } = query;
  const where = {};
  if (user_id) where.user_id = user_id;
  if (mission_id) where.mission_id = mission_id;
  const progresses = await Progres.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    include: [
      { model: require("../models").User, as: "user" },
      { model: require("../models").Mission, as: "mission" },
    ],
  });
  return {
    data: progresses.rows,
    meta: {
      total: progresses.count,
      page,
      limit,
    },
  };
});

exports.deleteProgress = asyncHandler(async (id) => {
  const progress = await Progres.findByPk(id);
  if (!progress) {
    throw new Error("Progress not found");
  }
  await progress.destroy();
  return { message: "Progress deleted successfully" };
});
