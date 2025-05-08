const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  dateTime: {
    type: Date,
    required: [true, 'Please provide date and time']
  },
  capacity: {
    type: Number,
    default: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', ActivitySchema);