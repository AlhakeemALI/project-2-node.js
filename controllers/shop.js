const express = require("express");
const router = express.Router();
const StoreItem = require("../models/products");
const User = require("../models/user");
const Review = require("../models/reviews");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const res = require("express/lib/response");
//const isLoggedIn = require("../middleware/index.js");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};

router.get("/", async (req, res) => {
  const products = await StoreItem.find({});
  //crossOriginIsolated.log(products);
  res.render("shop/productList.ejs", { products });
});

router.get("/home", isLoggedIn, async (req, res) => {
  const { userId } = req.user._id;
  const findUser = await User.findById(userId);
  const products = await StoreItem.find({});
  res.render("shop/home.ejs", { products, findUser });
});

router.get(
  "/product/:id",
  isLoggedIn,

  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await StoreItem.findById(id).populate("reviews");
    console.log(product);
    if (!product) {
      req.flash("error", "Cannot find product!");
      return res.redirect("/home");
    }
    res.render("shop/productDetail.ejs", { product });
  })
);

router.post(
  "user/:userId/:productId",
  catchAsync(async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.params.userId;
    const findProducts = await StoreItem.findById(productId);
    const finduser = await User.findById(userId);
    finduser.cart.push(findProducts);
    await findProducts.save();
    await finduser.save();
    console.log(finduser);
    res.redirect("/home");
  })
);

router.post(
  "/user/:userId/product/:productId",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user._id;
    const findProduct = await StoreItem.findById(productId);
    const findUser = await User.findById(userId);
    findUser.cart.push(findProduct);
    await findProduct.save();
    await findUser.save();
    console.log(findUser);
    req.flash("success", "Successfuly added to cart!");
    res.redirect("/home");
  })
);

router.get("/cart", isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const findUser = await User.findById(userId).populate("cart");
  //console.log(findUser.cart[0].title);
  //await findUser.save();
  res.render("shop/cart", { findUser });
});

router.delete(
  "/user/:userId/product/:productId",
  catchAsync(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;
    const finduser = await User.findByIdAndUpdate(userId, {
      $pull: { cart: productId },
    });
    req.flash("success", "Successfuly removed product !");
    res.redirect("/cart");
  })
);

router.get("/checkout/:userId", async (req, res) => {
  const userId = req.user._id;
  const findUser = await User.findById(userId).populate("cart");
  const randomNumber = Math.floor(Math.random() * 100000000) + 1;
  console.log(findUser.cart.price);
  console.log(randomNumber);
  res.render("shop/checkout", { findUser, randomNumber });
});

module.exports = router;
