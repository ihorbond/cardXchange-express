const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const UserModel  = require('../models/userModel');
const CardModel  = require('../models/cardModel');
// const EventModel = require('../models/eventModel');
//change card visibility

//edit card info
router.put('/profile/edit-card/:id', (req, res, next) => {
   const cardToEditId = req.params.id;
   const userId       = req.user._id;
   CardModel.findById(cardToEditId, (err, theCard) => {
     
   });
});

//add(save) other user's card
router.post('/profile/save-card/:id', (req, res, next) => {
    const cardToSaveId = req.params.id;
    const userId       = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(cardToSaveId)) {
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
      theUser.contacts.push(cardToSaveId);
      theUser.markModified('contacts');
      theUser.save((err) => {
        if(err) {
          res.json(err);
          return;
        }
        res.json({  message: 'Contact Added' });
      });
    });
});

//add new user's card
router.post('/profile/add-card', (req, res, next) => {
  const userId  = req.user._id;
  // console.log("POST TRIGGERED");
  const theCard = new CardModel ({
    fullName:       req.body.fullName,
    companyName:    req.body.companyNamename,
    position:       req.body.position,
    phoneNum:       req.body.image,
    email:          req.body.email,
    description:    req.body.description,
    profilePic:     req.body.profilePic,
    visibility:     req.body.visibility
    // QRcode:         ???
  });
  theCard.save(err => {
    if (err) {
      res.json(err);
      return;
    }
  });
  //update user's cards Array
  UserModel.findById(userId, (err, theUser) => {
      if(err) {
        res.json(err);
        return;
      }

      theUser.cards.push(theCard._id);
      theUser.markModified('cards');
      theUser.save((err) => {
        if(err) {
          res.json(err);
          return;
        }
        res.json({  message: 'Card Added' });
      });
    }
  );
});

//delete user owned card
router.remove('/profile/my-cards/delete/:id', (req, res, next) => {
  const cardToRemoveId = req.params.id;
  const userId = req.params._id;
  if (!mongoose.Types.ObjectId.isValid(cardToRemoveId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }
  CardModel.remove({ cardToRemoveId }, (err) => {
    if(err) {
      res.json(err);
      return;
    }
    // if no error - update user's cards Array
    UserModel.findById(userId, (err, theUser) => {
        if(err) {
          res.json(err);
          return;
        }

        theUser.cards.forEach((oneCard, index) => {

          if (oneCard._id.toString() === cardToRemoveId.toString()) {
             theUser.cards.splice(index, 1);
          }
        });
        theUser.markModified('cards');
        theUser.save((err) => {
          if(err) {
            res.json(err);
            return;
          }
            });
      }
    );
    //card succesfully removed from the DB
    return res.json({
      message: 'Card succesfully removed!'
    });
  });
});

//delete one of user's saved cards
router.remove('/profile/saved-cards/delete/:id', (req, res, next) => {
  const cardToRemoveId = req.params.id;
  const userId = req.params._id;
  if (!mongoose.Types.ObjectId.isValid(cardToRemoveId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }
    //update user's contacts Array
    UserModel.findById(
      userId,
      (err, theUser) => {
        if(err) {
          res.json(err);
          return;
        }

        theUser.contacts.forEach((oneCard, index) => {

          if (oneCard._id.toString() === cardToRemoveId.toString()) {
             theUser.cards.splice(index, 1);
          }
        });
        theUser.markModified('contacts');
        theUser.save((err) => {
          if(err) {
            res.json(err);
            return;
          }
          res.json({  message: 'Card Removed' });
            });
      }
    );
});
