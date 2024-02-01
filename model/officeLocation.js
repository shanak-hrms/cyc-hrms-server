const mongoose = require('mongoose');

const officeLocationSchema =new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const OfficeLocation = mongoose.model('OfficeLocation', officeLocationSchema);

module.exports = OfficeLocation;
