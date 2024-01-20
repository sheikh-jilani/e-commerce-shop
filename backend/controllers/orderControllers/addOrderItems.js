const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const OrderModel = require("../../models/OrderModel");

module.exports = asyncErrorHandler(async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    price,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (cartItems && cartItems.length === 0) {
    res.status(400);
    throw new Error("no order items");
  } else {
    const order = new OrderModel({
      cartItems: cartItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      shippingAddress,
      userId: req.user._id,
      paymentMethod,
      price,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrders = await order.save();
    res.status(200).json(createdOrders);
  }
});
