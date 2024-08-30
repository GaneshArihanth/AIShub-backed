const express = require('express');
const searoutesDocs = require('@api/searoutes-docs');
const PORT = process.env.PORT || 3001;


const app = express();

// Authentication for SeaRoutes API
searoutesDocs.auth('43UtHGq7apJRkWd6zV5O2FXCfeQ8UgWxaQLtg100');

app.get('/vessels', async (req, res) => {
  const shipName = req.query.name;

  if (!shipName) {
    return res.status(400).json({ error: 'Ship name is required' });
  }

  try {
    const { data } = await searoutesDocs.getVesselsByName({ name: shipName });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vessel information' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
