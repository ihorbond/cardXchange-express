const express    = require('express');
const mongoose   = require('mongoose');
const passport   = require('passport');
const bcrypt     = require('bcrypt');
const UserModel  = require('../models/userModel');
const authRoutes = express.Router();

//sign up
authRoutes.post('/signup', (req, res, next) => {
  const fullName = req.body.fullName;
  const email    = req.body.email;
  const password = req.body.password;

  if (!email || !password || !fullName) {
    res.status(400).json({ message: 'All fields need to be filled out' });
    return;
  }

  UserModel.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.status(500).json({message: "Email check failed due to server problem."});
    }
    if (foundUser) {
      res.status(400).json({message: 'The user with this email address is already registered' });
      return;
    }

    const salt              = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const theUser = new UserModel({
      fullName,
      email,
      password: encryptedPassword
    });

    theUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Something went wrong' });
        return;
      }
       //req.login is defined by passport
      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }
        //remove password from the response
        theUser.password = undefined;
        res.status(200).json({message: "Login Succesful", userInfo: theUser});
      });
      }
    );
  });
});

//login
authRoutes.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, theUser, failureDetails) => {
    // console.log("DA USER IS: " + theUser);
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }
    if (!theUser) {
      //failureDetails contains feedback from passport local strategy
      res.status(401).json(failureDetails);
      // console.log(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // We are now logged in
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

//logout
authRoutes.post('/logout', (req, res, next) => {
  req.session.destroy();
  req.logout();
  res.status(200).json({ message: 'Success' });
});

//check if user logged in
authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;
