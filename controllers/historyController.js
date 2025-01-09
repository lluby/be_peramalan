const prisma = require("../libs/prisma");
const formatDate = require("../libs/date");

// Fungsi untuk menambahkan deskripsi aksi
function tambahDeskripsiAksi(data) {
    let deskripsi = "";
  
    switch (data.action) {
      case "LOGIN":
        deskripsi = `Pengguna ${data.user.username} berhasil login ke sistem pada tanggal ${data.createdAt}.`;
        break;
      case "DELETE":
        deskripsi = `Pengguna ${data.user.username} melakukan operasi menghapus (DELETE) pada tanggal ${data.createdAt}.`;
        break;
      case "UPDATE":
        deskripsi = `Pengguna ${data.user.username} memperbarui data (UPDATE) pada tanggal ${data.createdAt}.`;
        break;
      case "CREATE":
        deskripsi = `Pengguna ${data.user.username} membuat data baru (CREATE) pada tanggal ${data.createdAt}.`;
        break;
      default:
        deskripsi = `Aksi ${data.action} tidak dikenali.`;
    }
  
    // Tambahkan deskripsi ke dalam data
    data.deskripsi = deskripsi;
    return data;
  }

// get all
const getAllHistory = async (req, res) => {
  try {
    let history = await prisma.userHistory.findMany({
      orderBy: { createdAt: "desc" }, // Mengurutkan berdasarkan timestamp
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // Format tanggal
    history.forEach((item) => {
      item.createdAt = formatDate(item.createdAt);
    });

    // Tambahkan deskripsi aksi
    history.map((data) => tambahDeskripsiAksi(data));

    return res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({ error: "Gagal mendapatkan data history" });
  }
};

const getMyHistory = async (req, res) => {
  const { id } = req.user;

  try {
    let history = await prisma.userHistory.findMany({
        where: {
            userId: id,
        },
        include: {
            user: {
                select: {
                    username: true,
                },
            },
        },
        orderBy: { createdAt: "desc" }, // Mengurutkan berdasarkan timestamp
    });

    // Format tanggal
    history.forEach((item) => {
      item.createdAt = formatDate(item.createdAt);
    });

    // Tambahkan deskripsi aksi
    history.map((data) => tambahDeskripsiAksi(data));

    return res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({ error: "Gagal mendapatkan data history" });
  }
};

module.exports = { getAllHistory, getMyHistory };
