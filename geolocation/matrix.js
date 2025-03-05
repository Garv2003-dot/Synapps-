const axios = require("axios");

const apiKey = "AIzaSyDWBoB0-OpMv05S_QtAhzsRbYv-tjB6D84"; // Replace with your API key

async function getRouteDetails() {
  const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

  const requestBody = {
    origin: {
      location: { latLng: { latitude: 28.7041, longitude: 77.1025 } }, // New Delhi
    },
    destination: {
      location: { latLng: { latitude: 28.4595, longitude: 77.0266 } }, // Gurgaon
    },
    travelMode: "DRIVE",
    computeAlternativeRoutes: false,
    units: "METRIC",
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
    });

    console.log("API Response:", JSON.stringify(response.data, null, 2));

    const route = response.data.routes[0];

    const distanceKm = route.distanceMeters / 1000;
    const durationSeconds = route.duration; // Example: "4497s"

    console.log("Raw Duration Value:", durationSeconds); // Debugging line

    const travelTimeMinutes = parseDuration(durationSeconds);

    console.log(`Distance: ${distanceKm} km`);
    console.log(`Estimated Travel Time: ${travelTimeMinutes} minutes`);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}

// ✅ Fixed function: Extracts seconds and converts to minutes
function parseDuration(duration) {
  if (!duration) return 0;

  const match = duration.match(/(\d+)s/); // Extracts number of seconds
  if (!match) return 0;

  const seconds = parseInt(match[1]) || 0;
  return Math.round(seconds / 60); // Converts to minutes
}

getRouteDetails();
