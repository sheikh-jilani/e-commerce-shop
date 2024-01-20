const products = require("./data/products");
const mongoose = require("mongoose");
const users = require("./data/users");
const UserModel = require("./models/UserModel");
const ProductModel = require("./models/ProductModel");
const OrderModel = require("./models/OrderModel");
const connectDB = require("./config/db");
connectDB();
const insertData = async () => {
  try {
    await UserModel.deleteMany();
    await ProductModel.deleteMany();
    await OrderModel.deleteMany();

    const insertedUsers = await UserModel.insertMany(users);

    const adminId = insertedUsers[0].id;
    const insertedProducts = products.map((product) => {
      return {
        ...product,
        userId: adminId,
      };
    });
    await ProductModel.insertMany(insertedProducts);
    console.log("data inserted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await UserModel.deleteMany();
    await ProductModel.deleteMany();
    await OrderModel.deleteMany();
    console.log("data deleted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  insertData();
}
