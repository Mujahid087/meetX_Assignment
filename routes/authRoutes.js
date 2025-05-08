const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser,
  getMe,
  logout
} = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../utils/validators');
const { protect } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerValidation, registerUser);

// Login user
router.post('/login', loginValidation, loginUser);



// Get current user
router.get('/me', protect, getMe);

module.exports = router;