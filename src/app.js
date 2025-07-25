const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");

const userRoutes = require("./routes/users.js");
const productRoutes = require("./routes/product.js");

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/products", productRoutes);

module.exports = app;
