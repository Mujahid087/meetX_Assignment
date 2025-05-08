const { validationResult } = require('express-validator');
const User = require('../models/User');


const registerUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  
  const { name, email, phone, password } = req.body;
  
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }
    
    // Create new user
    user = await User.create({
      name,
      email,
      phone,
      password
    });

    const token = user.getSignedJwtToken();
    
    res.status(201).json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};


const loginUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
  
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email }).select('+password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Check if password matches
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      const token = user.getSignedJwtToken();
  
      
      res.status(200).json({
        success: true,
        token:token,
        data: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Error during login:', error);  
      res.status(500).json({
        success: false,
        message: 'Server Error'
      });
    }
  };
  


const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};