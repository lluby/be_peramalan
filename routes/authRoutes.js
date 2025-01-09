const express = require('express');
const router = express.Router();
const { register, login, authenticate } = require('../controllers/authController');
const veryfyToken = require('../libs/verifyToken');

router.post('/login', login);
router.post('/register', register);
router.get('/me', veryfyToken, authenticate);

module.exports = router;
