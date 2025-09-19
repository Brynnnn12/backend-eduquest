const express = require("express");
const {
  index,
  store,
  update,
  destroy,
} = require("../controllers/badgeController");
const {
  validateStoreBadge,
  validateUpdateBadge,
} = require("../validators/badgeValidate");
const { uploadFile, uploadFileToMemory } = require("../middlewares/upload");
const {
  authenticateToken,
  adminOnly,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, index);
router.post(
  "/",
  authenticateToken,
  adminOnly,
  uploadFileToMemory("icon"),
  validateStoreBadge,
  store
);
router.put(
  "/:id",
  authenticateToken,
  adminOnly,
  uploadFileToMemory("icon"),
  validateUpdateBadge,
  update
);
router.delete("/:id", authenticateToken, adminOnly, destroy);

module.exports = router;
