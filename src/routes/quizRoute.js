const express = require("express");
const router = express.Router();
const {
  index,
  update,
  destroy,
  submitAnswers,
  getHint,
  getSolution,
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
router.get("/:quizId/hint", authenticateToken, getHint);
router.get("/:quizId/solution", authenticateToken, getSolution);
router.post("/:quizId/submit", authenticateToken, submitAnswers);

router.put("/:id", authenticateToken, authenticatedOnly, update);
router.delete("/:id", authenticateToken, authenticatedOnly, destroy);

module.exports = router;
