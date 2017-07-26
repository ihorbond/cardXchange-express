const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');
const UserModel  = require('../models/userModel');
const CardModel  = require('../models/cardModel');
const multer     = require('multer');
// const EventModel = require('../models/eventModel');
const imgUpload  = multer ({
  dest: __dirname + '/../public/uploads/'
});

//make default
router.patch('/profile/my-cards/md/:id', (req, res, next) => {
   const cardToEditId   = req.params.id;
   const userId         = req.user._id;
   const defaultSetting = req.body.defaultSetting;
   if (!mongoose.Types.ObjectId.isValid(cardToEditId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return;
   }

   UserModel.findById({ _id: userId})
   .populate('cards')
   //exec returns the user with cards array populated by actual objects
   .exec((err, theUser) => {
     if(err) {
       res.json(err);
       return;
   }


//there's gotta be a better way to do this....
let errors = [];
//make all cards defaultSetting false
   theUser.cards.forEach(oneCard => {
     if (oneCard.defaultSetting) {
       oneCard.defaultSetting = false;
       oneCard.save(err => {
        errors.push(err);
       });
     }
        //assing true to the picked card
     if (oneCard._id.toString() === cardToEditId) {
      oneCard.defaultSetting = true;
      oneCard.save(err => {
       errors.push(err);
      });
     }
   });
   console.log(errors);

res.json({message: "This card is now default", userInfo: theUser});
});
});


// add/edit contact note
router.patch('/profile/contacts/add-note/:id', (req, res, next) => {
   const cardToEditId = req.params.id;
   const userId       = req.user._id;
   const editedNote   = req.body.note;
   if (!mongoose.Types.ObjectId.isValid(cardToEditId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return;
   }
   UserModel.findById(userId, (err, theUser) => {
     if(err) {
       res.json(err);
       return;
     }
       theUser.contacts.forEach((oneContact, index) => {
         if (oneContact._id === cardToEditId) {
           oneContact.notes = editedNote;
         }
       });
       theUser.markModified('contacts');
       theUser.save(err => {
         if(err) {
           res.json(err);
           return;
         }
        res.json({ message: 'Changes Saved', userInfo: theCard });
   });
});
});

//change visibility
router.patch('/profile/my-cards/cv/:id', (req, res, next) => {
   const cardToEditId = req.params.id;
   console.log(cardToEditId);
   if (!mongoose.Types.ObjectId.isValid(cardToEditId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return;
   }

   CardModel.findById(cardToEditId, (err, theCard) => {
     if(err) {
       res.json(err);
       return;
     }

   theCard.visibility = req.body.visibility;

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
router.patch('/profile/my-cards/edit/:id', (req, res, next) => {
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
      //  theCard.profilePic  = req.body.profilePic;
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
router.patch('/contacts/add/:id', (req, res, next) => {
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
router.post('/profile/my-cards/add', imgUpload.single('file'), (req, res, next) => {
  const userId = req.user._id;
  // if (req.user.cards.length >= 3) {
  //   res.json({ message: "Sorry, you have reached the limit of 3 cards. Delete other cards first" });
  //   return;
  // }
  const theCard = new CardModel ({
    fullName:       req.body.newCard.fullName,
    companyName:    req.body.newCard.companyName,
    position:       req.body.newCard.position,
    phoneNum:       req.body.newCard.phoneNum,
    email:          req.body.newCard.email,
    linkedIn:       req.body.newCard.linkedIn,
    visibility:     req.body.newCard.visibility,
    QRcode:         req.body.newCard.qrcode//???
  });
  if(!theCard.fullName || !theCard.email) {
    res.json({message: "Both Name and Email fields must be filled out"});
    return;
  }
  if (req.file) {
    theCard.profilePic = `/uploads/${req.file.filename}`;
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
        res.json({status: 'OK', message: 'Card Added', userInfo: theUser });
      });
    }
  );
});

//remove card from user's cards array
router.patch('/profile/my-cards/update/:id', (req, res, next) => {
  const cardToRemoveId = req.params.id;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(cardToRemoveId)) {
    res.status(400).json({message: 'Specified id is not valid'});
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
  CardModel.findById(cardToRemoveId).remove(err => {
    if(err) {
      res.json(err);
      return;
    }
    });
  });

//delete one of user's contacts
router.patch('/contacts/delete/:id', (req, res, next) => {
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

          if (oneCard._id.toString() === cardToRemoveId.toString()) {
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
