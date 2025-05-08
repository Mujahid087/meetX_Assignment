const { body } = require('express-validator');

const registerValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim(),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const activityValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim(),
  body('description')
    .notEmpty()
    .withMessage('Description is required'),
  body('location')
    .notEmpty()
    .withMessage('Location is required'),
  body('dateTime')
    .notEmpty()
    .withMessage('Date and time are required')
    .isISO8601()
    .withMessage('Please provide a valid date')
];

module.exports = {
  registerValidation,
  loginValidation,
  activityValidation
};