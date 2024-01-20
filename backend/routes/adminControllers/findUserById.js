const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const UserModel = require("../../models/UserModel");

module.exports = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("user not found");
  } else {
    res.status(200).json(user);
  }
});
