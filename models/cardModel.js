const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  fullName:          {type: String, required: true},
  companyName:       {type: String},
  position:          {type: String},
  phoneNum:          {type: String},
  email:             {type: String},
  description:       {type: String},
  profilePic:        {type: String, default: ""},
  visibility:        {type: Boolean, default: true},
  //unique qr code for each card for scanning
  QRcode:            {type: String, required: true}
});

const CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;
