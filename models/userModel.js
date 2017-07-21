const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName:          {type: String, required: true},
  email:             {type: String, required: true},
  password:          {type: String, required: true},
  profilePic:        {type: String, default: "../public/images/new-user.png"},
  cards:             {type: Array},
  contacts:          {type: Array},
  //event id here
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
