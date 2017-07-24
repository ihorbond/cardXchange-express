const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const UserModel  = require('../models/userModel');
const CardModel  = require('../models/cardModel');
// const EventModel = require('../models/eventModel');

  console.log('fuckkkkk right here boiii');
//remove card from user's cards array
router.put('/profile/my-cards/update/:id', (req, res, next) => {
  console.log('fuckkkkk right here bodfffffiii');
  const cardToRemoveId = req.params.id;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(cardToRemoveId)) {
    res.status(400).json({message: 'Specified id is not valid'});
    return;
  }
  console.log("USER ID: " + userId);
  UserModel.findById(userId, (err, theUser) => {
    console.log("USER: " + theUser);
      if(err) {
        res.json(err);
        return;
      }
// console.log("BEFORE LOOP: " + theUser.cards);
      theUser.cards.forEach((oneCard, index) => {
        if (oneCard.toString() === cardToRemoveId.toString()) {
           theUser.cards.splice(index, 1);
        }
      });
// console.log("AFTER LOOP: " + theUser.cards);
      theUser.markModified('cards');
      theUser.save(err => {
        if(err) {
          res.json(err);
          return;
        }
      });
      //card succesfully removed from the DB
      return res.json({ message: 'Card succesfully removed!', userInfo: theUser });
    }
  );
});

module.exports = router;
