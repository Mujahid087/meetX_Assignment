const express = require('express');
const router = express.Router();
const {
  bookActivity,
  getMyBookings
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Book an activity
router.post('/', protect, bookActivity);

// Get user bookings
router.get('/me', protect, getMyBookings);

module.exports = router;