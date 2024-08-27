const express = require('express');
const searoutesDocs = require('@api/searoutes-docs');

const app = express();
const port = 3006;

// Authenticate with the SeaRoutes API
searoutesDocs.auth('0HRbbXZyd93PgEq5gfrP2rg1ibxzEhP6O46Tldu6');

app.get('/vessel-position', async function(req, res) {
  try {
    // You can also get the IMO number from the query parameters or request body
    const imoNumber = '9439620';

    // Fetch vessel position data
    const response = await searoutesDocs.getVesselPosition({ imo: imoNumber });

    // Extract vessel information and position
    const vesselInfo = response.data[0].info;
    const vesselPosition = response.data[0].position;

    // Send the vessel information and position as a JSON response
    res.json({
      vesselInfo: {
        imo: vesselInfo.imo,
        name: vesselInfo.name,
        length: vesselInfo.length,
        width: vesselInfo.width,
      },
      vesselPosition: {
        type: vesselPosition.type,
        properties: vesselPosition.properties,
        geometry: vesselPosition.geometry,
      },
    });
  } catch (err) {
    console.error('Error fetching vessel position:', err);
    res.status(500).json({ error: 'Failed to fetch vessel position data' });
  }
});

app.listen(port, function() {
  console.log(`Server is running on http://localhost:${port}`);
});

//http://localhost:3006/vessel-position