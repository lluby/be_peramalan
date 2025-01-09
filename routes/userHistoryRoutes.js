const express = require('express');
const router = express.Router();
const { recordLogin, recordManageInventory } = require('../controllers/userHistoryController');
const { validateLogin, validateManageInventory } = require('../validation/userHistoryValidation');

// Endpoint untuk mencatat login
router.post('/history-login', validateLogin, recordLogin);

// Endpoint untuk mencatat tindakan kelola bahan baku
router.post('/manage-inventory', validateManageInventory, recordManageInventory);

module.exports = router;
