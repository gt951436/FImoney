const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;
async function DBconnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("db failed connection : ", error);
    process.exit(1);
  }
}
module.exports = DBconnection;
