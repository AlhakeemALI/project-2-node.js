const express = require("express");
const router = express.Router();
const StoreItem = require("../models/products");

// TO add product page ... 1

router.get("/add-product", async (req, res) => {
  res.render("adminForm.ejs");
});

// TO add product page...2
router.post("/add-product", async (req, res) => {
  console.log(req.body);
  const newProduct = new StoreItem(req.body);
  await newProduct.save();
  res.redirect("/");
});

// Admin page products
router.get("/editProduct", async (req, res) => {
  const products = await StoreItem.find({});
  //console.log(products);
  res.render("adminHomepage.ejs", { products });
});

// To edit admin product page

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const itemToUpdate = await StoreItem.findById(id);
  res.render("adminEditProduts.ejs", { itemToUpdate });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatePoducts = await StoreItem.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect("/admin/editProduct");
});

// To delete products
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProducts = await StoreItem.findByIdAndDelete(id);
  console.log(id);
  res.redirect("/admin/editProduct");
});

module.exports = router;
