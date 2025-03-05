import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import styles from "./styles/appointmentStyles";

const AppointmentBooking = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ name?: string; experience?: string; rating?: string; schedule?: string; fees?: string }>();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM",
    "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  ];

  const handleDateChange = (event: any, date?: Date) => {
    setShowPicker(Platform.OS === "ios"); // Keep picker open on iOS
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Doctor Card */}
      <View style={styles.card}>
        <Text style={styles.header}>{params.name}</Text>
        <Text style={styles.subText}>Experience: {params.experience} years</Text>
        <Text style={styles.subText}>Rating: {params.rating} ⭐</Text>
        <Text style={styles.subText}>Schedule: {params.schedule}</Text>
        <Text style={styles.subText}>Consultation Fee: ₹{params.fees}</Text>
      </View>

      {/* Date Picker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>
            {selectedDate ? selectedDate.toDateString() : "Pick a Date"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // 7 days ahead
            onChange={handleDateChange}
          />
        )}
      </View>

      {/* Time Slots */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <FlatList
          data={timeSlots}
          numColumns={3}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                selectedTime === item && styles.selectedTimeSlot,
              ]}
              onPress={() => setSelectedTime(item)}
            >
              <Text style={styles.timeText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Book Appointment Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => router.push("/confirmation")}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AppointmentBooking;
