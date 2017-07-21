const LocalStrategy = require('passport-local').Strategy;
const UserModel     = require('../models/userModel');
const bcrypt        = require('bcrypt');
const passport      = require('passport');

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: "loginEmail",
    passwordField: "loginPassword"
  }, (email, password, next) => {
    // console.log("EMAIL: " + email);
    // console.log("PASSWORD: " + password);
    UserModel.findOne( { email: email }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }
    //   console.log("EMAIL: " + email);
    // console.log("FOUND USER: " + foundUser);
      if (!foundUser) {
        next(null, false, { message: 'Incorrect email address' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password' });
        return;
      }

      next(null, foundUser);
    });
  }));

  passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
  });

  passport.deserializeUser((userIdFromSession, cb) => {
    UserModel.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        cb(err);
        return;
      }

      cb(null, userDocument);
    });
  });
};
