const mongoose = require("../db/coonection");
const storeItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 0,
  },
});

const StoreItem = mongoose.model("StoreItem", storeItemSchema);

module.exports = StoreItem;
