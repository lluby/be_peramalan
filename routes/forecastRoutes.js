const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecastController');

// Endpoint untuk mendapatkan hasil peramalan
router.get('/forecast', forecastController.getForecast);

module.exports = router;
