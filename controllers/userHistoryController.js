const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createHistory(userId, title, description) {
  await prisma.history.create({
    data: {
      title: title,
      description: description,
      userId: userId
    }
  });
}

async function recordLogin(req, res) {
  const { username } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username: username } });
    if (user) {
      const title = "User logged in";
      const description = `User dengan username ${username} telah login pada tanggal ${new Date().toLocaleString()}`;
      await createHistory(user.id, title, description);
      res.status(200).json({ message: 'Login berhasil dan history tercatat' });
    } else {
      res.status(404).json({ message: 'User tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function recordManageInventory(req, res) {
  const { username, action } = req.body; 
  try {
    const user = await prisma.user.findUnique({ where: { username: username } });
    if (user) {
      const title = `User ${action} ingredient`;
      const description = `User dengan username ${username} telah melakukan tindakan ${action} bahan baku pada tanggal ${new Date().toLocaleString()}`;
      await createHistory(user.id, title, description);
      res.status(200).json({ message: `Tindakan ${action} bahan baku tercatat` });
    } else {
      res.status(404).json({ message: 'User tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { recordLogin, recordManageInventory };
