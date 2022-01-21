const mongoose = require("mongoose");
let mongoURI = "mongodb://localhost:27017/store";

mongoURIl =
  process.env.NODE_ENV === "production" ? process.env.DB_URL : mongoURI;

mongoose
  .connect(mongoURIl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then((instance) => {
    console.log(`Connected to the db: ${instance.connections[0].name}`);
  })
  .catch((err) => console.log(`Connection failed`, err));

module.exports = mongoose;
