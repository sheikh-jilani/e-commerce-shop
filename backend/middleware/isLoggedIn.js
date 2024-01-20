module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.isAuthenticated();
    next();
  } else {
    console.log(req.isAuthenticated());
    const err = new Error("u are not authenticated for this route");
    next(err);
  }
};
