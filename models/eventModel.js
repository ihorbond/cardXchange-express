const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
   title:        {type: String, required: true},
   decs:         {type: String},
   imageUrl:     {type: String, default: ""},
   //ids of users attending the event
   participants: {type: Array}
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
