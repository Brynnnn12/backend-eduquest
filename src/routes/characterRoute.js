const express = require("express");
const router = express.Router();

const { validateUpsertCharacter } = require("../validators/characterValidate");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { index, update } = require("../controllers/characterController");

router.get("/", authenticateToken, index);
router.put("/", authenticateToken, validateUpsertCharacter, update);

module.exports = router;
