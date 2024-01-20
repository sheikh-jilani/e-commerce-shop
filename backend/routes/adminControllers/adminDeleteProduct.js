const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const ProductModel = require("../../models/ProductModel");

module.exports = asyncErrorHandler(async (req, res) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  if (product) return res.status(200).json(product);
  throw new Error("product was not fount");
});
