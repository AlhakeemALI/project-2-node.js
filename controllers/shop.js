const express = require("express");
const router = express.Router();
const StoreItem = require("../models/products");
const User = require("../models/user");
const Review = require("../models/reviews");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

let cartArray = [];

router.get("/", async (req, res, next) => {
  const products = await StoreItem.find({});
  //crossOriginIsolated.log(products);
  res.render("shop/productList.ejs", { products });
});

router.get("/home", async (req, res, next) => {
  const products = await StoreItem.find({});
  res.render("shop/home.ejs", { products });
});

router.get(
  "/product/:id",

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

//router.get(
//"/cart",
//catchAsync(async (req, res) => {
// res.render("shop/cart", { cartArray });
// })
//);

router.post(
  "user/:userId/:productId",
  catchAsync(async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.params.userId;
    //console.log(id);
    const findProducts = await StoreItem.findById(productId);
    //console.log(findProducts);
    const finduser = await User.findById(userId);

    //console.log(finduser).push(cartProducts);
    finduser.cart.push(findProducts);
    //console.log(cartProducts);
    //const cartArray = []
    await findProducts.save();
    await finduser.save();
    console.log(finduser);
    res.redirect("/home");
  })
);

router.get("/cart", async (req, res) => {
  res.render("cart", { cartArray });
});

router.get("/orders", async (req, res) => {
  res.render("orders", { cartArray });
});

module.exports = router;
