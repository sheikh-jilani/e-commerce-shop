const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGOOSE_URL);
    console.log(`MongoDB connected at :${conn.connection.host}`);
  } catch (error) {
    console.log(`Error:${error}`);
    process.exit(1);
  }
};
module.exports = connectDB;
