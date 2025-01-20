const prisma = require("../libs/prisma");

const singleExponentialSmoothing = (data, alpha) => {
  let smoothedData = [data[0]];
  for (let i = 1; i < data.length; i++) {
    const smoothedValue = alpha * data[i - 1] + (1 - alpha) * smoothedData[i - 1];
    smoothedData.push(smoothedValue);
  }
  return smoothedData;
};

const getForecast = async (req, res) => {
  try {
    // Ambil data dari database
    const bahanBakuData = await prisma.bahanBaku.findMany({
      select: {
        quantity: true,
        alpha: true,
        month: true,  // Ambil bulan sebagai String
      }
    });

    console.log('Bahan Baku Data:', bahanBakuData);
  
    if (bahanBakuData.length === 0) {
      return res.status(404).json({ error: 'Data bahan baku tidak ditemukan' });
    }

    // Ambil quantity dan bulan
    const quantities = bahanBakuData.map(item => item.quantity);
    const alpha = 0.8;  // Gunakan alpha 0.8 sesuai dengan yang diinginkan
    const bulan = bahanBakuData.map(item => item.month);

    // Gunakan fungsi Single Exponential Smoothing
    const forecast = singleExponentialSmoothing(quantities, alpha);

    return res.status(200).json({
      forecast,
      bulan,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan dalam mendapatkan data peramalan' });
  }
};

module.exports = {
  getForecast,
};
