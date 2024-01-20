const asyncErrorHandler = require("../../middleware/asyncErrorHandler");
const UserModel = require("../../models/UserModel");
module.exports = asyncErrorHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    throw new Error("user not found");
  } else {
    if (req.body.name) user.name = req.body.name;
    if (req.body.username) user.username = req.body.username;
    user.isAdmin = req.body.isAdmin;
    await user.save();

    return res.status(200).json(user);
  }
});
