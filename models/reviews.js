const mongoose = require("mongoose");
const { Schema } = mongoose;
//const User = require("./user.js");

const reviewSchema = new Schema({
  body: String,
  reating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
// "61e4c1c16d16201d270afb09"
