const { validationResult } = require('express-validator');
const Activity = require('../models/Activity');


const createActivity = async (req, res) => {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  
  try {
    const activity = await Activity.create(req.body);
    
    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};


const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ dateTime: 1 });
    
    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (error) {
    console.error(error);
    
  
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  createActivity,
  getActivities,
  getActivity
};
