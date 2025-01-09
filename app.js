const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const port = 3000;


const prisma = new PrismaClient();

const bahanBakuRoutes = require('./routes/bahanBakuRoutes'); 
const forecastRoutes = require('./routes/forecastRoutes'); 
const userRoutes = require('./routes/userRoutes');
const userHistoryContoller = require('./routes/userHistoryRoutes');

app.use(cors()); 
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('dev'));

app.post('/api/auth/register', async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    // Cek apakah username sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah terdaftar' });
    }

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

    res.status(201).json({ message: 'Pendaftaran berhasil', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});


app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = 'some-token';
    const role = user.role;

    res.json({ token, role });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/login-history', async (req, res) => {
  try {
    const histories = await prisma.userHistory.findMany({
      orderBy: { timestamp: 'desc' }, // Mengurutkan berdasarkan timestamp
    });
    res.status(200).json(histories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.use('/api', bahanBakuRoutes); 
app.use('/api', forecastRoutes); 
app.use('/api', userHistoryContoller);
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
