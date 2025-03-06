import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import supabase from "./config/supabaseClient";
import styles from "./styles/appointmentStyles";

const AppointmentBooking = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ name?: string; experience?: string; rating?: string; schedule?: string; fees?: string }>();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const timeSlots = [
    "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00",
    "12:30:00", "1:00:00", "1:30:00", "2:00:00", "2:30:00",
  ]; 

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchBookedSlots = async (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("appointments")
      .select("appointment_time")
      .eq("appointment_date", formattedDate);

    if (error) {
      console.error("Error fetching booked slots:", error);
      return;
    }

    setBookedSlots(data.map((appointment) => appointment.appointment_time));
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];

    const { error } = await supabase.from("appointments").insert([
      {
        patient_id: 1, 
        doctor_id: 1,
        appointment_date: formattedDate,
        appointment_time: selectedTime,
        status: "pending",
      },
    ]);

    if (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } else {
      alert("Appointment booked successfully!");
      router.push("/confirmation");
    }
  };

  return (
    <FlatList
      data={timeSlots}
      numColumns={3}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <View style={styles.card}>
            <Text style={styles.header}>{params.name}</Text>
            <Text style={styles.subText}>Experience: {params.experience} years</Text>
            <Text style={styles.subText}>Rating: {params.rating} ⭐</Text>
            <Text style={styles.subText}>Schedule: {params.schedule}</Text>
            <Text style={styles.subText}>Consultation Fee: ₹{params.fees}</Text>
          </View>
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
                maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
          </View>
        </>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.timeSlot,
            selectedTime === item && styles.selectedTimeSlot,
            bookedSlots.includes(item) && styles.disabledTimeSlot, 
          ]}
          onPress={() => !bookedSlots.includes(item) && setSelectedTime(item)}
          disabled={bookedSlots.includes(item)}
        >
          <Text style={styles.timeText}>{item}</Text>
        </TouchableOpacity>
      )}
      ListFooterComponent={
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBooking}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      }
    />
  );
};

export default AppointmentBooking;
