const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const authenticateToken = require("../middlewares/auth.js");

// POST /products
router.post("/", authenticateToken, productController.addProduct);

// PUT /products/:id/quantity
router.put(
  "/:product_id/quantity",
  authenticateToken,
  productController.updateQuantity
);

// GET /products
router.get("/", authenticateToken, productController.getProducts);

module.exports = router;
