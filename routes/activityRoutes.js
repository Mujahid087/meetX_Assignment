const express = require('express');
const router = express.Router();
const {
  createActivity,
  getActivities,
  getActivity
} = require('../controllers/activityController');
const { activityValidation } = require('../utils/validators');
const { protect } = require('../middleware/authMiddleware');

// Get all activities
router.get('/', getActivities);

// Get single activity
router.get('/:id', getActivity);

// Create a new activity 
router.post('/', protect, activityValidation, createActivity);

module.exports = router;
