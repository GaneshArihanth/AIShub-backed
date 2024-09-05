const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Replace with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2FuZXNoYXJpaGFudGgiLCJhIjoiY20wNHpmMTdrMGZhbTJxcXhpNzN2a2IyeCJ9.eu-3yEvHysXt5wvuwTmcaw';

app.get('/satellite-image', async (req, res) => {
    try {
        // Get parameters from query string
        const { latitude, longitude, zoom = 15, width = 600, height = 400 } = req.query;

        // Debugging: Log the query parameters
        console.log('Query Parameters:', req.query);

        // Validate parameters
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        // Construct Mapbox Static Images API URL
        const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${longitude},${latitude},${zoom}/${width}x${height}?access_token=${MAPBOX_ACCESS_TOKEN}`;

        // Fetch the satellite image from Mapbox
        const response = await axios.get(mapboxUrl, { responseType: 'arraybuffer' });

        // Set content type to image/png
        res.set('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching satellite image:', error);
        res.status(500).json({ error: 'An error occurred while fetching the satellite image' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//http://localhost:3000/satellite-image?latitude=18.924412&longitude=72.843896&zoom=16&width=600&height=400