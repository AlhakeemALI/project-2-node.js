const express = require("express");
const router = express.Router();
const StoreItem = require("../models/products");

let cartArray = [];

router.get("/", async (req, res) => {
  const products = await StoreItem.find({});
  res.render("productList.ejs", { products });
});

router.get("/home", async (req, res) => {
  const products = await StoreItem.find({});
  res.render("home.ejs", { products });
});

router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await StoreItem.findById(id);
  console.log(product);
  res.render("productDetail.ejs", { product });
});

router.get("/cart", async (req, res) => {
  res.render("cart", { cartArray });
});

router.post("/:id/add-to-cart", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const cartProducts = await StoreItem.findById(id);
  cartArray.push(cartProducts);
  console.log(cartProducts);
  //const cartArray = []
  res.redirect("/home");
});

router.get("/cart", async (req, res) => {
  res.render("cart", { cartArray });
});

router.get("/orders", async (req, res) => {
  res.render("orders", { cartArray });
});

/*
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  return await cartArray.findByIdAndDelete(id);
  res.redirect("/cart");
});
*/

module.exports = router;

/*
const express = require("express");
const router = express.Router();
const StoreItem = require("../models/products");
const User = require("../models/user");

let cartArray = [];

router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await StoreItem.findById(id);
  console.log(product);
  res.render("product-detail.ejs", { product });
});

router.get("/", async (req, res) => {
  const products = await StoreItem.find({});
  res.render("product-list.ejs", { products });
});

router.get("/product", async (req, res) => {
  const products = await StoreItem.find({});
  res.render("index.ejs", { products });
});

router.get("/cart", async (req, res) => {
  res.render("cart", { cartArray });
});

router.post("/:id/add-to-cart", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const cartProducts = await StoreItem.findById(id);
  cartArray.push(cartProducts);
  console.log(cartProducts);
  //const cartArray = []
  res.redirect("/");
});


router.post("/:id/add-to-cart", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const cartProducts = await StoreItem.findById(id);
  cartArray.push(cartProducts);
  console.log(cartProducts);
  //const cartArray = []
  res.redirect("/");
});

router.get("/cart", async (req, res) => {
  res.render("cart", { cartArray });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  return await cartArray.findByIdAndDelete(id);
  res.redirect("/cart");
});

router.get("/orders", async (req, res) => {
  res.render("orders", { cartArray });
});

router.get("/checkout", async (req, res) => {
  res.render("checkout", );
});



module.exports = router;


*/
