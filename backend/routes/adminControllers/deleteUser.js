const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const UserModel = require("../../models/UserModel");

module.exports = asyncErrorHandler(async (req, res) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);

  if (user) return res.status(200).json(`user deleted ${user._id}`);
  throw new Error("user not found");
});
