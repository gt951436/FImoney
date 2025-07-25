const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const productSchema = new mongoose.Schema({
product_id: {
    type: String,
    default: uuidv4,  // Automatically generates a UUID
    unique: true
  },
  name: { type: String, required: true },
  type: { type: String, required: true },
  sku: { type: String, required: true },
  image_url: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
