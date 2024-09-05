const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://bgarihanth:Gan12345@cluster1.z7q6q.mongodb.net/VesselData", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Vessel = mongoose.model("Vessel", new mongoose.Schema({}, { strict: false }));

module.exports = {
    Vessel
};
