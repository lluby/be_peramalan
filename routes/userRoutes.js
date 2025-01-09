const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, deleteUser, } = require('../controllers/userController');
const verifyAdmin = require("../libs/verifyAdmin");
const verifyToken = require('../libs/verifyToken');

// Route untuk menampilkan semua pengguna
router.get('/user', verifyToken, verifyAdmin, getAllUsers);

// Route untuk menambah pengguna
router.post('/user', verifyToken, verifyAdmin, addUser);

// Route untuk menghapus pengguna berdasarkan ID
router.delete('/user/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = router;
