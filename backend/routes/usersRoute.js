const express = require("express");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const UserModel = require("../models/UserModel");
const passport = require("passport");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isadmin");
const adminFindById = require("./adminControllers/findUserById");
const adminDelete = require("./adminControllers/deleteUser");
const adminUpdate = require("./adminControllers/adminUpdate");
const router = express.Router();

router.route("/login").post((req, res, next) => {
  const { username, password } = req.body;
  const user = new UserModel({
    username,
    password,
  });
  req.login(user, (err) => {
    if (err) {
      res.status(404);
      const error = new Error(err);
      next(error);
    } else {
      passport.authenticate("local", {
        failureRedirect: "/unauthorized",
        failureMessage: true,
      })(req, res, async () => {
        res.status(200).json({
          id: req.user.id,
          username: req.user.username,
          name: req.user.name,
          isAdmin: req.user.isAdmin,
        });
      });
    }
  });
});

router.route("/register").post(
  asyncErrorHandler(async (req, res, next) => {
    const { username, name, password } = req.body;
    UserModel.register({ username, name }, password, (err, user) => {
      if (err) {
        res.status(404);
        const error = new Error(err);
        next(error);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.status(200).json(user);
        });
      }
    });
  })
);

router.route("/autoLogin").get(isLoggedIn, (req, res) => {
  res.status(200).json("welcome");
});
router.route("/logout").get(isLoggedIn, (req, res) => {
  req.logout(() => res.status(200).json("logged out"));
});

////////////////////////////////get profile && update profile----------------
router
  .route("/profile")
  .get(
    isLoggedIn,
    asyncErrorHandler(async (req, res) => {
      const profile = await UserModel.findByUsername(req.user.username);
      if (profile) {
        res.status(200).json(profile);
      } else {
        throw new Error("profile not found");
      }
    })
  )
  .put(
    isLoggedIn,
    asyncErrorHandler(async (req, res, next) => {
      const user = await UserModel.findByUsername(req.user.username);
      // changeing the name and username and savig it

      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;

      // changing the password.....................

      await user.save();
      if (req.body.password) {
        user.changePassword(
          req.body.oldPassword,
          req.body.password,
          async (err, doc) => {
            if (err) {
              const error = new Error(err);
              return next(error);
            } else {
              return res.status(200).json(user);
            }
          }
        );
      } else {
        return res.status(200).json(user);
      }
    })
  );

// Admin routes////////////////////////////////-------
router.route("/").get(
  isAdmin,
  asyncErrorHandler(async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
  })
);
router
  .route("/:id")
  .get(isAdmin, adminFindById)
  .delete(isAdmin, adminDelete)
  .put(isAdmin, adminUpdate);
module.exports = router;
