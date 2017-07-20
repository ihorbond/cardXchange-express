const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const UserModel  = require('../models/userModel');
const CardModel  = require('../models/cardModel');
// const EventModel = require('../models/eventModel');
//change card visibility

//show contacts
router.get('/contacts', (req, res, next) => {
  let contactsArray = [];
  const userId = req.params._id;
  UserModel.findById(userId, (err, theUser) => {
    if (err) {
      res.json(err);
      return;
    }
    //if id saved in contacts matches id
    //in cards collection push that card into array
    theUser.contacts.forEach(oneContact => {
      CardModel.findById(oneContact._id, (err, theCard) => {
        //do i need to account an error??
        contactsArray.push(theCard);
      });
    });
    res.json({status: "OK", userInfo: contactsArray});
  });
});

//edit card info
router.put('/profile/my-cards/edit/:id', (req, res, next) => {
   const cardToEditId = req.params.id;
   const userId       = req.user._id;
   if (!mongoose.Types.ObjectId.isValid(cardToEdit)) {
     res.status(400).json({
       message: 'Specified id is not valid'
     });
     return;
   }
   CardModel.findByIdAndUpdate(
     cardToEditId,
   {
     fullName:       req.body.fullName,
     companyName:    req.body.companyNamename,
     position:       req.body.position,
     phoneNum:       req.body.image,
     email:          req.body.email,
     description:    req.body.description,
     profilePic:     req.body.profilePic,
   },
     (err, theCard) => {
       if(err) {
         res.json(err);
         return;
       }
       res.json({ message: 'Changes Saved', status: "OK", editedCard: theCard });
   });
});

//add(save) other user's card
router.post('/contacts/add/:id', (req, res, next) => {
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
        res.json({  message: 'Contact Added', status: "OK", contacts: theUser.contacts });
      });
    });
});

//add own card
router.post('/profile/my-cards/add', (req, res, next) => {
  const userId  = req.user._id;
  const theCard = new CardModel ({
    fullName:       req.body.fullName,
    companyName:    req.body.companyName,
    position:       req.body.position,
    phoneNum:       req.body.image,
    email:          req.body.email,
    description:    req.body.description,
    profilePic:     req.body.profilePic,
    visibility:     req.body.visibility,
    QRcode:         req.body.qrcode//???
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
        res.json({  message: 'Card Added', status: "OK", userInfo: theUser });
      });
    }
  );
});

//delete user's own card
router.delete('/profile/my-cards/delete/:id', (req, res, next) => {
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
    return res.json({ message: 'Card succesfully removed!', status: 'OK' });
  });
});

//delete one of user's contacts
router.put('/contacts/delete/:id', (req, res, next) => {
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
          res.json({  message: 'Card succesfully removed!', status: "OK" });
            });
      }
    );
});

module.exports = router;
