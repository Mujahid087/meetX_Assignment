const express=require('express')
const dotenv=require('dotenv')
const connectDB = require('./config/db')
require('dotenv').config();  

connectDB();
const app=express()
app.use(express.json())

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Activity Booking API' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT=process.env.port || 5000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))