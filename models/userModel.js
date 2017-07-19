const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName:          {type: String, required: true},
  email:             {type: String, required: true},
  encryptedPassword: {type: String, required: true},
  // profilePic:        {type: String, default: "../public/images/new-user.png"},
  cards:             {type: Array},
  contacts:          {type: Array},
  //event id here
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
