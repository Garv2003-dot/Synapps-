const express = require('express');
const router = express.Router();
const { 
  getAvailableSlots, 
  bookAppointment, 
  getBookedSlots 
} = require('../controllers/appointmentController');

// Get available slots for a specific date and doctor
router.get('/available/:doctorId/:date', getAvailableSlots);

// Get all booked slots for a doctor
router.get('/booked/:doctorId', getBookedSlots);

// Book a new appointment
router.post('/book', bookAppointment);

module.exports = router; 