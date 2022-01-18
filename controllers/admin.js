const express = require("express");
const router = express.Router();
const StoreItem = require("../models/products");
const User = require("../models/user");
const Review = require("../models/reviews");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Joi = require("joi");

const validate = (req, res, next) => {
  const joiSchema = Joi.object({
    title: Joi.string().required(),
    imageUrl: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    qty: Joi.number().required().min(0),
  }).required();

  const { error } = joiSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// TO add product page ... 1

router.get("/add-product", async (req, res) => {
  res.render("admin/adminForm.ejs");
});

// TO add product page...2
router.post(
  "/add-product",
  validate,
  catchAsync(async (req, res, next) => {
    //if (!req.body.StoreItem) throw new ExpressError("Invalid Data", 400);

    const newProduct = new StoreItem(req.body);
    await newProduct.save();
    req.flash("success", "Successfuly made a new Product!");
    console.log(newProduct);
    res.redirect("/admin/editproduct");

    //console.log(req.body);
  })
);

// Admin page products
router.get(
  "/editProduct",
  catchAsync(async (req, res, next) => {
    const products = await StoreItem.find({});
    res.render("admin/adminHomepage.ejs", { products });
  })
);

// To edit admin product page

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const itemToUpdate = await StoreItem.findById(id);
    res.render("admin/adminEditProduts.ejs", { itemToUpdate });
  })
);

router.put(
  "/:id",
  validate,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatePoducts = await StoreItem.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    req.flash("success", "Successfuly Updated!");
    res.redirect("/admin/editProduct");
  })
);

// To delete products
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProducts = await StoreItem.findByIdAndDelete(id);
  //console.log(id);
  req.flash("success", "Successfuly Deleted!");
  res.redirect("/admin/editProduct");
});

module.exports = router;
