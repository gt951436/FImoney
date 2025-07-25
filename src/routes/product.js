const express = require("express");
const router = express("router");
const productController = require("../controllers/productController.js");
const authenticateToken = require("../middlewares/auth.js");

// POST /products
router.post("/", authenticateToken, productController.addProduct);

// PUT /products/:id/quantity
router.put(
  "/:id/quantity",
  authenticateToken,
  productController.updateQuantity
);

// GET /products
router.get("/", authenticateToken, productController.getProducts);

module.exports = router;
