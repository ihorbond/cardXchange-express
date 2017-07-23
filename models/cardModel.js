const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  fullName:          {type: String, required: true, trim:true},
  companyName:       {type: String, trim:true},
  position:          {type: String, trim:true},
  phoneNum:          {type: String, trim:true},
  email:             {type: String, required: true, lowercase: true, trim:true},
  linkedIn:          {type: String, lowercase: true, trim:true},
  profilePic:        {type: String, default: "../public/images/new-user.png"},
  visibility:        {type: Boolean, default: true},
  //unique qr code for each card for scanning
  QRcode:            {type: String}
});

const CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;
