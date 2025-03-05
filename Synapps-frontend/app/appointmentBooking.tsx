import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/appointmentStyles';
import axios from 'axios';

const mockDoctor = {
  id: "1", // This should come from your doctor selection
  name: "Dr. John Doe",
  experience: "10 years",
  rating: "4.8",
  schedule: "Mon-Fri, 9 AM - 5 PM",
  fees: "$100 per session"
};

const AppointmentBooking = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch available slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/appointments/available/${mockDoctor.id}/${selectedDate}`
      );
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      Alert.alert('Error', 'Failed to fetch available time slots');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      setLoading(true);
      await axios.post('http://localhost:3000/api/appointments/book', {
        doctorId: mockDoctor.id,
        patientId: "1", // This should come from your authentication
        date: selectedDate,
        timeSlot: selectedTime
      });
      
      Alert.alert('Success', 'Appointment booked successfully!');
      router.push('/confirmation');
    } catch (error) {
      console.error('Error booking appointment:', error);
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Doctor Info Card */}
      <View style={styles.card}>
        <Text style={styles.doctorName}>{mockDoctor.name}</Text>
        <Text>Experience: {mockDoctor.experience}</Text>
        <Text>Rating: {mockDoctor.rating}</Text>
        <Text>Schedule: {mockDoctor.schedule}</Text>
        <Text>Fees: {mockDoctor.fees}</Text>
      </View>

      {/* Date Picker (Mocked for now) */}
      <TouchableOpacity 
        style={styles.datePicker} 
        onPress={() => setSelectedDate("2025-03-05")}
        disabled={loading}
      >
        <Text style={styles.dateText}>
          {selectedDate ? `Selected Date: ${selectedDate}` : "Select Date"}
        </Text>
      </TouchableOpacity>

      {/* Time Slots */}
      <Text style={styles.sectionTitle}>Select Time Slot</Text>
      {loading ? (
        <Text>Loading available slots...</Text>
      ) : (
        <FlatList
          data={availableSlots}
          numColumns={3}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                selectedTime === item && styles.selectedSlot
              ]}
              onPress={() => setSelectedTime(item)}
            >
              <Text style={styles.timeText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Book Appointment Button */}
      <TouchableOpacity
        style={[
          styles.bookButton,
          (!selectedDate || !selectedTime || loading) && styles.disabledButton
        ]}
        onPress={handleBookAppointment}
        disabled={!selectedDate || !selectedTime || loading}
      >
        <Text style={styles.bookText}>
          {loading ? 'Booking...' : 'Book Appointment'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentBooking;