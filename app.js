const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const port = 3000;


const prisma = new PrismaClient();

const bahanBakuRoutes = require('./routes/bahanBakuRoutes'); 
const forecastRoutes = require('./routes/forecastRoutes'); 

app.use(cors()); 
app.use(express.json());

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

app.use('/api', bahanBakuRoutes); 
app.use('/api', forecastRoutes); 

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
