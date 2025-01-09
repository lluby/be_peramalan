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

    const { username, password, email, role } = value;

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

    // Cek apakah email sudah ada
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    };

    // Enkripsi password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan pengguna baru ke database
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role,
      },
    });

    res.status(201).json({ message: "Pendaftaran berhasil", user: newUser });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal server error", err: error.messge });
  }
};

const login = async (req, res) => {
  try {
    const { value, error } = loginValidation.validate(req.body);
    const { username, password } = value;

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: error.message,
        data: null,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong id or Password",
        data: null,
      });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "YOUR_SECRET_KEY",
      {
        expiresIn: "1d",
      }
    );

    // history login
    await prisma.userHistory.create({
      data: {
        userId: user.id,
        action: "LOGIN",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Login success",
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", err: error.messge });
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
