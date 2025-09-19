const express = require("express");
const router = express.Router();
const { index, destroy } = require("../controllers/progressController");
const {
  authenticatedOnly,
  authenticateToken,
} = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, index);
router.delete("/:id", authenticateToken, authenticatedOnly, destroy);

module.exports = router;
