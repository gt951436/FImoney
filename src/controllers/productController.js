const Product = require("../models/product.js");

// add product
exports.addProduct = async (req, res) => {
  const { name, type, sku, image_url, description, quantity, price } = req.body;

  try {
    const newProduct = new Product({
      name,
      type,
      sku,
      image_url,
      description,
      quantity,
      price,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("error adding product:", err);
    res.status(500).json({ message: "server error" });
  }
};

// update quantity of product
exports.updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.quantity = quantity;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error("update quantity error:", err);
    res.status(500).json({ message: "server error" });
  }
};


