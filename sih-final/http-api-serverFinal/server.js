// server.js
const express = require('express');
const axios = require('axios');
const searoutesDocs = require('@api/searoutes-docs');
const { Vessel } = require('./db'); // Import the Vessel model from db.js

const app = express();
const port = 3007; // Change port if necessary

searoutesDocs.auth('43UtHGq7apJRkWd6zV5O2FXCfeQ8UgWxaQLtg100');

app.get('/vessel-position', async (req, res) => {
  const shipName = req.query.name;

  if (!shipName) {
    return res.status(400).json({ error: 'Ship name is required' });
  }

  try {
    const vesselResponse = await axios.get(`http://localhost:3001/vessels?name=${shipName}`);
    const vesselData = vesselResponse.data;

    if (!vesselData || vesselData.length === 0) {
      return res.status(404).json({ error: 'No vessel data found' });
    }

    const imoNumber = vesselData[0].imo;

    const positionResponse = await searoutesDocs.getVesselPosition({ imo: imoNumber });
    const positionData = positionResponse.data;

    if (!positionData || positionData.length === 0) {
      return res.status(404).json({ error: 'No position data found for the vessel' });
    }

    const vesselInfo = positionData[0].info;
    const vesselPosition = positionData[0].position;

    // Save vessel data to MongoDB
    const vessel = new Vessel({
      imo: vesselInfo.imo,
      name: vesselInfo.name,
      length: vesselInfo.length,
      width: vesselInfo.width,
      type: vesselPosition.type,
      timestamp: vesselPosition.properties.timestamp,
      speed: vesselPosition.properties.speed,
      draft: vesselPosition.properties.draft,
      cog: vesselPosition.properties.cog,
      heading: vesselPosition.properties.heading,
      location: {
        latitude: vesselPosition.geometry.coordinates[1],
        longitude: vesselPosition.geometry.coordinates[0],
      },
    });

    await vessel.save();

    // Fetch satellite image from port 3000 using axios
    const latitude = vesselPosition.geometry.coordinates[1];
    const longitude = vesselPosition.geometry.coordinates[0];
    const satelliteImageResponse = await axios.get(`http://localhost:3000/satellite-image`, {
      params: {
        latitude,
        longitude,
        zoom: 17,
        width: 1000,
        height: 600,
      },
      responseType: 'arraybuffer'
    });
    const satelliteImage = satelliteImageResponse.data;

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write(`
      <h1>Vessel Information</h1>
      <p><strong>IMO:</strong> ${vesselInfo.imo}</p>
      <p><strong>Name:</strong> ${vesselInfo.name}</p>
      <p><strong>Length:</strong> ${vesselInfo.length} meters</p>
      <p><strong>Width:</strong> ${vesselInfo.width} meters</p>
   
      <h2>Vessel Position:</h2>
      <p><strong>Type:</strong> ${vesselPosition.type}</p>
      <p><strong>Timestamp:</strong> ${new Date(vesselPosition.properties.timestamp).toLocaleString()}</p>
      <p><strong>Speed:</strong> ${vesselPosition.properties.speed} knots</p>
      <p><strong>Draft:</strong> ${vesselPosition.properties.draft} meters</p>
      <p><strong>Course Over Ground:</strong> ${vesselPosition.properties.cog} degrees</p>
      <p><strong>Heading:</strong> ${vesselPosition.properties.heading} degrees</p>
      <p><strong>Location:</strong> Latitude ${latitude}, Longitude ${longitude}</p>
      
      <h2>Satellite Image:</h2>
      <img src="data:image/png;base64,${Buffer.from(satelliteImage).toString('base64')}" alt="Satellite Image"/>
    `);

    res.end();
  } 
  catch (err) {
    console.error('Error fetching vessel position or satellite image:', err);
    res.status(500).json({ error: 'Failed to fetch vessel position or satellite image' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
