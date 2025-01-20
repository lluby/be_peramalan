const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecastController');
const veryfyToken = require('../libs/verifyToken');

// Endpoint untuk mendapatkan hasil peramalan
router.get('/forecast', veryfyToken, forecastController.getForecast);

module.exports = router;
