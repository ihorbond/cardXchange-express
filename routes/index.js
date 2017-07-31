const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const UserModel = require('../models/userModel');

//add(save) other user's card/contact
router.patch('/add/:id', (req, res, next) => {
    const cardToSaveId = req.params.id;
    const userId       = req.user._id;
    // if(!userId) {
    //   res.render('scanned-card-view.ejs', {
    //     message: "Please login to your account and try scanning agaon",
    //     url: `https://cardxchange.herokuapp.com/${cardToSaveId}`,
    //     action: "scanner"
    //   });
    //   return;
    // }
    //
    //   res.sendFile(__dirname + '/public/index.html');

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
        res.json({message: "contact saved"});
        // res.sendFile(__dirname + '../public/index.html');
      });
    });
});
