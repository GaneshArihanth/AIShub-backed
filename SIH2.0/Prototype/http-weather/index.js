const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 7000;

const API_KEY = '0fde291b05010ee109d692643d994d20';

app.get('/temperature', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', 
      },
    });

    const data = response.data;
    const temperature = data.main.temp; 
    const temperatureMin = data.main.temp_min;
    const temperatureMax = data.main.temp_max;
    const atmPressure = data.main.pressure;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed; // Wind speed in meters per second
    const rain = data.rain ? data.rain['1h'] : 'No rain data'; // Rain data, if available
    const weatherMain = data.weather[0].main;
    const weatherDescription = data.weather[0].description;
    const country = data.sys.country;
    const clouds = data.clouds.all;

    res.json({
      location: {
        latitude: lat,
        longitude: lon,
        country
      },
      weather: {
        main: weatherMain,
        description: weatherDescription,
        temperature: {
          current: temperature,
          min: temperatureMin,
          max: temperatureMax
        },
        pressure: atmPressure,
        humidity: humidity,
        wind: {
          speed: windSpeed
        },
        rain: rain,
        clouds: clouds
      }
    });
  } catch (error) {
    console.error('Error fetching temperature data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching temperature data', details: error.response ? error.response.data : error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});