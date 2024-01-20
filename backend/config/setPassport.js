const passport = require("passport");
const UserModel = require("../models/UserModel");

passport.use(UserModel.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
