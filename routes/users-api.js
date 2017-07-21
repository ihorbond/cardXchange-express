const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const UserModel = require('../models/userModel');
const CardModel = require('../models/cardModel');

//show user's profile
router.get('/profile', (req, res, next) => {
  if (req.user === undefined) {
    res.status(418).json({message: "Pls login first"});
    return;
  }
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  UserModel.findById(userId, (err, theUser) => {
    if (err) {
      res.json(err);
      return;
    }
    if (!theUser.cards.length) {
      res.json({message: "No cards to display", userInfo: theUser});
      return;
    }
      //find and return all matching cards from cards collection
      CardModel.find({ _id:theUser.cards }, (err, cardsArray) => {
        if (err) {
          res.json(err);
          return;
        }
          console.log(cardsArray);
          theUser.cards = cardsArray;
        res.json({message: "Here is your cards", userInfo: theUser });
      });
  });
});

module.exports = router;
