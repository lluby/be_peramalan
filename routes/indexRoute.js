const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/", require("./bahanBakuRoutes"));
router.use("/", require("./forecastRoutes"));
router.use("/", require("./historyRoutes"));
router.use("/", require("./userRoutes"));

router.use("/", require("./userHistoryRoutes"));

module.exports = router;

