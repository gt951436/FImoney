require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("../config/db.js");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("API Running"));

// Register routes (users, products) below

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
