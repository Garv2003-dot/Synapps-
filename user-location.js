const axios = require("axios");

const apiKey = "AIzaSyDWBoB0-OpMv05S_QtAhzsRbYv-tjB6D84"; // Replace with your API Key

async function getUserLocation() {
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;

  try {
    const response = await axios.post(url);
    console.log(response.data.location);
  } catch (error) {
    console.error("Error fetching location:", error.response.data);
  }
}

getUserLocation();