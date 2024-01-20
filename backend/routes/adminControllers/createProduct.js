const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const ProductModel = require("../../models/ProductModel");

module.exports = asyncErrorHandler(async (req, res) => {
  const product = new ProductModel({
    userId: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    proce: 0,
    description: "sample description",
    name: "sample name",
  });
  const data = await product.save();
  res.status(200).json(data._id);
});
