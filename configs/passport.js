const LocalStrategy    = require('passport-local').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const UserModel        = require('../models/userModel');
const bcrypt           = require('bcrypt');
const passport         = require('passport');


  passport.use(new LocalStrategy({
    usernameField: "loginEmail",
    passwordField: "loginPassword"
  }, (email, password, next) => {
    console.log("EMAIL: " + email);
    console.log("PASSWORD: " + password);
    UserModel.findOne( { email: email }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }
      console.log("EMAIL: " + email);
    console.log("FOUND USER: " + foundUser);
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


//linked strategy
//
// passport.use(new LinkedInStrategy({
//     consumerKey: LINKEDIN_API_KEY,
//     consumerSecret: LINKEDIN_SECRET_KEY,
//     callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
