const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE: Menambahkan bahan baku baru
const createBahanBaku = async (req, res) => {
  const { name, quantity, alpha, month } = req.body;

  try {
    const bahanBaku = await prisma.bahanBaku.create({
      data: {
        name,
        quantity,
        alpha,
        month,
      },
    });
    return res.status(201).json(bahanBaku);
  } catch (error) {
    console.error("Error creating bahan baku:", error);
    return res.status(500).json({ error: "Gagal menambahkan bahan baku" });
  }
};

// READ: Mendapatkan semua bahan baku
const getAllBahanBaku = async (req, res) => {
  try {
    const bahanBaku = await prisma.bahanBaku.findMany();
    return res.status(200).json(bahanBaku);
  } catch (error) {
    console.error("Error fetching bahan baku:", error);
    return res.status(500).json({ error: "Gagal mendapatkan data bahan baku" });
  }
};

// READ: Mendapatkan bahan baku berdasarkan ID
const getBahanBakuById = async (req, res) => {
  const { id } = req.params;

  try {
    const bahanBaku = await prisma.bahanBaku.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!bahanBaku) {
      return res.status(404).json({ error: "Bahan baku tidak ditemukan" });
    }
    return res.status(200).json(bahanBaku);
  } catch (error) {
    console.error("Error fetching bahan baku by ID:", error);
    return res.status(500).json({ error: "Gagal mendapatkan data bahan baku" });
  }
};

// UPDATE: Memperbarui bahan baku
const updateBahanBaku = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, alpha, month } = req.body;
  
    console.log("Data yang diterima:", req.body);

    if (isNaN(quantity) || isNaN(alpha)) {
      return res.status(400).json({ error: "Jumlah dan Nilai Alpha harus berupa angka" });
    }

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "ID tidak valid" });
    }
  
    try {
      const bahanBaku = await prisma.bahanBaku.findUnique({
        where: { id: parsedId },
      });
  
      if (!bahanBaku) {
        return res.status(404).json({ error: "Bahan baku tidak ditemukan" });
      }
  
      // Update data bahan baku
      const updatedBahanBaku = await prisma.bahanBaku.update({
        where: { id: parsedId },
        data: { name, quantity, alpha, month },
      });
  
      return res.status(200).json(updatedBahanBaku);
    } catch (error) {
      console.error("Error updating bahan baku:", error);
      return res.status(500).json({ error: "Gagal memperbarui data bahan baku" });
    }
  };
  
// DELETE: Menghapus bahan baku
const deleteBahanBaku = async (req, res) => {
  const { id } = req.params;

  try {
    // Validasi ID sebagai angka
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "ID tidak valid" });
    }

    // Periksa apakah bahan baku dengan ID tersebut ada
    const bahanBaku = await prisma.bahanBaku.findUnique({
      where: { id: parsedId },
    });

    if (!bahanBaku) {
      return res.status(404).json({ error: "Bahan baku tidak ditemukan" });
    }

    // Hapus bahan baku
    await prisma.bahanBaku.delete({
      where: { id: parsedId },
    });

    // Kirimkan respons sukses
    return res.status(200).json({ message: "Bahan baku berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting bahan baku:", error); // Logging lebih informatif
    return res
      .status(500)
      .json({ error: "Gagal menghapus data bahan baku", details: error.message });
  }
};


module.exports = {
  createBahanBaku,
  getAllBahanBaku,
  getBahanBakuById,
  updateBahanBaku,
  deleteBahanBaku,
};
