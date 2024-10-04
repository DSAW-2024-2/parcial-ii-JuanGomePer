const express = require('express');
const axios = require('axios');
const router = express.Router();
const cors = require('cors');
router.use(cors());//use cors

// Get temperature based on latitude and longitude
router.get('/', async (req, res) => {
    const { latitude, longitude } = req.query;

    // Validate if latitude and longitude are present
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Please provide latitude and longitude as query parameters' });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Check if latitude and longitude are within valid ranges
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return res.status(400).json({ error: 'Invalid latitude or longitude values' });
    }

    try {
        // Make a request to the Open Meteo API
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude,
                current_weather: true
            }
        });

        // Respond with temperature data if available
        if (response.data && response.data.current_weather) {
            const temperature = response.data.current_weather.temperature;
            res.json({ temperature });
        } else {
            // Handle case where no weather data is found
            res.status(404).json({ error: 'No weather data available for this location' });
        }
    } catch (error) {
        console.error(error);
        // Handle errors when fetching data from the Open Meteo API
        res.status(500).json({ error: 'Error fetching temperature from Open Meteo API' });
    }
});

// Export the router
module.exports = router;
