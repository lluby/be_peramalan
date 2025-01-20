const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../libs/prisma");
const {
  registerValidation,
  loginValidation,
} = require("../validation/authValidation");

const register = async (req, res) => {
  try {
    const { value, error } = registerValidation.validate(req.body);

    const { username, password, role } = value;

    // Jika tidak lolos validasi maka akan error dan mengembalikan status 400
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: error.message,
        data: null,
      });
    }

    // Cek apakah username sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username sudah terdaftar" });
    }

    // Enkripsi password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru ke database
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ message: "Pendaftaran berhasil", user: newUser });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal server error", err: error });
  }
};

const login = async (req, res) => {
  try {
    // Validasi input dari client
    const { value, error } = loginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        error: error.message 
      });
    }

    const { username, password } = value;

    // Cari user berdasarkan username
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid username or password" 
      });
    }

    // Buat payload untuk JWT
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role, // Tambahkan role ke payload
    };

    // Generate JWT
    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET || "YOUR_SECRET_KEY", 
      { expiresIn: "1d" } // Token berlaku selama 1 hari
    );

    // Simpan history login
    await prisma.userHistory.create({ 
      data: { 
        userId: user.id, 
        action: "LOGIN" 
      } 
    });

    // Kirim respons sukses
    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      token,
      role: user.role, // Kirim role agar bisa digunakan oleh frontend
    });
  } catch (error) {
    // Tangani error tak terduga
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

const authenticate = async (req, res) => {
  return res.status(200).json({
    status: true,
    message: "OK",
    err: null,
    data: { user: req.user },
  });
};

module.exports = {
  register,
  login,
  authenticate,
};
