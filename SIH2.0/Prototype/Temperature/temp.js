const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 7651;

mongoose.connect('mongodb+srv://bgarihanth:Gan12345@cluster1.z7q6q.mongodb.net/VesselData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Vessel = mongoose.model('Vessel', new mongoose.Schema({
  imo: Number,
  name: String,
  timestamp: Date,
  temperature: Number
}));

app.get('/compare-temperature', async (req, res) => {
    const imo = req.query.imo;
  
    if (!imo) {
      return res.status(400).json({ error: 'IMO number is required' });
    }
  
    try {
      const currentDate = new Date();
      const oneDayAgo = new Date();
      oneDayAgo.setDate(currentDate.getDate() - 1);
  
      // Retrieve the most recent data for today
      const todayData = await Vessel.findOne({
        imo: imo,
        timestamp: { $gte: new Date(currentDate.setUTCHours(0, 0, 0, 0)) }
      }).sort({ timestamp: -1 });
  
      // Retrieve the oldest data for yesterday
      const yesterdayData = await Vessel.findOne({
        imo: imo,
        timestamp: { $gte: new Date(oneDayAgo.setUTCHours(0, 0, 0, 0)), $lt: new Date(currentDate.setUTCHours(0, 0, 0, 0)) }
      }).sort({ timestamp: 1 });
  
      if (!todayData || !yesterdayData) {
        return res.status(404).json({ error: 'Could not find both today\'s and yesterday\'s data for the given IMO' });
      }
  
      // Compare temperatures and limit to 2 decimal places
      const tempDifference = Math.abs(todayData.temperature - yesterdayData.temperature).toFixed(2);
  
      if (tempDifference > 15) {
        res.json({ message: `Temperature difference of ${tempDifference}°C detected!`, tempDifference });
      } else {
        res.json({ message: 'No significant temperature difference', tempDifference });
      }
    } catch (error) {
      console.error('Error comparing temperatures:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
