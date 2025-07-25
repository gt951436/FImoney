require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/user.js");
const Product = require("./src/models/product");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Connected to DB. Collections will be auto-created by Mongoose."
    );
    process.exit(0);
  } catch (err) {
    console.error("DB Init Error:", err);
    process.exit(1);
  }
})();
