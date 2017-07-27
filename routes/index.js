const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const UserModel = require('../models/userModel');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;


//add(save) other user's card/contact
router.patch('/add/:id', (req, res, next) => {
    const cardToSaveId = req.params.id;
    if(!req.user._id) {
      res.json({message: "Please login first", url: `http://localhost:3000/add/${cardToSaveId}`});
      return;
    }
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
