// models/DriverModel.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: true },
  licenseType: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true, min: 0 },
  bankAccount: { type: String, required: true },
  successfulTrips: { type: Number, default: 0, min: 0 },
  failedTrips: { type: Number, default: 0, min: 0 },
  avatar: { type: Object} 
}, {
  timestamps: true
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
