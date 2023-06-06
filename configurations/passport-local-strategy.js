const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

//import user
const User = require("../models/user");

//authentication using passport
passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },

    function (req, email, password, done) {
      //find a user and establish identity

      User.findOne({ email: email }, function (err, user) {
        if (err) {
          // console.log("Error in finding user --> passport");
          req.flash("error", err);
          return done(err);
        }

        if (!user || user.password != password) {
          // console.log("Invalid Username/password");
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> passport");
      return done(err);
    }

    return done(null, user);
  });
});

// check user is auhenticated

passport.checkAuthentication = function (req, res, next) {
  //if user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed-in user from session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
