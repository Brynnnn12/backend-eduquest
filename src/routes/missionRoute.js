const express = require("express");
const router = express.Router();
const {
  validateStoreMission,
  validateGetMission,
  validateUpdateMission,
} = require("../validators/missionValidate");
const {
  index,
  store,
  update,
  destroy,
} = require("../controllers/missionController");
const {
  authenticatedOnly,
  authenticateToken,
} = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, validateGetMission, index);
router.post(
  "/",
  authenticateToken,
  authenticatedOnly,
  validateStoreMission,
  store
);
router.put(
  "/:id",
  authenticateToken,
  authenticatedOnly,
  validateUpdateMission,
  update
);
router.delete("/:id", authenticateToken, authenticatedOnly, destroy);

module.exports = router;
