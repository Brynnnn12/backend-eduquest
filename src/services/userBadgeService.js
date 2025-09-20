const { UserBadge, Badge, Progres } = require("../models");
const asyncHandler = require("express-async-handler");

/**
 * Assign badge ke user (cek dulu biar tidak dobel)
 * @param {string} user_id
 * @param {string} badge_id
 */
exports.assignBadge = asyncHandler(async (user_id, badge_id) => {
  // cek apakah user sudah punya badge ini
  const existing = await UserBadge.findOne({
    where: { user_id, badge_id },
  });

  if (existing) {
    return existing; // sudah punya badge, return aja
  }

  // kalau belum, buat baru
  const newBadge = await UserBadge.create({
    user_id,
    badge_id,
    awarded_at: new Date(),
  });

  return newBadge;
});

/**
 * Check total score user and assign badge if threshold reached
 * @param {string} user_id
 */
exports.checkAndAssignBadge = async (user_id) => {
  // Calculate total score
  const totalScoreResult = await Progres.sum("score", {
    where: { user_id, status: "completed" },
  });
  const totalScore = totalScoreResult || 0;

  // Get all badges from database
  const badges = await Badge.findAll();

  for (const badge of badges) {
    if (totalScore >= badge.threshold) {
      await exports.assignBadge(user_id, badge.id);
    }
  }
};
