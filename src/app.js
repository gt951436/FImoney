const express = require("express");
const connectDB = require("./config/db.js");

const userRoutes = require("./routes/users.js");
const productRoutes = require("./routes/product.js");

const app = express();
connectDB();
app.use(express.json());

app.use("/", userRoutes);
app.use("/products", productRoutes);

module.exports = app;
