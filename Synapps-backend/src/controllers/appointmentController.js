const supabase = require('../config/db');

// Get available slots for a specific date and doctor
const getAvailableSlots = async (req, res) => {
  const { doctorId, date } = req.params;
  
  try {
    // Get all booked slots for the doctor on the specified date
    const { data: bookedSlots, error: bookedError } = await supabase
      .from('appointments')
      .select('time_slot')
      .eq('doctor_id', doctorId)
      .eq('date', date);

    if (bookedError) throw bookedError;

    // Define all possible time slots
    const allTimeSlots = [
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
      "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
      "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
    ];

    // Filter out booked slots
    const bookedTimeSlots = bookedSlots.map(slot => slot.time_slot);
    const availableSlots = allTimeSlots.filter(slot => !bookedTimeSlots.includes(slot));

    res.status(200).json(availableSlots);
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Book a new appointment
const bookAppointment = async (req, res) => {
  const { doctorId, patientId, date, timeSlot } = req.body;

  try {
    // Check if the slot is already booked
    const { data: existingBooking, error: checkError } = await supabase
      .from('appointments')
      .select('*')
      .eq('doctor_id', doctorId)
      .eq('date', date)
      .eq('time_slot', timeSlot)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw checkError;
    }

    if (existingBooking) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }

    // Create new appointment
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          doctor_id: doctorId,
          patient_id: patientId,
          date: date,
          time_slot: timeSlot,
          status: 'scheduled'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all booked slots for a doctor
const getBookedSlots = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('doctor_id', doctorId)
      .gte('date', new Date().toISOString().split('T')[0]);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAvailableSlots,
  bookAppointment,
  getBookedSlots
}; 