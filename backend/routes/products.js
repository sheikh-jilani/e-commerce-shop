const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ProductModel = require("../models/ProductModel");
const isAdmin = require("../middleware/isadmin");
const adminDelete = require("./adminControllers/adminDeleteProduct");
const createProductController = require("./adminControllers/createProduct");
const updateProductController = require("./adminControllers/updateProduct");

router.route("/products/all").get(
  asyncErrorHandler(async (req, res) => {
    const product = await ProductModel.find();
    res.status(200).json(product);
  })
);

router.route("/products").get(
  asyncErrorHandler(async (req, res) => {
    var { pageNum, keyword } = req.query; //getting the pageNum[1,2,3,] & search keywords
    keyword = keyword ? { name: { $regex: keyword, $options: "i" } } : {}; //regular exp ,option "i"case insensetive
    const page = Number(pageNum) || 1;
    const pageSize = process.env.PAGE_SIZE; //data per page
    const count = await ProductModel.countDocuments(keyword); //count of docs with this key
    const products = await ProductModel.find(keyword)
      .sort({ _id: -1 })
      .limit(pageSize) //finds with key ,skips last page products,limit of adat per page,sort them reverse to get new ones at first
      .skip(pageSize * (page - 1));

    // res ponce with these data
    res.json({ products, page, pageCount: Math.ceil(count / pageSize) });
  })
);

router
  .route("/product/:id")
  .get(
    asyncErrorHandler(async (req, res) => {
      const product = await ProductModel.findById(req.params.id);
      if (product) {
        return res.json(product);
      } else {
        res.status(404);
        throw new Error("Resource not founde");
      }
    })
  )
  .delete(isAdmin, adminDelete);
router.route("/product/create").post(isAdmin, createProductController);
router.route("/product/update/:id").post(isAdmin, updateProductController);

//? Reviews Routes---------------------------------__________////
router.route("/product/review/:id").post(
  asyncErrorHandler(async (req, res) => {
    const { id: productId } = req.params;
    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Product doesn't exsists");
    // product.rating = Number(req.body.rating);
    product.review.unshift({ ...req.body, userId: req.user._id });
    await product.save();
    res.status(200).json("review submitted");
  })
);
module.exports = router;
