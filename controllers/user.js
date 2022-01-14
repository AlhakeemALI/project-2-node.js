const express = require("express");
const router = express.Router();
const passport = require("passport");
const StoreItem = require("../models/products");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
//const Joi = require("joi");

router.get("/register", (req, res) => {
  res.render("user/form");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to Online Shop!");
      res.redirect("/home");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);
router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log(req.body);
    req.flash("success", "welcome back");
    res.redirect("/home");
  }
);

//router.get("/fake", async (req, res) => {
// const user = new User({ email: "aaa@123.com", username: "adam" });
//const registeredUser = await User.register(user, "123");
////res.send(registeredUser);
//});

module.exports = router;
