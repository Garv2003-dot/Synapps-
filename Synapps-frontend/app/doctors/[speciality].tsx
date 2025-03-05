import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

interface Doctor {
  doctor_id: number;
  full_name: string;
  specialty: string;
  experience: number;
  clinic_address: string;
  consultation_fee: number;
  available_status: boolean;
  phone: string;
}

const SpecialityPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ speciality?: string }>();
  const speciality = params.speciality || "General Physician";
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const validSpecialities = [
    "Dentist",
    "Cardiologist",
    "Dermatologist",
    "Eye specialist",
    "Ob-gyn",
    "Neurologist",
    "Physician",
    "Paediatrics",
    "ENT",
    "Psychiatry",
  ];

  const formattedSpeciality = validSpecialities.includes(speciality) ? speciality : "General Physician";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`http://172.20.10.2:5000/doctors/${encodeURIComponent(formattedSpeciality)}`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [formattedSpeciality]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{formattedSpeciality} Specialists</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : doctors.length === 0 ? (
        <Text style={styles.noDoctorsText}>No doctors available.</Text>
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.doctor_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/appointmentBooking",
                  params: {
                    name: item.full_name,
                    experience: item.experience.toString(),
                    rating: "4.8", 
                    schedule: "Mon-Fri, 9 AM - 5 PM", 
                    fees: item.consultation_fee.toString(),
                  },
                })
              }
            >
              <Text style={styles.name}>{item.full_name}</Text>
              <Text style={styles.details}>Experience: {item.experience} years</Text>
              <Text style={styles.details}>Clinic: {item.clinic_address}</Text>
              <Text style={styles.details}>Fee: ₹{item.consultation_fee}</Text>
              <Text style={styles.details}>Contact: {item.phone}</Text>
              <Text style={styles.status}>
                {item.available_status ? "Available" : "Not Available"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  noDoctorsText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 20 },
  card: { padding: 15, borderRadius: 10, backgroundColor: "#f0f0f0", marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 16, marginTop: 5 },
  status: { fontSize: 16, marginTop: 10, fontWeight: "bold", color: "green" },
});

export default SpecialityPage;
