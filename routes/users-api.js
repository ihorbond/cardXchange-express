const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const UserModel = require('../models/userModel');
const CardModel = require('../models/cardModel');

//show user's profile
router.get('/profile', (req, res, next) => {
  const userId = req.params._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  UserModel.findById(id, (err, theUser) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(theUser);
  });
});
