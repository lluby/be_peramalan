const validateBahanBaku = (data) => {
    const errors = [];
    if (!data.name) errors.push("Name wajib diisi");
    if (typeof data.quantity !== "number") errors.push("Quantity harus berupa angka");
    if (typeof data.alpha !== "number" || data.alpha < 0 || data.alpha > 1) {
      errors.push("Alpha harus berupa angka antara 0 dan 1");
    }
    if (!data.month) errors.push("Month wajib diisi");
  
    return errors.length > 0 ? { error: errors } : null;
  };
  
  module.exports = { validateBahanBaku };
  