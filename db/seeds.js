const mongoose = require("./connection");
const StoreItem = require("../models/products");
const storItemsData = require("./seeds.json");

StoreItem.deleteMany({})
  .then(() => {
    return StoreItem.insertMany(storItemsData);
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  .finally(() => {
    process.exit();
  });
