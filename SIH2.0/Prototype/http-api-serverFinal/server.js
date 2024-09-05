const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const searoutesDocs = require('@api/searoutes-docs');
const { Vessel } = require('./db'); // Import the Vessel model from db.js

const app = express();
const PORT = 3007;

mongoose.connect('mongodb+srv://bgarihanth:Gan12345@cluster1.z7q6q.mongodb.net/VesselData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

searoutesDocs.auth('hVibhA9ZP17k5isTIQrPs1ZJUCDA2mrb78V4gEoh');

const WEATHER_API_URL = 'http://localhost:7000/temperature';

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

    // Fetch weather data
    const latitude = vesselPosition.geometry.coordinates[1];
    const longitude = vesselPosition.geometry.coordinates[0];

    const weatherResponse = await axios.get(WEATHER_API_URL, {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
    const data = weatherResponse.data;

    await Vessel.create({
      imo: imoNumber,
      name: vesselInfo.name,
      timestamp: new Date(),
      length: vesselInfo.length,
      width: vesselInfo.width,
      draft: vesselInfo.draft,
      cog: vesselInfo.cog,
      heading: vesselInfo.heading,
      latitude: vesselPosition.geometry.coordinates[1],
      longitude: vesselPosition.geometry.coordinates[0],
      weather: data.weather.main,
      weatherdescription: data.weather.description,
      temperature: data.weather.temperature.current,
      pressure: data.weather.pressure,
      humidity: data.weather.humidity,
      windspeed: data.weather.wind.speed,
      rain: data.weather.rain,
      clouds: data.weather.clouds

    });

    // Retrieve and compare temperatures
    const currentDate = new Date();
    const oneDayAgo = new Date();
    oneDayAgo.setDate(currentDate.getDate() - 1);

    const todayData = await Vessel.findOne({
      imo: imoNumber,
      timestamp: { $gte: new Date(currentDate.setUTCHours(0, 0, 0, 0)) }
    }).sort({ timestamp: -1 });

    const yesterdayData = await Vessel.findOne({
      imo: imoNumber,
      timestamp: { $gte: new Date(oneDayAgo.setUTCHours(0, 0, 0, 0)), $lt: new Date(currentDate.setUTCHours(0, 0, 0, 0)) }
    }).sort({ timestamp: 1 });

    let temperatureMessage = '';
    if (todayData && yesterdayData) {
      const tempDifference = Math.abs(todayData.temperature - yesterdayData.temperature).toFixed(2);
      temperatureMessage = tempDifference > 15 
        ? `Temperature difference of ${tempDifference}C detected!` 
        : 'No significant temperature difference';
    } else {
      temperatureMessage = 'Could not find both today\'s and yesterday\'s data for the given IMO';
    }

    // Fetch satellite image
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

      <h2>Weather Information:</h2>
      <p><strong>Weather:</strong> ${data.weather.main}</p>
      <p><strong>Weather Description:</strong> ${data.weather.description}</p>
      <p><strong>Temperature:</strong> ${data.weather.temperature.current}C</p>
      <p><strong>Pressure:</strong> ${data.weather.pressure} hPa</p>
      <p><strong>Humidity:</strong> ${data.weather.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.weather.wind.speed} m/s</p>
      <p><strong>Rain:</strong> ${data.weather.rain}</p>
      <p><strong>Clouds:</strong> ${data.weather.clouds}%</p>

      <h2>Temperature Comparison:</h2>
      <p>${temperatureMessage}</p>
      
      <h2>Satellite Image:</h2>
      <img src="data:image/png;base64,${Buffer.from(satelliteImage).toString('base64')}" alt="Satellite Image"/>
    `);

    res.end();
  } catch (err) {
    console.error('Error fetching vessel position or satellite image:', err);
    res.status(500).json({ error: 'Failed to fetch vessel position or satellite image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
