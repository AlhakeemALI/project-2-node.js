module.exports.isLoggedIn = (req, res, next) => {
  //console.log("Req.User....", req.user);
  if (!req.isAuthenticated()) {
    req.flash("error", "you must be signed in");
    return res.redirect("user/login");
  }
  next();
};
