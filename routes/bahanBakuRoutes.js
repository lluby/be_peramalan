const express = require("express");
const {
  createBahanBaku,
  getAllBahanBaku,
  getBahanBakuById,
  updateBahanBaku,
  deleteBahanBaku,
} = require("../controllers/bahanBakuController");

const { validateBahanBaku } = require("../validation/bahanBakuValidation");

const router = express.Router();

const validateMiddleware = (req, res, next) => {
  const validationError = validateBahanBaku(req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }
  next();
};

// Routes CRUD
router.post("/bahan-baku", validateMiddleware, createBahanBaku);
router.get("/bahan-baku", getAllBahanBaku);
router.get("/bahan-baku/:id", getBahanBakuById);
router.put("/bahan-baku/:id", validateMiddleware, updateBahanBaku);
router.delete("/bahan-baku/:id", deleteBahanBaku);

module.exports = router;
