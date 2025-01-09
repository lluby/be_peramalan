function formatDate(dateString) {
  const date = new Date(dateString);

  // Array untuk nama bulan
  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Ambil tanggal, bulan, tahun, jam, menit, dan detik
  const tanggal = date.getDate();
  const bulan = namaBulan[date.getMonth()]; // Ambil nama bulan dari array
  const tahun = date.getFullYear();
  const jam = date.getHours().toString().padStart(2, "0");
  const menit = date.getMinutes().toString().padStart(2, "0");
//   const detik = date.getSeconds().toString().padStart(2, "0");

  // Gabungkan dalam format "Tanggal Bulan Tahun Jam:Menit:Detik"
  return `${jam}:${menit} ${tanggal} ${bulan} ${tahun}`;
}

module.exports = formatDate;