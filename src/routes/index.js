const express = require("express");

const router = express.Router();

router.use("/auth", require("./authRoute"));
router.use("/profile", require("./characterRoute"));
router.use("/characters", require("./characterRoute"));
router.use("/badges", require("./badgeRoute"));
router.use("/missions", require("./missionRoute"));
router.use("/quizzes", require("./quizRoute"));
router.use("/progresses", require("./progressRoute"));

module.exports = router;
