// db.js
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://bgarihanth:Gan12345@cluster1.z7q6q.mongodb.net/VesselData';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define your schemas and models here
const vesselSchema = new mongoose.Schema({
  imo: String,
  name: String,
  length: Number,
  width: Number,
  type: String,
  timestamp: Date,
  speed: Number,
  draft: Number,
  cog: Number,
  heading: Number,
  location: {
    latitude: Number,
    longitude: Number,
  }
});

const Vessel = mongoose.model('Vessel', vesselSchema);

module.exports = {
  Vessel,
};
