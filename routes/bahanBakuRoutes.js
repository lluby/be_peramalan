const express = require("express");
const {
  createBahanBaku,
  getAllBahanBaku,
  getBahanBakuById,
  updateBahanBaku,
  deleteBahanBaku,
} = require("../controllers/bahanBakuController");
const verifyToken = require("../libs/verifyToken");
const { validateBahanBaku } = require("../validation/bahanBakuValidation");
const verifyAdmin = require("../libs/verifyAdmin");

const router = express.Router();

const validateMiddleware = (req, res, next) => {
  const validationError = validateBahanBaku(req.body);
  if (validationError) {
    return res.status(400).json(validationError);
  }
  next();
};

// Routes CRUD
router.post("/bahan-baku", verifyToken, verifyAdmin, validateMiddleware, createBahanBaku);
router.get("/bahan-baku", getAllBahanBaku);
router.get("/bahan-baku/:id", getBahanBakuById);
router.put("/bahan-baku/:id", verifyToken, verifyAdmin, validateMiddleware, updateBahanBaku);
router.delete("/bahan-baku/:id", verifyToken, verifyAdmin, deleteBahanBaku);

module.exports = router;
