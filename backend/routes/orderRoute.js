const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isadmin");
const isLoggedIn = require("../middleware/isLoggedIn");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const OrderModel = require("../models/OrderModel");

router
  .route("/")
  .get(
    isAdmin,
    asyncErrorHandler(async (req, res) => {
      const orders = await OrderModel.find().populate(
        "userId",
        "name username"
      );
      res.status(200).json(orders);
    })
  )
  .post(
    isLoggedIn, //must be logged in
    asyncErrorHandler(async (req, res) => {
      const {
        cartItems,
        shippingAddress,
        paymentMethod,
        price: itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      } = req.body; //destructuring body

      if (cartItems && cartItems.length === 0) {
        res.status(404);
        throw new Error("no order items"); //if cart is empty
      } else {
        const order = new OrderModel({
          //creating order
          userId: req.user._id,
          cartItems: cartItems.map((x) => ({
            ...x,
            product_id: x._id, //the id of cartItems is the
            //  product collection id
            _id: undefined, //removing the cartItem _id
          })),
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        });
        const data = await order.save();
        res.status(200).json(data);
      }
    })
  );

router.route("/myOrders").get(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    const orders = await OrderModel.find({ userId: req.user._id });
    res.status(200).json(orders);
  })
);
router.route("/:id").get(
  //user getting orders by id
  isLoggedIn, //must be logged in
  asyncErrorHandler(async (req, res) => {
    const data = await OrderModel.findById(req.params.id).populate(
      "userId", //populating user fields
      "name username -_id"
    );
    res.status(200).json(data);
  })
);
router.route("/:id/pay").get(
  isLoggedIn,
  asyncErrorHandler(async (req, res) => {
    console.log("user  does the payment");
  })
);
router.route("/:id/deliver").post(
  isAdmin,
  asyncErrorHandler(async (req, res) => {
    const data = await OrderModel.findOneAndUpdate(
      { _id: req.params.id },
      { isDelivered: true, deliveredAt: Date.now() }
    );
    res.status(200).json("markered as delivery");
  })
);

module.exports = router;
