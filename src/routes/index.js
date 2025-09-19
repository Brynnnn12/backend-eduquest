const express = require("express");

const router = express.Router();

router.use("/auth", require("./authRoute"));
router.use("/profile", require("./characterRoute"));
router.use("/characters", require("./characterRoute"));
router.use("/badges", require("./badgeRoute"));

module.exports = router;
