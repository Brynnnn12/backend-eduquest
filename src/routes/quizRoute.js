const express = require("express");
const router = express.Router();
const {
  index,
  update,
  destroy,
  submitAnswers,
} = require("../controllers/quizController");
const {
  authenticatedOnly,
  authenticateToken,
} = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, index);
router.post(
  "/submit-answers",
  authenticateToken,

  submitAnswers
);
router.put("/:id", authenticateToken, authenticatedOnly, update);
router.delete("/:id", authenticateToken, authenticatedOnly, destroy);

module.exports = router;
