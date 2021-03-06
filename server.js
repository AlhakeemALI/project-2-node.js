const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const joi = require("joi");
require("dotenv").config();
////////////////////////
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");
const adminControllers = require("./controllers/admin");
const shopControllers = require("./controllers/shop");
const userControllers = require("./controllers/user");
const reviewsControllers = require("./controllers/review");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
//const { MongoStore } = require("connect-mongo");
//const MongoDBStore = require("connect-mongo")(session);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//app.use(express.static(path.join(__dirname, "views")));
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(mongoSanitize());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
//const store = new MongoStore({
//url: dbUrl,
//});
const sessionConfig = {
  name: "what's",
  secret: "secretissecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

///////////////////////////

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app.use(eerorControllers.get404);
app.use((req, res, next) => {
  if (!["/login", "/ shop"].includes(req.originalUrl)) {
    req.session.returnTo = req.originalUrl;
  }
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use("/admin", adminControllers);
app.use(shopControllers);
app.use(userControllers);
app.use(reviewsControllers);

const routeHit = (req, res, next) => {
  console.log("A new route was just hit");
  next();
};
app.use(routeHit);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not found", 404));
  res.send("404!!!!!");
});

app.use((err, req, res, next) => {
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  const { statusCode = 500 } = err;
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});

//mongodb+srv://firstuser:<password>@cluster0.tej5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
