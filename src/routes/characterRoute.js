const express = require("express");
const router = express.Router();

const { validateUpsertCharacter } = require("../validators/characterValidate");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { index } = require("../controllers/characterController");
const { update } = require("../controllers/badgeController");

router.get("/", authenticateToken, index);
router.put("/", authenticateToken, validateUpsertCharacter, update);

module.exports = router;
