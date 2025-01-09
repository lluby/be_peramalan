const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, deleteUser } = require('../controllers/userController');


// Route untuk menampilkan semua pengguna
router.get('/user', getAllUsers);

// Route untuk menambah pengguna
router.post('/user', addUser);

// Route untuk menghapus pengguna berdasarkan ID
router.delete('/user/:id', deleteUser);

module.exports = router;
