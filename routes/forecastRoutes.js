const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecastController');
const veryfyToken = require('../libs/verifyToken');
const verifyAdmin = require("../libs/verifyAdmin");

// Endpoint untuk mendapatkan hasil peramalan
router.get('/forecast', veryfyToken, verifyAdmin, forecastController.getForecast);

module.exports = router;
