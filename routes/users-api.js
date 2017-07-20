const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const UserModel = require('../models/userModel');
const CardModel = require('../models/cardModel');
//login

//signup
router.post('/signup', (req, res, next) => {
  const theUser = new UserModel ({
    fullName:          req.body.fullName,
    email:             req.body.email,
    encryptedPassword: req.body.password
  });
  theUser.save(err => {
    if (err) {
      next(err);
      return;
    }
  });
  res.json(theUser);
  // res.redirect('/login');
});

//show user's profile
router.get('/profile', (req, res, next) => {
  let cardsArray = [];
  const userId = req.params._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  UserModel.findById(userId, (err, theUser) => {
    if (err) {
      res.json(err);
      return;
    }
    theUser.cards.forEach(oneCard => {
      CardModel.findById(oneCard._id, (err, theCard) => {
        //do i need to check for error??
      cardsArray.push(theCard);
      });
    });
    res.json({userInfo: theUser, cards: cardsArray});
  });
});

module.exports = router;
