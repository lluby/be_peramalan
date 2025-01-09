const prisma = require("../libs/prisma");

// Controller untuk menampilkan semua pengguna
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Controller untuk menambah pengguna
const addUser = async (req, res) => {
    const { username, password, role } = req.body;
  
    // Cek data yang diterima dari frontend
    console.log("Received data:", { username, password, role });
  
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Username, password, dan role wajib diisi' });
    }
  
    // Validasi role
    if (role !== 'admin' && role !== 'staff') {
      return res.status(400).json({ message: 'Role harus "admin" atau "staff"' });
    }
  
    try {
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username sudah digunakan' });
      }
  
      const newUser = await prisma.user.create({
        data: {
          username,
          password, // Jangan lupa mengenkripsi password jika perlu
          role, // Menyimpan role sesuai dengan nilai yang diterima
        },
      });
  
      res.status(201).json({
        message: 'User berhasil dibuat',
        user: { id: newUser.id, username: newUser.username, role: newUser.role },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  };
  
// Controller untuk menghapus pengguna
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Hapus user
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'User berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
};
