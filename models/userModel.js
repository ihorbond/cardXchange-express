const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName:          {type: String, required: true, trim:true},
  email:             {type: String, required: true, lowercase: true, trim:true},
  password:          {type: String, required: true},
  cards:             [ { type: mongoose.Schema.Types.ObjectId, ref: 'Card' } ],
  contacts:          [ {
                     _id: { type: mongoose.Schema.Types.ObjectId},
                     notes: {type: String}
                     }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
