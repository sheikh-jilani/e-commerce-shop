module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
  } else {
    const err = new Error("only admin is authenticated for this route");
    next(err);
  }
};
