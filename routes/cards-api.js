const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const UserModel  = require('../models/userModel');
const CardModel  = require('../models/cardModel');
// const EventModel = require('../models/eventModel');

//change card visibility
router.put('/profile/my-cards/cv/:id', (req, res, next) => {
   const cardToEditId = req.params.id;
   if (!mongoose.Types.ObjectId.isValid(cardToEditId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return;
   }
   //no validation needed that's why findByIdAndUpdate
   CardModel.findById( cardToEditId, (err, theCard) => {
     if(err) {
       res.json(err);
       return;
     }

   visibility = req.body.visibility;
   theCard.save(err => {
     if(err) {
       res.json(err);
       return;
     }
  res.json({ message: 'Changes Saved', userInfo: theCard });
   });
});
});

//show contacts
router.get('/contacts', (req, res, next) => {
  const userId = req.user._id;
  UserModel.findById(userId, (err, theUser) => {
    if (err) {
      res.json(err);
      return;
    }
    if(!theUser.contacts.length) {
      res.json({message: "No contacts to display", userInfo: theUser });
      return;
    }
       //fetch matching cards from cards collection
      CardModel.find({ _id:theUser.contacts }, (err, contactsArray) => {
        if (err) {
          res.json(err);
          return;
        }
        console.log("CONTACTS: " + contactsArray);
        theUser.contacts = contactsArray;
        res.json({message: "Here's your saved cards", userInfo: theUser });
      });
  });
});

//edit card info
router.put('/profile/my-cards/edit/:id', (req, res, next) => {
   const cardToEditId = req.params.id;
   if (!mongoose.Types.ObjectId.isValid(cardToEditId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return;
   }
   //findById and save is better than findByIdAndUpdate
   //because it will validate the changes
   //also findByIdAndUpdate returns the old, unchanged document
   CardModel.findById(cardToEditId, (err, theCard) => {
     if(err) {
       res.json(err);
       return;
     }
       theCard.fullName    = req.body.fullName;
       theCard.companyName = req.body.companyName;
       theCard.position    = req.body.position;
       theCard.phoneNum    = req.body.phoneNum;
       theCard.email       = req.body.email;
       theCard.linkedIn    = req.body.linkedIn;
       theCard.profilePic  = req.body.profilePic;
       theCard.save(err => {
         if(err) {
           res.json(err);
           return;
         }
        res.json({ message: 'Changes Saved', userInfo: theCard });
   });
});
});

//add(save) other user's card/contact
router.put('/contacts/add/:id', (req, res, next) => {
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
        res.json({ message: 'Contact Added', userInfo: theUser });
      });
    });
});

//add own card
router.post('/profile/my-cards/add', (req, res, next) => {
  const userId = req.user._id;
  if (req.user.cards.length >= 3) {
    res.json({ message: "Sorry, you have reached the limit of 3 cards. Delete other cards first" });
    return;
  }
  const theCard = new CardModel ({
    fullName:       req.body.fullName,
    companyName:    req.body.companyName,
    position:       req.body.position,
    phoneNum:       req.body.phoneNum,
    email:          req.body.email,
    linkedIn:       req.body.linkedIn,
    profilePic:     req.body.profilePic,
    visibility:     req.body.visibility,
    QRcode:         req.body.qrcode//???
  });
  if(!theCard.fullName || !theCard.email) {
    res.json({message: "Both Name and Email fields must be filled out"});
    return;
  }
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
        res.json({  message: 'Card Added', userInfo: theUser });
      });
    }
  );
});

//remove user's own card from cards collection
router.delete('/profile/my-cards/delete/:id', (req, res, next) => {
  const cardToRemoveId = req.params.id;
  const userId = req.user._id;
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
    });
  });

  //remove card from user's cards array
  router.put('/profile/my-cards/update/:id', (req, res, next) => {
    const cardToRemoveId = req.params.id;
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(cardToRemoveId)) {
      res.status(400).json({
        message: 'Specified id is not valid'
      });
      return;
    }
    UserModel.findById(userId, (err, theUser) => {
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

//delete one of user's contacts
router.put('/contacts/delete/:id', (req, res, next) => {
  const cardToRemoveId = req.params.id;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(cardToRemoveId)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }
    //update user's contacts Array
    UserModel.findById(userId, (err, theUser) => {
        if(err) {
          res.json(err);
          return;
        }

        theUser.contacts.forEach((oneCard, index) => {

          if (oneCard.toString() === cardToRemoveId.toString()) {
             theUser.contacts.splice(index, 1);
          }
        });
        theUser.markModified('contacts');
        theUser.save((err) => {
          if(err) {
            res.json(err);
            return;
          }
        });
        res.json({  message: 'Contact succesfully removed!', userInfo: theUser });
      }
    );
});

module.exports = router;
