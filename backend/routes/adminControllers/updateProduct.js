const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const ProductModel = require("../../models/ProductModel");

module.exports = asyncErrorHandler(async (req, res) => {
  const product = await ProductModel.findByIdAndUpdate(
    { _id: req.params.id },
    { ...req.body, userId: req.user._id }
  );
  if (!product) {
    res.status(500);
    throw new Error("resource not found");
  } else {
    res.status(200).json(product._id);
  }
});
