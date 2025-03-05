import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location"; 
import { useLocalSearchParams, useRouter } from "expo-router";
import supabase from "../config/supabaseClient"; // Import Supabase client

interface Doctor {
  doctor_id: number;
  full_name: string;
  specialty: string;
  experience: number;
  clinic_address: string;
  consultation_fee: number;
  available_status: boolean;
  phone: string;
  latitude: number;
  longitude: number;
  distance?: number; // Distance will be added dynamically
}

const GOOGLE_API_KEY = "AIzaSyBXWXNbuIm_n06aq2dxkV4kCAd72831r20"; // 🔹 Replace with your valid Google API Key
const ROUTES_API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

const SpecialityPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ speciality?: string }>();
  const speciality = params.speciality || "General Physician";

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      // Ask for location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to find nearby doctors.");
        setLoading(false);
        return;
      }

      // Get user's current location
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (!userLocation) return; // Wait for user location

        // Fetch doctors from Supabase
        const { data, error } = await supabase
          .from("doctors")
          .select("*")
          .eq("specialty", speciality);

        if (error) throw error;

        const doctorsData: Doctor[] = data;
        
        // Fetch distances using Google Routes API
        const sortedDoctors = await getSortedDoctorsByDistance(doctorsData, userLocation.latitude, userLocation.longitude);
        setDoctors(sortedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [userLocation]);

  const getSortedDoctorsByDistance = async (doctors: Doctor[], userLat: number, userLng: number) => {
    if (!doctors.length) return [];

    const doctorsWithDistances = await Promise.all(
      doctors.map(async (doctor) => {
        try {
          const response = await fetch(ROUTES_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": GOOGLE_API_KEY,
              "X-Goog-FieldMask": "routes.distanceMeters",
            },
            body: JSON.stringify({
              origin: { location: { latLng: { latitude: userLat, longitude: userLng } } },
              destination: { location: { latLng: { latitude: doctor.latitude, longitude: doctor.longitude } } },
              travelMode: "DRIVE",
            }),
          });

          const result = await response.json();
          if (!result.routes || result.routes.length === 0) throw new Error("No route found");

          return {
            ...doctor,
            distance: result.routes[0].distanceMeters, // Distance in meters
          };
        } catch (error) {
          console.error("Error fetching distance for doctor:", doctor.full_name, error);
          return { ...doctor, distance: Infinity }; // If error, set high distance
        }
      })
    );

    // Sort doctors by distance (nearest first)
    return doctorsWithDistances.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{speciality} Specialists</Text>

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
              <Text style={styles.details}>Specialty: {item.specialty}</Text>
              <Text style={styles.details}>Experience: {item.experience} years</Text>
              <Text style={styles.details}>Clinic: {item.clinic_address}</Text>
              <Text style={styles.details}>Fee: ₹{item.consultation_fee}</Text>
              <Text style={styles.details}>Phone: {item.phone}</Text>
              <Text style={styles.status}>{item.available_status ? "Available" : "Not Available"}</Text>
              <Text style={styles.details}>Distance: {item.distance ? (item.distance / 1000).toFixed(2) : "N/A"} km</Text>
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
