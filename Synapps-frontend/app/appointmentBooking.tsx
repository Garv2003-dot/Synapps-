import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/appointmentStyles';

const mockDoctor = {
    name: "Dr. John Doe",
    experience: "10 years",
    rating: "4.8",
    schedule: "Mon-Fri, 9 AM - 5 PM",
    fees: "$100 per session"
  };
  
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
  ];
  
  const AppointmentBooking = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
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
        <TouchableOpacity style={styles.datePicker} onPress={() => setSelectedDate("2025-03-05")}>
          <Text style={styles.dateText}>
            {selectedDate ? `Selected Date: ${selectedDate}` : "Select Date"}
          </Text>
        </TouchableOpacity>
  
        {/* Time Slots */}
        <Text style={styles.sectionTitle}>Select Time Slot</Text>
        <FlatList
          data={timeSlots}
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
  
        {/* Book Appointment Button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push('/confirmation')}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.bookText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default AppointmentBooking;