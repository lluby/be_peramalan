const express = require("express");
const {
    getAllHistory,
    getMyHistory,
} = require("../controllers/historyController");
const verifyToken = require("../libs/verifyToken");
const verifyAdmin = require("../libs/verifyAdmin");

const router = express.Router();

router.get("/history", verifyToken, verifyAdmin, getAllHistory);
router.get("/history/me", verifyToken, getMyHistory);

module.exports = router;
