const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName:          {type: String, required: true},
  email:             {type: String, required: true},
  encryptedPassword: {type: String, required: true},
  profilePic:        {type: String, default: ""},
  cards:             {type: Array},
  contacts:          {type: Array},
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
