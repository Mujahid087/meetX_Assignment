const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

const bookActivity = async (req, res) => {
  const { activityId } = req.body;
  
  if (!activityId) {
    return res.status(400).json({
      success: false,
      message: 'Please provide an activity ID'
    });
  }
  
  try {
    
    const activity = await Activity.findById(activityId);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
   
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      activity: activityId
    });
    
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this activity'
      });
    }
    
 
    const booking = await Booking.create({
      user: req.user.id,
      activity: activityId
    });
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error(error);
    
  
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
  
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this activity'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};


const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: 'activity',
        select: 'title description location dateTime'
      })
      .sort({ bookedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
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
  bookActivity,
  getMyBookings
};