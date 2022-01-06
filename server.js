const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const engine = require("ejs-mate");

const adminControllers = require("./controllers/admin");
const shopControllers = require("./controllers/shop");
//const eerorControllers = require("./controllers/erroe");
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//app.use(express.static(path.join(__dirname, "views")));
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

//app.use(eerorControllers.get404);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/admin", adminControllers);
app.use(shopControllers);

const routeHit = (req, res, next) => {
  console.log("A new route was just hit");
  next();
};
app.use(routeHit);

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
