const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

BookingSchema.index({ user: 1, activity: 1 }, { unique: true });

module.exports = mongoose.model('Booking', BookingSchema);