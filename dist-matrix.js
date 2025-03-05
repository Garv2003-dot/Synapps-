const axios = require("axios");

const apiKey = "AIzaSyDWBoB0-OpMv05S_QtAhzsRbYv-tjB6D84"; // Replace with your API key

async function getDistance(originLat, originLng, destLat, destLng) {
  const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

  const requestBody = {
    origin: {
      location: { latLng: { latitude: originLat, longitude: originLng } },
    },
    destination: {
      location: { latLng: { latitude: destLat, longitude: destLng } },
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
        "X-Goog-FieldMask": "routes.distanceMeters",
      },
    });

    const route = response.data.routes[0];
    const distanceKm = route.distanceMeters / 1000; // Convert meters to kilometers

    console.log(`${distanceKm}`);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}

// getDistance(originLat, originLng, destLat, destLng)
getDistance(28.5573067, 77.2556719, 28.5550838, 77.0818266);
