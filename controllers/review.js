const express = require("express");
const { append } = require("express/lib/response");
const Joi = require("joi");
const router = express.Router();
const StoreItem = require("../models/products");
const Review = require("../models/reviews");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
//const Joi = require("joi");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};

router.post(
  "/product/:id/review",
  catchAsync(async (req, res) => {
    //const { id } = req.params;
    const itemToWritReview = await StoreItem.findById(req.params.id);

    const review = new Review(req.body);
    review.author = req.user._id;
    console.log(req.body);
    itemToWritReview.reviews.push(review);
    await itemToWritReview.save();
    await review.save();
    console.log(itemToWritReview.reviews);
    req.flash("success", "Successfuly created  new review!");
    res.redirect(`/product/${itemToWritReview._id}`);
  })
);

router.delete(
  "/product/:id/review/:revId",
  catchAsync(async (req, res) => {
    const { id, revId } = req.params;
    const findProduct = await StoreItem.findByIdAndUpdate(id, {
      $pull: { reviews: revId },
    });
    const findReview = await Review.findByIdAndDelete(revId);
    req.flash("success", "Successfuly deleted review!");
    res.redirect(`/product/${id}`);
  })
);

module.exports = router;
