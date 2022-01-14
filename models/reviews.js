const mongoose = require("mongoose");
//const mongoose = require("../db/coonection");
const { Schema } = mongoose;

const reviewScema = new Schema({
  body: String,
  reating: Number,
});

const Review = mongoose.model("Review", reviewScema);

module.exports = Review;
